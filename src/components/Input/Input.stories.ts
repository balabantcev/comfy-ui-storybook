import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

import Input from './Input.vue'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: [44, 48, 56] },
    required: { control: 'boolean' },
    help: { control: 'boolean' },
    clearable: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'label-text',
    helper: 'Допоміжний текст для користувача.',
    required: true,
    size: 56,
  },
  decorators: [() => ({ template: '<div style="width:100%;max-width:320px"><story /></div>' })],
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref(args.modelValue ?? '')
      return { args, value }
    },
    template: `<Input v-bind="args" v-model="value" />`,
  }),
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Filled: Story = { args: { modelValue: 'designer@comfy.ua', help: true, clearable: true } }

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Input },
    setup() {
      return {
        empty: ref(''),
        filled: ref('Текст значення'),
        err: ref('designer'),
        dis: ref('Вимкнене поле'),
      }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:20px;width:100%;max-width:320px">
        <Input label="Default" required helper="Допоміжний текст для опису поля" v-model="empty" />
        <Input label="Filled" v-model="filled" help clearable helper="Допоміжний текст для опису поля" />
        <Input label="Error" v-model="err" error="Введіть коректну адресу пошти." />
        <Input label="Disabled" disabled v-model="dis" />
      </div>
    `,
  }),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Input },
    setup: () => ({ v56: ref('56 px'), v48: ref('48 px'), v44: ref('44 px') }),
    template: `
      <div style="display:flex;flex-direction:column;gap:20px;width:100%;max-width:320px">
        <Input :size="56" label="56 px" v-model="v56" />
        <Input :size="48" label="48 px" v-model="v48" />
        <Input :size="44" label="44 px" v-model="v44" />
      </div>
    `,
  }),
}

/** Figma "Type": Default / Phone number / Price. */
export const Types: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Input },
    setup: () => ({
      search: ref(''),
      phone: ref('974201721'),
      emptyPhone: ref(''),
      country: ref('UA'),
      countries: [{ code: 'UA', dial: '+380' }, { code: 'EN', dial: '+44' }],
      price: ref('44444444'),
      currency: ref('UAH'),
      currencies: ['UAH', 'USD', 'EUR'],
    }),
    template: `
      <div style="display:flex;flex-direction:column;gap:20px;width:100%;max-width:320px">
        <Input label="Пошук" icon="search" clearable v-model="search" />
        <Input kind="phone" required help helper="Допоміжний текст для користувача." v-model="emptyPhone" />
        <Input kind="phone" help :countries="countries" v-model:country="country" v-model="phone" :helper="'Значення моделі: ' + phone" />
        <Input kind="price" label="Сума" required help :currencies="currencies" v-model:currency="currency" v-model="price" :helper="'Значення моделі: ' + price + ' ' + currency" />
      </div>
    `,
  }),
}
