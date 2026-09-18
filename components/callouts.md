---
title: "Test Callout Components: Note, Warning, Tip, Info & Check"
sidebarTitle: "Callouts"
description: "Use Note, Warning, Tip, Info, and Check callout components in SBGDS to surface important information with clear visual urgency signals for your readers."
---

Callouts let you pull important information out of the flow of body text and give it a distinct visual treatment so readers notice it immediately. SBGDS provides five callout variants — `<Note>`, `<Warning>`, `<Tip>`, `<Info>`, and `<Check>` — each styled with a unique color and icon that signals the nature of the message. Use the right variant for the right situation so readers can calibrate their attention at a glance.

## Note

Use `<Note>` when you want to surface supplementary information that is useful but not urgent. Notes are a good fit for clarifications, caveats, and extra context that you don't want to bury in body text but that aren't warnings or critical steps.

**When to use:** Supplementary details, clarifications, non-breaking caveats.

```mdx
<Note>
  API keys are scoped to a single workspace. If you need access across
  multiple workspaces, generate a separate key for each one.
</Note>
```

**Rendered output:** A blue-bordered panel with a pencil or notepad icon and the label "Note", containing your message text.

---

## Warning

Use `<Warning>` when an action could cause data loss, irreversible changes, downtime, or security exposure. Warnings demand immediate reader attention before they proceed. Reserve this variant for genuinely high-stakes situations so it retains its impact.

**When to use:** Destructive actions, irreversible operations, security risks, breaking changes.

```mdx
<Warning>
  Deleting a project is permanent. All associated pages, assets, and
  deployment history will be removed and cannot be recovered.
</Warning>
```

**Rendered output:** A red or amber-bordered panel with a warning triangle icon and the label "Warning", visually distinct from all other callout types.

---

## Tip

Use `<Tip>` to share best practices, shortcuts, or productivity recommendations. Tips are positive and forward-looking — they tell the reader about something they could do to improve their workflow, not something they must avoid.

**When to use:** Best practices, pro tips, efficiency shortcuts, recommended patterns.

```mdx
<Tip>
  You can use the `--watch` flag during local development to automatically
  rebuild your docs on every file save, so you never need to restart the
  preview server manually.
</Tip>
```

**Rendered output:** A green-bordered panel with a lightbulb icon and the label "Tip", conveying a helpful and encouraging tone.

---

## Info

Use `<Info>` for neutral, factual context that the reader may need but that carries no urgency or risk. Info callouts work well for background knowledge, version notes, or explanations that support understanding without requiring any action.

**When to use:** Background context, version/environment notes, neutral factual asides.

```mdx
<Info>
  SBGDS supports MDX 2 syntax. If you are migrating from an older MDX 1
  project, review the migration guide before updating your component usage.
</Info>
```

**Rendered output:** A light blue or gray-bordered panel with an information circle icon and the label "Info".

---

## Check

Use `<Check>` to confirm that a step has been completed successfully, or to present a list of requirements that have been met. The Check callout is particularly useful in setup guides, onboarding flows, and prerequisite checklists.

**When to use:** Success confirmations, completed steps, satisfied prerequisites, feature availability.

```mdx
<Check>
  Your environment is configured correctly. You are ready to publish your
  first documentation site.
</Check>
```

**Rendered output:** A green panel with a checkmark icon and the label "Check", signalling a positive outcome or a completed state.

---

## Callouts with rich content

Every callout accepts full MDX content inside its body, including bold text, inline code, links, and even nested lists. Keep content focused — a callout that runs to multiple paragraphs should probably be body text instead.

```mdx
<Warning>
  Before upgrading to v3, complete **all** of the following steps:

  - Back up your `docs.json` configuration file.
  - Run `sbgds validate` to catch any deprecated syntax.
  - Review the [v3 migration guide](/migration/v3) for breaking changes.
</Warning>
```

**Rendered output:** A Warning panel containing a bold sentence followed by a three-item bulleted list, all styled within the amber warning container.

---

## Choosing the right callout

| Situation | Use |
|---|---|
| Extra context that's nice to have | `<Note>` |
| Risk of data loss or irreversible action | `<Warning>` |
| Shortcut, best practice, or recommendation | `<Tip>` |
| Neutral background or factual aside | `<Info>` |
| Confirming success or completed state | `<Check>` |

When in doubt, ask yourself: "Is the reader at risk if they skip this?" If yes, reach for `<Warning>`. If no, a `<Note>` or `<Info>` is usually the right choice.
