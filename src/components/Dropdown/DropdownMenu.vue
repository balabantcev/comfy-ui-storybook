<script setup lang="ts">
import './dropdown.css'

// The panel. Only the items sit inside the ARIA container (`role`): a menu / listbox may own
// nothing but its items, so the search header, the footer buttons and the empty state go in
// the `header`, `footer` and `empty` slots, which render around it.
withDefaults(
  defineProps<{
    /** Panel width in px (default 240) */
    width?: number
    /** ARIA role of the item list: `menu` (DropdownItem), `listbox` (role="option" rows) or `group` (checkbox rows) */
    role?: 'menu' | 'listbox' | 'group'
    /** Accessible name of the item list */
    label?: string
  }>(),
  { width: 240, role: 'menu' },
)
</script>

<template>
  <div class="dropdown-menu" :style="{ '--dropdown-width': `${width}px` }">
    <slot name="header" />
    <slot v-if="$slots.empty" name="empty" />
    <div v-else class="dropdown-menu__list" :role="role" :aria-label="label">
      <slot />
    </div>
    <slot name="footer" />
  </div>
</template>
