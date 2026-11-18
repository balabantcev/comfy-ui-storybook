<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import Icon from '../Icon/Icon.vue'
import Counter from '../Counter/Counter.vue'
import Button from '../Button/Button.vue'
import DropdownMenu from '../Dropdown/DropdownMenu.vue'
import DropdownItem from '../Dropdown/DropdownItem.vue'
import Checkbox from '../Checkbox/Checkbox.vue'
import { BUTTON_SIZES } from '../Button/button.tokens'
import './filter-select.css'

type Value = string | number
interface Option {
  value: Value
  label: string
}

const props = withDefaults(
  defineProps<{
    /** Filter name shown when nothing is selected */
    label: string
    options: Option[]
    /** Selected value (single) or values (multiple) */
    modelValue?: Value | Value[] | null
    multiple?: boolean
    /** Leading icon shown in the active state */
    icon?: string
    /** Trigger height in px */
    size?: number
    pill?: boolean
    disabled?: boolean
    clearable?: boolean
    /** Panel width in px */
    width?: number
  }>(),
  { multiple: false, size: 40, pill: false, disabled: false, clearable: true, width: 240 },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: Value | Value[] | null): void
}>()

const root = ref<HTMLElement>()
const open = ref(false)

// normalize selection to an array
const selected = computed<Value[]>(() => {
  const v = props.modelValue
  if (v === null || v === undefined || v === '') return []
  return Array.isArray(v) ? v : [v]
})
const active = computed(() => selected.value.length > 0)
const count = computed(() => selected.value.length)

const displayLabel = computed(() => {
  if (!props.multiple && active.value) {
    return props.options.find((o) => o.value === selected.value[0])?.label ?? props.label
  }
  return props.label
})

const showClear = computed(() => props.clearable && active.value && !props.disabled)

// pending state for multi (applied via the footer button)
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
function clear() {
  emit('update:modelValue', props.multiple ? [] : null)
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

const cssVars = computed(() => {
  const radius = BUTTON_SIZES[props.size]?.radius ?? 10
  return {
    '--fs-height': `${props.size}px`,
    '--fs-radius': `var(--radius-${radius}, ${radius}px)`,
  }
})
</script>

<template>
  <div
    ref="root"
    :class="['filter-select', { 'filter-select--active': active, 'filter-select--pill': pill }]"
    :style="cssVars"
  >
    <div class="filter-select__trigger">
      <button
        type="button"
        :class="['filter-trigger', { 'filter-trigger--connected': showClear }]"
        :disabled="disabled"
        @click="toggle"
      >
        <Icon v-if="active && icon" :name="icon" :size="20" class="filter-trigger__icon" />
        <span class="filter-trigger__label">{{ displayLabel }}</span>
        <Counter v-if="multiple && active" :value="count" color="modern" :size="20" />
        <Icon :name="open ? 'chevron-up' : 'chevron-down'" :size="20" class="filter-trigger__icon" />
      </button>

      <button v-if="showClear" type="button" class="filter-clear" aria-label="Clear" @click="clear">
        <Icon name="x" :size="20" />
      </button>
    </div>

    <div v-if="open" class="filter-select__panel">
      <DropdownMenu :width="width" :role="multiple ? 'group' : 'menu'" :label="label">
        <!-- Single select -->
        <template v-if="!multiple">
          <DropdownItem
            v-for="opt in options"
            :key="opt.value"
            :selected="selected[0] === opt.value"
            @click="selectSingle(opt.value)"
          >
            {{ opt.label }}
          </DropdownItem>
        </template>

        <!-- Multi select -->
        <template v-else>
          <div v-for="opt in options" :key="opt.value" class="filter-select__option">
            <Checkbox
              :model-value="pending.includes(opt.value)"
              :label="opt.label"
              @change="togglePending(opt.value)"
            />
          </div>
        </template>

        <template v-if="multiple" #footer>
          <div class="filter-select__footer">
            <Button variant="link" intent="gray" :size="32" @click="clearAll">Очистити все</Button>
            <Button variant="primary" :size="32" @click="applyMulti">Застосувати</Button>
          </div>
        </template>
      </DropdownMenu>
    </div>
  </div>
</template>
