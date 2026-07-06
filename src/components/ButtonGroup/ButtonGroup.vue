<script setup lang="ts">
import { computed, provide } from 'vue'
import { BUTTON_SIZES } from '../Button/button.tokens'
import './button-group.css'

const props = withDefaults(
  defineProps<{
    /** Segment height in px (shared by all items) — 32, 40, 44, 48, 56 */
    size?: number
  }>(),
  { size: 40 },
)

// Items read the size from here, so each <ButtonGroupItem> stays declarative.
provide('buttonGroupSize', computed(() => props.size))

const spec = computed(() => BUTTON_SIZES[props.size] ?? BUTTON_SIZES[40])

const cssVars = computed(() => {
  const s = spec.value
  return {
    '--bg-height': `${props.size}px`,
    '--bg-px': `var(--padding-${s.px}, ${s.px}px)`,
    '--bg-gap': `var(--padding-${s.gap}, ${s.gap}px)`,
    '--bg-font-size': `var(--font-${s.font}-size, ${s.fontSize}px)`,
    '--bg-line-height': `var(--font-${s.font}-line-height, ${s.lineHeight}px)`,
  } as Record<string, string>
})
</script>

<template>
  <div class="button-group" role="group" :style="cssVars">
    <slot />
  </div>
</template>
