<script setup lang="ts">
import { computed } from 'vue'
import { FLAGS, type FlagCode } from './flag.tokens'
import './flag.css'

// Figma: Misc icons / Flags (node 11288:1811) — round 16px country flags.
// Flags keep their own colors (like the `*-color` brand icons).
const props = withDefaults(
  defineProps<{
    code: FlagCode
    /** Diameter in px (Figma: 16) */
    size?: number
  }>(),
  { size: 16 },
)

const svg = computed(() => FLAGS[props.code])
</script>

<template>
  <span
    v-if="svg"
    class="comfy-flag"
    :style="{ width: `${size}px`, height: `${size}px` }"
    role="img"
    :aria-label="code"
    v-html="svg"
  />
</template>
