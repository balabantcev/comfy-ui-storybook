import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { fn } from 'storybook/test'

import Pagination from './Pagination.vue'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    total: { control: { type: 'number', min: 1 } },
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
