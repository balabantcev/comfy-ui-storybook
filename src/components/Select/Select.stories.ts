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

const ROLES = [
  { value: 'designer', label: 'Дизайнер', icon: 'user', dot: 'success' as const, hint: '12' },
  { value: 'developer', label: 'Розробник', icon: 'setting-1', dot: 'blue' as const, hint: '34' },
  { value: 'manager', label: 'Менеджер', icon: 'users', dot: 'orange' as const, hint: '5' },
  { value: 'guest', label: 'Гість', icon: 'user-x', dot: 'gray' as const, hint: '0', disabled: true },
]

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: [44, 48, 56] },
    itemSize: { control: 'inline-radio', options: [32, 40] },
    type: { control: 'inline-radio', options: ['default', 'icon', 'dot', 'tags'] },
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

/** Figma "Type": Icon / Dot / Tags (Default is the plain field above). */
export const Types: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Select },
    setup: () => ({ ROLES, a: ref('designer'), b: ref('developer'), c: ref(['designer', 'manager']) }),
    template: `
      <div class="sb-stack" style="width:320px">
        <Select type="icon" label="Icon" :options="ROLES" v-model="a" />
        <Select type="dot" label="Dot" :options="ROLES" v-model="b" />
        <Select type="tags" label="Tags" :options="ROLES" v-model="c" helper="Пошук і швидке додавання тегів." />
      </div>
    `,
  }),
}

/** Multi-select rows with a trailing hint (Figma -Multi-select item "Discount"). */
export const MultiWithHints: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Select },
    setup: () => ({ ROLES, v: ref(['designer']) }),
    template: `<div style="width:320px"><Select multiple label="Ролі" :options="ROLES" v-model="v" /></div>`,
  }),
}

/** Empty state (Figma 1.1.0): no options, or a Tags search with no matches. */
export const EmptyState: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Select },
    setup: () => ({ v: ref(null), t: ref([]), OPTIONS_ALL: OPTIONS }),
    template: `
      <div class="sb-stack" style="width:320px">
        <Select label="Без варіантів" :options="[]" v-model="v" empty-title="Немає варіантів" empty-description="Список порожній." />
        <Select type="tags" label="Tags — введіть «xyz»" :options="OPTIONS_ALL" v-model="t" />
      </div>
    `,
  }),
}
