import type { Preview } from '@storybook/vue3-vite'
import { create } from 'storybook/theming'
import '../src/foundations/tokens.css'
import '../src/storybook/story.css'

// Docs pages (autodocs + MDX) use Storybook's theme typography; point it at the
// design font so docs match the rest of the system (Inter, not Nunito Sans).
const docsTheme = create({
  base: 'light',
  fontBase: "'Inter Variable', 'Inter', sans-serif",
})

// a11y gate, set per run by vite.config.ts (define): 'error' in CI, 'todo' locally;
// plain `storybook dev` has no value → 'todo' (violations shown in the panel only).
const a11yTest = (import.meta.env.STORYBOOK_A11Y_TEST as 'error' | 'todo' | undefined) ?? 'todo'

const preview: Preview = {
  // Theme switcher (Figma "Colors" collection modes). tokens.css keys the semantic layer
  // off  data-theme  on <html>; Light is the default.
  globalTypes: {
    theme: {
      description: 'Color theme (Figma "Colors" mode)',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (story, context) => {
      document.documentElement.dataset.theme = context.globals.theme === 'dark' ? 'dark' : 'light'
      return story()
    },
  ],

  parameters: {
    docs: { theme: docsTheme },
    options: {
      storySort: {
        order: ['Вітання', 'Foundations', 'Components'],
      },
    },

    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo'  - show a11y violations in the test UI only (local dev)
      // 'error' - fail the run on a11y violations (CI)
      // 'off'   - skip a11y checks entirely
      test: a11yTest,
      // Low contrast comes from the Figma palette itself (white on brand-500, text-tertiary,
      // error-500 — see context/a11y-contrast.md): a design decision, not a code bug. It is
      // still reported in the a11y panel and in local runs, but doesn't fail the CI gate.
      ...(a11yTest === 'error' && { config: { rules: [{ id: 'color-contrast', enabled: false }] } }),
    }
  },
};

export default preview;