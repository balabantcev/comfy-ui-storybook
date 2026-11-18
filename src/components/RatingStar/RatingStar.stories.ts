import type { Meta, StoryObj } from '@storybook/vue3-vite'

import RatingStar from './RatingStar.vue'
import { RATING_STAR_COLORS, RATING_STAR_FILLS, starFill } from './rating-star.tokens'
import { Matrix, Specimen } from '../../storybook'

const meta = {
  title: 'Components/RatingStar',
  component: RatingStar,
  tags: ['autodocs'],
  parameters: {
    figma: '12552:45',
    docs: {
      description: {
        component:
          'Figma **Misc icons / Rating star** (node 12552:45). One star filled 0–100 %; build a rating ' +
          'from several (`starFill(value, i)` in `rating-star.tokens.ts`).',
      },
    },
  },
  argTypes: {
    fill: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    color: { control: 'inline-radio', options: RATING_STAR_COLORS },
    size: { control: { type: 'number', min: 12, max: 64 } },
  },
  args: { fill: 50, color: 'orange', size: 20 },
} satisfies Meta<typeof RatingStar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Fills: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { RatingStar, Matrix },
    setup: () => ({ colors: RATING_STAR_COLORS, fills: RATING_STAR_FILLS.map((f) => `${f}%`) }),
    template: `
      <Matrix :rows="colors" :cols="fills" v-slot="{ row, col }">
        <RatingStar :color="row" :fill="parseInt(col)" />
      </Matrix>
    `,
  }),
}

/** Five stars for a rating value — the usual composition. */
export const Rating: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { RatingStar, Specimen },
    setup: () => ({ values: [4.7, 3.3, 1], starFill }),
    template: `
      <div class="sb-stack">
        <Specimen v-for="v in values" :key="v" :caption="v + ' з 5'">
          <span role="img" :aria-label="'Рейтинг ' + v + ' з 5'" style="display:inline-flex; gap: var(--padding-2)">
            <RatingStar v-for="i in 5" :key="i" :fill="starFill(v, i - 1)" />
          </span>
        </Specimen>
      </div>
    `,
  }),
}
