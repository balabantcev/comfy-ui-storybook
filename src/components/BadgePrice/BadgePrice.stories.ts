import type { Meta, StoryObj } from '@storybook/vue3-vite'

import BadgePrice from './BadgePrice.vue'
import { BADGE_PRICE_SIZES, BADGE_PRICE_UNITS } from './badge-price.tokens'
import { Matrix } from '../../storybook'

const meta = {
  title: 'Components/BadgePrice',
  component: BadgePrice,
  tags: ['autodocs'],
  parameters: {
    figma: '13796:1729',
    docs: {
      description: {
        component:
          'Figma **Badge / Badge price** (node 13796:1729). Discount label: `value` with `%` or `₴` ' +
          '(Figma "% or ₴"), sizes 16 / 20 / 24. Numbers get Ukrainian digit grouping.',
      },
    },
  },
  argTypes: {
    unit: { control: 'inline-radio', options: BADGE_PRICE_UNITS },
    size: { control: 'inline-radio', options: BADGE_PRICE_SIZES },
  },
  args: { value: -44, unit: '%', size: 16 },
} satisfies Meta<typeof BadgePrice>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const All: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { BadgePrice, Matrix },
    setup: () => ({ sizes: BADGE_PRICE_SIZES.map((s) => `${s}px`), units: BADGE_PRICE_UNITS }),
    template: `
      <Matrix :rows="units" :cols="sizes" v-slot="{ row, col }">
        <BadgePrice :value="row === '%' ? -44 : -4444" :unit="row" :size="parseInt(col)" />
      </Matrix>
    `,
  }),
}
