import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { fn } from 'storybook/test'

import FilterSelect from './FilterSelect.vue'

const OPTIONS = [
  { value: 'done', label: 'Проведені' },
  { value: 'pending', label: 'Не проведені' },
  { value: 'deleted', label: 'Видалені' },
]

const meta = {
  title: 'Components/FilterSelect',
  component: FilterSelect,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: [32, 40, 44, 48, 52] },
    multiple: { control: 'boolean' },
    pill: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: { label: 'Статус', options: OPTIONS, icon: 'calendar' },
  decorators: [() => ({ template: '<div style="min-height:260px"><story /></div>' })],
} satisfies Meta<typeof FilterSelect>

export default meta
type Story = StoryObj<typeof meta>

export const SingleSelect: Story = {
  render: (args) => ({
    components: { FilterSelect },
    setup() {
      const value = ref(null)
      return { args, value, onUpdate: fn() }
    },
    template: `<FilterSelect v-bind="args" v-model="value" @update:modelValue="onUpdate" />`,
  }),
}

export const MultiSelect: Story = {
  args: { multiple: true, label: 'Фільтр' },
  render: (args) => ({
    components: { FilterSelect },
    setup() {
      const value = ref([])
      return { args, value, onUpdate: fn() }
    },
    template: `<FilterSelect v-bind="args" v-model="value" @update:modelValue="onUpdate" />`,
  }),
}

/** Default vs active (preselected) appearance. */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { FilterSelect },
    setup() {
      const empty = ref(null)
      const one = ref('done')
      const many = ref(['done', 'pending'])
      return { OPTIONS, empty, one, many }
    },
    template: `
      <div style="display:flex;gap:16px;align-items:flex-start;flex-wrap:wrap;min-height:260px">
        <FilterSelect label="Статус" :options="OPTIONS" icon="calendar" v-model="empty" />
        <FilterSelect label="Статус" :options="OPTIONS" icon="calendar" v-model="one" />
        <FilterSelect label="Фільтр" :options="OPTIONS" icon="calendar" multiple v-model="many" />
        <FilterSelect label="Статус" :options="OPTIONS" disabled />
      </div>
    `,
  }),
}

/** Pill (full corner radius). */
export const Pill: Story = {
  render: (args) => ({
    components: { FilterSelect },
    setup() {
      const value = ref('done')
      return { args, value }
    },
    template: `<FilterSelect v-bind="args" pill v-model="value" />`,
  }),
}
