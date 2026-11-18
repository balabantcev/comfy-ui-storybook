import type { Meta, StoryObj } from '@storybook/vue3-vite'

import ProgressSteps from './ProgressSteps.vue'
import StepIcon from './StepIcon.vue'
import { PROGRESS_STEPS_SIZES, PROGRESS_STEPS_TYPES, PROGRESS_STEPS_VARIANTS, type ProgressStep } from './progress-steps.tokens'
import { Matrix } from '../../storybook'

const steps: ProgressStep[] = [
  { title: 'Ваші дані', description: 'Ім’я та контакти', icon: 'user-check' },
  { title: 'Доставка', description: 'Адреса й спосіб', icon: 'navigation' },
  { title: 'Оплата', description: 'Картка або післяплата', icon: 'receipt-text-color' },
  { title: 'Підтвердження', description: 'Перевірте замовлення', icon: 'check-circle' },
]

const meta = {
  title: 'Components/ProgressSteps',
  component: ProgressSteps,
  tags: ['autodocs'],
  parameters: {
    figma: '15766:4297',
    docs: {
      description: {
        component:
          'Figma **Progress steps**. `type` icon | number | featured | line × `size` s | m; `layout` horizontal ' +
          '(Desktop: … top) or vertical (Mobile / "Only vertical": … left), `auto` switches at 768px; ' +
          '`variant` minimal / connected = "Minimal icons". Statuses follow `current`.',
      },
    },
  },
  argTypes: {
    type: { control: 'inline-radio', options: PROGRESS_STEPS_TYPES },
    size: { control: 'inline-radio', options: PROGRESS_STEPS_SIZES },
    layout: { control: 'inline-radio', options: ['auto', 'horizontal', 'vertical'] },
    variant: { control: 'inline-radio', options: PROGRESS_STEPS_VARIANTS },
    current: { control: { type: 'number', min: 0, max: 4 } },
  },
  args: { steps, current: 1, type: 'icon', size: 's', layout: 'auto', variant: 'default' },
} satisfies Meta<typeof ProgressSteps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Figma Breakpoint=Desktop: every Type, S and M. */
export const Horizontal: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { ProgressSteps },
    setup: () => ({ steps, types: PROGRESS_STEPS_TYPES, sizes: PROGRESS_STEPS_SIZES }),
    template: `
      <div class="sb-stack sb-wide">
        <template v-for="t in types" :key="t">
          <ProgressSteps v-for="s in sizes" :key="t + s" :steps="steps" :current="1" :type="t" :size="s" layout="horizontal" :label="t + ' ' + s" />
        </template>
      </div>
    `,
  }),
}

/** Figma Breakpoint=Mobile / "Only vertical". */
export const Vertical: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { ProgressSteps },
    setup: () => ({ steps, types: PROGRESS_STEPS_TYPES }),
    template: `
      <div class="sb-row">
        <div v-for="t in types" :key="t" class="sb-mobile-frame">
          <ProgressSteps :steps="steps" :current="1" :type="t" layout="vertical" :label="t" />
        </div>
      </div>
    `,
  }),
}

/** "Progress steps-Minimal icons" and "-Connected". */
export const Minimal: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { ProgressSteps },
    setup: () => ({ steps }),
    template: `
      <div class="sb-stack sb-wide">
        <ProgressSteps variant="minimal" :steps="steps" :current="2" label="minimal check" />
        <ProgressSteps variant="minimal" type="number" size="m" :steps="steps" :current="2" label="minimal number" />
        <ProgressSteps variant="connected" :steps="steps" :current="2" label="connected" />
      </div>
    `,
  }),
}

/** Figma "-Step icon base": Type × Status × 24 / 32. */
export const StepIcons: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { StepIcon, Matrix },
    setup: () => ({ rows: ['check 24', 'check 32', 'number 24', 'number 32'], cols: ['incomplete', 'current', 'complete'] }),
    template: `
      <Matrix :rows="rows" :cols="cols" v-slot="{ row, col }">
        <StepIcon :type="row.split(' ')[0]" :size="parseInt(row.split(' ')[1])" :status="col" />
      </Matrix>
    `,
  }),
}
