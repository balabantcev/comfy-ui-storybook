import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { fn } from 'storybook/test'

import Select from './Select.vue'

const OPTIONS = [
  { value: 'kyiv', label: 'Київ' },
  { value: 'lviv', label: 'Львів' },
  { value: 'odesa', label: 'Одеса' },
  { value: 'kharkiv', label: 'Харків' },
  { value: 'dnipro', label: 'Дніпро', disabled: true },
]

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: [44, 48, 56] },
    itemSize: { control: 'inline-radio', options: [32, 40] },
    multiple: { control: 'boolean' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'label-text',
    options: OPTIONS,
    helper: 'Допоміжний текст для користувача.',
    required: true,
    size: 56,
  },
  decorators: [() => ({ template: '<div style="width:100%;max-width:320px;min-height:320px"><story /></div>' })],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const SingleSelect: Story = {
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref(null)
      return { args, value, onUpdate: fn() }
    },
    template: `<Select v-bind="args" v-model="value" @update:modelValue="onUpdate" />`,
  }),
}

export const MultiSelect: Story = {
  args: { multiple: true, label: 'Міста' },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref([])
      return { args, value, onUpdate: fn() }
    },
    template: `<Select v-bind="args" v-model="value" @update:modelValue="onUpdate" />`,
  }),
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Select },
    setup() {
      return {
        OPTIONS,
        empty: ref(null),
        filled: ref('lviv'),
        err: ref(null),
        dis: ref('kyiv'),
      }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:20px;width:100%;max-width:320px">
        <Select label="Default" required :options="OPTIONS" helper="Допоміжний текст" v-model="empty" />
        <Select label="Filled" :options="OPTIONS" v-model="filled" />
        <Select label="Error" :options="OPTIONS" error="Оберіть значення." v-model="err" />
        <Select label="Disabled" :options="OPTIONS" disabled v-model="dis" />
      </div>
    `,
  }),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Select },
    setup: () => ({ OPTIONS, v56: ref('kyiv'), v48: ref('kyiv'), v44: ref('kyiv') }),
    template: `
      <div style="display:flex;flex-direction:column;gap:20px;width:100%;max-width:320px">
        <Select :size="56" label="56 px" :options="OPTIONS" v-model="v56" />
        <Select :size="48" label="48 px" :options="OPTIONS" v-model="v48" />
        <Select :size="44" label="44 px" :options="OPTIONS" v-model="v44" />
      </div>
    `,
  }),
}
