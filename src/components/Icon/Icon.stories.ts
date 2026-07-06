import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref, computed } from 'vue'

import Icon from './Icon.vue'
import { icons, iconNames, categories } from '../../icons'

const meta = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'select', options: iconNames },
    size: { control: { type: 'range', min: 12, max: 96, step: 2 } },
    color: { control: 'color' },
  },
  args: {
    name: 'arrow-up',
    size: 32,
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Sizes: Story = {
  render: (args) => ({
    components: { Icon },
    setup: () => ({ args, sizes: [16, 20, 24, 32, 48, 64] }),
    template: `
      <div style="display:flex;align-items:flex-end;gap:24px;flex-wrap:wrap">
        <div v-for="s in sizes" :key="s" style="display:flex;flex-direction:column;align-items:center;gap:8px">
          <Icon :name="args.name" :size="s" :color="args.color" />
          <span style="font-size:12px;color:#737373">{{ s }}px</span>
        </div>
      </div>
    `,
  }),
}

export const Gallery: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Icon },
    setup() {
      const query = ref('')
      const groups = computed(() => {
        const q = query.value.trim().toLowerCase()
        return categories
          .map((cat) => ({
            cat,
            items: icons.filter(
              (i) => i.category === cat && (!q || i.name.toLowerCase().includes(q)),
            ),
          }))
          .filter((g) => g.items.length > 0)
      })
      const total = computed(() => groups.value.reduce((n, g) => n + g.items.length, 0))
      return { query, groups, total, all: icons.length }
    },
    template: `
      <div style="font-family:sans-serif">
        <input
          v-model="query"
          placeholder="Search icons…"
          style="width:100%;max-width:320px;padding:8px 12px;border:1px solid #e5e5e5;border-radius:8px;margin-bottom:8px;font-size:14px"
        />
        <div style="font-size:12px;color:#737373;margin-bottom:20px">{{ total }} / {{ all }} icons</div>

        <section v-for="g in groups" :key="g.cat" style="margin-bottom:32px">
          <h3 style="text-transform:capitalize;border-bottom:1px solid #e5e5e5;padding-bottom:8px;margin-bottom:16px">
            {{ g.cat }} <span style="color:#a3a3a3;font-weight:400">({{ g.items.length }})</span>
          </h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:8px">
            <div
              v-for="it in g.items"
              :key="it.name"
              :title="it.name"
              @click="copy(it.name)"
              style="display:flex;flex-direction:column;align-items:center;gap:8px;padding:16px 8px;border:1px solid #f5f5f5;border-radius:8px;cursor:pointer;text-align:center"
            >
              <Icon :name="it.name" :size="24" />
              <span style="font-size:11px;color:#525252;word-break:break-word;line-height:1.3">{{ it.name }}</span>
            </div>
          </div>
        </section>
      </div>
    `,
    methods: {
      copy(name: string) {
        navigator.clipboard?.writeText(name)
      },
    },
  }),
}
