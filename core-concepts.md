---
title: "Core Concepts: The Building Blocks of Your SBGDS Site"
sidebarTitle: "Core Concepts"
description: "Understand the key building blocks of SBGDS: projects, pages, navigation, components, deployments, and branding — and how they all fit together."
---

Before you dive deep into building your documentation site, it helps to understand how SBGDS structures everything. SBGDS is built around a small set of composable concepts — once you understand how they fit together, the rest of the platform clicks into place quickly.

## Building blocks at a glance

<CardGroup cols={2}>
  <Card title="Projects" icon="folder-open">
    A **project** is a single documentation site. Each project maps to one GitHub repository (or a folder within one) and is published to its own URL. You manage all of your projects from the SBGDS dashboard.

    Projects hold your configuration, branding, deployment history, and collaborator settings in one place. Most teams create one project per product or service.
  </Card>
  <Card title="Pages" icon="file-lines">
    A **page** is any `.mdx` file in your project. MDX is Markdown extended with JSX — meaning you can write prose, embed code blocks, and drop in rich UI components all in one file.

    Each page must include a frontmatter block at the top with at minimum a `title` and `description`. SBGDS uses this metadata to build your sidebar, set `<title>` tags, and power search indexing.
  </Card>
  <Card title="Navigation" icon="bars">
    The **`docs.json`** file at the root of your project is the single source of truth for your site's structure. It defines which pages appear in the sidebar, how they're grouped, and in what order.

    You can create multiple navigation groups, nest pages into subgroups, and configure top-level tab navigation — all through this one file.
  </Card>
  <Card title="Components" icon="puzzle-piece">
    **Components** are reusable UI elements you embed directly into your MDX pages using JSX syntax. SBGDS ships with a built-in component library that includes cards, tabs, accordions, callout boxes, step sequences, code groups, and more.

    You don't need to import anything — all SBGDS components are globally available in every `.mdx` file.
  </Card>
  <Card title="Deployments" icon="cloud-arrow-up">
    A **deployment** is triggered automatically every time you push to the branch connected to your project. SBGDS builds your site and publishes the result, keeping a full deployment history so you can inspect past builds or roll back if needed.

    Each deployment produces an immutable preview URL, making it easy to share a specific version with stakeholders before it goes live.
  </Card>
  <Card title="Branding" icon="paintbrush">
    **Branding** controls the visual identity of your docs site. You configure your logo, primary color, font, favicon, and dark mode preferences directly in `docs.json`.

    SBGDS applies your branding globally — every page, component, and navigation element inherits it automatically, so your docs always look consistent with your product.
  </Card>
</CardGroup>

## How the concepts connect

Understanding how these pieces work together helps you make good architectural decisions early.

<Accordion title="How does a page get into the sidebar?">
  You write a `.mdx` file and add its path (without the extension) to the `navigation` array in `docs.json`. SBGDS reads the `sidebarTitle` from the file's frontmatter to display the label. If `sidebarTitle` is absent, SBGDS falls back to `title`.

  ```json
  {
    "navigation": [
      {
        "group": "Getting Started",
        "pages": ["introduction", "quickstart", "core-concepts"]
      }
    ]
  }
  ```
</Accordion>

<Accordion title="When does a deployment happen?">
  Every push to your connected branch triggers a deployment automatically via the SBGDS GitHub App webhook. You can also trigger a manual redeploy from the **Deployments** tab in your project dashboard — useful if you've changed environment variables or updated your `docs.json` without a new commit.
</Accordion>

<Accordion title="Do I need to import components?">
  No. All SBGDS components — `<Card>`, `<Steps>`, `<Tabs>`, `<Note>`, `<Warning>`, `<Tip>`, `<Accordion>`, and the rest — are globally registered and available in every `.mdx` file. Just use them directly in your markup without any import statement.
</Accordion>

<Accordion title="Can I have multiple projects in one repository?">
  Yes. You can point multiple SBGDS projects at different subdirectories of the same repository by specifying a `docsDir` in each project's settings. This is common for monorepos where each package has its own docs folder.
</Accordion>

## A closer look at docs.json

Your `docs.json` file ties together navigation, branding, and project metadata. Here's a minimal but realistic example:

```json
{
  "name": "Acme Docs",
  "logo": {
    "light": "/logo/light.svg",
    "dark": "/logo/dark.svg"
  },
  "favicon": "/favicon.png",
  "colors": {
    "primary": "#0F172A",
    "light": "#38BDF8",
    "dark": "#0F172A"
  },
  "navigation": [
    {
      "group": "Getting Started",
      "pages": ["introduction", "quickstart", "core-concepts"]
    },
    {
      "group": "Guides",
      "pages": ["guides/writing-content", "guides/navigation", "guides/publishing"]
    },
    {
      "group": "API Reference",
      "pages": ["api-reference/introduction", "api-reference/authentication"]
    }
  ],
  "footerSocials": {
    "github": "https://github.com/acme",
    "twitter": "https://twitter.com/acme"
  }
}
```

<Note>
  For a complete reference of every `docs.json` field — including versioning, tabs, anchors, and analytics integrations — see the [Configuration Reference](/configuration/settings).
</Note>

## MDX page anatomy

Every SBGDS page follows the same structure: frontmatter at the top, followed by your MDX content.

```mdx
---
title: "Page Title Between 50–60 Characters"
sidebarTitle: "Short Label"
description: "A concise description of this page, between 130 and 155 characters, used for SEO and search."
---

Your opening paragraph goes here — plain prose that sets context
before any components or code blocks appear.

## Section heading

Use Markdown headings, SBGDS components, and fenced code blocks
freely throughout the rest of the page.

<Note>
  Use callout components like this one to highlight important information.
</Note>
```

<Tip>
  Keep your `description` frontmatter field between 130–155 characters. SBGDS uses it for both on-page metadata and the full-text search index, so a clear, specific description improves discoverability for your readers.
</Tip>

## Next steps

Now that you understand how SBGDS is structured, you're ready to go deeper into any area:

<CardGroup cols={2}>
  <Card title="Writing Content" icon="pen-nib" href="/guides/writing-content">
    Master MDX authoring: formatting, code blocks, callouts, images, and embedded media.
  </Card>
  <Card title="Navigation Guide" icon="sitemap" href="/guides/navigation">
    Configure groups, subpages, tabs, anchors, and versioned navigation in `docs.json`.
  </Card>
  <Card title="Component Library" icon="puzzle-piece" href="/components/overview">
    Explore every built-in component with live examples and copy-paste code snippets.
  </Card>
  <Card title="Deployments & Hosting" icon="server" href="/guides/publishing">
    Understand build pipelines, preview URLs, rollbacks, and custom domain setup.
  </Card>
</CardGroup>
