---
title: "Card and CardGroup Components for SBGDS Documentation"
sidebarTitle: "Cards"
description: "Build visual navigation grids and feature showcases using the Card and CardGroup components, with icons, links, and flexible column layouts in SBGDS."
---

Cards are the primary tool for building visual navigation hubs, feature showcases, and concept overviews in SBGDS. A `<Card>` presents a titled, optionally linked panel with an icon and description text. A `<CardGroup>` arranges multiple cards into a responsive grid. Together, they replace walls of bullet-point links with scannable, approachable entry points that guide readers to the right place quickly. Use cards whenever you want readers to choose a path, discover a category, or understand a set of related features at a glance.

## Basic Card

A `<Card>` accepts a `title`, an optional `icon`, an optional `href` for linking, and optional body text as children. At minimum, provide a `title`.

```mdx
<Card title="Quick Start" icon="rocket" href="/quickstart">
  Get your first documentation site live in under five minutes.
</Card>
```

**Rendered output:** A bordered panel with a rocket icon in the top-left, a bold "Quick Start" heading, and a short description below it. The entire card is clickable and navigates to `/quickstart`.

### Card without a link

Omit `href` to render a static card. Static cards work well for feature callouts or informational panels where navigation isn't the goal.

```mdx
<Card title="MDX Support" icon="file-code">
  Write content in MDX to mix Markdown prose with React components in a
  single file, with no build configuration required.
</Card>
```

---

## CardGroup — grid layouts

Wrap multiple `<Card>` components inside a `<CardGroup>` to arrange them in a responsive grid. Set the `cols` prop to control the number of columns.

### Two-column grid

```mdx
<CardGroup cols={2}>
  <Card title="Authentication" icon="lock" href="/auth">
    Secure your API calls with bearer tokens and API key authentication.
  </Card>
  <Card title="Webhooks" icon="webhook" href="/webhooks">
    Subscribe to real-time events and receive push notifications to your
    server when key actions occur.
  </Card>
  <Card title="Rate Limits" icon="gauge" href="/rate-limits">
    Understand request quotas and learn how to handle 429 responses
    gracefully in your integration.
  </Card>
  <Card title="Pagination" icon="arrow-right" href="/pagination">
    Navigate large result sets efficiently using cursor-based pagination
    across all list endpoints.
  </Card>
</CardGroup>
```

**Rendered output:** A 2×2 grid of equally-sized cards, each with an icon, bold title, and description. On narrow viewports the grid collapses to a single column automatically.

### Three-column grid

Use `cols={3}` for denser grids that work well for icon-forward navigation where descriptions are short or omitted.

```mdx
<CardGroup cols={3}>
  <Card title="JavaScript" icon="js" href="/sdks/javascript" />
  <Card title="Python" icon="python" href="/sdks/python" />
  <Card title="Go" icon="golang" href="/sdks/go" />
  <Card title="Ruby" icon="gem" href="/sdks/ruby" />
  <Card title="PHP" icon="php" href="/sdks/php" />
  <Card title="Java" icon="java" href="/sdks/java" />
</CardGroup>
```

**Rendered output:** A two-row, three-column grid of compact icon cards linking to individual SDK pages. Cards without body text render as tighter, icon-and-title-only tiles.

---

## Icons

The `icon` prop accepts any [Font Awesome](https://fontawesome.com/icons) icon name in kebab-case. SBGDS bundles the Font Awesome Free library, so any icon from that set works without additional configuration.

```mdx
<CardGroup cols={2}>
  <Card title="Database" icon="database" href="/data" />
  <Card title="Security" icon="shield-halved" href="/security" />
  <Card title="Monitoring" icon="chart-line" href="/monitoring" />
  <Card title="CLI Tools" icon="terminal" href="/cli" />
</CardGroup>
```

**Common icon names:** `rocket`, `book`, `code`, `lock`, `gear`, `users`, `bolt`, `cloud`, `terminal`, `globe`, `bell`, `check`, `circle-info`, `triangle-exclamation`.

---

## Cards as navigation hubs

The most common use of cards is on overview and index pages, where you want to give readers a visual map of the content available in a section. Place a `<CardGroup>` near the top of the page, after your introductory paragraph, to surface the most important destinations immediately.

```mdx
## Explore the API

<CardGroup cols={2}>
  <Card title="REST API Reference" icon="brackets-curly" href="/api/reference">
    Browse every endpoint, request parameter, and response schema in the
    full interactive API reference.
  </Card>
  <Card title="Authentication" icon="lock" href="/api/authentication">
    Learn how to generate API keys and authenticate every request to the
    SBGDS API.
  </Card>
  <Card title="Error Codes" icon="circle-exclamation" href="/api/errors">
    Understand what each HTTP status code and error payload means so you
    can handle failures in your integration.
  </Card>
  <Card title="Changelog" icon="clock-rotate-left" href="/api/changelog">
    Track every breaking change, new endpoint, and deprecation notice
    across API versions.
  </Card>
</CardGroup>
```

---

## When to use cards vs. links

Choose the right pattern based on how much context the destination needs.

| Situation | Use |
|---|---|
| Top-level section navigation with descriptions | `<CardGroup>` with description text |
| Icon-forward language or SDK pickers | `<CardGroup cols={3}>` without descriptions |
| Inline reference to a related page | Markdown hyperlink |
| Single featured or highlighted destination | Standalone `<Card>` |
| Ordered list of steps or actions | `<Steps>` (see below) |

Avoid using cards for every link on a page — they work best as section-level navigation tools. For in-paragraph references and incidental links, use standard Markdown links.

---

## Steps — sequential structure

When your content describes a process with a defined order, use `<Steps>` instead of cards. Steps render each child as a numbered item with a heading and body, making sequence explicit and scannable.

```mdx
<Steps>
  <Step title="Install the CLI">
    Run `npm install -g @sbgds/cli` to install the SBGDS command-line tool
    globally on your machine.
  </Step>
  <Step title="Initialize your project">
    In your project directory, run `sbgds init` to scaffold a new docs site
    with a starter configuration and example pages.
  </Step>
  <Step title="Start the preview server">
    Run `sbgds dev` to launch a local preview at `http://localhost:3000`.
    Changes to your MDX files reload the preview automatically.
  </Step>
  <Step title="Publish">
    Run `sbgds publish` to deploy your documentation site to the SBGDS
    hosting platform and receive a live URL.
  </Step>
</Steps>
```

**Rendered output:** A vertical list of four numbered steps, each with a bold title and indented body text, connected by a subtle vertical line that reinforces the sense of progression.

---

## Tabs — alternative content

Use `<Tabs>` and `<Tab>` when you have parallel content that serves different reader contexts — for example, instructions for different operating systems or configuration formats. Tabs keep all variants accessible without duplicating the surrounding page structure.

```jsx
<Tabs>
  <Tab title="macOS / Linux">
    export SBGDS_API_KEY="your-api-key-here"
  </Tab>
  <Tab title="Windows (PowerShell)">
    $env:SBGDS_API_KEY = "your-api-key-here"
  </Tab>
  <Tab title="Windows (CMD)">
    set SBGDS_API_KEY=your-api-key-here
  </Tab>
</Tabs>
```

**Rendered output:** A tabbed panel with three clickable tabs labeled "macOS / Linux", "Windows (PowerShell)", and "Windows (CMD)". The active tab displays its code block while the others are hidden.

For code-only tab groups, consider using [`<CodeGroup>`](/components/code-blocks#codegroup-multi-language-tabs) instead, which is optimised specifically for multi-language code examples and renders with a more compact code-editor aesthetic.
