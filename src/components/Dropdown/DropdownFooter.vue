<script setup lang="ts">
import Button from '../Button/Button.vue'
import './dropdown.css'

// Figma: Dropdowns / -Dropdown-footer (node 15651:4636) — Type "Vertical" | "Horizontal" (new in 1.1.0).
withDefaults(
  defineProps<{
    layout?: 'vertical' | 'horizontal'
    clearLabel?: string
    applyLabel?: string
    /** Disable the apply action (e.g. nothing selected) */
    applyDisabled?: boolean
  }>(),
  { layout: 'vertical', clearLabel: 'Очистити', applyLabel: 'Застосувати', applyDisabled: false },
)

const emit = defineEmits<{
  (e: 'clear', ev: MouseEvent): void
  (e: 'apply', ev: MouseEvent): void
}>()
</script>

<template>
  <div class="dropdown-footer" :class="`dropdown-footer--${layout}`">
    <Button
      v-if="clearLabel"
      variant="tertiary"
      intent="gray"
      :size="32"
      pill
      class="dropdown-footer__btn"
      @click="(ev: MouseEvent) => emit('clear', ev)"
    >
      {{ clearLabel }}
    </Button>
    <Button
      variant="primary"
      intent="brand"
      :size="32"
      pill
      class="dropdown-footer__btn"
      :disabled="applyDisabled"
      @click="(ev: MouseEvent) => emit('apply', ev)"
    >
      {{ applyLabel }}
    </Button>
  </div>
</template>
