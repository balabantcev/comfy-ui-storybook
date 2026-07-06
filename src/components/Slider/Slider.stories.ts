import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { fn } from 'storybook/test'

import Slider from './Slider.vue'

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    labels: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: { min: 0, max: 100, step: 1, labels: true },
  decorators: [() => ({ template: '<div style="width:100%;max-width:320px;padding:8px 0 28px"><story /></div>' })],
}  satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

/** Range slider (two thumbs). */
export const Range: Story = {
  render: (args) => ({
    components: { Slider },
    setup() {
      const value = ref([0, 100])
      return { args, value, onUpdate: fn() }
    },
    template: `<Slider v-bind="args" v-model="value" :format="(v) => v + '%'" @update:modelValue="onUpdate" />`,
  }),
}

/** Single value (one thumb). */
export const Single: Story = {
  render: (args) => ({
    components: { Slider },
    setup() {
      const value = ref(40)
      return { args, value }
    },
    template: `<Slider v-bind="args" v-model="value" :format="(v) => v + '%'" />`,
  }),
}

export const NoLabels: Story = {
  args: { labels: false },
  render: (args) => ({
    components: { Slider },
    setup: () => ({ args, value: ref([25, 75]) }),
    template: `<Slider v-bind="args" v-model="value" />`,
  }),
}

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => ({
    components: { Slider },
    setup: () => ({ args, value: ref([20, 60]) }),
    template: `<Slider v-bind="args" v-model="value" :format="(v) => v + '%'" />`,
  }),
}
