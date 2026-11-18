import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { fn } from 'storybook/test'

import AlertDialog from './AlertDialog.vue'
import Button from '../Button/Button.vue'
import Input from '../Input/Input.vue'
import { iconNames } from '../../icons'

const meta = {
  title: 'Components/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
  parameters: { figma: '12488:888' },
  argTypes: {
    align: { control: 'inline-radio', options: ['left', 'center', 'horizontal'] },
    overlay: { control: 'boolean' },
    breakpoint: { control: 'inline-radio', options: ['auto', 'desktop', 'mobile'] },
    checkboxLabel: { control: 'text' },
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

/** Figma "Aligned" × "Destructive", shown inline (Figma Background=False). */
export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { AlertDialog },
    setup: () => ({ dontShow: ref(false) }),
    template: `
      <div class="sb-stack" style="align-items:flex-start">
        <div class="sb-row" style="align-items:flex-start">
          <AlertDialog :model-value="true" :overlay="false" title="Заголовок" description="Це сповіщення з назвою та описом." />
          <AlertDialog :model-value="true" :overlay="false" align="center" title="Заголовок" description="Це сповіщення з назвою та описом." />
        </div>
        <div class="sb-row" style="align-items:flex-start">
          <AlertDialog :model-value="true" :overlay="false" destructive title="Видалити елемент?" description="Цю дію не можна скасувати." confirm-label="Видалити" />
          <AlertDialog :model-value="true" :overlay="false" align="center" destructive title="Видалити елемент?" description="Цю дію не можна скасувати." confirm-label="Видалити" />
        </div>
        <AlertDialog
          :model-value="true" :overlay="false" align="horizontal"
          title="Заголовок" description="Це сповіщення з назвою та описом."
          checkbox-label="Не показувати знову" v-model:checked="dontShow"
        />
      </div>
    `,
  }),
}

/** Figma "Breakpoint=Mobile": full width, stacked actions (primary on top), checkbox below. */
export const Mobile: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { AlertDialog },
    setup: () => ({ dontShow: ref(false) }),
    template: `
      <div class="sb-row" style="align-items:flex-start">
        <div style="width:343px"><AlertDialog :model-value="true" :overlay="false" breakpoint="mobile" title="Заголовок" description="Це сповіщення з назвою та описом." /></div>
        <div style="width:343px"><AlertDialog :model-value="true" :overlay="false" breakpoint="mobile" align="horizontal" checkbox-label="Не показувати знову" v-model:checked="dontShow" title="Заголовок" description="Це сповіщення з назвою та описом." /></div>
      </div>
    `,
  }),
}

/** Figma "↳ Slot": custom content between the header and the actions. */
export const WithSlot: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { AlertDialog, Input },
    setup: () => ({ name: ref('') }),
    template: `
      <AlertDialog :model-value="true" :overlay="false" title="Перейменувати список" description="Нова назва буде видна всім учасникам." confirm-label="Зберегти">
        <template #body><Input label="Назва" v-model="name" :size="48" /></template>
      </AlertDialog>
    `,
  }),
}
