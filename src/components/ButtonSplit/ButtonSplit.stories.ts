import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { fn } from 'storybook/test'

import ButtonSplit from './ButtonSplit.vue'
import DropdownItem from '../Dropdown/DropdownItem.vue'
import { BUTTON_SPLIT_SIZES, BUTTON_SPLIT_TYPES } from './button-split.tokens'
import { iconNames } from '../../icons'
import { Matrix } from '../../storybook'

const meta = {
  title: 'Components/ButtonSplit',
  component: ButtonSplit,
  tags: ['autodocs'],
  parameters: {
    figma: '16855:8109',
    docs: {
      description: {
        component:
          'Figma **Button Split** (node 16855:8109): a main action and a chevron that opens a menu (`#menu` ' +
          'slot, receives `close`). Type × Size × Full corner radius; colors and states are Button\'s.',
      },
    },
  },
  argTypes: {
    type: { control: 'select', options: BUTTON_SPLIT_TYPES },
    size: { control: 'inline-radio', options: BUTTON_SPLIT_SIZES },
    iconLeft: { control: 'select', options: ['', ...iconNames] },
  },
  args: { type: 'primary', size: 40, pill: false, label: 'Кнопка', iconLeft: 'border-none', onClick: fn() },
  render: (args) => ({
    components: { ButtonSplit, DropdownItem },
    setup: () => ({ args }),
    template: `
      <ButtonSplit v-bind="args">
        <template #menu="{ close }">
          <DropdownItem @click="close()">Зберегти як чернетку</DropdownItem>
          <DropdownItem @click="close()">Запланувати</DropdownItem>
        </template>
      </ButtonSplit>
    `,
  }),
} satisfies Meta<typeof ButtonSplit>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Types: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { ButtonSplit, Matrix },
    setup: () => ({ types: BUTTON_SPLIT_TYPES, cols: ['default', 'full radius', 'disabled', 'loading'] }),
    template: `
      <Matrix :rows="types" :cols="cols" v-slot="{ row, col }">
        <ButtonSplit :type="row" label="Кнопка" icon-left="border-none"
          :pill="col === 'full radius'" :disabled="col === 'disabled'" :loading="col === 'loading'" />
      </Matrix>
    `,
  }),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { ButtonSplit },
    setup: () => ({ sizes: BUTTON_SPLIT_SIZES }),
    template: `
      <div class="sb-row">
        <ButtonSplit v-for="s in sizes" :key="s" :size="s" label="Кнопка" icon-left="border-none" />
      </div>
    `,
  }),
}
