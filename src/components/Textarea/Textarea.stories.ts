import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

import Textarea from './Textarea.vue'

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    rows: { control: { type: 'number', min: 2, max: 12 } },
    maxlength: { control: { type: 'number', min: 10 } },
    resize: { control: 'boolean' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: { label: 'label-text', required: true, maxlength: 1000, helper: 'Допоміжний текст для користувача.' },
  decorators: [() => ({ template: '<div style="width:100%;max-width:320px"><story /></div>' })],
  render: (args) => ({
    components: { Textarea },
    setup() {
      const text = ref(args.modelValue ?? '')
      return { args, text }
    },
    template: `<Textarea v-bind="args" v-model="text" />`,
  }),
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Figma "State": Placeholder / Filled / Destructive / Disabled. */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Textarea },
    setup: () => ({
      a: ref(''),
      b: ref('Будь ласка, зв’яжіться зі мною перед доставкою. Дякую!'),
      c: ref('Будь ласка, зв’яжіться зі мною перед доставкою. Дякую!'),
      d: ref('Будь ласка, зв’яжіться зі мною перед доставкою. Дякую!'),
    }),
    template: `
      <div class="sb-stack" style="width:320px">
        <Textarea label="label-text" required :maxlength="1000" helper="Допоміжний текст для користувача." v-model="a" />
        <Textarea label="label-text" required :maxlength="1000" helper="Допоміжний текст для користувача." v-model="b" />
        <Textarea label="label-text" required :maxlength="1000" error="Є помилка" v-model="c" />
        <Textarea label="label-text" required :maxlength="1000" disabled helper="Допоміжний текст для користувача." v-model="d" />
      </div>
    `,
  }),
}
