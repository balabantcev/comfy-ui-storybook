<script setup lang="ts">
import { computed, ref, watchEffect, useSlots } from 'vue'
import Icon from '../Icon/Icon.vue'
import './control.css'

const props = withDefaults(
  defineProps<{
    /** v-model — checked state */
    modelValue?: boolean
    indeterminate?: boolean
    /** Box size in px — 16 or 20 */
    size?: number
    disabled?: boolean
    label?: string
    /** Supporting text below the label */
    description?: string
    value?: string
    name?: string
  }>(),
  { modelValue: false, indeterminate: false, size: 16, disabled: false },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()

const slots = useSlots()
const inputRef = ref<HTMLInputElement>()

// indeterminate is a DOM property, not an attribute
watchEffect(() => {
  if (inputRef.value) inputRef.value.indeterminate = props.indeterminate && !props.modelValue
})

const iconSize = computed(() => (props.size === 20 ? 16 : 12))
const hasText = computed(() => !!props.label || !!props.description || !!slots.default)

const cssVars = computed(() => ({
  '--ctrl-size': `${props.size}px`,
  '--ctrl-offset': hasText.value ? `${Math.max((20 - props.size) / 2, 0)}px` : '0px',
}))

const classes = computed(() => [
  'control',
  'control--checkbox',
  {
    'control--checked': props.modelValue,
    'control--indeterminate': props.indeterminate && !props.modelValue,
    'control--disabled': props.disabled,
  },
])

function onChange(e: Event) {
  const checked = (e.target as HTMLInputElement).checked
  emit('update:modelValue', checked)
  emit('change', checked)
}
</script>

<template>
  <label :class="classes" :style="cssVars">
    <span class="control__box">
      <input
        ref="inputRef"
        type="checkbox"
        class="control__input"
        :checked="modelValue"
        :disabled="disabled"
        :value="value"
        :name="name"
        @change="onChange"
      />
      <Icon
        v-if="modelValue || (indeterminate && !modelValue)"
        :name="indeterminate && !modelValue ? 'minus' : 'check'"
        :size="iconSize"
      />
    </span>

    <span v-if="hasText" class="control__text">
      <span v-if="label || $slots.default" class="control__label"><slot>{{ label }}</slot></span>
      <span v-if="description" class="control__desc">{{ description }}</span>
    </span>
  </label>
</template>
