---
name: a11y-contrast
description: "Figma palette pairs that fail WCAG AA contrast — a design decision; why color-contrast is not a CI gate"
tags: [project, a11y, design-tokens, open-question]
---

# Color contrast (WCAG AA) — open design question

Found by the first real a11y run (2026-11-18, axe 4.12 via `@storybook/addon-a11y`).
These are **Figma palette values**, rendered exactly as designed ([[token-driven-components]],
[[figma-token-mapping]]), so they can't be "fixed" in code without diverging from Figma.

| Pair (light theme) | Token(s) | Ratio | AA needs | Where |
|---|---|---|---|---|
| white on `#2ABD13` | `text-primary-onbrand` on `bg-brand-primary` (brand-500) | 2.50 | 4.5 (3.0 ≥ 18.66px bold / 24px) | Primary button, Chip, Counter |
| `#2ABD13` on white | `text-brand-primary` (brand-500) | 2.50 | 4.5 | Link button, brand text |
| `#A4A4A4` on white | `text-tertiary` / `text-disabled` (dark-400) | 2.49 | 4.5 | captions, hints, placeholders, labels |
| `#9E9E9E` on `#F5F5F5` | `text-disabled` on `bg-disabled-subtle` | 2.45 | exempt if truly disabled | disabled fields |
| white on `#F04438` | white text on `bg-error-solid` (error-500) | 3.75 | 4.5 | destructive button, red counter |
| `#F04438` on white / `#FEF2F1` | `text-error-secondary` (error-500) | 3.75 / 3.43 | 4.5 | error helper text, Alert |
| `#24A210` on `#EFFDEC` | brand-600 on brand-50 | 3.18 | 4.5 | success Alert / Badge |
| `#9E7100` on `#FFFCF0` | `text-warning-primary` (warning-800) on warning-50 | 4.24 | 4.5 | warning Alert / Badge (close) |

## Policy in this repo

- `.storybook/preview.ts`: in CI (`a11y.test = 'error'`) the `color-contrast` rule is
  **disabled**, every other axe rule gates the build. Locally and in the Storybook a11y
  panel contrast is still **reported**, so it stays visible.
- When the designers adjust the palette (e.g. a darker `text-tertiary`, a brand-700 for
  text on white, darker solid fills behind white text), update the primitives from Figma,
  then re-enable the rule by deleting the `config` line in `preview.ts`.

Related: [[storybook-conventions]] (a11y section), [[figma-design-system-source]].
