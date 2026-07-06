<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../Icon/Icon.vue'
import Counter from '../Counter/Counter.vue'
import { BUTTON_SIZES } from '../Button/button.tokens'
import { CHIP_COUNTER_SIZE, type ChipType } from './chip.tokens'
import './chip.css'

const props = withDefaults(
  defineProps<{
    type?: ChipType
    /** Height in px — 32, 40, 44, 48, 56 */
    size?: number
    /** Full corner radius (pill) */
    pill?: boolean
    disabled?: boolean
    /** Leading icon name (or use the #left slot for a rating star, etc.) */
    iconLeft?: string
    /** Trailing icon name, e.g. "chevron-down" or "x" */
    iconRight?: string
    /** Embedded counter value */
    count?: number | string
  }>(),
  { type: 'dark', size: 40, pill: false, disabled: false },
)

const emit = defineEmits<{ (e: 'click', ev: MouseEvent): void }>()

const spec = computed(() => BUTTON_SIZES[props.size] ?? BUTTON_SIZES[40])
const counterSize = computed(() => CHIP_COUNTER_SIZE[props.size] ?? 20)
const hasCount = computed(() => props.count !== undefined && props.count !== '')

const cssVars = computed(() => {
  const s = spec.value
  return {
    '--chip-height': `${props.size}px`,
    '--chip-px': `var(--padding-${s.px}, ${s.px}px)`,
    '--chip-gap': `var(--padding-${s.gap}, ${s.gap}px)`,
    '--chip-radius': `var(--radius-${s.radius}, ${s.radius}px)`,
    '--chip-font-size': `var(--font-${s.font}-size, ${s.fontSize}px)`,
    '--chip-line-height': `var(--font-${s.font}-line-height, ${s.lineHeight}px)`,
  } as Record<string, string>
})

const onClick = (ev: MouseEvent) => {
  if (props.disabled) return
  emit('click', ev)
}
</script>

<template>
  <button
    type="button"
    :class="['chip', `chip--${type}`, { 'chip--pill': pill }]"
    :style="cssVars"
    :disabled="disabled"
    @click="onClick"
  >
    <slot name="left">
      <Icon v-if="iconLeft" :name="iconLeft" :size="spec.icon" class="chip__icon" />
    </slot>

    <span class="chip__label"><slot /></span>

    <Counter v-if="hasCount" color="modern" :size="counterSize" :value="count" />

    <Icon v-if="iconRight" :name="iconRight" :size="spec.icon" class="chip__icon" />
  </button>
</template>
