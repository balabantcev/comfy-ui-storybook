# Comfy UI — Storybook design system

This repo mirrors the **"❖ Comfy UI"** Figma design system (fileKey `60wkPriIjI9zjyAKOq3dja`)
as a Vue 3 + Vite + Storybook 10 component library.

## Core rule: everything is token-driven (no exceptions)

Every color, spacing, radius and typographic value in any foundation or component
**must** come from the design-token system. Never hardcode a hex / rgba / px color
in component CSS — that breaks the link to the design source.

### Token architecture

A single generator builds one stylesheet of CSS custom properties, loaded globally
in `.storybook/preview.ts`:

```
colors.ts      (primitives:  --brand-500, --gray-100, --alpha-black-60 …)
scale.ts       (spacing/radius: --padding-4, --radius-10 …)            ┐
typography.ts  (type scale: --font-body-1-size, --font-weight-medium …) ├─▶ scripts/gen-tokens.mjs ─▶ src/foundations/tokens.css
semantic.ts    (aliases: --text-secondary: var(--alpha-black-60) …)    ┘
```

- **Primitives** — raw palette/scale values (from Figma variables).
- **Semantic** — intent aliases that reference primitives (`--bg-brand-primary`,
  `--text-secondary`, `--border-brand`, `--icon-secondary`). **Components consume this layer.**

Regenerate with `pnpm gen:tokens`. It also runs automatically via `prestorybook`
and `prebuild-storybook`, so tokens are always fresh.

### When adding or changing a foundation / component

1. Pull real values from **Figma variables** (the source of truth) — don't eyeball them.
   Use the Figma MCP: `get_variable_defs` for tokens, `get_design_context` for CSS,
   REST `/v1/images` for icon SVGs.
2. Add primitives to `colors.ts` / `scale.ts` / `typography.ts`; add or reuse a
   semantic alias in `semantic.ts`.
3. `pnpm gen:tokens`.
4. In the component, reference tokens **only**:
   - prefer the semantic layer: `var(--bg-brand-primary)`, `var(--text-secondary)`
   - primitives for hover/active shades: `var(--brand-600)`
   - `var(--radius-N)`, `var(--font-{style}-size)`, `var(--font-weight-medium)`
   - alpha of a color: `color-mix(in srgb, var(--brand-500) 24%, transparent)`
   - icons inherit color via `currentColor`
5. Verify the primitive → semantic → component chain renders live in Storybook (`:6006`).

## Layout

- `src/foundations/` — token sources (`.ts`) + doc pages (`.mdx`): colors, typography, effects
- `src/icons/` — 292 SVGs by category + `index.ts` registry (`import.meta.glob`)
- `src/components/` — Vue components (`Component.vue` + `component.css` + `Component.stories.ts` + `component.tokens.ts`)
- `.storybook/public/fonts/` — Inter Variable (local `@font-face`)
