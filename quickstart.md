---
title: "SBGDS Quickstart: Build and Publish Your First Docs"
sidebarTitle: "Quickstart"
description: "Set up and publish your first SBGDS documentation site in under 10 minutes. Connect your repo, write your first MDX page, and go live."
---

This guide walks you through everything you need to create a live documentation site with SBGDS. By the end, you'll have a published site with your first MDX page, a configured sidebar, and a local preview workflow set up — ready to build on.

## Prerequisites

Before you begin, make sure you have the following:

- An **SBGDS account** — sign up free at [app.sbgds.com](https://app.sbgds.com)
- **Node.js 18+** installed on your machine (for local preview)
- A **GitHub account** with a repository ready to connect (or use the SBGDS web editor)

<Note>
  You can skip the GitHub setup and use the SBGDS web editor if you just want to explore the platform. For production docs, we recommend connecting a repository for version control and team collaboration.
</Note>

## Create and publish your first docs site

<Steps>
  <Step title="Create a project in the dashboard">
    Log in to [app.sbgds.com](https://app.sbgds.com) and click **New Project**. Fill in the following fields:

    - **Project name** — A human-readable name shown in your dashboard (e.g. `Acme Docs`)
    - **Subdomain** — Your site will be published at `your-subdomain.sbgds.dev`
    - **Visibility** — Choose **Public** or **Private** (private requires a Pro plan)

    Click **Create Project** to continue. SBGDS initializes a starter configuration and takes you to the project editor.
  </Step>

  <Step title="Connect your GitHub repository">
    In your project settings, select the **GitHub** tab and click **Connect Repository**. Authorize the SBGDS GitHub App, then choose the repository and branch you want to use.

    <Tabs>
      <Tab title="Use an existing repo">
        Select your repository from the dropdown. SBGDS will look for a `docs.json` file at the root. If one doesn't exist, SBGDS will offer to scaffold it for you automatically.
      </Tab>
      <Tab title="Use the web editor">
        Skip the GitHub step entirely and click **Open Web Editor** from your project dashboard. Changes you save in the editor are published directly — no git workflow required.
      </Tab>
    </Tabs>

    <Tip>
      Connect to a dedicated `docs` branch to keep documentation changes separate from your main application code.
    </Tip>
  </Step>

  <Step title="Write your first page">
    Create a new file called `introduction.mdx` at the root of your repository (or in a `/docs` folder, depending on your project setup). Start every page with frontmatter — SBGDS uses this to build your sidebar and set page metadata.

    ```mdx
    ---
    title: "Welcome to Acme Docs"
    sidebarTitle: "Introduction"
    description: "Everything you need to get started with Acme — APIs, SDKs, and integration guides."
    ---

    Acme makes it easy to send transactional emails at scale.
    This documentation covers our REST API, official SDKs, and
    platform guides to help you integrate quickly.

    ## Get started

    Choose the path that fits your workflow:

    - [Quickstart](/quickstart) — Your first API call in 5 minutes
    - [API Reference](/api-reference) — Full endpoint documentation
    - [SDKs](/sdks) — Official client libraries for Node, Python, and Ruby
    ```

    Next, open (or create) your `docs.json` file and add the page to your navigation:

    ```json
    {
      "name": "Acme Docs",
      "navigation": [
        {
          "group": "Getting Started",
          "pages": ["introduction", "quickstart"]
        }
      ]
    }
    ```

    <Note>
      Reference pages by their file path **without** the `.mdx` extension. SBGDS resolves them automatically.
    </Note>
  </Step>

  <Step title="Preview locally with mint dev">
    Install the SBGDS CLI globally using npm, then start the local dev server:

    ```bash
    npm install -g @sbgds/mint
    mint dev
    ```

    SBGDS starts a local server at `http://localhost:3000`. The preview hot-reloads whenever you save a file, so you can iterate quickly without pushing to GitHub.

    ```text
    ✔ SBGDS dev server running
    ➜  Local:   http://localhost:3000
    ➜  Network: http://192.168.1.42:3000
    ```

    <Warning>
      Run `mint dev` from the root directory of your docs project — the same directory that contains your `docs.json` file. Running it elsewhere causes configuration errors.
    </Warning>
  </Step>

  <Step title="Publish to production">
    When you're happy with your content, commit your changes and push to the branch you connected in Step 2:

    ```bash
    git add .
    git commit -m "docs: add introduction page"
    git push origin main
    ```

    SBGDS detects the push via the GitHub App webhook, builds your site, and deploys it within seconds. You can monitor the deployment status in the **Deployments** tab of your project dashboard.

    Once complete, your site is live at `your-subdomain.sbgds.dev` — or at your custom domain if you've configured one under **Settings → Domains**.
  </Step>
</Steps>

## What's next?

You've published your first SBGDS site. Here's where to go from here:

<CardGroup cols={2}>
  <Card title="Writing Content" icon="pen-nib" href="/guides/writing-content">
    Learn advanced MDX authoring, callouts, code blocks with syntax highlighting, and embedding media.
  </Card>
  <Card title="Components" icon="puzzle-piece" href="/components/overview">
    Browse the full component library — tabs, accordions, cards, API playgrounds, and more.
  </Card>
  <Card title="Navigation & Structure" icon="sitemap" href="/guides/navigation">
    Configure multi-group sidebars, versioned docs, and tabbed top-level navigation in `docs.json`.
  </Card>
  <Card title="Custom Domain" icon="globe" href="/guides/publishing">
    Connect your own domain and configure SSL so your docs live at `docs.yourdomain.com`.
  </Card>
</CardGroup>
