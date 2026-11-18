import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { fn } from 'storybook/test'

import Pagination from './Pagination.vue'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: { figma: '13447:5347' },
  argTypes: {
    total: { control: { type: 'number', min: 1 } },
    type: { control: 'inline-radio', options: ['page', 'minimal', 'card'] },
    breakpoint: { control: 'inline-radio', options: ['auto', 'desktop', 'mobile'] },
    siblingCount: { control: { type: 'number', min: 0 } },
    pill: { control: 'boolean' },
    showNav: { control: 'boolean' },
  },
  args: { total: 10, siblingCount: 1 },
  decorators: [() => ({ template: '<div style="width:760px;max-width:100%"><story /></div>' })],
  render: (args) => ({
    components: { Pagination },
    setup() {
      const page = ref(args.modelValue ?? 1)
      return { args, page, onUpdate: fn() }
    },
    template: `<Pagination v-bind="args" v-model="page" @update:modelValue="onUpdate" />`,
  }),
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const MiddlePage: Story = { args: { modelValue: 5, total: 10 } }

export const Pill: Story = { args: { modelValue: 3, total: 10, pill: true } }

/** Numbers only (no prev/next). */
export const NumbersOnly: Story = { args: { showNav: false, modelValue: 4, total: 10 } }

/** Few pages — no ellipsis. */
export const FewPages: Story = { args: { total: 5, modelValue: 2 } }

/** Arrows without text labels. */
export const IconNav: Story = { args: { total: 10, modelValue: 6, prevLabel: '', nextLabel: '' } }

/** Figma "Type": Page default / Page minimal center aligned / Card default. */
export const Types: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Pagination },
    setup: () => ({ p1: ref(1), p2: ref(1), p3: ref(1) }),
    template: `
      <div style="display:flex;flex-direction:column;gap:32px">
        <Pagination type="page" label="Пагінація — page" :total="10" v-model="p1" />
        <Pagination type="minimal" label="Пагінація — minimal" :total="10" v-model="p2" />
        <div style="border:1px solid var(--border-secondary);border-radius:var(--radius-12)">
          <div style="height:80px"></div>
          <Pagination type="card" label="Пагінація — card" :total="10" v-model="p3" />
        </div>
      </div>
    `,
  }),
}

/** Figma "Breakpoint=Mobile": icon-only nav + "Сторінка X з Y". Also kicks in automatically in containers ≤ 520px. */
export const Mobile: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Pagination },
    setup: () => ({ p1: ref(1), p2: ref(4), p3: ref(10) }),
    template: `
      <div style="display:flex;flex-direction:column;gap:32px;width:375px">
        <Pagination type="page" label="Пагінація — page" breakpoint="mobile" :total="10" v-model="p1" />
        <Pagination type="minimal" label="Пагінація — minimal" breakpoint="mobile" pill :total="10" v-model="p2" />
        <Pagination type="card" label="Пагінація — card" breakpoint="mobile" :total="10" v-model="p3" />
      </div>
    `,
  }),
}
