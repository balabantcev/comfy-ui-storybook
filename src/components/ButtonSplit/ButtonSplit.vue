<script setup lang="ts">
import { computed, ref } from 'vue'
import Icon from '../Icon/Icon.vue'
import Dropdown from '../Dropdown/Dropdown.vue'
import {
  BUTTON_SPLIT_CLASSES,
  BUTTON_SPLIT_SIZE_SPECS,
  type ButtonSplitSize,
  type ButtonSplitType,
} from './button-split.tokens'
import '../Button/button.css'
import './button-split.css'

// Figma: Button Split (node 16855:8109) — a main action + a chevron that opens a menu,
// 2px apart. Type × Size × Full corner radius; each half hovers / focuses on its own.
// The halves reuse Button's classes (button.css) for every color and state.

const props = withDefaults(
  defineProps<{
    type?: ButtonSplitType
    size?: ButtonSplitSize
    /** Figma "Full corner radius" */
    pill?: boolean
    /** Main label (or the default slot) */
    label?: string
    /** Figma "Left icon" */
    iconLeft?: string
    disabled?: boolean
    loading?: boolean
    /** Accessible name of the chevron */
    menuLabel?: string
    menuWidth?: number
    menuAlign?: 'left' | 'right'
  }>(),
  { type: 'primary', size: 40, pill: false, menuLabel: 'Більше дій', menuWidth: 240, menuAlign: 'right' },
)

const emit = defineEmits<{ (e: 'click', ev: MouseEvent): void }>()

const open = ref(false)
const spec = computed(() => BUTTON_SPLIT_SIZE_SPECS[props.size] ?? BUTTON_SPLIT_SIZE_SPECS[40])
const kind = computed(() => ['btn', ...BUTTON_SPLIT_CLASSES[props.type]])

const shared = computed(() => {
  const s = spec.value
  return {
    '--btn-height': `${props.size}px`,
    '--btn-font-size': `var(--font-${s.font}-size)`,
    '--btn-line-height': `var(--font-${s.font}-line-height)`,
    '--btn-icon-size': `${s.icon}px`,
    '--btn-gap': `var(--padding-${s.gap})`,
  }
})
// .btn always has a 1px border (transparent unless outlined). Figma counts the stroke into the
// width only where it is visible (Secondary / Primary subtle), so borderless types give it back.
const OUTLINED = new Set<ButtonSplitType>(['primary-subtle', 'secondary-brand', 'secondary-gray'])
const px = (n: number) => (OUTLINED.has(props.type) ? `var(--padding-${n})` : `calc(var(--padding-${n}) - 1px)`)

// outer corners follow the size (or full), the inner ones are 2px (Figma)
const outer = computed(() => (props.pill ? 'var(--radius-full)' : `var(--radius-${spec.value.radius})`))
const mainStyle = computed(() => ({
  ...shared.value,
  '--btn-padding': `0 ${px(spec.value.pr)} 0 ${px(spec.value.pl)}`,
  '--btn-radius': `${outer.value} var(--radius-2) var(--radius-2) ${outer.value}`,
}))
const toggleStyle = computed(() => ({
  ...shared.value,
  '--btn-padding': `0 ${px(spec.value.dx)}`,
  '--btn-radius': `var(--radius-2) ${outer.value} ${outer.value} var(--radius-2)`,
}))

function onMain(ev: MouseEvent) {
  if (!props.disabled && !props.loading) emit('click', ev)
}
</script>

<template>
  <div class="btn-split" role="group">
    <button
      type="button"
      :class="[...kind, 'btn-split__main', { 'btn--loading': loading }]"
      :style="mainStyle"
      :disabled="disabled || loading"
      :aria-busy="loading || undefined"
      @click="onMain"
    >
      <span v-if="loading" class="btn__spinner" aria-hidden="true" />
      <Icon v-else-if="iconLeft" :name="iconLeft" :size="spec.icon" class="btn__icon" aria-hidden="true" />
      <span class="btn__label btn-split__label"><slot>{{ label }}</slot></span>
    </button>
    <Dropdown v-model="open" :width="menuWidth" :align="menuAlign" class="btn-split__dropdown">
      <template #trigger>
        <button
          type="button"
          :class="[...kind, 'btn-split__toggle']"
          :style="toggleStyle"
          :disabled="disabled || loading"
          :aria-label="menuLabel"
          aria-haspopup="menu"
          :aria-expanded="open"
        >
          <Icon name="chevron-down" :size="spec.icon" class="btn__icon" aria-hidden="true" />
        </button>
      </template>
      <template #default="{ close }"><slot name="menu" :close="close" /></template>
    </Dropdown>
  </div>
</template>
