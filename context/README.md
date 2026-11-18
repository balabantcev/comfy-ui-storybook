# Context vault — Comfy UI

Single source of truth for **project knowledge, rules and preferences** that must
survive across sessions and across AI tools (Claude Code, Codex, Cursor).

This folder is also a valid **Obsidian vault** — open it in Obsidian to see the
graph of connections. Notes link to each other with wiki-links (double square brackets).

> Any AI agent working in this repo: read the notes below **before** acting.
> When you learn a new durable fact, rule, or preference, add a note here (same
> format: frontmatter + wiki-links) and add a line to the index — do **not** keep
> it only in one tool's private memory, or the other tools lose it.

## Index

- [[figma-design-system-source]] — repo mirrors the "❖ Comfy UI" Figma (fileKey `60wkPriIjI9zjyAKOq3dja`); how foundations/icons/tokens sync.
- [[figma-token-mapping]] — map Figma variables by **value**, not code syntax; the missing 4 % alpha step; Light/Dark + Desktop/Mobile modes.
- [[token-driven-components]] — **standing rule:** everything references the token system, never hardcode hex/px/rgba.
- [[no-screenshots-in-chat]] — verify with text tools (`preview_eval`/`preview_logs`), don't post screenshot images.
- [[storybook-conventions]] — story chrome is token-driven too; shared `src/storybook/` helpers, `play()` interaction tests, a11y, and CI.

## How the connections flow

```
figma-design-system-source ◀──── token-driven-components ◀──── no-screenshots-in-chat
        (architecture)              (the core rule)              (verification style)
```

## Which tools read this

| Tool        | Entry file        | Points here      |
|-------------|-------------------|------------------|
| Claude Code | `/CLAUDE.md`      | → `/context/`    |
| Codex       | `/AGENTS.md`      | → `/context/`    |
| Cursor      | `/.cursor/rules/` | → `/context/`    |
| Obsidian    | open `/context` as vault | graph view |
