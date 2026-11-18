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
- **Alert** `iconStyle`: `default` (20px glyph) | `featured` (32px Outline `FeaturedIcon` in the
  alert's color) — Figma "Variant icon"; `role` `alert` | `status`.
- **Badge** `country` (Figma Type=Country): a 16px `Flag` before the text, e.g. `country="UA"`.
- **BadgePrice** (new, Figma Badge price): discount label `value` + `unit` `%` | `₴`, sizes 16 / 20 / 24,
  Ukrainian digit grouping (`-4 444₴`), `text-price` on `utility-error-50`.
- **Tabs** (new, Figma Tabs): `variant="segmented"` — the "Horizontal tabs" container (`color`
  `brand` | `white`, `border`, `pill`) with "-Tab button base" tabs (`size` 36 | 40, per-item `icon`,
  `count`, `disabled`); `variant="underline"` — "-Tab button underline" with an optional
  `trailingIcon`. WAI-ARIA tabs: `role="tablist"`/`tab`, roving focus, ←/→ (wrapping, skipping
  disabled), Home/End; `panelId` per item → `aria-controls`. Panels are rendered by the app.
- **ButtonSplit** (new, Figma Button Split): main action + chevron menu (`#menu` slot with `close`),
  2px apart; `type` primary | primary-subtle | secondary-brand | secondary-gray | tertiary-brand |
  tertiary-gray, `size` 32 / 40 / 44 / 48 / 56, `pill`, `iconLeft`, `disabled`, `loading`. Each half
  hovers and focuses on its own; colors and states reuse Button's classes. Chevron: `aria-haspopup`,
  `aria-expanded`, `menuLabel`.
- **Drawer** (new, Figma Drawer + -Drawer header / -Drawer footer): right-side panel, 700px (`width`),
  radius 16 on the left, E400; Mobile = full screen with shared-width buttons (`breakpoint` auto at
  768px). Header: optional Featured icon (`icon`), `title` (Label-2 / Label-3 Bold), `description`,
  round × and a `#header` slot; scrolling body; footer with a `#footer` slot + Secondary gray / Primary
  (`cancelLabel` / `confirmLabel`, `hideActions`). `role="dialog"` named by the title, Escape /
  backdrop / × close, scroll lock, focus moves in and back to the trigger.
- **ProgressSteps** (new, Figma Progress steps): `type` icon | number | featured | line, `size` s | m,
  `layout` horizontal (Desktop, "… top") | vertical (Mobile / "Only vertical", "… left") | auto (768px),
  `variant` default | minimal | connected ("Minimal icons"); statuses from `current` (or per step).
  Semantic `<ol>` with `aria-current="step"` and a screen-reader status per step. `StepIcon` is the
  Figma "-Step icon base" (check / number × incomplete / current / complete × 24 / 32).
- **ScrollShadow** (new, Figma ScrollShadow): wraps a scroll area and fades its edges into the surface
  (`bg` primary | primary-alt | secondary | disabled-subtle — Figma "Variant BG"; transparent → solid
  at 80 %), only on a side with more to scroll; `orientation` vertical | horizontal, `size` (80px).
  The viewport is keyboard-focusable; `label` makes it a named region.
- **Toast** (new, Figma Alert & Toast / Toast): the Alert with elevation E300 — one row on Desktop,
  stacked on Mobile (`breakpoint` `auto` | `desktop` | `mobile`); `role="status"`, `alert` for errors.
  Placement, stacking and auto-dismiss stay with the app.
- **RatingStar** (new, Figma Misc icons / Rating star): `fill` 0–100 (Figma steps of 10, any value
  works), `color` `orange` | `yellow`, `size`; `starFill(value, index)` helper for a 5-star rating.
- **SocialBrand** (new, Figma Misc icons / Social brand): 11 marks — Apple, Google, Instagram,
  Nova post, Ukr post, Meest, iPost, Messenger, Telegram, Viber, Facebook. Apple follows the theme;
  Instagram's gradient is rebuilt as an SVG gradient (Figma fills it with a 10 MB bitmap).
- **PaymentMethod** (new, Figma Misc icons / Payment method icon): Visa, Mastercard, Apple Pay,
  Google Pay, LiqPay, 24 Pay, Післяплата on a white card, `size` 24 (34×24) | 32 (46×32).

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

### Tooling
- **Storybook 10.5.2 → 10.6.7** (all `@storybook/*`); `@storybook/addon-mcp` 0.7 → 10.6.7 — its MCP tools
  were renamed (`stories-find-by-component`, `stories-changed`, `stories-preview`, `test-run`).
- `pnpm check:tokens` — compares `colors.ts` / `semantic.ts` / `scale.ts` / `typography.ts` with a
  committed snapshot of every Figma variable (`scripts/figma/variables.snapshot.json`, resolved per
  mode, Light/Dark and Desktop/Mobile): reports values that differ, Figma variables missing in the
  repo and repo tokens Figma doesn't have. Current state: ✓ all 502 values match.
- CI: `check:tokens` runs first; after `gen:tokens` it fails if the committed `tokens.css` is stale.
- `scripts/figma/export-variables.figma.js` refreshes the snapshot (Figma MCP or plugin console).
- **Figma ↗** button in the Storybook toolbar: every component's story meta names its Figma node
  (`parameters.figma`), the button opens it in the Comfy UI file. `pnpm check:figma-links` (CI)
  fails when a component has no node.
- Welcome page: no more nested `<p>` (React hydration warning).
- README rewritten for 1.1.0 (components, commands, theme / Figma / MCP tips, token sync, CI);
  the Welcome page counts components and color tokens from the sources instead of fixed numbers.

### Changed (visual — now matches Figma)
- Hover / active surfaces, tertiary alpha borders and elevations use the 4 % layer they were
  designed with (they rendered at 2 %).
- Button: primary destructive at rest uses `bg-error-solid`; Primary subtle has a brand outline;
  Secondary gray darkens its border on hover; disabled uses `bg-disabled` / `border-disabled`
  with a lighter icon; the focus ring is brand-colored for every non-destructive type.
- **Badge** sizes follow Figma 1.1.0: 24px uses Body-2 text (was Caption-1); icons are 16px and the
  dot 8px at every size; spacing per type — Default 4/4/6px sides + gap 2 with a 2px text frame,
  Dot 6/8/10 + gap 4/6/6, Country 3/4/6 left · 6/6/8 right; the 1px border sits inside the padding.
  Text-only 22px badges keep their width; badges with icons get 2px tighter per side.
- **Alert** (Figma Alert & Toast): title is Body-2 **Bold** `text-primary` and the description
  `text-secondary` in every color (they used to be tinted per color); radius 16 (was 10); the actions
  are real `<Button variant="link">` — Link gray + Link brand / destructive (Warning: Link gray in
  `text-warning-primary`); × gets `bg-hover` and the standard focus ring; the 1px border now sits
  inside the padding like Figma's stroke (96px tall, not 98). The `.alert__action--*` classes are gone.
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
