---
name: storybook-mcp
description: "Storybook's own MCP server (@storybook/addon-mcp) at :6006/mcp — what it offers and how each AI tool connects"
tags: [project, storybook, tooling, ai]
---

# Storybook MCP server

`@storybook/addon-mcp` (registered in `.storybook/main.ts`) serves an MCP endpoint at
**`http://localhost:6006/mcp`** — only while `pnpm storybook` is running. It lets an AI
agent query this Storybook instead of grepping for stories.

| Tool | Use it for |
|---|---|
| `stories-find-by-component` | which stories a component has |
| `get-storybook-story-instructions` | how stories are written here (complements [[storybook-conventions]]) |
| `stories-changed` | stories touched by the current change |
| `stories-preview` | preview links to hand to the user |
| `test-run` | run story render / `play()` / a11y tests (needs the Playwright Chromium, see [[storybook-conventions]]) |

Tool names as of `@storybook/addon-mcp` 10.6 (it is versioned with Storybook since 10.6; 0.7 used
`get-stories-by-component`, `get-changed-stories`, `preview-stories`, `run-story-tests`).

## Connecting

| Tool | Config | Committed? |
|---|---|---|
| Claude Code | `/.mcp.json` (`"type": "http"`) | yes — project-scoped, approve once when prompted |
| Cursor | `/.cursor/mcp.json` | yes |
| Codex | `~/.codex/config.toml` → `[mcp_servers.storybook]` `url = "http://localhost:6006/mcp"` | no — user-level |

If a tool reports the server as failed, Storybook is simply not running — start it first
(`pnpm storybook`), then reconnect. Re-check the tool names after Storybook upgrades.

Verification still follows [[no-screenshots-in-chat]].
