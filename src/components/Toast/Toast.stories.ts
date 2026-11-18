import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { fn } from 'storybook/test'

import Toast from './Toast.vue'
import { ALERT_ICON_STYLES, ALERT_VARIANTS } from '../Alert/alert.tokens'

const meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    figma: '15423:13721',
    docs: {
      description: {
        component:
          'Figma **Alert & Toast / Toast** (node 15423:13721). An Alert with elevation E300: one row on ' +
          'Desktop, stacked on Mobile (`breakpoint` auto switches below 768px). Placement, stacking and ' +
          'auto-dismiss belong to the app.',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ALERT_VARIANTS },
    iconStyle: { control: 'inline-radio', options: ALERT_ICON_STYLES },
    breakpoint: { control: 'inline-radio', options: ['auto', 'desktop', 'mobile'] },
  },
  args: {
    variant: 'default',
    iconStyle: 'default',
    breakpoint: 'auto',
    title: 'Успішно! Ваші зміни збережено.',
    description: 'Це сповіщення з назвою та описом.',
    dismissLabel: 'Відхилити',
    actionLabel: 'Детальніше',
    closable: true,
    onClose: fn(),
    onDismiss: fn(),
    onAction: fn(),
  },
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Desktop: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Toast },
    setup: () => ({ variants: ALERT_VARIANTS, styles: ALERT_ICON_STYLES }),
    template: `
      <div class="sb-stack">
        <template v-for="s in styles" :key="s">
          <Toast
            v-for="v in variants" :key="s + v" :variant="v" :icon-style="s" breakpoint="desktop"
            title="Успішно! Ваші зміни збережено." description="Це сповіщення з назвою та описом."
            dismiss-label="Відхилити" action-label="Детальніше"
          />
        </template>
      </div>
    `,
  }),
}

export const Mobile: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Toast },
    setup: () => ({ variants: ALERT_VARIANTS }),
    template: `
      <div class="sb-stack sb-mobile-frame">
        <Toast
          v-for="(v, i) in variants" :key="v" :variant="v" :icon-style="i % 2 ? 'featured' : 'default'" breakpoint="mobile"
          title="Успішно! Ваші зміни збережено." description="Це сповіщення з назвою та описом."
          dismiss-label="Відхилити" action-label="Детальніше"
        />
      </div>
    `,
  }),
}
