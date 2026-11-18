import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { fn } from 'storybook/test'

import Alert from './Alert.vue'
import { ALERT_ICON_STYLES, ALERT_VARIANTS } from './alert.tokens'
import { iconNames } from '../../icons'

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Figma **Alert & Toast / Alert** (node 12231:4230). Color × Variant icon (20px glyph or a 32px ' +
          'Outline Featured icon); Link gray + accent actions; optional × button.',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ALERT_VARIANTS },
    iconStyle: { control: 'inline-radio', options: ALERT_ICON_STYLES },
    icon: { control: 'select', options: iconNames },
    role: { control: 'inline-radio', options: ['alert', 'status'] },
  },
  args: {
    variant: 'default',
    iconStyle: 'default',
    title: 'Успішно! Ваші зміни збережено.',
    description: 'Це сповіщення з назвою та описом.',
    dismissLabel: 'Відхилити',
    actionLabel: 'Детальніше',
    closable: true,
    onClose: fn(),
    onDismiss: fn(),
    onAction: fn(),
  },
  decorators: [() => ({ template: '<div class="sb-alert-frame"><story /></div>' })],
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Figma Color × Variant icon. */
export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Alert },
    setup: () => ({ variants: ALERT_VARIANTS, styles: ALERT_ICON_STYLES }),
    template: `
      <div class="sb-stack">
        <template v-for="s in styles" :key="s">
          <Alert
            v-for="v in variants" :key="s + v" :variant="v" :icon-style="s"
            title="З цією дією виникла проблема"
            description="Це сповіщення з назвою та описом."
            dismiss-label="Відхилити" action-label="Детальніше" closable
          />
        </template>
      </div>
    `,
  }),
}

/** Figma booleans: Title / Description / Button control / Button-X / Show Icon. */
export const Compositions: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Alert },
    template: `
      <div class="sb-stack">
        <Alert title="Успішно! Ваші зміни збережено." />
        <Alert title="Успішно! Ваші зміни збережено." description="Це сповіщення з назвою та описом." />
        <Alert description="Лише опис, без заголовка." :show-icon="false" closable />
        <Alert
          variant="success" icon-style="featured" icon="check-circle"
          title="Успішно! Ваші зміни збережено."
          description="Це сповіщення з назвою та описом."
          dismiss-label="Відхилити" action-label="Детальніше"
        />
      </div>
    `,
  }),
}
