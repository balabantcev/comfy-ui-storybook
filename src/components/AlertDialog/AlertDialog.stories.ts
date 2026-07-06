import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { fn } from 'storybook/test'

import AlertDialog from './AlertDialog.vue'
import Button from '../Button/Button.vue'
import { iconNames } from '../../icons'

const meta = {
  title: 'Components/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
  argTypes: {
    align: { control: 'inline-radio', options: ['left', 'center'] },
    actionsLayout: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    icon: { control: 'select', options: ['', ...iconNames] },
    destructive: { control: 'boolean' },
    closable: { control: 'boolean' },
    divider: { control: 'boolean' },
    showIcon: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  args: {
    title: 'Заголовок',
    description: 'Це сповіщення з назвою та описом.',
    confirmLabel: 'Підтвердити',
    cancelLabel: 'Скасувати',
    align: 'left',
    actionsLayout: 'horizontal',
    onConfirm: fn(),
    onCancel: fn(),
    onClose: fn(),
  },
} satisfies Meta<typeof AlertDialog>

export default meta
type Story = StoryObj<typeof meta>

/** Interactive — open with the trigger button. */
export const Playground: Story = {
  render: (args) => ({
    components: { AlertDialog, Button },
    setup() {
      const open = ref(false)
      return { args, open }
    },
    template: `
      <Button @click="open = true">Open dialog</Button>
      <AlertDialog v-bind="args" v-model="open" />
    `,
  }),
}

/** Confirmation dialog (non-destructive), open by default. */
export const Confirmation: Story = {
  args: { modelValue: true },
  render: (args) => ({
    components: { AlertDialog },
    setup: () => ({ args }),
    template: `<AlertDialog v-bind="args" />`,
  }),
}

/** Destructive confirmation (red confirm button + alert icon). */
export const Destructive: Story = {
  args: {
    modelValue: true,
    destructive: true,
    title: 'Видалити елемент?',
    description: 'Цю дію не можна скасувати.',
    confirmLabel: 'Видалити',
  },
  render: (args) => ({
    components: { AlertDialog },
    setup: () => ({ args }),
    template: `<AlertDialog v-bind="args" />`,
  }),
}

/** Centered alignment with vertically stacked actions. */
export const Centered: Story = {
  args: { modelValue: true, align: 'center', actionsLayout: 'vertical' },
  render: (args) => ({
    components: { AlertDialog },
    setup: () => ({ args }),
    template: `<AlertDialog v-bind="args" />`,
  }),
}
