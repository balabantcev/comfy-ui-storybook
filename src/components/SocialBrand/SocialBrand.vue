<script setup lang="ts">
import { computed } from 'vue'
import { SOCIAL_BRANDS, type SocialBrandName } from './social-brand.tokens'
import './social-brand.css'

// Figma: Misc icons / Social brand (node 13133:1436) — 24px brand marks for sign-in,
// sharing and delivery services.
const props = withDefaults(
  defineProps<{
    name: SocialBrandName
    /** Size in px (Figma: 24) */
    size?: number
    /** Accessible name; defaults to the brand name. Pass "" when a visible label is next to it. */
    label?: string
  }>(),
  { size: 24 },
)

const brand = computed(() => SOCIAL_BRANDS[props.name])
const name = computed(() => props.label ?? brand.value?.label)
</script>

<template>
  <span
    v-if="brand"
    class="social-brand"
    :style="{ width: `${size}px`, height: `${size}px` }"
    :role="name ? 'img' : undefined"
    :aria-label="name || undefined"
    :aria-hidden="name ? undefined : 'true'"
    v-html="brand.svg"
  />
</template>
