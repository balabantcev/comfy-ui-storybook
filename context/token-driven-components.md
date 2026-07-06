---
name: token-driven-components
description: "Standing rule — every element must be wired to the token system, never hardcode values"
tags: [feedback, rule, tokens]
---

# Token-driven components (standing rule)

The user requires that **everything in this project is always token-driven** — no exceptions, for all future work.

**Why:** colors/typography/spacing/radius must flow from one source so a Figma change updates every component automatically. Hardcoded hex/px in a component silently breaks that link (this was the original problem we fixed).

**How to apply** — whenever adding or editing any foundation or component:
1. Pull real values from Figma variables (source of truth), not by eye.
2. Add primitives to `colors.ts` / `scale.ts` / `typography.ts`; add or reuse a semantic alias in `semantic.ts` (`--text-*`, `--bg-*`, `--border-*`, `--icon-*`).
3. Run `pnpm gen:tokens` (auto-runs on `prestorybook`/`prebuild-storybook`).
4. In the component reference tokens ONLY: prefer the semantic layer (`var(--bg-brand-primary)`), use primitives for hover/active shades, `var(--radius-N)`, `var(--font-{style}-size)`, `color-mix(... var(--token) ...)` for alpha-of-a-color. Icons use `currentColor`.
5. Never write a raw hex/rgba/px color in component CSS. Verify the primitive→semantic→component chain renders live in Storybook (:6006).

See [[figma-design-system-source]] for the full architecture, and [[no-screenshots-in-chat]] for how to verify without posting images.
