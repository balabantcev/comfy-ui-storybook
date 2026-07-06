import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    // Chromatic runs via the CLI in CI (see .github/workflows/ci.yml). To get the
    // in-app Visual Tests panel, run `storybook add @chromatic-com/storybook`.
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  "framework": "@storybook/vue3-vite",
  "staticDirs": ["./public"],
  // Custom favicon + load the Inter font into the manager UI (sidebar/toolbar),
  // so the whole Storybook (not just the preview iframe) uses the design font.
  managerHead: (head) => `${head}
    <link rel="icon" type="image/svg+xml" href="./favicon.svg" />
    <style>
      @font-face {
        font-family: 'Inter Variable';
        font-style: normal;
        font-weight: 100 900;
        font-display: swap;
        src: url('./fonts/InterVariable.ttf') format('truetype-variations');
      }
    </style>`,
};
export default config;