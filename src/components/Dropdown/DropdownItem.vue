<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../Icon/Icon.vue'
import './dropdown.css'

const props = withDefaults(
  defineProps<{
    /** Leading icon name */
    icon?: string
    /** Selected item: shows a leading check (or a checked box with `control="checkbox"`) */
    selected?: boolean
    /**
     * Leading control (Figma -Icon-dropdown-item: Icon / Check / Checkbox / Dot).
     * `checkbox` renders a visual checkbox reflecting `selected`; `dot` a status dot.
     */
    control?: 'checkbox' | 'dot'
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

const leadingIcon = computed(() => (props.control ? undefined : props.selected ? 'check' : props.icon))

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
    :role="control === 'checkbox' ? 'menuitemcheckbox' : 'menuitem'"
    :aria-checked="control === 'checkbox' ? selected : undefined"
    class="dropdown-item"
    :class="{ 'dropdown-item--active': active }"
    :style="cssVars"
    :disabled="disabled"
    @click="onClick"
  >
    <span class="dropdown-item__box">
      <span class="dropdown-item__content">
        <slot name="leading">
          <span v-if="control === 'checkbox'" class="dropdown-item__control" aria-hidden="true">
            <span class="dropdown-item__checkbox" :class="{ 'dropdown-item__checkbox--checked': selected }">
              <Icon v-if="selected" name="check" :size="12" />
            </span>
          </span>
          <span v-else-if="control === 'dot'" class="dropdown-item__control" aria-hidden="true">
            <span class="dropdown-item__dot" />
          </span>
          <Icon
            v-else-if="leadingIcon"
            :name="leadingIcon"
            :size="iconSize"
            class="dropdown-item__icon"
            :class="{ 'dropdown-item__icon--check': leadingIcon === 'check' }"
          />
        </slot>
        <span class="dropdown-item__label"><slot /></span>
      </span>
      <span v-if="shortcut" class="dropdown-item__shortcut">{{ shortcut }}</span>
      <Icon v-if="chevron" name="chevron-right" :size="iconSize" class="dropdown-item__chevron" />
    </span>
  </button>
</template>
