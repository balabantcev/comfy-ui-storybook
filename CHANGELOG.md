# Changelog

## Unreleased — sync with Figma "❖ Comfy UI" 1.1.0

### ⚠️ Breaking changes

| Component | Before | After | Migration |
|---|---|---|---|
| **Badge** `color` | `warning` rendered **orange** | `warning` renders **yellow** (Figma "Warning") | Old orange badge → `color="orange"` |
| **Badge** `color` | `yellow` | removed | `color="yellow"` → `color="warning"` |
| **Chip** `type` | `primary` (outlined, brand border) | `secondary-brand` | rename |
| **Chip** `type` | `secondary` (brand-tinted fill) | `primary-brand` | rename |
| **Button** | `variant="primary" intent="gray"` | removed (not in Figma) | use `secondary` + `gray`, or `primary` + `brand` |
| **Button** | `subtle` with `intent="gray"` / `"destructive"` | removed (not in Figma) | `subtle` works with `primary` + `brand` only |

Unsupported Button combinations no longer break rendering: they fall back to the nearest
supported variant and log a warning in development (`isSupportedButton()` in `button.tokens.ts`).

**Tokens:** the primitive alpha scales were renamed to Figma's steps —
`--alpha-black-{10…90}` → `--dark-{50,200…900}`, `--alpha-white-{10…90}` → `--white-{50,200…900}`
(same values). Semantic `--text-error` → `--text-error-secondary`.

### Added
- **Dark theme.** All 241 semantic color tokens with Light + Dark values; set `data-theme="dark"`
  on `<html>` (or any subtree). Storybook toolbar → **Theme**. Every component now uses the
  semantic layer only, so it follows the theme.
- **Mobile typography** (Figma mode "Mobile"): Title-1/2 and H1–H3 shrink below 768px.
- Tokens: `success-*`, `warm-taupe-950`, alpha steps `0` and `100` (4 %), `opacity-0…100`,
  spacing `padding-28 … padding-160`, radius `radius-24 … radius-48`, focus rings
  `--focus-ring-success` / `--focus-ring-danger`, utility scales `--utility-*`, `--alpha-dark-*`.
- Chip: Figma's E50 shadow, hover border/text colors.
- **Pagination** `type`: `page` (default) | `minimal` | `card`; `breakpoint`: `auto` | `desktop` | `mobile`;
  `summary` formatter for the mobile "Сторінка X з Y". Prev/next are now `<Button>`s (Link gray /
  Secondary gray, 32px) exactly as in Figma.
- **Dropdown**: `DropdownHeader` (search / title), `DropdownEmptyState`, `DropdownFooter`
  (`vertical` | `horizontal`); `DropdownItem` `control="checkbox" | "dot"`.
- **Select** `type`: `default` | `icon` | `dot` | `tags` (removable chips + inline search, instant
  apply); options accept `icon`, `dot` (color) and `hint`; empty state (`emptyTitle`, `emptyDescription`).

### Changed (visual — now matches Figma)
- Hover / active surfaces, tertiary alpha borders and elevations use the 4 % layer they were
  designed with (they rendered at 2 %).
- Button: primary destructive at rest uses `bg-error-solid`; Primary subtle has a brand outline;
  Secondary gray darkens its border on hover; disabled uses `bg-disabled` / `border-disabled`
  with a lighter icon; the focus ring is brand-colored for every non-destructive type.
- Alert: default description is `text-primary`; colors bound to semantic tokens.
- Toggle disabled = normal colors at 40 % opacity; Checkbox/Chip/Counter/Input hover and
  disabled colors follow Figma bindings.
- Focus-ring gap uses `--border-gap` (the surface color) instead of white.
- Pagination mobile layout follows Figma: icon-only outlined arrows + "Сторінка X з Y" instead of
  page numbers; active page cell radius 10px.
- Dropdown panel fill is `bg-primary-alt` (a step lighter than the page in the dark theme).
- Select: the selected single-select row is highlighted with `bg-active` only (no check mark);
  multi-select uses the shared `DropdownFooter` and a Grey counter.
- Divider: Body / Caption labels are Regular weight, `text-tertiary`; a slotted icon is `icon-tertiary`.
