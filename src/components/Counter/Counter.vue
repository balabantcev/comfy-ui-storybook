<script setup lang="ts">
import { computed } from 'vue'
import { COUNTER_SIZES, type CounterColor } from './counter.tokens'
import './counter.css'

const props = withDefaults(
  defineProps<{
    color?: CounterColor
    /** Height/min-width in px — 16, 20 or 24 */
    size?: number
    /** Value to display (or use the default slot) */
    value?: number | string
    /** White ring around the counter, for placing over content */
    borderGap?: boolean
  }>(),
  {
    color: 'red',
    size: 20,
    borderGap: false,
  },
)

const spec = computed(() => COUNTER_SIZES[props.size] ?? COUNTER_SIZES[20])

const cssVars = computed(() => {
  const s = spec.value
  return {
    '--counter-size': `${props.size}px`,
    '--counter-px': `var(--padding-${s.px}, ${s.px}px)`,
    '--counter-font-size': `var(--font-${s.font}-size, ${s.fontSize}px)`,
    '--counter-line-height': `var(--font-${s.font}-line-height, ${s.lineHeight}px)`,
  } as Record<string, string>
})
</script>

<template>
  <span
    :class="['counter', `counter--${color}`, { 'counter--gap': borderGap }]"
    :style="cssVars"
  >
    <slot>{{ value }}</slot>
  </span>
</template>
