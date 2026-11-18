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
      test: typeof process !== 'undefined' && process.env?.CI ? 'error' : 'todo',
    }
  },
};

export default preview;