<script setup lang="ts">
import { computed, useId } from 'vue'
import { STAR_PATH, type RatingStarColor } from './rating-star.tokens'
import './rating-star.css'

// Figma: Misc icons / Rating star (node 12552:45) — Fill 0…100 % × Color Orange | Yellow.
// A bg-tertiary star with the colored star clipped to `fill` % of the 20px box on top.
const props = withDefaults(
  defineProps<{
    /** Filled part, 0–100 (Figma steps of 10; any value works) */
    fill?: number
    color?: RatingStarColor
    /** Box size in px (Figma: 20) */
    size?: number
  }>(),
  { fill: 100, color: 'orange', size: 20 },
)

const clamped = computed(() => Math.min(100, Math.max(0, props.fill)))
const clipId = `rs-${useId()}`
</script>

<template>
  <svg
    :class="['rating-star', `rating-star--${color}`]"
    :width="size"
    :height="size"
    viewBox="0 0 20 20"
    aria-hidden="true"
  >
    <!-- Figma "Star" frame: clips the colored star to `fill` % of the 20px box -->
    <defs>
      <clipPath :id="clipId"><rect :width="clamped / 5" height="20" /></clipPath>
    </defs>
    <path class="rating-star__bg" :d="STAR_PATH" />
    <path v-if="clamped > 0" class="rating-star__fg" :d="STAR_PATH" :clip-path="`url(#${clipId})`" />
  </svg>
</template>
