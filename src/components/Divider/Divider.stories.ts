import type { Meta, StoryObj } from '@storybook/vue3-vite'

import Divider from './Divider.vue'
import Badge from '../Badge/Badge.vue'
import Button from '../Button/Button.vue'
import Icon from '../Icon/Icon.vue'

const meta = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    textStyle: { control: 'inline-radio', options: ['label', 'body', 'caption'] },
    align: { control: 'inline-radio', options: ['left', 'center', 'right'] },
    vertical: { control: 'boolean' },
  },
  args: { label: 'Заголовок', textStyle: 'label', align: 'center' },
  decorators: [() => ({ template: '<div style="width:100%;max-width:480px"><story /></div>' })],
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const OnlyLine: Story = {
  args: { label: '' },
  render: (args) => ({
    components: { Divider },
    setup: () => ({ args }),
    template: `<Divider v-bind="args" />`,
  }),
}

/** Text variants: Label / Body / Caption. */
export const TextStyles: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Divider },
    template: `
      <div style="display:flex;flex-direction:column;gap:32px;width:100%;max-width:480px">
        <Divider text-style="label" label="Заголовок" />
        <Divider text-style="body" label="Текст" />
        <Divider text-style="caption" label="Підпис" />
      </div>
    `,
  }),
}

/** Content variants: icon, button, badge. */
export const WithContent: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Divider, Badge, Button, Icon },
    template: `
      <div style="display:flex;flex-direction:column;gap:32px;width:100%;max-width:480px">
        <Divider><Icon name="star" :size="20" /></Divider>
        <Divider><Button variant="secondary" intent="gray" :size="32">Показати ще</Button></Divider>
        <Divider><Badge color="success" dot>Новинка</Badge></Divider>
      </div>
    `,
  }),
}

/** Alignment of the content. */
export const Alignment: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Divider },
    template: `
      <div style="display:flex;flex-direction:column;gap:32px;width:100%;max-width:480px">
        <Divider align="left" text-style="body" label="Ліворуч" />
        <Divider align="center" text-style="body" label="По центру" />
        <Divider align="right" text-style="body" label="Праворуч" />
      </div>
    `,
  }),
}

/** Vertical divider between inline items. */
export const Vertical: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Divider },
    template: `
      <div style="display:flex;align-items:center;gap:12px;height:24px;font-size:14px;color:var(--text-primary)">
        <span>Один</span>
        <Divider vertical />
        <span>Два</span>
        <Divider vertical />
        <span>Три</span>
      </div>
    `,
  }),
}
