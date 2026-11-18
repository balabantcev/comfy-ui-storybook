<script setup lang="ts">
import { computed } from 'vue'
import {
  BADGE_PRICE_PADDING,
  formatPriceValue,
  type BadgePriceSize,
  type BadgePriceUnit,
} from './badge-price.tokens'
import './badge-price.css'

// Figma: Badge / Badge price (node 13796:1729) — Size 16 | 20 | 24 × "% or ₴".
// A discount label: Caption-1 Bold value + Caption-2 Bold unit in text-price on utility-error-50.
const props = withDefaults(
  defineProps<{
    /** Discount, e.g. -44 or -4444 (strings are shown as-is) */
    value: number | string
    unit?: BadgePriceUnit
    size?: BadgePriceSize
  }>(),
  { unit: '%', size: 16 },
)

const text = computed(() => formatPriceValue(props.value))
const pad = computed(() => BADGE_PRICE_PADDING[props.size] ?? BADGE_PRICE_PADDING[16])
const style = computed(() => ({
  '--bp-py': `var(--padding-${pad.value.y})`,
  '--bp-px': `var(--padding-${pad.value.x})`,
}))
</script>

<template>
  <span class="badge-price" :style="style">
    <span class="badge-price__frame">
      <span class="badge-price__value">{{ text }}</span><span class="badge-price__unit">{{ unit }}</span>
    </span>
  </span>
</template>
