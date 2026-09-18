---
title: "Code Blocks: Syntax Highlighting and Features in SBGDS"
sidebarTitle: "Code Blocks"
description: "Display syntax-highlighted code with filenames, line numbers, diffs, focus markers, and multi-language tabs using CodeGroup in your SBGDS documentation."
---

Code blocks in SBGDS go far beyond basic syntax highlighting. You can attach filenames, enable line numbers, highlight or focus specific lines, annotate additions and deletions with diff markers, group multiple snippets into a tabbed `<CodeGroup>`, collapse long files behind an expand toggle, and wrap long lines for readability — all through lightweight meta options written directly on the opening fence. This page documents every feature with concrete examples you can copy straight into your MDX files.

## Basic fenced code blocks

Wrap code in triple backticks and specify the language on the opening fence. SBGDS automatically applies syntax highlighting based on the language tag.

```javascript
const greet = (name) => {
  return `Hello, ${name}!`;
};

console.log(greet("world"));
```

**Rendered output:** A code block with JavaScript syntax highlighting — keywords, strings, and template literals each colored distinctly — and a copy-to-clipboard button in the top-right corner.

Supported languages include `javascript`, `typescript`, `python`, `bash`, `json`, `yaml`, `css`, `html`, `sql`, `go`, `rust`, `java`, `ruby`, `php`, and [many more](https://shiki.style/languages).

---

## Titles and filenames

Add a filename directly after the language tag to display it as a label above the code block. This tells readers exactly which file the snippet belongs to.

```python app.py
from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return "Hello from SBGDS!"
```

**Rendered output:** A Python code block with a tab-style label reading `app.py` above the syntax-highlighted code, mimicking the look of a file open in a code editor.

---

## Line numbers

Add the `lines` meta option to display line numbers in the gutter. Line numbers help readers follow along during walkthroughs and make it easy to reference specific lines in written explanations.

```typescript lines
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

function formatUser(user: User): string {
  return `${user.name} <${user.email}>`;
}
```

**Rendered output:** A TypeScript code block with numbered lines (1, 2, 3…) in a dimmed gutter on the left side of each row.

---

## Line highlighting

Use `highlight={...}` in the meta string to draw attention to specific lines. Highlighted lines receive a distinct background color so readers immediately know where to look. You can specify individual lines and ranges, separated by commas.

```javascript highlight={3,6-8}
import { createClient } from "@sbgds/sdk";

const client = createClient({ apiKey: process.env.SBGDS_API_KEY });

async function publishDocs() {
  const result = await client.publish({
    project: "my-docs",
  });
  console.log(result.url);
}
```

**Rendered output:** A JavaScript block where line 3 and lines 6–8 are tinted with a highlight background, with all other lines displayed at normal opacity.

---

## Line focus

Use `focus={...}` to dim every line *except* the ones you specify. Focused lines stay at full opacity while the rest fade out, creating a spotlight effect that works well when you want readers to concentrate on one part of a larger snippet.

```python focus={4-6}
import os
import json

def load_config(path: str) -> dict:
    with open(path) as f:
        return json.load(f)

if __name__ == "__main__":
    config = load_config("config.json")
    print(config)
```

**Rendered output:** A Python block where lines 4–6 (the `load_config` function body) are rendered at full brightness, while lines 1–3 and 8–10 are dimmed, guiding the reader's eye to the focal section.

---

## Diff markers

Annotate individual lines with `// [!code ++]` or `// [!code --]` to mark additions and deletions inline. SBGDS renders these as a classic diff — green for added lines, red for removed lines — without requiring you to use the `diff` language tag, so your syntax highlighting stays active.

```javascript
import { createClient } from "@sbgds/sdk";

const client = createClient({
  apiKey: process.env.SBGDS_API_KEY, // [!code --]
  apiKey: process.env.SBGDS_SECRET_KEY, // [!code ++]
  timeout: 5000, // [!code ++]
});
```

**Rendered output:** A JavaScript block where the `apiKey: process.env.SBGDS_API_KEY` line has a red background with a minus prefix, and the two new lines have a green background with a plus prefix — identical in appearance to a Git diff, but with live syntax highlighting.

---

## CodeGroup — multi-language tabs

Wrap multiple code blocks inside a `<CodeGroup>` to present them as a tabbed interface. This is ideal for showing the same concept in multiple languages, or the same command for multiple package managers. The reader clicks a tab to switch between snippets.

<CodeGroup>

```bash npm
npm install @sbgds/sdk
```

```bash yarn
yarn add @sbgds/sdk
```

```bash pnpm
pnpm add @sbgds/sdk
```

</CodeGroup>

**Rendered output:** A single code block panel with three tabs labeled `npm`, `yarn`, and `pnpm`. Clicking each tab replaces the displayed command with the appropriate variant.

Each tab label is derived from the filename you provide after the language tag. You can use any label — it doesn't have to be a real filename.

<CodeGroup>

```python Python
import sbgds
client = sbgds.Client(api_key="...")
```

```javascript JavaScript
import { createClient } from "@sbgds/sdk";
const client = createClient({ apiKey: "..." });
```

```go Go
client := sbgds.NewClient("...")
```

</CodeGroup>

---

## Expandable code blocks

Add the `expandable` meta option to collapse a long code block behind a "Show more" toggle. Use this for complete file examples or lengthy configuration snippets that are useful as reference but would otherwise dominate the page layout.

```yaml expandable
version: "3"
project:
  name: my-docs
  theme: default
  favicon: /assets/favicon.png
  logo:
    light: /assets/logo-light.svg
    dark: /assets/logo-dark.svg
navigation:
  - group: Getting Started
    pages:
      - index
      - quickstart
      - installation
  - group: Components
    pages:
      - components/overview
      - components/callouts
      - components/code-blocks
      - components/cards
```

**Rendered output:** A YAML block that initially shows the first few lines followed by a "Show more" button. Clicking the button expands the block to reveal the full content.

---

## Wrapping long lines

Add the `wrap` meta option to enable soft-wrapping for lines that exceed the block's width. By default, long lines produce a horizontal scrollbar. Use `wrap` when the full line content must be readable at a glance and horizontal scrolling would be disruptive — for example, in long URLs or prose-like shell commands.

```bash wrap
curl -X POST https://api.sbgds.io/v1/projects/my-project/deployments \
  -H "Authorization: Bearer $SBGDS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"branch": "main", "message": "Deploy updated API reference"}'
```

**Rendered output:** A bash block where the long `curl` command wraps visually onto multiple display lines rather than extending off-screen, keeping the entire command readable without scrolling.

---

## Combining meta options

Meta options can be combined in any order on the same opening fence, separated by spaces.

```typescript app/client.ts lines highlight={5-7} expandable
import { createClient, type ClientConfig } from "@sbgds/sdk";

const defaultConfig: ClientConfig = {
  timeout: 10000,
  apiKey: process.env.SBGDS_API_KEY ?? "",
  baseUrl: process.env.SBGDS_BASE_URL ?? "https://api.sbgds.io",
  retries: 3,
};

export const client = createClient(defaultConfig);
```

**Rendered output:** An expandable TypeScript block labeled `app/client.ts`, with line numbers in the gutter, and lines 5–7 highlighted in a distinct background color.
