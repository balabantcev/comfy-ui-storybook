import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { fn } from 'storybook/test'

import Button from './Button.vue'
import { BUTTON_SIZE_VALUES, BUTTON_VARIANTS, BUTTON_INTENTS } from './button.tokens'
import { iconNames } from '../../icons'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: BUTTON_VARIANTS },
    intent: { control: 'inline-radio', options: BUTTON_INTENTS },
    size: { control: 'select', options: BUTTON_SIZE_VALUES },
    iconLeft: { control: 'select', options: ['', ...iconNames] },
    iconRight: { control: 'select', options: ['', ...iconNames] },
    icon: { control: 'select', options: ['', ...iconNames] },
    subtle: { control: 'boolean' },
    pill: { control: 'boolean' },
    iconOnly: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    variant: 'primary',
    intent: 'brand',
    size: 40,
    onClick: fn(),
  },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: `<Button v-bind="args">{{ args.label ?? 'Button' }}</Button>`,
  }),
} satisfies Meta<typeof Button & { label?: string }>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { label: 'Button' } as any,
}

// --- Variants × intents matrix ---
export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button },
    setup: () => ({ variants: BUTTON_VARIANTS, intents: BUTTON_INTENTS }),
    template: `
      <table style="border-collapse:collapse">
        <thead>
          <tr>
            <th></th>
            <th v-for="i in intents" :key="i" style="padding:12px;text-transform:capitalize;text-align:left;font:500 13px sans-serif;color:#737373">{{ i }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="v in variants" :key="v">
            <td style="padding:12px;text-transform:capitalize;font:500 13px sans-serif;color:#737373">{{ v }}</td>
            <td v-for="i in intents" :key="i" style="padding:12px">
              <Button :variant="v" :intent="i">Button</Button>
            </td>
          </tr>
          <tr>
            <td style="padding:12px;font:500 13px sans-serif;color:#737373">Primary subtle</td>
            <td v-for="i in intents" :key="i" style="padding:12px">
              <Button variant="primary" subtle :intent="i">Button</Button>
            </td>
          </tr>
        </tbody>
      </table>
    `,
  }),
}

// --- Sizes ---
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button },
    setup: () => ({ sizes: BUTTON_SIZE_VALUES.filter((s) => s >= 32) }),
    template: `
      <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
        <div v-for="s in sizes" :key="s" style="display:flex;flex-direction:column;align-items:center;gap:8px">
          <Button :size="s" iconLeft="plus">Button</Button>
          <span style="font:12px sans-serif;color:#737373">{{ s }}px</span>
        </div>
      </div>
    `,
  }),
}

// --- States ---
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button },
    template: `
      <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center">
        <Button>Default</Button>
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
        <Button iconLeft="download">With icon</Button>
        <Button iconRight="arrow-right">Trailing icon</Button>
      </div>
    `,
  }),
}

// --- Icon-only & pill ---
export const IconOnly: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button },
    setup: () => ({ sizes: BUTTON_SIZE_VALUES.filter((s) => s >= 32) }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px">
        <div style="display:flex;gap:12px;align-items:center">
          <Button v-for="s in sizes" :key="s" :size="s" icon="plus" />
        </div>
        <div style="display:flex;gap:12px;align-items:center">
          <Button v-for="s in sizes" :key="s" :size="s" icon="heart" pill intent="brand" />
        </div>
      </div>
    `,
  }),
}
