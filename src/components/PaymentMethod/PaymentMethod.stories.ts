import type { Meta, StoryObj } from '@storybook/vue3-vite'

import PaymentMethod from './PaymentMethod.vue'
import { PAYMENT_METHOD_NAMES, PAYMENT_METHOD_SIZES } from './payment-method.tokens'
import { Matrix } from '../../storybook'

const meta = {
  title: 'Components/PaymentMethod',
  component: PaymentMethod,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Figma **Misc icons / Payment method icon** (node 13618:494). A white card (`bg-white-solid`, ' +
          '`border-secondary`) with the brand logo, 34×24 or 46×32.',
      },
    },
  },
  argTypes: {
    method: { control: 'select', options: PAYMENT_METHOD_NAMES },
    size: { control: 'inline-radio', options: PAYMENT_METHOD_SIZES },
  },
  args: { method: 'visa', size: 32 },
} satisfies Meta<typeof PaymentMethod>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const All: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { PaymentMethod, Matrix },
    setup: () => ({ methods: PAYMENT_METHOD_NAMES, sizes: PAYMENT_METHOD_SIZES.map((s) => `${s}px`) }),
    template: `
      <Matrix :rows="methods" :cols="sizes" v-slot="{ row, col }">
        <PaymentMethod :method="row" :size="parseInt(col)" />
      </Matrix>
    `,
  }),
}
