<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import './textarea.css'

// Figma: Base components / Input / Textarea input (node 11485:675).
// The label sits inside the box: large like a placeholder while empty, a small caption once
// focused or filled. The "used symbols" counter appears when `maxlength` is set.

const props = withDefaults(
  defineProps<{
    modelValue?: string
    label?: string
    required?: boolean
    /** Max characters — also shows the "n / max" counter (Figma "Used symbols") */
    maxlength?: number
    /** Visible text rows */
    rows?: number
    /** Allow vertical resizing (Figma "Resize handle") */
    resize?: boolean
    helper?: string
    /** Error message — Figma "Destructive" */
    error?: string
    disabled?: boolean
    placeholder?: string
  }>(),
  { modelValue: '', required: false, rows: 5, resize: true, disabled: false },
)

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const focused = ref(false)
const hasValue = computed(() => props.modelValue.length > 0)
const float = computed(() => !props.label || focused.value || hasValue.value)

const classes = computed(() => [
  'textarea',
  {
    'textarea--float': float.value,
    'textarea--has-label': !!props.label,
    'textarea--focused': focused.value,
    'textarea--error': !!props.error && !props.disabled,
    'textarea--disabled': props.disabled,
    'textarea--counter': props.maxlength !== undefined,
  },
])

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLTextAreaElement).value)
}
const fieldId = useId()
</script>

<template>
  <div :class="classes">
    <div class="textarea__box">
      <label v-if="label" class="textarea__label" :for="fieldId">
        {{ label }}<span v-if="required" class="textarea__req" aria-hidden="true">&nbsp;*</span>
      </label>
      <textarea
        :id="fieldId"
        class="textarea__field"
        :aria-required="required || undefined"
        :value="modelValue"
        :rows="rows"
        :maxlength="maxlength"
        :disabled="disabled"
        :placeholder="float ? placeholder : undefined"
        :aria-label="label"
        :aria-invalid="(!!error && !disabled) || undefined"
        :style="{ resize: resize && !disabled ? 'vertical' : 'none' }"
        @input="onInput"
        @focus="focused = true"
        @blur="focused = false"
      />
      <span v-if="maxlength !== undefined" class="textarea__counter" aria-live="polite">
        {{ modelValue.length }} / {{ maxlength }}
      </span>
    </div>
    <p v-if="error || helper" class="textarea__helper">{{ error || helper }}</p>
  </div>
</template>
