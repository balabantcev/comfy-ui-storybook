import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { fn } from 'storybook/test'

import Radio from './Radio.vue'

const meta = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: [16, 20] },
    disabled: { control: 'boolean' },
  },
  args: { size: 16, onChange: fn() },
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

/** A radio group bound with v-model. */
export const Playground: Story = {
  render: (args) => ({
    components: { Radio },
    setup() {
      const picked = ref('cod')
      return { args, picked }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">
        <Radio v-bind="args" v-model="picked" name="pay" value="cod" label="Оплата при отриманні" />
        <Radio v-bind="args" v-model="picked" name="pay" value="card" label="Оплата карткою" />
        <Radio v-bind="args" v-model="picked" name="pay" value="parts" label="Оплата частинами" />
      </div>
    `,
  }),
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Radio },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">
        <Radio model-value="a" value="b" label="Unchecked" />
        <Radio model-value="a" value="a" label="Checked" />
        <Radio model-value="a" value="b" label="Disabled" disabled />
        <Radio model-value="a" value="a" label="Disabled checked" disabled />
      </div>
    `,
  }),
}

export const WithSupportingText: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Radio },
    template: `
      <Radio
        model-value="gift"
        value="gift"
        label="Подарункове пакування"
        description="Оплачуйте замовлення після доставки та перевірки товару."
      />
    `,
  }),
}
