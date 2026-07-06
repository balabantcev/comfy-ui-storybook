import type { Meta, StoryObj } from '@storybook/vue3-vite'

import Logo from './Logo.vue'

const meta = {
  title: 'Components/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    kind: { control: 'inline-radio', options: ['wordmark', 'mark'] },
    variant: { control: 'select', options: ['green', 'white', 'mono', 'modern', 'default'] },
    height: { control: { type: 'range', min: 16, max: 120, step: 1 } },
  },
  args: { kind: 'wordmark', variant: 'green', height: 33 },
  render: (args) => ({
    components: { Logo },
    setup: () => ({ args }),
    template: `<div :style="{ padding: '16px', background: args.variant === 'white' ? '#0a0a0a' : 'transparent', display:'inline-block', borderRadius:'12px' }"><Logo v-bind="args" /></div>`,
  }),
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Wordmark: Story = { args: { kind: 'wordmark', variant: 'green', height: 33 } }
export const Mark: Story = { args: { kind: 'mark', variant: 'modern', height: 48 } }
