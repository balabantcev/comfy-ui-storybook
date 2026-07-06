import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { fn } from 'storybook/test'

import Dropdown from './Dropdown.vue'
import DropdownMenu from './DropdownMenu.vue'
import DropdownItem from './DropdownItem.vue'
import Button from '../Button/Button.vue'
import Divider from '../Divider/Divider.vue'

const meta = {
  title: 'Components/Dropdown',
  component: DropdownMenu,
  subcomponents: { DropdownItem, Dropdown },
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
