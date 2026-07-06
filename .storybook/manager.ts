import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming'

// Custom Storybook UI theme — replaces the default sidebar logo with the Comfy logo.
const theme = create({
  base: 'light',
  brandTitle: 'Comfy UI',
  brandImage: '/logo_storybook.svg', // served from .storybook/public (staticDirs)
  brandTarget: '_self',
})

addons.setConfig({ theme })
