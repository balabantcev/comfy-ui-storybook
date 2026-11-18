import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { fn } from 'storybook/test'

import Tooltip from './Tooltip.vue'
import Button from '../Button/Button.vue'
import Icon from '../Icon/Icon.vue'

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: { figma: '11111:3948' },
  argTypes: {
    placement: { control: 'inline-radio', options: ['top', 'bottom', 'left', 'right'] },
    align: { control: 'inline-radio', options: ['start', 'center', 'end'] },
    arrow: { control: 'boolean' },
    open: { control: 'boolean' },
  },
  args: { text: 'Підказка', placement: 'top', open: true },
  decorators: [
    () => ({ template: '<div style="display:flex;justify-content:center;padding:140px 40px"><story /></div>' }),
  ],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

/** Small tooltip on hover over a button. */
export const Playground: Story = {
  args: { open: false },
  render: (args) => ({
    components: { Tooltip, Button },
    setup: () => ({ args }),
    template: `
      <Tooltip v-bind="args">
        <Button variant="secondary" intent="gray">Наведи на мене</Button>
      </Tooltip>
    `,
  }),
}

/** Rich tooltip: title + description + action link. */
export const Rich: Story = {
  args: {
    text: undefined,
    title: 'Підказка',
    description:
      'Підказки використовуються для опису або ідентифікації елемента. У більшості випадків вони допомагають користувачеві зрозуміти значення, функцію або альтернативний текст елемента.',
    actionLabel: 'Кнопка',
    placement: 'top',
    open: true,
  },
  render: (args) => ({
    components: { Tooltip, Icon },
    setup: () => ({ args, onAction: fn() }),
    template: `
      <Tooltip v-bind="args" @action="onAction">
        <Icon name="help-circle" :size="20" style="color: var(--icon-tertiary)" />
      </Tooltip>
    `,
  }),
}

/** All four placements. */
export const Placements: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Tooltip, Button },
    template: `
      <div style="display:flex;gap:96px;align-items:center">
        <Tooltip text="Зверху" placement="top" open><Button :size="32" variant="secondary" intent="gray">Top</Button></Tooltip>
        <Tooltip text="Знизу" placement="bottom" open><Button :size="32" variant="secondary" intent="gray">Bottom</Button></Tooltip>
        <Tooltip text="Ліворуч" placement="left" open><Button :size="32" variant="secondary" intent="gray">Left</Button></Tooltip>
        <Tooltip text="Праворуч" placement="right" open><Button :size="32" variant="secondary" intent="gray">Right</Button></Tooltip>
      </div>
    `,
  }),
}

/** Help icon pattern — hover the icon. */
export const HelpIcon: Story = {
  args: { open: false },
  render: () => ({
    components: { Tooltip, Icon },
    template: `
      <Tooltip text="Підказка" placement="top">
        <Icon name="help-circle" :size="20" style="color: var(--icon-tertiary); cursor: help" tabindex="0" />
      </Tooltip>
    `,
  }),
}

/** Without the arrow. */
export const NoArrow: Story = {
  args: { arrow: false, open: true },
  render: (args) => ({
    components: { Tooltip, Button },
    setup: () => ({ args }),
    template: `
      <Tooltip v-bind="args">
        <Button :size="32" variant="secondary" intent="gray">Без стрілки</Button>
      </Tooltip>
    `,
  }),
}
