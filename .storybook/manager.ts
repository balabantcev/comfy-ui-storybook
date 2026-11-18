import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming'

// Custom Storybook UI theme — replaces the default sidebar logo with the Comfy logo
// and uses the design-system font (Inter) instead of Storybook's default Nunito Sans.
const theme = create({
  base: 'light',
  brandTitle: 'Comfy UI',
  brandImage: '/logo_storybook.svg', // served from .storybook/public (staticDirs)
  brandTarget: '_self',
  fontBase: "'Inter Variable', 'Inter', sans-serif",
})

addons.setConfig({ theme })

// ---- "Figma ↗" toolbar link ---------------------------------------------------------------
// Every component's story meta carries `parameters.figma` = the Figma node id of its component
// set (checked by scripts/check-figma-links.mjs). The button opens that node in the Comfy UI file.
import React from 'react'
import { types, useParameter } from 'storybook/manager-api'
import { IconButton } from 'storybook/internal/components'

const FIGMA_FILE = '60wkPriIjI9zjyAKOq3dja'

addons.register('comfy/figma-link', () => {
  addons.add('comfy/figma-link/tool', {
    type: types.TOOL,
    title: 'Open in Figma',
    match: ({ viewMode }) => viewMode === 'story' || viewMode === 'docs',
    render: function FigmaLink() {
      const node = useParameter<string | undefined>('figma')
      if (!node) return null
      const href = `https://www.figma.com/design/${FIGMA_FILE}/?node-id=${node.replace(':', '-')}`
      return React.createElement(
        IconButton,
        { key: 'figma', title: `Open in Figma (node ${node})`, onClick: () => window.open(href, '_blank', 'noopener') },
        'Figma ↗',
      )
    },
  })
})
