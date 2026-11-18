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

| Figma primitive | Repo token |
|---|---|
| `Colors/Dark/N` | `alpha-black-*` |
| `Colors/White/N` | `alpha-white-*` |
| `Colors/Yellow/*` | `warning-*` |
| `Colors/Red/*` | `error-*` |
| `Colors/Purple/*` | `violet-*` |
| `Colors/Magenta/*` | `pink-*` |
| `Colors/Success/*` | identical hex to `brand-*` |

## Known trap: the 4 % alpha step

Repo `alpha-black-10` = `#0a0a0a05` (2 %) = Figma `Dark/50`. Figma `Dark/100` = `#0a0a0a0a`
(4 %) has **no repo token** — the colliding code syntax hid it. Figma uses `Dark/100` for
`bg-hover`, `bg-active`, `border-alpha-tertiary` and the 1–3 px layer of elevations
E50/E200/E300/E400/E500, so any token mapped through `alpha-black-10` renders at half the
intended opacity. Same for `White/100` (`#ffffff0f`).

## Collections and modes in Figma

- **Primitives** (1 mode) — color scales + `Opacity/opacity-0…100` (values are percents).
- **Colors** (semantic, **Light + Dark** modes) — 241 tokens; repo emits Light only.
- **Typography** (**Desktop + Mobile** modes) — repo emits Desktop only; Mobile shrinks
  Title-1/2 and H1–H3.
- **Spacing**, **Radius**, **Text** (copy strings: hints, currency, placeholders).

Effect styles (elevations, blur, focus rings) are styles, not variables — read them with
`getLocalEffectStylesAsync`.

See [[figma-design-system-source]] for the sync workflow and [[token-driven-components]] for
the consuming rule.
