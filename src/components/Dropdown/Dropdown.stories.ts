import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref, computed } from 'vue'
import { fn } from 'storybook/test'

import Dropdown from './Dropdown.vue'
import DropdownMenu from './DropdownMenu.vue'
import DropdownItem from './DropdownItem.vue'
import DropdownHeader from './DropdownHeader.vue'
import DropdownEmptyState from './DropdownEmptyState.vue'
import DropdownFooter from './DropdownFooter.vue'
import Button from '../Button/Button.vue'
import Divider from '../Divider/Divider.vue'

const meta = {
  title: 'Components/Dropdown',
  component: DropdownMenu,
  subcomponents: { DropdownItem, Dropdown, DropdownHeader, DropdownEmptyState, DropdownFooter },
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

/** The menu panel with a range of items. */
export const Menu: Story = {
  render: () => ({
    components: { DropdownMenu, DropdownItem, Divider },
    setup: () => ({ onClick: fn() }),
    template: `
      <DropdownMenu>
        <DropdownItem icon="edit-1" shortcut="⌘E" @click="onClick">Редагувати</DropdownItem>
        <DropdownItem icon="copy" shortcut="⌘C" @click="onClick">Копіювати</DropdownItem>
        <DropdownItem icon="share-1" chevron @click="onClick">Поділитися</DropdownItem>
        <Divider />
        <DropdownItem selected @click="onClick">Вибраний пункт</DropdownItem>
        <DropdownItem icon="trash" disabled>Видалити</DropdownItem>
      </DropdownMenu>
    `,
  }),
}

/** Item states. */
export const ItemStates: Story = {
  render: () => ({
    components: { DropdownMenu, DropdownItem },
    template: `
      <DropdownMenu>
        <DropdownItem icon="user">Default</DropdownItem>
        <DropdownItem icon="user" active>Active / hover</DropdownItem>
        <DropdownItem selected>Selected</DropdownItem>
        <DropdownItem icon="user" shortcut="⌘K">With shortcut</DropdownItem>
        <DropdownItem icon="archive" chevron>Submenu</DropdownItem>
        <DropdownItem icon="user" disabled>Disabled</DropdownItem>
      </DropdownMenu>
    `,
  }),
}

/** 40 px vs 32 px items. */
export const Sizes: Story = {
  render: () => ({
    components: { DropdownMenu, DropdownItem },
    template: `
      <div style="display:flex;gap:24px;align-items:flex-start">
        <DropdownMenu>
          <DropdownItem :size="40" icon="edit-1">40 px</DropdownItem>
          <DropdownItem :size="40" icon="copy">40 px</DropdownItem>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownItem :size="32" icon="edit-1">32 px</DropdownItem>
          <DropdownItem :size="32" icon="copy">32 px</DropdownItem>
        </DropdownMenu>
      </div>
    `,
  }),
}

/** Interactive — opens below a button trigger. */
export const Interactive: Story = {
  render: () => ({
    components: { Dropdown, DropdownItem, Button, Divider },
    setup: () => ({ onClick: fn() }),
    template: `
      <div style="height:280px">
        <Dropdown>
          <template #trigger="{ open }">
            <Button intent="gray" variant="secondary" iconRight="chevron-down">Меню</Button>
          </template>
          <template #default="{ close }">
            <DropdownItem icon="edit-1" shortcut="⌘E" @click="onClick(); close()">Редагувати</DropdownItem>
            <DropdownItem icon="copy" shortcut="⌘C" @click="onClick(); close()">Копіювати</DropdownItem>
            <Divider />
            <DropdownItem icon="trash" disabled>Видалити</DropdownItem>
          </template>
        </Dropdown>
      </div>
    `,
  }),
}

/** Figma -Icon-dropdown-item: leading Icon / Check / Checkbox / Dot. */
export const ItemControls: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { DropdownMenu, DropdownItem },
    template: `
      <DropdownMenu>
        <DropdownItem icon="box">Icon</DropdownItem>
        <DropdownItem selected>Check (selected)</DropdownItem>
        <DropdownItem control="checkbox" selected>Checkbox — checked</DropdownItem>
        <DropdownItem control="checkbox">Checkbox — unchecked</DropdownItem>
        <DropdownItem control="dot">Dot</DropdownItem>
      </DropdownMenu>
    `,
  }),
}

/** Figma -Dropdown-header: Search / Title. */
export const Headers: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { DropdownMenu, DropdownItem, DropdownHeader },
    setup: () => ({ q: ref('') }),
    template: `
      <div class="sb-row" style="align-items:flex-start">
        <DropdownMenu>
          <template #header><DropdownHeader v-model="q" /></template>
          <DropdownItem>Ноутбуки</DropdownItem>
          <DropdownItem>Смартфони</DropdownItem>
        </DropdownMenu>
        <DropdownMenu>
          <template #header><DropdownHeader variant="title" title="Заголовок" /></template>
          <DropdownItem>Ноутбуки</DropdownItem>
          <DropdownItem>Смартфони</DropdownItem>
        </DropdownMenu>
      </div>
    `,
  }),
}

/** Figma -Dropdown-footer: Vertical / Horizontal (new in 1.1.0). */
export const Footers: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { DropdownMenu, DropdownItem, DropdownFooter },
    setup: () => ({ onClear: fn(), onApply: fn() }),
    template: `
      <div class="sb-row" style="align-items:flex-start">
        <DropdownMenu>
          <DropdownItem control="checkbox" selected>Техніка для дому</DropdownItem>
          <DropdownItem control="checkbox">Смартфони</DropdownItem>
          <template #footer><DropdownFooter layout="vertical" @clear="onClear" @apply="onApply" /></template>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownItem control="checkbox" selected>Техніка для дому</DropdownItem>
          <DropdownItem control="checkbox">Смартфони</DropdownItem>
          <template #footer><DropdownFooter layout="horizontal" @clear="onClear" @apply="onApply" /></template>
        </DropdownMenu>
      </div>
    `,
  }),
}

/** Search + multi-select + empty state + footer, wired together. Type "xyz" to see the empty state. */
export const FilterWithSearch: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { DropdownMenu, DropdownItem, DropdownHeader, DropdownEmptyState, DropdownFooter },
    setup() {
      const all = ['Без категорії', 'Смартфони і телефони', 'Ноутбуки, планшети і комп’ютери', 'Техніка для кухні', 'Техніка для дому', 'Телевізори і мультимедіа']
      const q = ref('')
      const picked = ref<string[]>(['Техніка для дому'])
      const shown = computed(() => all.filter((x) => x.toLowerCase().includes(q.value.trim().toLowerCase())))
      const toggle = (x: string) => (picked.value = picked.value.includes(x) ? picked.value.filter((y) => y !== x) : [...picked.value, x])
      return { q, picked, shown, toggle, onApply: fn() }
    },
    template: `
      <DropdownMenu :width="280">
        <template #header><DropdownHeader v-model="q" /></template>
        <DropdownItem v-for="x in shown" :key="x" control="checkbox" :selected="picked.includes(x)" @click="toggle(x)">{{ x }}</DropdownItem>
        <template v-if="!shown.length" #empty><DropdownEmptyState @action="q = ''" /></template>
        <template #footer>
          <DropdownFooter layout="horizontal" :apply-disabled="!picked.length" @clear="picked = []" @apply="onApply(picked)" />
        </template>
      </DropdownMenu>
    `,
  }),
}
