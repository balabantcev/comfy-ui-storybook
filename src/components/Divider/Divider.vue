<script setup lang="ts">
import { computed, useSlots } from 'vue'
import './divider.css'

const props = withDefaults(
  defineProps<{
    /** Vertical line (fills parent height) */
    vertical?: boolean
    /** Convenience text label (or use the default slot) */
    label?: string
    /** Text style for the centered label */
    textStyle?: 'label' | 'body' | 'caption'
    /** Content alignment along the line */
    align?: 'left' | 'center' | 'right'
  }>(),
  { vertical: false, textStyle: 'label', align: 'center' },
)

const slots = useSlots()
const hasContent = computed(() => !props.vertical && (!!props.label || !!slots.default))

const classes = computed(() => [
  'divider',
  `divider--${props.textStyle}`,
  { 'divider--vertical': props.vertical },
])

// which line segments to render around the content
const showLeftLine = computed(() => props.align !== 'left')
const showRightLine = computed(() => props.align !== 'right')
</script>

<template>
  <!-- A separator's children are presentational, so a divider that carries content (text,
       a button) is a plain container with decorative lines instead. -->
  <div
    :class="classes"
    :role="hasContent ? undefined : 'separator'"
    :aria-orientation="hasContent ? undefined : vertical ? 'vertical' : 'horizontal'"
  >
    <template v-if="vertical">
      <span class="divider__line" />
    </template>
    <template v-else-if="hasContent">
      <span v-if="showLeftLine" class="divider__line" aria-hidden="true" />
      <span class="divider__content"><slot>{{ label }}</slot></span>
      <span v-if="showRightLine" class="divider__line" aria-hidden="true" />
    </template>
    <template v-else>
      <span class="divider__line" />
    </template>
  </div>
</template>
