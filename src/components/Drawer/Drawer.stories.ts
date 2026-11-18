import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { fn } from 'storybook/test'
import { ref } from 'vue'

import Drawer from './Drawer.vue'
import Button from '../Button/Button.vue'
import Checkbox from '../Checkbox/Checkbox.vue'

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    figma: '15846:1966',
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 560 },
      description: {
        component:
          'Figma **Drawer** = -Drawer header + Slot + -Drawer footer. Desktop: a 700px panel on the right ' +
          '(radius 16, E400); Mobile: full screen with shared-width buttons (`breakpoint` auto switches at ' +
          '768px). Escape, the backdrop and × close it; focus moves into the panel and back to the trigger.',
      },
    },
  },
  args: {
    title: 'Заголовок',
    description: 'Підзаголовок з коротким описом',
    breakpoint: 'auto',
    onConfirm: fn(),
    onCancel: fn(),
  },
  argTypes: { breakpoint: { control: 'inline-radio', options: ['auto', 'desktop', 'mobile'] } },
  render: (args) => ({
    components: { Drawer, Button },
    setup: () => ({ args, open: ref(true) }),
    template: `
      <div class="sb-pad">
        <Button variant="secondary" intent="gray" @click="open = true">Відкрити drawer</Button>
        <Drawer v-bind="args" v-model="open">
          <p v-for="i in 12" :key="i" style="margin: 0">Абзац {{ i }} — вміст прокручується між шапкою й футером.</p>
        </Drawer>
      </div>
    `,
  }),
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Mobile: Story = { args: { breakpoint: 'mobile' } }

/** Figma header "Icon" + "Slot header", footer slot above the actions. */
export const WithIconAndSlots: Story = {
  args: { icon: 'receipt-text-color' },
  render: (args) => ({
    components: { Drawer, Button, Checkbox },
    setup: () => ({ args, open: ref(true), agree: ref(false) }),
    template: `
      <div class="sb-pad">
        <Button variant="secondary" intent="gray" @click="open = true">Відкрити drawer</Button>
        <Drawer v-bind="args" v-model="open" title="Фільтри замовлень" description="Оберіть параметри">
          <template #header><span class="sb-caption">Слот шапки: наприклад, пошук або вкладки</span></template>
          <p style="margin: 0">Вміст drawer.</p>
          <template #footer><Checkbox v-model="agree" :size="16" label="Запамʼятати вибір" /></template>
        </Drawer>
      </div>
    `,
  }),
}
