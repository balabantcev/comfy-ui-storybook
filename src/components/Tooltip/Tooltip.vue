<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../Icon/Icon.vue'
import './tooltip.css'

const props = withDefaults(
  defineProps<{
    /** Short label (small tooltip) — or use `title`/`description` for the rich one */
    text?: string
    /** Rich tooltip title */
    title?: string
    /** Rich tooltip supporting text */
    description?: string
    /** Optional action link at the bottom of the rich tooltip — emits `action` */
    actionLabel?: string
    placement?: 'top' | 'bottom' | 'left' | 'right'
    /** Arrow alignment along the panel edge (top/bottom placements) */
    align?: 'start' | 'center' | 'end'
    /** Show the pointer arrow */
    arrow?: boolean
    /** Rich panel width in px */
    width?: number
    /** Force the tooltip visible (otherwise shows on hover/focus) */
    open?: boolean
  }>(),
  { placement: 'top', align: 'center', arrow: true, width: 320, open: false },
)

const emit = defineEmits<{ (e: 'action'): void }>()

const isRich = computed(() => !!props.title || !!props.description)

const classes = computed(() => [
  'tooltip',
  `tooltip--${props.placement}`,
  `tooltip--align-${props.align}`,
  { 'tooltip--open': props.open },
])

const panelStyle = computed(() => ({
  '--tooltip-width': `${props.width}px`,
  '--arrow-display': props.arrow ? 'block' : 'none',
}))
</script>

<template>
  <span :class="classes">
    <slot />

    <span class="tooltip__panel" :class="{ 'tooltip__panel--rich': isRich }" :style="panelStyle" role="tooltip">
      <template v-if="isRich">
        <span>
          <p v-if="title" class="tooltip__title">{{ title }}</p>
          <p v-if="description" class="tooltip__desc">{{ description }}</p>
        </span>
        <button v-if="actionLabel" type="button" class="tooltip__action" @click="emit('action')">
          {{ actionLabel }}
          <Icon name="arrow-right" :size="16" />
        </button>
      </template>
      <template v-else>{{ text }}</template>
    </span>
  </span>
</template>
