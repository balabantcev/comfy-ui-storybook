<script setup lang="ts">
import { computed, useSlots } from 'vue'
import '../Checkbox/control.css'

const props = withDefaults(
  defineProps<{
    /** v-model — the selected value of the group */
    modelValue?: string | number
    /** This radio's value */
    value?: string | number
    /** Group name */
    name?: string
    /** Box size in px — 16 or 20 */
    size?: number
    disabled?: boolean
    label?: string
    description?: string
  }>(),
  { size: 16, disabled: false },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number): void
}>()

const slots = useSlots()

const checked = computed(() => props.modelValue !== undefined && props.modelValue === props.value)
const dotSize = computed(() => (props.size === 20 ? 8 : 6))
const hasText = computed(() => !!props.label || !!props.description || !!slots.default)

const cssVars = computed(() => ({
  '--ctrl-size': `${props.size}px`,
  '--ctrl-dot': `${dotSize.value}px`,
  '--ctrl-offset': hasText.value ? `${Math.max((20 - props.size) / 2, 0)}px` : '0px',
}))

const classes = computed(() => [
  'control',
  'control--radio',
  {
    'control--checked': checked.value,
    'control--disabled': props.disabled,
  },
])

function onChange() {
  if (props.value !== undefined) {
    emit('update:modelValue', props.value)
    emit('change', props.value)
  }
}
</script>

<template>
  <label :class="classes" :style="cssVars">
    <span class="control__box">
      <input
        type="radio"
        class="control__input"
        :checked="checked"
        :disabled="disabled"
        :value="value"
        :name="name"
        @change="onChange"
      />
      <span v-if="checked" class="control__dot" />
    </span>

    <span v-if="hasText" class="control__text">
      <span v-if="label || $slots.default" class="control__label"><slot>{{ label }}</slot></span>
      <span v-if="description" class="control__desc">{{ description }}</span>
    </span>
  </label>
</template>
