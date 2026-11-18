import type { Meta, StoryObj } from '@storybook/vue3-vite'

import Flag from './Flag.vue'
import { FLAG_CODES } from './flag.tokens'
import { Specimen } from '../../storybook'

const meta = {
  title: 'Components/Flag',
  component: Flag,
  tags: ['autodocs'],
  parameters: { figma: '11288:1811' },
  argTypes: {
    code: { control: 'inline-radio', options: FLAG_CODES },
    size: { control: { type: 'number', min: 12, max: 64 } },
  },
  args: { code: 'UA', size: 16 },
} satisfies Meta<typeof Flag>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const All: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Flag, Specimen },
    setup: () => ({ codes: FLAG_CODES }),
    template: `
      <div class="sb-row">
        <Specimen v-for="c in codes" :key="c" :caption="c"><Flag :code="c" :size="32" /></Specimen>
        <Specimen caption="16px"><Flag code="UA" /></Specimen>
      </div>
    `,
  }),
}
