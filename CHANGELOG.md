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
| **Icon** `name` | `link`, `link-off` | `link-1`, `unlink-1` (renamed in Figma, same artwork) | rename |
| **Icon** `name` | `locate` | removed (no longer in Figma) | use `navigation` or `marker-pin` |

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
- **Input** `kind`: `default` | `phone` | `price`.
  - `phone`: country picker (flag + dial code; `countries`, `v-model:country`) and a digit mask
    (`mask`, default `(##) ### ## ##`, placeholder `(--) --- -- --`); the model holds digits only.
  - `price`: grouped amount with up to 2 decimals (`44 444 444,44`, model `44444444.44`) and a
    currency picker (`currencies`, `v-model:currency`).
  - The caret keeps its place while the value is reformatted.
- **VerificationCode** (new): N one-digit cells, auto-advance, Backspace/arrow navigation,
  paste and SMS one-time-code autofill, `complete` event; sizes 56 / 48 / 44; error / disabled.
- **Textarea** (new): in-box label (placeholder-size while empty, caption once filled),
  "n / max" counter (`maxlength`), vertical resize, error / disabled.
- **Flag** (new): round UA / EN country flags from Figma Misc icons.
- **Icons**: 35 new (326 total) — `sun`, `moon`, `video`, `video-plus`, `video-minus`, `power`,
  `pause-circle`, `headset`, `tool`, `navigation`, `map-location`, `post-locker`, `store-pulse`,
  `store-pickup`, `store-pickup-color`, `store-1-color`, `receipt-text-color`, `barcode`,
  `climate-equipment`, `hourglass`, `sticky-notes`, `user-check`, `user-star-off`, `list-todo`,
  `list-chevrons-all-open`, `list-chevrons-all-close`, `ban`, `box-x`, `eye-closed`, `life-buoy`,
  `link-2`, `unlink-2`, `border-none`, `component`, `rate-app`; new `media/` category.
- **AlertDialog** (Figma "Modal view"): `align` adds `horizontal` (icon beside the text, actions
  right-aligned, 520px wide); `overlay` (Figma Background — `false` renders the panel inline);
  `breakpoint` `auto` | `desktop` | `mobile` (mobile: bottom-docked, full width, stacked actions
  with the primary on top); footer checkbox `checkboxLabel` + `v-model:checked`; `body` slot for
  custom content between the header and the actions.
- **FeaturedIcon** (new, Figma Misc icons / Featured icon): `type` `light` | `gradient` | `outline` |
  `modern`, `color` `gray` | `success` | `warning` | `error` | `purple` | `blue`, `size` 32 / 40 / 48 / 56,
  any registry `icon`. New token `--shadow-skeuomorphic` (the Modern inner disc's layer shadows).

### Accessibility
- The CI a11y gate never ran: `preview.ts` read `process.env.CI`, which doesn't exist in the
  browser where story tests run. It is now injected at build time (`vite.config.ts`), and the
  first real run found 51 failing stories. Fixed in code:
  - **Input / Select / Textarea**: the label is tied to its control (`useId`); the required `*`
    is hidden from screen readers and the control is `aria-required`.
  - **AlertDialog**: named by its title, described by its text.
  - **DropdownMenu**: new `#header`, `#footer` and `#empty` slots render *outside* the ARIA list
    (`role` prop: `menu` | `listbox` | `group`, plus `label`). Put `DropdownHeader`,
    `DropdownFooter` and `DropdownEmptyState` in those slots — inside the default slot they make
    an invalid menu. Select and FilterSelect already do.
  - **Pagination** `label` (default "Пагінація") to tell several navigations apart.
  - **Divider** with content is a plain container (a `separator` can't hold text or buttons).
- `color-contrast` is reported but doesn't gate CI: the failing pairs are Figma palette colors
  (white on brand-500 2.5:1, `text-tertiary` 2.49:1, error-500 3.75:1) — listed for the designers
  in `context/a11y-contrast.md`.

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
- Input / Select focus: a solid 2px ring (Figma focus-ring-success / -danger) instead of the soft
  24 % glow.
- AlertDialog: the featured icon is a `<FeaturedIcon>` (Light, 48px) — Gray (alpha-dark-100 / utility-gray-600) unless destructive;
  the description is text-primary; the × button gets the standard focus ring.
