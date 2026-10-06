// Syncs Figma screenshots and specs into .mdx docs.
//
// Tracks frames tagged in any .mdx file with either:
//   {/* figma-frame: FILE_KEY/NODE_ID */}   (MDX-safe, preferred)
//   <!-- figma-frame: FILE_KEY/NODE_ID -->   (accepted, but breaks MDX compilation)
// NODE_ID may use ":" or "-" (328:493 or 328-493).
//
// Specs are written between these markers in the same .mdx file:
//   {/* figma-specs:start FILE_KEY/NODE_ID */}
//   {/* figma-specs:end */}

import { createHash } from 'node:crypto';
import { appendFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';

const TOKEN = process.env.FIGMA_TOKEN;
const DOCS_DIR = process.env.DOCS_DIR || '.';
const IMAGES_DIR = process.env.IMAGES_DIR || 'images';
const STATE_FILE = process.env.STATE_FILE || '.github/figma-sync-state.json';
const API = 'https://api.figma.com/v1';

if (!TOKEN) {
  console.error('FIGMA_TOKEN is not set.');
  process.exit(1);
}

const TAG = /(?:<!--|\{\/\*)\s*figma-frame:\s*([A-Za-z0-9]+)\/(\d+[:-]\d+)\s*(?:-->|\*\/\})/g;
const SKIP_DIRS = new Set(['node_modules', '.git', '.github']);

function findMdx(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry) || entry.startsWith('.')) continue;
    const path = join(dir, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) out.push(...findMdx(path));
    else if (entry.endsWith('.mdx')) out.push(path);
  }
  return out;
}

async function figma(path, { raw = false } = {}) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(raw ? path : `${API}${path}`, raw ? {} : { headers: { 'X-Figma-Token': TOKEN } });
    if (res.status === 429) {
      const wait = Number(res.headers.get('retry-after') || 5) * 1000;
      await new Promise((r) => setTimeout(r, wait));
      continue;
    }
    if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${raw ? 'image download' : path}`);
    return res;
  }
  throw new Error(`Rate limited too many times for ${path}`);
}

const hex = (c, opacity = 1) => {
  const h = (v) => Math.round(v * 255).toString(16).padStart(2, '0');
  const a = (c.a ?? 1) * opacity;
  return `#${h(c.r)}${h(c.g)}${h(c.b)}${a < 1 ? h(a) : ''}`;
};
const num = (n) => (Number.isInteger(n) ? String(n) : String(+n.toFixed(2)));

let variableNames = null; // id -> name; stays null when the Variables API isn't available
async function loadVariables(fileKey) {
  try {
    const res = await figma(`/files/${fileKey}/variables/local`);
    const { meta } = await res.json();
    variableNames = Object.fromEntries(Object.entries(meta.variables).map(([id, v]) => [id, v.name]));
  } catch (err) {
    console.warn(`Variable names unavailable (${err.message}). Colors fall back to hex values and style names.`);
  }
}

function extractSpecs(root, styles) {
  const layout = [];
  const colors = new Map();
  const text = new Map();

  const addColor = (paints, role, node) => {
    for (const p of paints || []) {
      if (p.type !== 'SOLID' || p.visible === false) continue;
      const value = hex(p.color, p.opacity);
      const varId = p.boundVariables?.color?.id;
      const token = (varId && variableNames?.[varId]) || '';
      const key = `${value}|${token}`;
      const entry = colors.get(key) || { value, token, uses: new Set() };
      entry.uses.add(`${node.name} (${role})`);
      colors.set(key, entry);
    }
  };

  const walk = (node, depth) => {
    if (node.visible === false) return;
    const box = node.absoluteBoundingBox;
    if (['FRAME', 'COMPONENT', 'INSTANCE'].includes(node.type) && box) {
      const pad = [node.paddingTop, node.paddingRight, node.paddingBottom, node.paddingLeft].map((v) => v || 0);
      layout.push({
        name: node.name,
        depth,
        size: `${num(box.width)} × ${num(box.height)}`,
        padding: pad.some(Boolean) ? pad.map(num).join(' / ') : '—',
        gap: node.layoutMode && node.layoutMode !== 'NONE' ? num(node.itemSpacing || 0) : '—',
      });
    }
    addColor(node.fills, node.type === 'TEXT' ? 'text' : 'fill', node);
    addColor(node.strokes, 'stroke', node);
    if (node.type === 'TEXT' && node.style) {
      const s = node.style;
      const styleName = styles?.[node.styles?.text]?.name || '';
      const lh = s.lineHeightPx ? `${num(s.lineHeightPx)}px` : 'auto';
      const key = `${s.fontFamily}|${s.fontSize}|${s.fontWeight}|${lh}|${styleName}`;
      const entry = text.get(key) || { s, lh, styleName, uses: new Set() };
      entry.uses.add(node.name);
      text.set(key, entry);
    }
    (node.children || []).forEach((c) => walk(c, depth + 1));
  };
  walk(root, 0);
  return { layout, colors: [...colors.values()], text: [...text.values()] };
}

const esc = (s) => String(s).replace(/\|/g, '\\|').replace(/[{}<>]/g, (c) => `\\${c}`);
const list = (set) => esc([...set].slice(0, 4).join(', ') + (set.size > 4 ? ', …' : ''));

function renderSpecs(specs, tag) {
  const lines = [`{/* figma-specs:start ${tag} */}`, '', '### Layout (from Figma)', ''];
  lines.push('| Layer | Size | Padding (T / R / B / L) | Gap |', '|---|---|---|---|');
  for (const l of specs.layout) lines.push(`| ${'\u00a0\u00a0'.repeat(Math.min(l.depth, 3))}${esc(l.name)} | ${l.size} | ${l.padding} | ${l.gap} |`);
  lines.push('', '### Colors (from Figma)', '', '| Color | Token | Used by |', '|---|---|---|');
  for (const c of specs.colors) lines.push(`| \`${c.value}\` | ${c.token ? `\`${esc(c.token)}\`` : '—'} | ${list(c.uses)} |`);
  lines.push('', '### Typography (from Figma)', '', '| Font | Size / weight | Line height | Style | Used by |', '|---|---|---|---|---|');
  for (const t of specs.text) {
    lines.push(`| ${esc(t.s.fontFamily)} | ${num(t.s.fontSize)} / ${t.s.fontWeight} | ${t.lh} | ${t.styleName ? `\`${esc(t.styleName)}\`` : '—'} | ${list(t.uses)} |`);
  }
  lines.push('', '{/* figma-specs:end */}');
  return lines.join('\n');
}

function replaceSpecs(source, tag, block) {
  const re = new RegExp(`\\{/\\* figma-specs:start ${tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} \\*/\\}[\\s\\S]*?\\{/\\* figma-specs:end \\*/\\}`);
  return re.test(source) ? source.replace(re, () => block) : null;
}

// --- main ---
const state = existsSync(STATE_FILE) ? JSON.parse(readFileSync(STATE_FILE, 'utf8')) : {};
const frames = new Map(); // "FILE/NODE" -> { fileKey, nodeId, mdxFiles: [] }

for (const file of findMdx(DOCS_DIR)) {
  const source = readFileSync(file, 'utf8');
  for (const [, fileKey, rawId] of source.matchAll(TAG)) {
    const nodeId = rawId.replace('-', ':');
    const key = `${fileKey}/${nodeId}`;
    const f = frames.get(key) || { fileKey, nodeId, mdxFiles: [] };
    if (!f.mdxFiles.includes(file)) f.mdxFiles.push(file);
    frames.set(key, f);
  }
}

console.log(`Tracking ${frames.size} Figma frame(s).`);
if (frames.size === 0) process.exit(0);

const changedFiles = [];
const failures = [];
let varsLoadedFor = null;

for (const [key, { fileKey, nodeId, mdxFiles }] of frames) {
  try {
    const res = await figma(`/files/${fileKey}/nodes?ids=${encodeURIComponent(nodeId)}`);
    const data = await res.json();
    const entry = data.nodes?.[nodeId];
    if (!entry?.document) throw new Error('node not found (deleted or no access)');

    const hash = createHash('sha256').update(JSON.stringify(entry.document)).digest('hex');
    const imagePath = join(IMAGES_DIR, `${basename(mdxFiles[0], '.mdx')}.png`);
    if (state[key]?.hash === hash && existsSync(imagePath)) {
      console.log(`${key}: unchanged`);
      continue;
    }

    if (varsLoadedFor !== fileKey) {
      await loadVariables(fileKey);
      varsLoadedFor = fileKey;
    }

    // 2x screenshot
    const img = await (await figma(`/images/${fileKey}?ids=${encodeURIComponent(nodeId)}&format=png&scale=2`)).json();
    const url = img.images?.[nodeId];
    if (!url) throw new Error(`image export failed${img.err ? `: ${img.err}` : ''}`);
    const png = Buffer.from(await (await figma(url, { raw: true })).arrayBuffer());
    mkdirSync(dirname(imagePath), { recursive: true });
    writeFileSync(imagePath, png);
    changedFiles.push(imagePath);

    // Specs
    const block = renderSpecs(extractSpecs(entry.document, entry.styles), key);
    for (const mdx of mdxFiles) {
      const updated = replaceSpecs(readFileSync(mdx, 'utf8'), key, block);
      if (updated === null) {
        console.warn(`${mdx}: no "figma-specs:start ${key}" / "figma-specs:end" markers found, specs not updated.`);
        continue;
      }
      writeFileSync(mdx, updated);
      changedFiles.push(mdx);
    }

    state[key] = { hash, syncedAt: new Date().toISOString() };
    console.log(`${key}: updated`);
  } catch (err) {
    failures.push(`${key}: ${err.message}`);
    console.error(`${key}: ${err.message}`);
  }
}

if (changedFiles.length) {
  mkdirSync(dirname(STATE_FILE), { recursive: true });
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + '\n');
}
if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `changed=${changedFiles.length > 0}\n`);
  appendFileSync(process.env.GITHUB_OUTPUT, `failures=${failures.length}\n`);
}
if (failures.length) {
  console.error(`\n${failures.length} frame(s) failed:\n${failures.join('\n')}`);
  process.exit(1);
}
