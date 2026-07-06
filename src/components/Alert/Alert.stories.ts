import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { fn } from 'storybook/test'

import Alert from './Alert.vue'
import { iconNames } from '../../icons'

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'success', 'warning', 'error'] },
    icon: { control: 'select', options: ['', ...iconNames] },
    showIcon: { control: 'boolean' },
    closable: { control: 'boolean' },
  },
  args: {
    variant: 'default',
    title: 'Успішно! Ваші зміни збережено.',
    description: 'Це сповіщення з назвою та описом.',
    dismissLabel: 'Відхилити',
    actionLabel: 'Детальніше',
    closable: true,
    onClose: fn(),
    onDismiss: fn(),
    onAction: fn(),
  },
  decorators: [
    () => ({ template: '<div style="max-width:440px"><story /></div>' }),
  ],
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Alert },
    setup: () => ({ variants: ['default', 'success', 'warning', 'error'] as const }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:440px">
        <Alert
          v-for="v in variants" :key="v" :variant="v"
          title="З цією дією виникла проблема"
          description="Це сповіщення з назвою та описом."
          dismissLabel="Відхилити" actionLabel="Детальніше" closable
        />
      </div>
    `,
  }),
}

export const Compositions: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Alert },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:440px">
        <Alert title="Успішно! Ваші зміни збережено." :closable="false" />
        <Alert title="Успішно! Ваші зміни збережено." description="Це сповіщення з назвою та описом." :closable="false" />
        <Alert
          title="Успішно! Ваші зміни збережено."
          description="Це сповіщення з назвою та описом."
          dismissLabel="Відхилити" actionLabel="Детальніше" :closable="false"
        />
        <Alert
          variant="error"
          title="З цією дією виникла проблема"
          description="Це сповіщення з назвою та описом."
          dismissLabel="Відхилити" actionLabel="Детальніше" closable
        />
      </div>
    `,
  }),
}
