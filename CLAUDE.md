# Comfy UI — Storybook design system

This repo mirrors the **"❖ Comfy UI"** Figma design system (fileKey `60wkPriIjI9zjyAKOq3dja`)
as a Vue 3 + Vite + Storybook 10 component library.

## Shared context vault

Durable project knowledge, rules and preferences live in [`/context`](./context/README.md) —
a plain-markdown vault that is **shared across every AI tool** (Claude Code here,
Codex via `AGENTS.md`, Cursor via `.cursor/rules/`) and opens as an **Obsidian
vault** (graph of `[[wiki-links]]`). Read `context/README.md` before non-trivial work.
When you learn a new durable fact/rule/preference, add a note to `/context` (frontmatter
+ `[[links]]`) and index it in `context/README.md` — don't keep it only in one tool's
private memory, or the other tools lose it.

## Core rule: everything is token-driven (no exceptions)

Every color, spacing, radius and typographic value in any foundation or component
**must** come from the design-token system. Never hardcode a hex / rgba / px color
in component CSS — that breaks the link to the design source.

### Token architecture

A single generator builds one stylesheet of CSS custom properties, loaded globally
in `.storybook/preview.ts`:

```
colors.ts      (primitives:  --brand-500, --gray-100, --dark-600 …)    fixed
scale.ts       (spacing/radius: --padding-4, --radius-10 …)            ┐
typography.ts  (type scale: --font-body-1-size, --font-weight-medium …) ├─▶ scripts/gen-tokens.mjs ─▶ src/foundations/tokens.css
semantic.ts    (aliases, Light + Dark: --text-secondary: var(--dark-600) …)  ┘
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
   - colors come from the **semantic** layer only: `var(--bg-brand-primary)`, `var(--bg-brand-primary-hover)`, `var(--text-secondary)` — it has Light + Dark values; primitives never change with the theme
   - use the semantic token Figma binds for that layer (`get_variable_defs` on the node), incl. `--utility-*` and `--alpha-*`
   - `var(--radius-N)`, `var(--font-{style}-size)`, `var(--font-weight-medium)`
   - alpha of a color: `color-mix(in srgb, var(--brand-500) 24%, transparent)`
   - icons inherit color via `currentColor`
5. Verify the primitive → semantic → component chain renders live in Storybook (`:6006`) in both themes (toolbar → Theme).

## Layout

- `src/foundations/` — token sources (`.ts`) + doc pages (`.mdx`): colors, typography, effects
- `src/icons/` — 326 SVGs by category + `index.ts` registry (`import.meta.glob`)
- `src/components/` — Vue components (`Component.vue` + `component.css` + `Component.stories.ts` + `component.tokens.ts`)
- `.storybook/public/fonts/` — Inter Variable (local `@font-face`)
