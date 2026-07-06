---
name: figma-design-system-source
description: "This Storybook mirrors the \"❖ Comfy UI\" Figma design system; how foundations/icons are synced"
tags: [project, figma, tokens]
---

# Figma design system source

This repo is a Storybook (Vue 3 + Vite + Storybook 10) that mirrors the **"❖ Comfy UI"** Figma design system.

- Figma fileKey: `60wkPriIjI9zjyAKOq3dja`
- Synced via the Figma MCP server (`get_variable_defs` for tokens, `get_design_context` for CSS, REST `/v1/images` for icon SVGs).
- Foundations live in `src/foundations/` as `*.ts` token files + `*.mdx` doc pages: colors, typography (Inter Variable, local font in `.storybook/public/fonts`), effects (elevations + blur).
- **Single source of truth (layered tokens):** `scripts/gen-tokens.mjs` generates `src/foundations/tokens.css` (`:root` CSS vars) from four sources, loaded globally via `.storybook/preview.ts`:
  - primitives ← `colors.ts` (`--brand-500`, `--alpha-black-60` …)
  - scale ← `scale.ts` (`--padding-4`, `--radius-10` …)
  - typography ← `typography.ts` (`--font-body-1-size`, `--font-weight-medium` …)
  - semantic ← `semantic.ts` (`--text-secondary: var(--alpha-black-60)`, `--bg-brand-primary: var(--brand-500)` …) — the layer components should consume.
  Components reference tokens only (never hardcoded values). Button uses semantic colors + `var(--radius-N)` + `var(--font-{style}-size)`; focus rings use `color-mix(… var(--brand-500) …)`; effects shadows use `var(--alpha-black-*)`; icons use `currentColor`. Regenerate with `pnpm gen:tokens` (auto-runs via `prestorybook`/`prebuild-storybook`). The chain primitive→semantic→component is live (verified).
- Icons: 292 SVGs in `src/icons/<category>/`, registry via `import.meta.glob` in `src/icons/index.ts`, Vue `<Icon>` in `src/components/Icon/`. 285 are `currentColor`-recolorable; 7 keep brand colors/gradients (the 4 `ai-*` star/text + 3 `*-color`).
- Source nodes: Colors `1023-36350`, Typography `18-1951`, Effects `1030-33573`, Icons `1025-31781`.

When asked to add more from Figma, follow the same pattern: token `.ts` + `.mdx` doc under `src/foundations/`, values pulled from variables (source of truth), verified live in Storybook on :6006.

The standing rule that everything must be token-driven is in [[token-driven-components]].
