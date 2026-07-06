import type { Meta, StoryObj } from '@storybook/vue3-vite'

import Counter from './Counter.vue'
import { COUNTER_SIZE_VALUES, COUNTER_COLORS } from './counter.tokens'

const meta = {
  title: 'Components/Counter',
  component: Counter,
  tags: ['autodocs'],
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
    components: { Counter },
    setup: () => ({ colors: COUNTER_COLORS, sizes: COUNTER_SIZE_VALUES }),
    template: `
      <table style="border-collapse:collapse">
        <thead>
          <tr>
            <th></th>
            <th v-for="s in sizes" :key="s" style="padding:10px 16px;text-align:left;font:500 13px sans-serif;color:#737373">{{ s }}px</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in colors" :key="c">
            <td style="padding:8px 16px;text-transform:capitalize;font:500 13px sans-serif;color:#737373">{{ c }}</td>
            <td v-for="s in sizes" :key="s" style="padding:8px 16px">
              <Counter :color="c" :size="s" :value="4" />
            </td>
          </tr>
        </tbody>
      </table>
    `,
  }),
}

// Multi-digit growth + border gap
export const Variations: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Counter },
    template: `
      <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
        <Counter color="red" :value="1" />
        <Counter color="red" :value="42" />
        <Counter color="red" value="99+" />
        <div style="background:#2abd13;padding:10px;border-radius:8px;display:inline-flex">
          <Counter color="red" :value="3" border-gap />
        </div>
      </div>
    `,
  }),
}
