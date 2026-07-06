<script setup lang="ts">
import { computed, useSlots } from 'vue'
import './toggle.css'

// Figma: 20 px → track 36×20, knob 16, Body-2 text · 24 px → track 44×24, knob 20, Body-1 text
const SIZE_SPEC: Record<number, { trackW: number; knob: number; font: string; fontSize: number; lineHeight: number }> = {
  20: { trackW: 36, knob: 16, font: 'body-2', fontSize: 14, lineHeight: 20 },
  24: { trackW: 44, knob: 20, font: 'body-1', fontSize: 16, lineHeight: 22 },
}

const props = withDefaults(
  defineProps<{
    /** v-model — on/off */
    modelValue?: boolean
    /** Track height in px — 20 or 24 */
    size?: number
    disabled?: boolean
    label?: string
    /** Supporting text below the label */
    description?: string
    name?: string
  }>(),
  { modelValue: false, size: 20, disabled: false },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()

const slots = useSlots()
const spec = computed(() => SIZE_SPEC[props.size] ?? SIZE_SPEC[20])
const hasText = computed(() => !!props.label || !!props.description || !!slots.default)

const cssVars = computed(() => {
  const s = spec.value
  return {
    '--tg-track-w': `${s.trackW}px`,
    '--tg-track-h': `${props.size}px`,
    '--tg-knob': `${s.knob}px`,
    '--tg-travel': `${s.trackW - s.knob - 4}px`,
    '--tg-font-size': `var(--font-${s.font}-size, ${s.fontSize}px)`,
    '--tg-line-height': `var(--font-${s.font}-line-height, ${s.lineHeight}px)`,
    '--tg-offset': hasText.value ? `${Math.max((s.lineHeight - props.size) / 2, 0)}px` : '0px',
  } as Record<string, string>
})

const classes = computed(() => [
  'toggle',
  { 'toggle--on': props.modelValue, 'toggle--disabled': props.disabled },
])

function onChange(e: Event) {
  const checked = (e.target as HTMLInputElement).checked
  emit('update:modelValue', checked)
  emit('change', checked)
}
</script>

<template>
  <label :class="classes" :style="cssVars">
    <span class="toggle__track">
      <input
        type="checkbox"
        role="switch"
        class="toggle__input"
        :checked="modelValue"
        :disabled="disabled"
        :name="name"
        @change="onChange"
      />
      <span class="toggle__knob" />
    </span>

    <span v-if="hasText" class="toggle__text">
      <span v-if="label || $slots.default" class="toggle__label"><slot>{{ label }}</slot></span>
      <span v-if="description" class="toggle__desc">{{ description }}</span>
    </span>
  </label>
</template>
