import type { Meta, StoryObj } from '@storybook/vue3-vite'

import FeaturedIcon from './FeaturedIcon.vue'
import { FEATURED_ICON_COLORS, FEATURED_ICON_SIZES, FEATURED_ICON_TYPES } from './featured-icon.tokens'
import { iconNames } from '../../icons'
import { Matrix, Specimen } from '../../storybook'

const meta = {
  title: 'Components/FeaturedIcon',
  component: FeaturedIcon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Figma **Misc icons / Featured icon** (node 15030:853). A decorative icon badge for alerts, ' +
          'modals and empty states. Type × Color × Size; Success is the brand green.',
      },
    },
  },
  argTypes: {
    icon: { control: 'select', options: iconNames },
    type: { control: 'inline-radio', options: FEATURED_ICON_TYPES },
    color: { control: 'select', options: FEATURED_ICON_COLORS },
    size: { control: 'inline-radio', options: FEATURED_ICON_SIZES },
  },
  args: { icon: 'check-circle', type: 'light', color: 'gray', size: 48 },
} satisfies Meta<typeof FeaturedIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const TypesAndColors: Story = {
  name: 'Types × colors',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { FeaturedIcon, Matrix },
    setup: () => ({ types: FEATURED_ICON_TYPES, colors: FEATURED_ICON_COLORS }),
    template: `
      <Matrix :rows="types" :cols="colors" v-slot="{ row, col }">
        <FeaturedIcon :type="row" :color="col" />
      </Matrix>
    `,
  }),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { FeaturedIcon, Matrix },
    setup: () => ({ types: FEATURED_ICON_TYPES, sizes: FEATURED_ICON_SIZES }),
    template: `
      <Matrix :rows="types" :cols="sizes.map((s) => s + 'px')" v-slot="{ row, col }">
        <FeaturedIcon :type="row" color="success" :size="parseInt(col)" />
      </Matrix>
    `,
  }),
}

export const CustomIcon: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { FeaturedIcon, Specimen },
    template: `
      <div class="sb-row">
        <Specimen caption="alert / error"><FeaturedIcon icon="alert" color="error" /></Specimen>
        <Specimen caption="info / blue"><FeaturedIcon icon="info-circle" color="blue" type="gradient" /></Specimen>
        <Specimen caption="star / warning"><FeaturedIcon icon="star" color="warning" type="outline" /></Specimen>
        <Specimen caption="mail / purple"><FeaturedIcon icon="mail" color="purple" type="modern" /></Specimen>
      </div>
    `,
  }),
}
