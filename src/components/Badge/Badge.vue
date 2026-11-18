<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../Icon/Icon.vue'
import Flag from '../Flag/Flag.vue'
import type { FlagCode } from '../Flag/flag.tokens'
import { BADGE_SIZES, type BadgeVariant, type BadgeColor, type BadgeType } from './badge.tokens'
import { spacing } from '../../foundations/scale'
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
    /** Leading country flag — Figma Type=Country */
    country?: FlagCode
  }>(),
  {
    variant: 'default',
    color: 'gray',
    size: 22,
    dot: false,
  },
)

const spec = computed(() => BADGE_SIZES[props.size] ?? BADGE_SIZES[22])
// spacing token when Figma binds one; raw px where Figma doesn't (Country 22px: 3px left)
const space = (n: number) => (`padding-${n}` in spacing ? `var(--padding-${n})` : `${n}px`)
const type = computed<BadgeType>(() => (props.country ? 'country' : props.dot ? 'dot' : 'default'))

const classes = computed(() => [
  'badge',
  `badge--${props.variant}`,
  `badge--${props.color}`,
  `badge--type-${type.value}`,
])

const cssVars = computed(() => {
  const s = spec.value
  const sp = type.value === 'country' ? s.country : type.value === 'dot' ? s.dotted : s.default
  return {
    '--badge-height': `${s.height}px`,
    '--badge-pl': space(sp.pl),
    '--badge-pr': space(sp.pr),
    '--badge-gap': space(sp.gap),
    '--badge-font-size': `var(--font-${s.font}-size, ${s.fontSize}px)`,
    '--badge-line-height': `var(--font-${s.font}-line-height, ${s.lineHeight}px)`,
    '--badge-dot-size': `${s.dot}px`,
  } as Record<string, string>
})
</script>

<template>
  <span :class="classes" :style="cssVars">
    <Flag v-if="country" :code="country" :size="spec.icon" class="badge__flag" />
    <span v-else-if="dot" class="badge__dot" />
    <Icon v-else-if="iconLeft" :name="iconLeft" :size="spec.icon" class="badge__icon" />
    <span class="badge__text"><slot /></span>
    <Icon v-if="iconRight" :name="iconRight" :size="spec.icon" class="badge__icon" />
  </span>
</template>
