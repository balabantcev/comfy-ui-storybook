<script setup lang="ts">
import { computed, ref } from 'vue'
import Icon from '../Icon/Icon.vue'
import './input.css'

const SIZE_SPEC: Record<number, { pt: number; floatUp: number }> = {
  56: { pt: 24, floatUp: 16 },
  48: { pt: 22, floatUp: 14 },
  44: { pt: 19, floatUp: 12 },
}

const props = withDefaults(
  defineProps<{
    modelValue?: string | number
    /** Floating label text */
    label?: string
    /** Native placeholder (used when there is no label) */
    placeholder?: string
    required?: boolean
    /** Height — 44, 48 or 56 */
    size?: number
    type?: string
    /** Leading icon name */
    icon?: string
    /** Static prefix, e.g. "+380" or "₴" */
    prefix?: string
    /** Show a trailing help icon */
    help?: boolean
    /** Show a clear (×) button when filled */
    clearable?: boolean
    /** Helper / hint text below the field */
    helper?: string
    /** Error message — switches the field to the error state */
    error?: string
    disabled?: boolean
  }>(),
  { required: false, size: 56, type: 'text', help: false, clearable: false, disabled: false },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'clear'): void
}>()

const focused = ref(false)
const spec = computed(() => SIZE_SPEC[props.size] ?? SIZE_SPEC[56])

const hasValue = computed(() => props.modelValue !== undefined && props.modelValue !== '')
const hasLabel = computed(() => !!props.label)
const float = computed(() => hasLabel.value && (focused.value || hasValue.value || !!props.prefix))

const classes = computed(() => [
  'input',
  {
    'input--has-label': hasLabel.value,
    'input--float': float.value,
    'input--focused': focused.value,
    'input--error': !!props.error && !props.disabled,
    'input--disabled': props.disabled,
  },
])

const cssVars = computed(() => ({
  '--input-height': `${props.size}px`,
  '--field-pt': hasLabel.value ? `${spec.value.pt}px` : '0px',
  '--label-float-up': `${spec.value.floatUp}px`,
}))

const showClear = computed(() => props.clearable && hasValue.value && !props.disabled)

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
function clear() {
  emit('update:modelValue', '')
  emit('clear')
}
</script>

<template>
  <div :class="classes" :style="cssVars">
    <div class="input__box">
      <Icon v-if="icon" :name="icon" :size="20" class="input__icon" />
      <span v-if="prefix" class="input__prefix">{{ prefix }}</span>

      <div class="input__control">
        <input
          class="input__field"
          :type="type"
          :value="modelValue"
          :placeholder="placeholder ?? ' '"
          :disabled="disabled"
          @input="onInput"
          @focus="focused = true"
          @blur="focused = false"
        />
        <label v-if="label" class="input__label">
          {{ label }}<span v-if="required" class="input__req">&nbsp;*</span>
        </label>
      </div>

      <button v-if="showClear" type="button" class="input__clear" aria-label="Clear" @click="clear">
        <Icon name="x" :size="20" />
      </button>
      <span v-if="help" class="input__help"><Icon name="help-circle" :size="20" /></span>
    </div>

    <p v-if="error || helper" class="input__helper">{{ error || helper }}</p>
  </div>
</template>
