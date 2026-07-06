import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  "framework": "@storybook/vue3-vite",
  "staticDirs": ["./public"],
  // Custom favicon (served from .storybook/public)
  managerHead: (head) => `${head}
    <link rel="icon" type="image/svg+xml" href="./favicon.svg" />`,
};
export default config;