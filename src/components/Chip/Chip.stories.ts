import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { fn } from 'storybook/test'

import Chip from './Chip.vue'
import { CHIP_TYPES, CHIP_SIZE_VALUES } from './chip.tokens'
import { iconNames } from '../../icons'

const meta = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'inline-radio', options: CHIP_TYPES },
    size: { control: 'select', options: CHIP_SIZE_VALUES },
    iconLeft: { control: 'select', options: ['', ...iconNames] },
    iconRight: { control: 'select', options: ['', ...iconNames] },
    pill: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    type: 'dark',
    size: 40,
    onClick: fn(),
  },
  render: (args) => ({
    components: { Chip },
    setup: () => ({ args }),
    template: `<Chip v-bind="args">{{ args.label ?? 'Кнопка' }}</Chip>`,
  }),
} satisfies Meta<typeof Chip & { label?: string }>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { args: { label: 'Кнопка', iconLeft: 'star', iconRight: 'chevron-down', count: 4 } as any }

export const Types: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Chip },
    setup: () => ({ types: CHIP_TYPES }),
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
        <Chip v-for="t in types" :key="t" :type="t">{{ t }}</Chip>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Chip },
    setup: () => ({ sizes: CHIP_SIZE_VALUES }),
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
        <div v-for="s in sizes" :key="s" style="display:flex;flex-direction:column;align-items:center;gap:8px">
          <Chip :size="s" iconLeft="star">Кнопка</Chip>
          <span style="font:12px sans-serif;color:#737373">{{ s }}px</span>
        </div>
      </div>
    `,
  }),
}

export const Compositions: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Chip },
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
        <Chip type="grey">Текст</Chip>
        <Chip type="grey" iconLeft="star">З зіркою</Chip>
        <Chip type="grey" :count="4">З лічильником</Chip>
        <Chip type="grey" iconRight="chevron-down">Фільтр</Chip>
        <Chip type="grey" iconRight="x">Закрити</Chip>
        <Chip type="primary" pill iconLeft="check">Pill</Chip>
        <Chip type="grey" disabled>Disabled</Chip>
      </div>
    `,
  }),
}
