import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { fn } from 'storybook/test'

import ButtonGroup from './ButtonGroup.vue'
import ButtonGroupItem from './ButtonGroupItem.vue'

const SIZES = [32, 40, 44, 48, 56]

const meta = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  subcomponents: { ButtonGroupItem },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: SIZES },
  },
  args: { size: 40 },
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => ({
    components: { ButtonGroup, ButtonGroupItem },
    setup: () => ({ args, onClick: fn() }),
    template: `
      <ButtonGroup v-bind="args">
        <ButtonGroupItem @click="onClick">Текст</ButtonGroupItem>
        <ButtonGroupItem @click="onClick">Текст</ButtonGroupItem>
        <ButtonGroupItem @click="onClick">Текст</ButtonGroupItem>
        <ButtonGroupItem @click="onClick">Текст</ButtonGroupItem>
      </ButtonGroup>
    `,
  }),
}

/** Text, icon + text, and icon-only compositions. */
export const Compositions: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { ButtonGroup, ButtonGroupItem },
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;align-items:flex-start">
        <ButtonGroup :size="40">
          <ButtonGroupItem>Текст</ButtonGroupItem>
          <ButtonGroupItem>Текст</ButtonGroupItem>
          <ButtonGroupItem>Текст</ButtonGroupItem>
        </ButtonGroup>

        <ButtonGroup :size="40">
          <ButtonGroupItem icon="layout-list">Список</ButtonGroupItem>
          <ButtonGroupItem icon="grid-2x2">Сітка</ButtonGroupItem>
          <ButtonGroupItem icon="dots">Ще</ButtonGroupItem>
        </ButtonGroup>

        <ButtonGroup :size="40">
          <ButtonGroupItem icon="align-left" />
          <ButtonGroupItem icon="align-center" />
          <ButtonGroupItem icon="align-right" />
        </ButtonGroup>
      </div>
    `,
  }),
}

/** All sizes. */
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { ButtonGroup, ButtonGroupItem },
    setup: () => ({ sizes: SIZES }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">
        <div v-for="s in sizes" :key="s" style="display:flex;align-items:center;gap:12px">
          <ButtonGroup :size="s">
            <ButtonGroupItem>Один</ButtonGroupItem>
            <ButtonGroupItem>Два</ButtonGroupItem>
            <ButtonGroupItem>Три</ButtonGroupItem>
          </ButtonGroup>
          <span style="font:12px sans-serif;color:#737373">{{ s }}px</span>
        </div>
      </div>
    `,
  }),
}

/** Disabled segment. */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { ButtonGroup, ButtonGroupItem },
    template: `
      <ButtonGroup :size="40">
        <ButtonGroupItem>Активна</ButtonGroupItem>
        <ButtonGroupItem disabled>Вимкнена</ButtonGroupItem>
        <ButtonGroupItem>Активна</ButtonGroupItem>
      </ButtonGroup>
    `,
  }),
}
