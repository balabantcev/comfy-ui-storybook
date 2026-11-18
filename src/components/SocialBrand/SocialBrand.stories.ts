import type { Meta, StoryObj } from '@storybook/vue3-vite'

import SocialBrand from './SocialBrand.vue'
import { SOCIAL_BRAND_NAMES } from './social-brand.tokens'
import { Specimen } from '../../storybook'

const meta = {
  title: 'Components/SocialBrand',
  component: SocialBrand,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Figma **Misc icons / Social brand** (node 13133:1436). Brand marks keep their own colors; ' +
          'the Apple mark follows the theme, Google\'s cut-out uses `bg-primary`.',
      },
    },
  },
  argTypes: {
    name: { control: 'select', options: SOCIAL_BRAND_NAMES },
    size: { control: { type: 'number', min: 16, max: 64 } },
  },
  args: { name: 'google', size: 24 },
} satisfies Meta<typeof SocialBrand>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const All: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { SocialBrand, Specimen },
    setup: () => ({ names: SOCIAL_BRAND_NAMES }),
    template: `
      <div class="sb-row">
        <Specimen v-for="n in names" :key="n" :caption="n"><SocialBrand :name="n" /></Specimen>
      </div>
    `,
  }),
}
