import type { Meta, StoryObj } from '@storybook/vue3-vite'

import Badge from './Badge.vue'
import { BADGE_SIZE_VALUES, BADGE_VARIANTS, BADGE_COLORS } from './badge.tokens'
import { iconNames } from '../../icons'
import { FLAG_CODES } from '../Flag/flag.tokens'
import { Matrix, Specimen } from '../../storybook'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: { figma: '11287:1108' },
  argTypes: {
    variant: { control: 'inline-radio', options: BADGE_VARIANTS },
    color: { control: 'select', options: BADGE_COLORS },
    size: { control: 'inline-radio', options: BADGE_SIZE_VALUES },
    dot: { control: 'boolean' },
    country: { control: 'select', options: ['', ...FLAG_CODES] },
    iconLeft: { control: 'select', options: ['', ...iconNames] },
    iconRight: { control: 'select', options: ['', ...iconNames] },
  },
  args: {
    variant: 'default',
    color: 'gray',
    size: 22,
  },
  render: (args) => ({
    components: { Badge },
    setup: () => ({ args }),
    template: `<Badge v-bind="args">{{ args.label ?? 'Назва' }}</Badge>`,
  }),
} satisfies Meta<typeof Badge & { label?: string }>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { args: { label: 'Назва' } as any }

// Colors × variants matrix
export const Colors: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Badge, Matrix },
    setup: () => ({ variants: BADGE_VARIANTS, colors: BADGE_COLORS }),
    template: `
      <Matrix :rows="colors" :cols="variants" v-slot="{ row, col }">
        <Badge :variant="col" :color="row" dot>{{ row }}</Badge>
      </Matrix>
    `,
  }),
}

// Sizes
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Badge, Specimen },
    setup: () => ({ sizes: BADGE_SIZE_VALUES }),
    template: `
      <div class="sb-row">
        <Specimen v-for="s in sizes" :key="s" :caption="s + 'px'">
          <Badge :size="s" color="success" dot>Назва</Badge>
        </Specimen>
      </div>
    `,
  }),
}

// Figma Type: Default (text / icons) / Dot / Country
export const Types: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Badge },
    template: `
      <div class="sb-row">
        <Badge color="success">Текст</Badge>
        <Badge color="success" dot>З крапкою</Badge>
        <Badge color="success" iconLeft="check">З іконкою</Badge>
        <Badge color="success" iconRight="x">Закрити</Badge>
        <Badge color="success" country="UA">Україна</Badge>
      </div>
    `,
  }),
}

/** Figma Type × Size — spacing differs per type (Default 4/2 + 2px text frame, Dot, Country). */
export const TypesBySize: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Badge, Matrix },
    setup: () => ({ types: ['text', 'icons', 'dot', 'country'], sizes: BADGE_SIZE_VALUES.map((s) => s + 'px') }),
    template: `
      <Matrix :rows="types" :cols="sizes" v-slot="{ row, col }">
        <Badge
          :size="parseInt(col)" color="gray"
          :dot="row === 'dot'" :country="row === 'country' ? 'UA' : undefined"
          :icon-left="row === 'icons' ? 'info-circle' : undefined" :icon-right="row === 'icons' ? 'x' : undefined"
        >Назва</Badge>
      </Matrix>
    `,
  }),
}
