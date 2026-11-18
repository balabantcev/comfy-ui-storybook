import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { fn, expect, userEvent, within } from 'storybook/test'

import Button from './Button.vue'
import { BUTTON_SIZE_VALUES, BUTTON_VARIANTS, BUTTON_INTENTS, isSupportedButton } from './button.tokens'
import { iconNames } from '../../icons'
import { Matrix, Specimen } from '../../storybook'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { figma: '11111:282' },
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
  // Interaction test: clicking fires onClick.
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Button' })
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalled()
  },
}

// Disabled button must not fire onClick.
export const DisabledDoesNotClick: Story = {
  args: { label: 'Button', disabled: true } as any,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Button' })
    await userEvent.click(button)
    await expect(args.onClick).not.toHaveBeenCalled()
  },
}

// --- Variants × intents matrix (only combinations that exist in Figma 1.1.0) ---
export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button, Matrix },
    setup: () => ({
      variants: [...BUTTON_VARIANTS, 'Primary subtle'],
      intents: BUTTON_INTENTS,
      supported: (row: string, col: any) =>
        row === 'Primary subtle' ? isSupportedButton('primary', col, true) : isSupportedButton(row as any, col),
    }),
    template: `
      <Matrix :rows="variants" :cols="intents" v-slot="{ row, col }">
        <span v-if="!supported(row, col)" class="sb-caption">—</span>
        <Button v-else-if="row === 'Primary subtle'" variant="primary" subtle :intent="col">Button</Button>
        <Button v-else :variant="row" :intent="col">Button</Button>
      </Matrix>
    `,
  }),
}

// --- Sizes ---
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button, Specimen },
    setup: () => ({ sizes: BUTTON_SIZE_VALUES.filter((s) => s >= 32) }),
    template: `
      <div class="sb-row">
        <Specimen v-for="s in sizes" :key="s" :caption="s + 'px'">
          <Button :size="s" iconLeft="plus">Button</Button>
        </Specimen>
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
      <div class="sb-row">
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
      <div class="sb-stack">
        <div class="sb-row">
          <Button v-for="s in sizes" :key="s" :size="s" icon="plus" />
        </div>
        <div class="sb-row">
          <Button v-for="s in sizes" :key="s" :size="s" icon="heart" pill intent="brand" />
        </div>
      </div>
    `,
  }),
}
