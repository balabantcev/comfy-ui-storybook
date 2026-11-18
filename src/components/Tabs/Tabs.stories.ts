import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

import Tabs from './Tabs.vue'
import { TABS_COLORS, TABS_SIZES, TABS_VARIANTS, type TabItem } from './tabs.tokens'
import { Matrix } from '../../storybook'

const items: TabItem[] = [
  { value: 'all', label: 'Усі', icon: 'box-add', count: 12 },
  { value: 'new', label: 'Нові', icon: 'box-add', count: 3 },
  { value: 'done', label: 'Виконані', icon: 'box-add' },
  { value: 'archive', label: 'Архів', icon: 'box-add', disabled: true },
]
const plain: TabItem[] = items.map(({ value, label, disabled }) => ({ value, label, disabled }))

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Figma **Tabs**: segmented "Horizontal tabs" (Color Brand / White, Border, Full corner radius) with ' +
          '"-Tab button base" (36 / 40 px, icon, counter), and the "-Tab button underline" style. Renders the ' +
          'tab list (WAI-ARIA tabs: ←/→, Home/End, roving focus); the app renders the panels — pass ' +
          '`panelId` per item to link them.',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: TABS_VARIANTS },
    color: { control: 'inline-radio', options: TABS_COLORS },
    size: { control: 'inline-radio', options: TABS_SIZES },
  },
  args: { items, modelValue: 'all', variant: 'segmented', color: 'brand', size: 36, border: false, pill: false, label: 'Замовлення' },
  render: (args) => ({
    components: { Tabs },
    setup: () => ({ args, active: ref(args.modelValue) }),
    template: `<Tabs v-bind="args" v-model="active" />`,
  }),
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Figma "Horizontal tabs": Color × Border × Full corner radius. */
export const Segmented: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Tabs, Matrix },
    setup: () => ({
      items,
      rows: ['brand', 'brand · border', 'white', 'white · border'],
      cols: ['radius 8', 'full radius'],
      active: ref<Record<string, string | number>>({}),
    }),
    template: `
      <Matrix :rows="rows" :cols="cols" v-slot="{ row, col }">
        <Tabs
          :items="items" :label="row + ' ' + col"
          :color="row.startsWith('white') ? 'white' : 'brand'" :border="row.includes('border')" :pill="col === 'full radius'"
          :model-value="active[row + col] ?? 'all'" @update:model-value="(v) => (active[row + col] = v)"
        />
      </Matrix>
    `,
  }),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Tabs },
    setup: () => ({ items, a: ref('all'), b: ref('all') }),
    template: `
      <div class="sb-stack">
        <Tabs :items="items" :size="36" v-model="a" label="36px" />
        <Tabs :items="items" :size="40" v-model="b" label="40px" />
      </div>
    `,
  }),
}

/** Figma "-Tab button underline": Default / Hover / Active, optional trailing icon. */
export const Underline: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Tabs },
    setup: () => ({
      items: [...plain.slice(0, 3), { value: 'more', label: 'Ще', trailingIcon: 'chevron-down' }, plain[3]],
      active: ref('all'),
    }),
    template: `<Tabs variant="underline" :items="items" v-model="active" label="Розділи" />`,
  }),
}
