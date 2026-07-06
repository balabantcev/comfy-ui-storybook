---
name: storybook-conventions
description: "Story-writing conventions: token-driven chrome, shared helpers, interaction tests, CI"
tags: [project, storybook, testing]
---

# Storybook conventions

Stories obey the same token rule as components ([[token-driven-components]]) — **story
scaffolding must not hardcode hex/rgba either.**

## Shared helpers — `src/storybook/`

Reuse these instead of re-writing inline-styled tables/labels in each story:

- `Matrix` — rows × cols showcase table. `<Matrix :rows :cols v-slot="{ row, col }">`.
- `Specimen` — a sample with an optional caption. `<Specimen :caption="s + 'px'">`.
- CSS classes from `story.css` (loaded globally in `.storybook/preview.ts`):
  `sb-row`, `sb-stack`, `sb-caption`, `sb-matrix`, `sb-surface--invers`, `sb-surface--brand`.
  All use `var(--text-secondary)`, `var(--padding-N)`, `var(--radius-N)`, etc.

## Interaction tests

Interactive components get a `play()` in their story using `storybook/test`
(`fn`, `expect`, `userEvent`, `within`) — see Button, Chip, ButtonGroup. They run
in the browser via `@storybook/addon-vitest` (config in `vite.config.ts`, project
annotations in `.storybook/vitest.setup.ts`). Run locally with `pnpm test`
(needs `pnpm exec playwright install chromium` once).

## a11y

`@storybook/addon-a11y` runs on every story. `preview.ts` sets `a11y.test` to
`'error'` under CI (fails the run) and `'todo'` locally (reports only).

## CI

`.github/workflows/ci.yml`: `gen:tokens` → `typecheck` → `pnpm test` (interaction +
a11y in Chromium) → `build-storybook`, plus a Chromatic visual-regression job
(runs only when `CHROMATIC_PROJECT_TOKEN` secret is set).

## storySort

`preview.ts` orders the sidebar `['Вітання', 'Foundations', 'Components']`; the intro
page (`src/Welcome.mdx`) must keep `title="Вітання"` to sort first.
