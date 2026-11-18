<script setup lang="ts">
import type { StepStatus } from './progress-steps.tokens'

// Figma: Progress steps / -Step icon base (node 15766:3872) — Type Check | Number × Status × 24 | 32.
withDefaults(
  defineProps<{
    type?: 'check' | 'number'
    status?: StepStatus
    size?: 24 | 32
    /** Number shown by type="number" (1-based) */
    number?: number
  }>(),
  { type: 'check', status: 'incomplete', size: 24, number: 1 },
)
</script>

<template>
  <span
    :class="['step-icon', `step-icon--${type}`, `step-icon--${status}`, `step-icon--${size}`]"
    aria-hidden="true"
  >
    <!-- Figma "check": 12px frame (16px at 32), round caps/joins -->
    <svg v-if="status === 'complete'" class="step-icon__check" viewBox="0 0 12 12" fill="none">
      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <span v-else-if="type === 'check'" class="step-icon__dot" />
    <span v-else class="step-icon__num">{{ number }}</span>
  </span>
</template>
