import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { fn } from 'storybook/test'

import Checkbox from './Checkbox.vue'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: { figma: '11118:844' },
  argTypes: {
    size: { control: 'inline-radio', options: [16, 20] },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Вибрати всі',
    size: 16,
    onChange: fn(),
  },
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(args.modelValue ?? true)
      return { args, checked }
    },
    template: `<Checkbox v-bind="args" v-model="checked" />`,
  }),
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { args: { modelValue: true } }

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Checkbox },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">
        <Checkbox label="Unchecked" :model-value="false" />
        <Checkbox label="Checked" :model-value="true" />
        <Checkbox label="Indeterminate" indeterminate />
        <Checkbox label="Disabled" disabled />
        <Checkbox label="Disabled checked" disabled :model-value="true" />
      </div>
    `,
  }),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Checkbox },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">
        <Checkbox :size="16" label="16 px" :model-value="true" />
        <Checkbox :size="20" label="20 px" :model-value="true" />
      </div>
    `,
  }),
}

export const WithSupportingText: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Checkbox },
    template: `
      <Checkbox
        :model-value="true"
        label="Вибрати всі"
        description="Позначити всі доступні опції одним кліком."
      />
    `,
  }),
}
