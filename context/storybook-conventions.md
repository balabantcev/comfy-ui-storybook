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
(needs `pnpm exec playwright install chromium` once — installed on this machine 2026-11-18).

## Figma link per component

Each `*.stories.ts` meta has `parameters: { figma: '<node-id>' }` — the component set's node in the
Comfy UI file. `.storybook/manager.ts` turns it into the **Figma ↗** toolbar button;
`pnpm check:figma-links` (CI) fails if a component lacks it. New component → add the node id.

## a11y

`@storybook/addon-a11y` runs on every story. Story tests run **inside Chromium**, where
`process.env` doesn't exist, so `vite.config.ts` injects the mode at build time
(`define` → `import.meta.env.STORYBOOK_A11Y_TEST`): `'error'` under `CI` (fails the run),
`'todo'` locally (reports only). The `color-contrast` rule is off in the CI gate — the
failing pairs come from the Figma palette, see [[a11y-contrast]].

Component patterns that keep axe green:
- a visible `<label>` is tied to its control with `useId()` (`for` / `aria-labelledby`);
  the required `*` is `aria-hidden`, the control gets `aria-required`;
- `DropdownMenu` puts only items inside its ARIA container (`role` = `menu` | `listbox` |
  `group`); search header, footer buttons and the empty state go in the `#header`,
  `#footer` and `#empty` slots;
- dialogs are named by their title (`aria-labelledby`) and described by their text;
- several landmarks of one kind on a page get distinct names (`Pagination` `label`).

Check locally exactly like CI: `CI=1 pnpm test`.

## CI

`.github/workflows/ci.yml`: `gen:tokens` → `typecheck` → `pnpm test` (interaction +
a11y in Chromium) → `build-storybook`, plus a Chromatic visual-regression job
(runs only when `CHROMATIC_PROJECT_TOKEN` secret is set).

## storySort

`preview.ts` orders the sidebar `['Вітання', 'Foundations', 'Components']`; the intro
page (`src/Welcome.mdx`) must keep `title="Вітання"` to sort first.
