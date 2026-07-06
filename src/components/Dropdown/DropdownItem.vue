<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../Icon/Icon.vue'
import './dropdown.css'

const props = withDefaults(
  defineProps<{
    /** Leading icon name */
    icon?: string
    /** Show a leading check (selected item) */
    selected?: boolean
    /** Keyboard shortcut hint, e.g. "⌘C" */
    shortcut?: string
    /** Trailing chevron (submenu indicator) */
    chevron?: boolean
    /** Highlighted/active row */
    active?: boolean
    /** Row height — 40 or 32 */
    size?: number
    disabled?: boolean
  }>(),
  { selected: false, chevron: false, active: false, size: 40, disabled: false },
)

const emit = defineEmits<{ (e: 'click', ev: MouseEvent): void }>()

const leadingIcon = computed(() => (props.selected ? 'check' : props.icon))

const cssVars = computed(() =>
  props.size === 32
    ? { '--di-pad': '6px', '--di-font-size': 'var(--font-body-2-size, 14px)', '--di-line-height': 'var(--font-body-2-line-height, 20px)' }
    : { '--di-pad': '8px', '--di-font-size': 'var(--font-body-1-size, 16px)', '--di-line-height': 'var(--font-body-1-line-height, 22px)' },
)

const iconSize = computed(() => 20)

const onClick = (ev: MouseEvent) => {
  if (props.disabled) return
  emit('click', ev)
}
</script>

<template>
  <button
    type="button"
    role="menuitem"
    class="dropdown-item"
    :class="{ 'dropdown-item--active': active }"
    :style="cssVars"
    :disabled="disabled"
    @click="onClick"
  >
    <span class="dropdown-item__box">
      <span class="dropdown-item__content">
        <slot name="leading">
          <Icon v-if="leadingIcon" :name="leadingIcon" :size="iconSize" class="dropdown-item__icon" />
        </slot>
        <span class="dropdown-item__label"><slot /></span>
      </span>
      <span v-if="shortcut" class="dropdown-item__shortcut">{{ shortcut }}</span>
      <Icon v-if="chevron" name="chevron-right" :size="iconSize" class="dropdown-item__chevron" />
    </span>
  </button>
</template>
