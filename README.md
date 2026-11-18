# ❖ Comfy UI — Storybook Design System

**Версія:** 1.1.0 (синхронізовано з Figma «❖ Comfy UI» 1.1.0) · зміни — у [CHANGELOG](./CHANGELOG.md)

Жива бібліотека дизайн-системи компанії **COMFY** на **Storybook 10 + Vue 3 + Vite**.
Єдине джерело правди для дизайнерів і розробників: усі компоненти синхронізовані
з Figma (`❖ Comfy UI`) і побудовані на дизайн-токенах — змінюється токен,
оновлюється вся система. Приємного використання! 🐶

Компоненти розробляються та переглядаються в ізоляції (без підняття всього Nuxt-застосунку)
і написані на Vue 3 (`<script setup>`, Composition API), готові до перенесення у Nuxt 3.

## Команди

```bash
pnpm install            # встановити залежності
pnpm storybook          # запустити Storybook → http://localhost:6006
pnpm build-storybook    # статична збірка у storybook-static/
pnpm gen:tokens         # перегенерувати tokens.css із джерел токенів
pnpm typecheck          # перевірка типів (vue-tsc)
pnpm test               # кожна сторі в Chromium: рендер, play()-тести, a11y (axe)
pnpm check:tokens       # токени == знімок змінних Figma (значення в усіх режимах)
pnpm check:figma-links  # кожен компонент має посилання на свій вузол у Figma
```

- `gen:tokens` запускається автоматично перед `storybook` та `build-storybook`.
- Для `pnpm test` один раз потрібен браузер: `pnpm exec playwright install chromium`.
  `CI=1 pnpm test` перевіряє так само суворо, як CI (a11y-порушення валять тест).

## Що всередині

**34 компоненти · 326 іконок · 137 кольорів + 241 семантичний токен (Light / Dark) · 137 сторі**

### Foundations
- **Colors** — примітиви (brand / gray / success / error / orange / warning / blue / violet / pink /
  warm-taupe / dark- та white-alpha) і семантичний шар зі **світлою та темною темою**
- **Typography** — Inter Variable, шкала Title → Caption, **мобільні розміри** нижче 768px
- **Effects** — elevations, blur, focus rings
- **Logo** — вордмарк (green / white / mono) і марка (modern / default)

### Components
- **Дії:** Button · Button Group · Button Split · Chip · Pagination · Tabs
- **Форми:** Input (default / phone / price) · Textarea · Verification Code · Select · Filter Select ·
  Checkbox · Radio · Toggle · Slider
- **Оверлеї та сповіщення:** Alert · Toast · Alert Dialog · Drawer · Dropdown · Tooltip
- **Відображення:** Badge (+ Country) · Badge Price · Counter · Divider · Progress Steps ·
  Featured Icon · Rating Star · Scroll Shadow
- **Медіа та бренди:** Icon · Logo · Flag · Social Brand · Payment Method

## Як користуватися Storybook

- **Theme** у тулбарі — світла / темна тема (`data-theme` на `<html>`).
- **Figma ↗** у тулбарі — відкриває вузол цього компонента у файлі Figma.
- Вкладка **Testing** — запуск тестів сторі (рендер, взаємодія, a11y) просто з UI.
- **AI-агенти** (Claude Code, Cursor) підключаються до MCP-сервера Storybook
  `http://localhost:6006/mcp` — див. [context/storybook-mcp.md](./context/storybook-mcp.md).

## Архітектура токенів

Один генератор збирає один stylesheet CSS-змінних, підключений глобально
в `.storybook/preview.ts`:

```
colors.ts      (primitives:  --brand-500, --gray-100, --dark-600 …)           fixed
scale.ts       (spacing / radius / opacity: --padding-4, --radius-10 …)       ┐
typography.ts  (type scale + Mobile: --font-body-1-size, --font-weight-…)     │
effects.ts     (elevations, focus rings, --shadow-skeuomorphic)               ├─▶ gen-tokens.mjs ─▶ tokens.css
semantic.ts    ([Light, Dark]: --text-secondary → --dark-600 / --white-600)   ┘
```

- **Primitives** — сирі значення палітри/шкали зі змінних Figma; не змінюються з темою.
- **Semantic** — інтент-аліаси з двома значеннями (Light / Dark), назви 1:1 з Figma
  (`--bg-brand-primary`, `--text-secondary`, `--utility-error-600`). **Компоненти споживають лише цей шар.**

**Core-правило:** жодного захардкодженого hex / rgba / px кольору в компонентах — тільки токени.

### Синхронізація з Figma

`scripts/figma/variables.snapshot.json` — знімок усіх змінних Figma (значення в кожному режимі).
`pnpm check:tokens` порівнює з ним наші джерела токенів і в CI падає на будь-якій розбіжності.
Коли Figma змінилась — оновити знімок (`scripts/figma/export-variables.figma.js` через Figma MCP),
виправити те, що покаже `check:tokens`, і `pnpm gen:tokens`. Деталі —
[context/figma-token-mapping.md](./context/figma-token-mapping.md).

## Структура

```
src/
  foundations/   джерела токенів (.ts) + tokens.css (згенерований) + doc-сторінки (.mdx)
  icons/         326 SVG за категоріями + index.ts (реєстр)
  components/    Vue-компоненти: Component.vue + component.css + component.tokens.ts + *.stories.ts
  storybook/     спільні хелпери для сторі (Matrix, Specimen, story.css)
  Welcome.mdx    стартова сторінка
scripts/
  gen-tokens.mjs           генератор tokens.css
  check-tokens.mjs         токени ↔ знімок Figma
  check-figma-links.mjs    parameters.figma у кожному компоненті
  figma/                   знімок змінних Figma + скрипт експорту
context/         спільна база знань для AI-інструментів (і Obsidian-сховище)
.storybook/      конфіг (main / preview / manager) + public/ (шрифт, лого, favicon)
```

Кожен компонент живе у власній теці — це повторює структуру `components/` у Nuxt 3,
тож готовий компонент переноситься в застосунок практично без змін.

## CI

`.github/workflows/ci.yml`: `check:tokens` → `check:figma-links` → `gen:tokens` (і перевірка, що
`tokens.css` закомічений актуальним) → `typecheck` → `test` (Chromium, a11y gate) → `build-storybook`;
плюс Chromatic (якщо задано `CHROMATIC_PROJECT_TOKEN`).

## Стек

Vue 3.5 · Vite 8 · Storybook 10.6 (`@storybook/vue3-vite`) · Vitest 4 + Playwright · TypeScript ·
Inter Variable (локальний шрифт)
