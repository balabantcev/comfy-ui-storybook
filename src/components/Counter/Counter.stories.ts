import type { Meta, StoryObj } from '@storybook/vue3-vite'

import Counter from './Counter.vue'
import { COUNTER_SIZE_VALUES, COUNTER_COLORS } from './counter.tokens'
import { Matrix } from '../../storybook'

const meta = {
  title: 'Components/Counter',
  component: Counter,
  tags: ['autodocs'],
  parameters: { figma: '13472:795' },
  argTypes: {
    color: { control: 'inline-radio', options: COUNTER_COLORS },
    size: { control: 'inline-radio', options: COUNTER_SIZE_VALUES },
    borderGap: { control: 'boolean' },
  },
  args: { color: 'red', size: 20, value: 4 },
} satisfies Meta<typeof Counter>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

// Colors × sizes matrix
export const Colors: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Counter, Matrix },
    setup: () => ({ colors: COUNTER_COLORS, sizes: COUNTER_SIZE_VALUES.map((s) => s + 'px') }),
    template: `
      <Matrix :rows="colors" :cols="sizes" v-slot="{ row, col }">
        <Counter :color="row" :size="parseInt(col)" :value="4" />
      </Matrix>
    `,
  }),
}

// Multi-digit growth + border gap
export const Variations: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Counter },
    template: `
      <div class="sb-row">
        <Counter color="red" :value="1" />
        <Counter color="red" :value="42" />
        <Counter color="red" value="99+" />
        <div class="sb-surface--brand">
          <Counter color="red" :value="3" border-gap />
        </div>
      </div>
    `,
  }),
}
