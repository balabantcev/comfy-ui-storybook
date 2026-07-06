<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../Icon/Icon.vue'
import { BADGE_SIZES, type BadgeVariant, type BadgeColor } from './badge.tokens'
import './badge.css'

const props = withDefaults(
  defineProps<{
    variant?: BadgeVariant
    color?: BadgeColor
    /** Height in px — 22, 24 or 28 */
    size?: number
    /** Leading colored dot */
    dot?: boolean
    /** Leading icon name */
    iconLeft?: string
    /** Trailing icon name (e.g. "x" for a dismissible badge) */
    iconRight?: string
  }>(),
  {
    variant: 'default',
    color: 'gray',
    size: 22,
    dot: false,
  },
)

const spec = computed(() => BADGE_SIZES[props.size] ?? BADGE_SIZES[22])

const classes = computed(() => [
  'badge',
  `badge--${props.variant}`,
  `badge--${props.color}`,
])

const cssVars = computed(() => {
  const s = spec.value
  return {
    '--badge-height': `${s.height}px`,
    '--badge-px': `var(--padding-${s.px}, ${s.px}px)`,
    '--badge-gap': `var(--padding-${s.gap}, ${s.gap}px)`,
    '--badge-font-size': `var(--font-${s.font}-size, ${s.fontSize}px)`,
    '--badge-line-height': `var(--font-${s.font}-line-height, ${s.lineHeight}px)`,
    '--badge-dot-size': `${s.dot}px`,
  } as Record<string, string>
})
</script>

<template>
  <span :class="classes" :style="cssVars">
    <span v-if="dot" class="badge__dot" />
    <Icon v-else-if="iconLeft" :name="iconLeft" :size="spec.icon" class="badge__icon" />
    <span class="badge__text"><slot /></span>
    <Icon v-if="iconRight" :name="iconRight" :size="spec.icon" class="badge__icon" />
  </span>
</template>
