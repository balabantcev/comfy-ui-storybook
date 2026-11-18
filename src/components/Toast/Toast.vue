<script setup lang="ts">
import Alert from '../Alert/Alert.vue'
import type { AlertIconStyle, AlertVariant } from '../Alert/alert.tokens'
import './toast.css'

// Figma: Alert & Toast / Toast (node 15423:13721) — an Alert with Elevations/E300.
//   Breakpoint=Desktop: one row (icon · title + description · actions · ×)
//   Breakpoint=Mobile:  stacked like the Alert
// Positioning / stacking / timing stay with the app — this is the toast itself.

export type ToastBreakpoint = 'auto' | 'desktop' | 'mobile'

withDefaults(
  defineProps<{
    variant?: AlertVariant
    iconStyle?: AlertIconStyle
    title?: string
    description?: string
    icon?: string
    showIcon?: boolean
    closable?: boolean
    dismissLabel?: string
    actionLabel?: string
    /** Figma "Breakpoint": auto switches to Mobile below 768px */
    breakpoint?: ToastBreakpoint
  }>(),
  { variant: 'default', iconStyle: 'default', showIcon: true, closable: true, breakpoint: 'auto' },
)

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'dismiss'): void
  (e: 'action'): void
}>()
</script>

<template>
  <Alert
    :class="['toast', `toast--bp-${breakpoint}`]"
    :variant="variant"
    :icon-style="iconStyle"
    :title="title"
    :description="description"
    :icon="icon"
    :show-icon="showIcon"
    :closable="closable"
    :dismiss-label="dismissLabel"
    :action-label="actionLabel"
    :role="variant === 'error' ? 'alert' : 'status'"
    @close="emit('close')"
    @dismiss="emit('dismiss')"
    @action="emit('action')"
  >
    <template v-if="$slots.title" #title><slot name="title" /></template>
    <template v-if="$slots.default" #default><slot /></template>
    <template v-if="$slots.actions" #actions><slot name="actions" /></template>
  </Alert>
</template>
