---
name: figma-token-mapping
description: "How Figma variables map to repo tokens — match by VALUE, not by Figma code syntax; known pitfalls (alpha steps, modes)"
tags: [project, figma, tokens, sync]
---

# Figma → repo token mapping (sync pitfalls)

Learned during the 2026-11 audit of Comfy UI 1.1.0 against this repo (last synced 2026-07-06).

## Match by resolved value, never by Figma code syntax

Figma variables carry a WEB **code syntax**, but it is unreliable and must not be used as the
mapping key:

- `Colors/Warm Taupe/*` has code syntax `pink-*` — collides with `Colors/Magenta/*`.
- `Colors/Dark/0`, `/50`, `/100` all have `alpha-black-10`; `/950` duplicates `alpha-black-90`
  (same for `Colors/White/*` → `alpha-white-*`).
- `Colors/Blue/*` → `blue-dark-*` (repo uses `blue-*`).
- The semantic **Colors** collection has almost no code syntax (2 of 241), one with a typo
  (`-bg-brand-primary`).

Resolve each variable's value (follow aliases to the primitive hex) and match on that.

## Name mapping that is intentional (keep)

Encoded in `scripts/check-tokens.mjs` (`GROUPS`, `RENAMES`) — change it there if Figma renames.

| Figma primitive | Repo token |
|---|---|
| `Colors/Dark/N`, `Colors/White/N` | `dark-N`, `white-N` (alpha scales, Figma's steps) |
| `Colors/Yellow/*` | `warning-*` |
| `Colors/Red/*` | `error-*` |
| `Colors/Purple/*` | `violet-*` |
| `Colors/Magenta/*` | `pink-*` |
| `Colors/Warm Taupe/*` | `warm-taupe-*` |
| `Colors/Base/white`, `/dark` | `base-white`, `base-dark` |
| `Colors/Copmonents/Krashch/krashch-color` (sic) | `krashch` |
| `Colors/Success/*` | its own scale (same hex as `brand-*` today) |

Semantic tokens use Figma's last path segment 1:1 (typos included: `bg-disabled-alfa`,
`icon-invers-alfa`, `utility-warm_taupe-*`), except `Component colors/Utility/Orange/utility-warning-950`
— a duplicate name inside the Orange group — which is `utility-orange-950` here.

## Known trap: the 4 % alpha step

Repo `alpha-black-10` = `#0a0a0a05` (2 %) = Figma `Dark/50`. Figma `Dark/100` = `#0a0a0a0a`
(4 %) has **no repo token** — the colliding code syntax hid it. Figma uses `Dark/100` for
`bg-hover`, `bg-active`, `border-alpha-tertiary` and the 1–3 px layer of elevations
E50/E200/E300/E400/E500, so any token mapped through `alpha-black-10` renders at half the
intended opacity. Same for `White/100` (`#ffffff0f`).

## Collections and modes in Figma

- **Primitives** (1 mode) — color scales + `Opacity/opacity-0…100` (values are percents).
- **Colors** (semantic, **Light + Dark**) — 241 tokens; the repo emits both modes.
- **Typography** (**Desktop + Mobile**) — Mobile shrinks Title-1/2 and H1–H3 (repo `mobile:` overrides).
- **Spacing**, **Radius**; **Text** (copy strings: hints, currency, placeholders — not checked).

Effect styles (elevations, blur, focus rings) are styles, not variables — read them with
`getLocalEffectStylesAsync`; they are not part of the snapshot check.

## Checking the repo against Figma — `pnpm check:tokens`

The Figma REST variables API needs an Enterprise plan, so CI compares against a committed
**snapshot** instead: `scripts/figma/variables.snapshot.json` (every variable, resolved to a value
per mode). `scripts/check-tokens.mjs` fails on any value that differs, any Figma variable missing
in the repo and any repo token Figma doesn't have. CI runs it first, then regenerates
`tokens.css` and fails if the committed file is stale.

**When Figma changes** (any AI tool with the Figma MCP, or Figma's plugin console):

1. Run `scripts/figma/export-variables.figma.js` (read-only) — via MCP `use_figma`, file
   `60wkPriIjI9zjyAKOq3dja` — and save the returned JSON over the snapshot.
2. `pnpm check:tokens` lists exactly what changed. Update `colors.ts` / `semantic.ts` /
   `scale.ts` / `typography.ts`, then `pnpm gen:tokens`.
3. Commit the snapshot together with the token changes.

`--snapshot <file>` checks another export; `--json` prints a machine-readable report.

See [[figma-design-system-source]] for the sync workflow and [[token-driven-components]] for
the consuming rule.
