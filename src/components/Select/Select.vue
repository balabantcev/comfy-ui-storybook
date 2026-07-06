<script setup lang="ts">
import { computed, ref, watch, onBeforeUnmount } from 'vue'
import Icon from '../Icon/Icon.vue'
import Counter from '../Counter/Counter.vue'
import Button from '../Button/Button.vue'
import DropdownMenu from '../Dropdown/DropdownMenu.vue'
import Checkbox from '../Checkbox/Checkbox.vue'
import '../Input/input.css'
import './select.css'

type Value = string | number
interface Option {
  value: Value
  label: string
  disabled?: boolean
}

// same float geometry as Input
const SIZE_SPEC: Record<number, { pt: number; floatUp: number }> = {
  56: { pt: 24, floatUp: 16 },
  48: { pt: 22, floatUp: 14 },
  44: { pt: 19, floatUp: 12 },
}

const props = withDefaults(
  defineProps<{
    /** Selected value (single) or values (multiple) — v-model */
    modelValue?: Value | Value[] | null
    options: Option[]
    /** Floating label */
    label?: string
    required?: boolean
    multiple?: boolean
    /** Height — 44, 48 or 56 */
    size?: number
    /** Helper / hint text below the field */
    helper?: string
    /** Error message — switches to the error state */
    error?: string
    disabled?: boolean
    /** Menu item height — 40 or 32 */
    itemSize?: number
  }>(),
  { required: false, multiple: false, size: 56, disabled: false, itemSize: 40 },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: Value | Value[] | null): void
}>()

const root = ref<HTMLElement>()
const open = ref(false)

const spec = computed(() => SIZE_SPEC[props.size] ?? SIZE_SPEC[56])

const selected = computed<Value[]>(() => {
  const v = props.modelValue
  if (v === null || v === undefined || v === '') return []
  return Array.isArray(v) ? v : [v]
})
const hasValue = computed(() => selected.value.length > 0)

const displayText = computed(() => {
  if (!hasValue.value) return ''
  if (props.multiple) {
    return props.options
      .filter((o) => selected.value.includes(o.value))
      .map((o) => o.label)
      .join(', ')
  }
  return props.options.find((o) => o.value === selected.value[0])?.label ?? ''
})

const float = computed(() => !!props.label && (open.value || hasValue.value))

const classes = computed(() => [
  'select',
  'input',
  {
    'input--has-label': !!props.label,
    'input--float': float.value,
    'input--focused': open.value && !props.disabled,
    'input--error': !!props.error && !props.disabled,
    'input--disabled': props.disabled,
    'select--open': open.value,
    'select--disabled': props.disabled,
  },
])

const cssVars = computed(() => ({
  '--input-height': `${props.size}px`,
  '--field-pt': props.label ? `${spec.value.pt}px` : '0px',
  '--label-float-up': `${spec.value.floatUp}px`,
  '--si-pad': props.itemSize === 32 ? '6px' : '8px',
  '--si-font-size': props.itemSize === 32 ? 'var(--font-body-2-size, 14px)' : 'var(--font-body-1-size, 16px)',
  '--si-line-height': props.itemSize === 32 ? 'var(--font-body-2-line-height, 20px)' : 'var(--font-body-1-line-height, 22px)',
}))

// pending state for multi (committed via Apply)
const pending = ref<Value[]>([])
watch(open, (v) => {
  if (v) pending.value = [...selected.value]
})

function toggle() {
  if (props.disabled) return
  open.value = !open.value
}
function selectSingle(value: Value) {
  emit('update:modelValue', value)
  open.value = false
}
function togglePending(value: Value) {
  const i = pending.value.indexOf(value)
  if (i === -1) pending.value.push(value)
  else pending.value.splice(i, 1)
}
function applyMulti() {
  emit('update:modelValue', [...pending.value])
  open.value = false
}
function clearAll() {
  pending.value = []
}

function onDocClick(e: MouseEvent) {
  if (open.value && root.value && !root.value.contains(e.target as Node)) open.value = false
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}
watch(open, (v) => {
  if (typeof document === 'undefined') return
  if (v) {
    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onKey)
  } else {
    document.removeEventListener('click', onDocClick)
    document.removeEventListener('keydown', onKey)
  }
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div ref="root" :class="classes" :style="cssVars">
    <div
      class="input__box"
      role="combobox"
      :aria-expanded="open"
      :aria-disabled="disabled || undefined"
      tabindex="0"
      @click="toggle"
      @keydown.enter.prevent="toggle"
      @keydown.space.prevent="toggle"
    >
      <div class="input__control">
        <span v-if="displayText" class="select__value">{{ displayText }}</span>
        <label v-if="label" class="input__label">
          {{ label }}<span v-if="required" class="input__req">&nbsp;*</span>
        </label>
      </div>

      <Counter v-if="multiple && hasValue" :value="selected.length" color="modern" :size="20" />
      <Icon name="chevron-down" :size="16" class="select__chevron" />
    </div>

    <p v-if="error || helper" class="input__helper">{{ error || helper }}</p>

    <div v-if="open" class="select__panel">
      <DropdownMenu>
        <!-- Single -->
        <template v-if="!multiple">
          <button
            v-for="opt in options"
            :key="opt.value"
            type="button"
            class="select-item"
            :class="{ 'select-item--selected': selected[0] === opt.value }"
            :disabled="opt.disabled"
            role="option"
            :aria-selected="selected[0] === opt.value"
            @click="selectSingle(opt.value)"
          >
            <span class="select-item__box">
              <span class="select-item__label">{{ opt.label }}</span>
              <Icon v-if="selected[0] === opt.value" name="check" :size="20" class="select-item__check" />
            </span>
          </button>
        </template>

        <!-- Multi -->
        <template v-else>
          <div v-for="opt in options" :key="opt.value" class="select__option">
            <Checkbox
              :model-value="pending.includes(opt.value)"
              :label="opt.label"
              :disabled="opt.disabled"
              @change="togglePending(opt.value)"
            />
          </div>
          <div class="select__footer">
            <Button variant="link" intent="gray" :size="32" @click="clearAll">Очистити все</Button>
            <Button variant="primary" :size="32" @click="applyMulti">Застосувати</Button>
          </div>
        </template>
      </DropdownMenu>
    </div>
  </div>
</template>
