import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";
import { beforeAll } from 'vitest'
import { setProjectAnnotations } from '@storybook/vue3-vite'
import * as previewAnnotations from './preview'

// Apply this project's global decorators, parameters and loaders (incl. token
// CSS and a11y config from preview.ts) to every story run under Vitest.
const annotations = setProjectAnnotations([a11yAddonAnnotations, previewAnnotations])

beforeAll(annotations.beforeAll)
