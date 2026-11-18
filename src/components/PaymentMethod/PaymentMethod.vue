<script setup lang="ts">
import { computed } from 'vue'
import { PAYMENT_METHODS, type PaymentMethodName, type PaymentMethodSize } from './payment-method.tokens'
import './payment-method.css'

// Figma: Misc icons / Payment method icon (node 13618:494) — Size 24 | 32 × 7 methods.
// The card is 34×24 / 46×32 with a 4px radius.
const props = withDefaults(
  defineProps<{
    method: PaymentMethodName
    size?: PaymentMethodSize
    /** Accessible name; defaults to the method name. Pass "" when a visible label is next to it. */
    label?: string
  }>(),
  { size: 32 },
)

const entry = computed(() => PAYMENT_METHODS[props.method])
const name = computed(() => props.label ?? entry.value?.label)
</script>

<template>
  <span
    v-if="entry"
    :class="['payment-method', `payment-method--${size}`]"
    :role="name ? 'img' : undefined"
    :aria-label="name || undefined"
    :aria-hidden="name ? undefined : 'true'"
    v-html="entry.svg[size]"
  />
</template>
