import type { Meta, StoryObj } from '@storybook/vue3-vite'

import ScrollShadow from './ScrollShadow.vue'
import Chip from '../Chip/Chip.vue'

const BGS = ['primary', 'primary-alt', 'secondary', 'disabled-subtle'] as const

const meta = {
  title: 'Components/ScrollShadow',
  component: ScrollShadow,
  tags: ['autodocs'],
  parameters: {
    figma: '16728:3274',
    docs: {
      description: {
        component:
          'Figma **ScrollShadow** (node 16728:3274): fades the edge of a scroll area into the surface color ' +
          '(`bg` must match the background). A fade shows only where there is more to scroll. Give the ' +
          'component a height / max-height (vertical) or a width (horizontal).',
      },
    },
  },
  argTypes: {
    bg: { control: 'inline-radio', options: BGS },
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
  },
  args: { bg: 'primary', orientation: 'vertical', size: 80, label: 'Список' },
  render: (args) => ({
    components: { ScrollShadow },
    setup: () => ({ args }),
    template: `
      <ScrollShadow v-bind="args" class="sb-scroll-demo">
        <p v-for="i in 20" :key="i" class="sb-scroll-demo__row">Рядок {{ i }}</p>
      </ScrollShadow>
    `,
  }),
} satisfies Meta<typeof ScrollShadow>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Figma "Variant BG" — each on its own surface. */
export const Backgrounds: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { ScrollShadow },
    setup: () => ({ bgs: BGS }),
    template: `
      <div class="sb-row">
        <div v-for="b in bgs" :key="b" :class="'sb-surface--' + b">
          <ScrollShadow :bg="b" :label="b" class="sb-scroll-demo">
            <p v-for="i in 12" :key="i" class="sb-scroll-demo__row">{{ b }} · {{ i }}</p>
          </ScrollShadow>
        </div>
      </div>
    `,
  }),
}

export const Horizontal: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { ScrollShadow, Chip },
    template: `
      <ScrollShadow orientation="horizontal" :size="48" label="Фільтри" class="sb-scroll-demo--wide">
        <div class="sb-row" style="flex-wrap: nowrap">
          <Chip v-for="i in 14" :key="i">Фільтр {{ i }}</Chip>
        </div>
      </ScrollShadow>
    `,
  }),
}
