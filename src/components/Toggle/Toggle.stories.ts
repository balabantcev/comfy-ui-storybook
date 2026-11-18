import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { fn } from 'storybook/test'

import Toggle from './Toggle.vue'

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: { figma: '11136:1928' },
  argTypes: {
    size: { control: 'inline-radio', options: [20, 24] },
    disabled: { control: 'boolean' },
  },
  args: { label: 'Залишатися в системі', size: 20, onChange: fn() },
  render: (args) => ({
    components: { Toggle },
    setup() {
      const on = ref(args.modelValue ?? true)
      return { args, on }
    },
    template: `<Toggle v-bind="args" v-model="on" />`,
  }),
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { args: { modelValue: true } }

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Toggle },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">
        <Toggle label="Off" :model-value="false" />
        <Toggle label="On" :model-value="true" />
        <Toggle label="Disabled off" disabled />
        <Toggle label="Disabled on" disabled :model-value="true" />
      </div>
    `,
  }),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Toggle },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">
        <Toggle :size="20" label="20 px" :model-value="true" />
        <Toggle :size="24" label="24 px" :model-value="true" />
      </div>
    `,
  }),
}

export const WithSupportingText: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Toggle },
    setup: () => ({ on: ref(true) }),
    template: `
      <Toggle
        v-model="on"
        label="Залишатися в системі"
        description="Зберегти мої дані для наступного входу."
      />
    `,
  }),
}
