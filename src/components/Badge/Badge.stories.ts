import type { Meta, StoryObj } from '@storybook/vue3-vite'

import Badge from './Badge.vue'
import { BADGE_SIZE_VALUES, BADGE_VARIANTS, BADGE_COLORS } from './badge.tokens'
import { iconNames } from '../../icons'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: BADGE_VARIANTS },
    color: { control: 'select', options: BADGE_COLORS },
    size: { control: 'inline-radio', options: BADGE_SIZE_VALUES },
    dot: { control: 'boolean' },
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
    components: { Badge },
    setup: () => ({ variants: BADGE_VARIANTS, colors: BADGE_COLORS }),
    template: `
      <table style="border-collapse:collapse">
        <thead>
          <tr>
            <th></th>
            <th v-for="v in variants" :key="v" style="padding:10px 16px;text-align:left;text-transform:capitalize;font:500 13px sans-serif;color:#737373">{{ v }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in colors" :key="c">
            <td style="padding:8px 16px;text-transform:capitalize;font:500 13px sans-serif;color:#737373">{{ c }}</td>
            <td v-for="v in variants" :key="v" style="padding:8px 16px">
              <Badge :variant="v" :color="c" dot>{{ c }}</Badge>
            </td>
          </tr>
        </tbody>
      </table>
    `,
  }),
}

// Sizes
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Badge },
    setup: () => ({ sizes: BADGE_SIZE_VALUES }),
    template: `
      <div style="display:flex;align-items:center;gap:16px">
        <div v-for="s in sizes" :key="s" style="display:flex;flex-direction:column;align-items:center;gap:8px">
          <Badge :size="s" color="success" dot>Назва</Badge>
          <span style="font:12px sans-serif;color:#737373">{{ s }}px</span>
        </div>
      </div>
    `,
  }),
}

// Types: dot / icon / dismissible
export const Types: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Badge },
    template: `
      <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
        <Badge color="success">Текст</Badge>
        <Badge color="success" dot>З крапкою</Badge>
        <Badge color="success" iconLeft="check">З іконкою</Badge>
        <Badge color="success" iconRight="x">Закрити</Badge>
      </div>
    `,
  }),
}
