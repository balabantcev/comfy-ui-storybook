<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../Icon/Icon.vue'
import {
  FEATURED_ICON_SPECS,
  type FeaturedIconColor,
  type FeaturedIconSize,
  type FeaturedIconType,
} from './featured-icon.tokens'
import './featured-icon.css'

// Figma: Misc icons / Featured icon (node 15030:853)
//   Icon → `icon`, Type → `type`, Color → `color`, Size → `size`
//   Gradient mask → always on for type="gradient" (the ring fades out towards the bottom)

const props = withDefaults(
  defineProps<{
    /** Icon name from the registry */
    icon?: string
    type?: FeaturedIconType
    color?: FeaturedIconColor
    size?: FeaturedIconSize
    /** Accessible label; decorative (aria-hidden) when omitted */
    label?: string
  }>(),
  { icon: 'check-circle', type: 'light', color: 'gray', size: 48 },
)

const spec = computed(() => FEATURED_ICON_SPECS[props.size] ?? FEATURED_ICON_SPECS[48])
const glyph = computed(() => (props.type === 'gradient' ? spec.value.gradientIcon : spec.value.icon))

const classes = computed(() => [
  'featured-icon',
  `featured-icon--${props.type}`,
  `featured-icon--${props.color}`,
])
const style = computed(() => ({
  '--fi-size': `${props.size}px`,
  '--fi-ring': `${spec.value.ring}px`,
  '--fi-inner': `${props.type === 'gradient' ? spec.value.gradientInner : spec.value.modernInner}px`,
}))
</script>

<template>
  <span
    :class="classes"
    :style="style"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
  >
    <span class="featured-icon__inner">
      <Icon :name="icon" :size="glyph" aria-hidden="true" />
    </span>
  </span>
</template>
