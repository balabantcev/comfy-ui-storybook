import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { fn } from 'storybook/test'

import VerificationCode from './VerificationCode.vue'

const meta = {
  title: 'Components/VerificationCode',
  component: VerificationCode,
  tags: ['autodocs'],
  argTypes: {
    length: { control: { type: 'number', min: 3, max: 8 } },
    size: { control: 'inline-radio', options: [44, 48, 56] },
    disabled: { control: 'boolean' },
  },
  args: { length: 4, size: 56 },
  render: (args) => ({
    components: { VerificationCode },
    setup() {
      const code = ref(args.modelValue ?? '')
      return { args, code, onComplete: fn() }
    },
    template: `<VerificationCode v-bind="args" v-model="code" @complete="onComplete" />`,
  }),
} satisfies Meta<typeof VerificationCode>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { args: { helper: 'Введіть код з SMS.' } }

/** Figma "State": Default / Filled / Destructive / Disabled. */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { VerificationCode },
    setup: () => ({ a: ref(''), b: ref('1234'), c: ref('12'), d: ref('12') }),
    template: `
      <div class="sb-stack">
        <VerificationCode v-model="a" helper="Default" />
        <VerificationCode v-model="b" helper="Filled" />
        <VerificationCode v-model="c" error="Є помилка" />
        <VerificationCode v-model="d" disabled helper="Disabled" />
      </div>
    `,
  }),
}

/** Figma "Size": 56 / 48 / 44, here with a 6-digit code. */
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { VerificationCode },
    setup: () => ({ a: ref('123456'), b: ref('123456'), c: ref('123456') }),
    template: `
      <div class="sb-stack">
        <VerificationCode :length="6" :size="56" v-model="a" />
        <VerificationCode :length="6" :size="48" v-model="b" />
        <VerificationCode :length="6" :size="44" v-model="c" />
      </div>
    `,
  }),
}
