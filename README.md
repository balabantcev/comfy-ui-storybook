# ❖ Comfy UI — Storybook Design System

**Версія:** 1.0.0

Жива бібліотека дизайн-системи компанії **COMFY** на **Storybook 10 + Vue 3 + Vite**.
Єдине джерело правди для дизайнерів і розробників: усі компоненти синхронізовані
з Figma (`❖ Comfy UI`) і побудовані на дизайн-токенах — змінюється токен,
оновлюється вся система. Приємного використання! 🐶

Компоненти розробляються та переглядаються в ізоляції (без підняття всього Nuxt-застосунку)
і написані на Vue 3 (`<script setup>`, Composition API), готові до перенесення у Nuxt 3.

## Команди

```bash
pnpm install          # встановити залежності
pnpm storybook        # запустити Storybook → http://localhost:6006
pnpm build-storybook  # статична збірка у storybook-static/
pnpm gen:tokens       # перегенерувати tokens.css із джерел токенів
pnpm typecheck        # перевірка типів (vue-tsc)
```

> `gen:tokens` запускається автоматично перед `storybook` та `build-storybook`,
> тож токени завжди свіжі.

## Що всередині

**20 компонентів · 292 іконки · 160+ дизайн-токенів · 106 сторіс**

### Foundations
- **Colors** — палітра (brand / gray / error / orange / warning / blue / violet / pink / warm-taupe / alpha), 118 кольорів
- **Typography** — Inter Variable, шкала Title → Caption
- **Effects** — elevations (тіні) та blur
- **Logo** — вордмарк (green / white / mono) і марка (modern / default)

### Components
Alert · Alert Dialog · Badge · Button · Button Group · Checkbox · Chip · Counter ·
Divider · Dropdown · Filter Select · Icon · Input · Logo · Pagination · Radio ·
Select · Slider · Toggle · Tooltip

## Архітектура токенів

Один генератор збирає один stylesheet CSS-змінних, підключений глобально
в `.storybook/preview.ts`:

```
colors.ts      (primitives:  --brand-500, --gray-100, --alpha-black-60 …)
scale.ts       (spacing/radius: --padding-4, --radius-10 …)             ┐
typography.ts  (type scale: --font-body-1-size, --font-weight-medium …) ├─▶ gen-tokens.mjs ─▶ tokens.css
semantic.ts    (aliases: --text-secondary: var(--alpha-black-60) …)     ┘
```

- **Primitives** — сирі значення палітри/шкали (зі змінних Figma)
- **Semantic** — інтент-аліаси (`--bg-brand-primary`, `--text-secondary`, `--border-brand`),
  які й споживають компоненти

**Core-правило:** жодного захардкодженого hex / px кольору в компонентах — тільки токени.

## Структура

```
src/
  foundations/   джерела токенів (.ts) + doc-сторінки (.mdx) + logo/
  icons/         292 SVG за категоріями + index.ts (реєстр)
  components/    Vue-компоненти (Component.vue + component.css + *.stories.ts)
  Welcome.mdx    стартова сторінка
scripts/
  gen-tokens.mjs генератор tokens.css
.storybook/      конфіг (main / preview / manager) + public/ (шрифт, лого, favicon)
```

Кожен компонент живе у власній теці — це повторює структуру `components/` у Nuxt 3,
тож готовий компонент переноситься в застосунок практично без змін.

## Стек

Vue 3.5 · Vite 8 · Storybook 10 (`@storybook/vue3-vite`) · TypeScript · Inter Variable (локальний шрифт)
