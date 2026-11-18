<script setup lang="ts">
import { computed, nextTick, ref, watch, onBeforeUnmount, useId } from 'vue'
import Icon from '../Icon/Icon.vue'
import Counter from '../Counter/Counter.vue'
import Badge from '../Badge/Badge.vue'
import DropdownMenu from '../Dropdown/DropdownMenu.vue'
import DropdownEmptyState from '../Dropdown/DropdownEmptyState.vue'
import DropdownFooter from '../Dropdown/DropdownFooter.vue'
import Checkbox from '../Checkbox/Checkbox.vue'
import '../Input/input.css'
import './select.css'

// Figma: Base components / Select (node 11702:3456)
//   Type  → `type`: Default | Icon | Dot | Tags
//   items → -Select item (Default/Icon/Dot), -Multi-select item (checkbox + trailing hint)

type Value = string | number
/** Dot colors map to the theme-aware utility scales (Figma binds utility-{color}-500). */
export type SelectDotColor = 'gray' | 'brand' | 'success' | 'warning' | 'error' | 'blue' | 'purple' | 'magenta' | 'orange'
export interface SelectOption {
  value: Value
  label: string
  disabled?: boolean
  /** Leading icon (type="icon") */
  icon?: string
  /** Status dot color (type="dot"), default "brand" */
  dot?: SelectDotColor
  /** Secondary trailing text in multi-select rows (Figma "Discount") */
  hint?: string
}
export type SelectType = 'default' | 'icon' | 'dot' | 'tags'

// same float geometry as Input
const SIZE_SPEC: Record<number, { pt: number; floatUp: number }> = {
  56: { pt: 24, floatUp: 16 },
  48: { pt: 22, floatUp: 14 },
  44: { pt: 19, floatUp: 12 },
}

const props = withDefaults(
  defineProps<{
    /** Selected value (single) or values (multiple / tags) — v-model */
    modelValue?: Value | Value[] | null
    options: SelectOption[]
    /** Figma "Type": default, icon (leading icon), dot (status dot), tags (search + removable chips) */
    type?: SelectType
    /** Leading field icon for type="icon" (falls back to the selected option's icon) */
    icon?: string
    /** Floating label */
    label?: string
    required?: boolean
    /** Multi-select with checkboxes + Apply footer (implied by type="tags", which applies instantly) */
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
    /** Empty-state copy (Figma -Dropdown-empty_state) */
    emptyTitle?: string
    emptyDescription?: string
  }>(),
  {
    type: 'default',
    required: false,
    multiple: false,
    size: 56,
    disabled: false,
    itemSize: 40,
    emptyTitle: 'Нічого не вдалося знайти',
    emptyDescription: 'Спробуйте змінити запит.',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: Value | Value[] | null): void
}>()

const root = ref<HTMLElement>()
const queryInput = ref<HTMLInputElement>()
const open = ref(false)
const query = ref('')

const isTags = computed(() => props.type === 'tags')
const isMulti = computed(() => props.multiple || isTags.value)
const spec = computed(() => SIZE_SPEC[props.size] ?? SIZE_SPEC[56])

const selected = computed<Value[]>(() => {
  const v = props.modelValue
  if (v === null || v === undefined || v === '') return []
  return Array.isArray(v) ? v : [v]
})
const hasValue = computed(() => selected.value.length > 0)
const selectedOptions = computed(() =>
  selected.value.map((v) => props.options.find((o) => o.value === v)).filter((o): o is SelectOption => !!o),
)

const displayText = computed(() => {
  if (!hasValue.value || isTags.value) return ''
  return selectedOptions.value.map((o) => o.label).join(', ')
})

// Leading adornment in the field (Figma: icon-tertiary icon / status dot / search icon)
const fieldIcon = computed(() => {
  if (props.type === 'tags') return 'search'
  if (props.type === 'icon') return props.icon ?? selectedOptions.value[0]?.icon ?? 'user'
  return undefined
})
const fieldDot = computed(() => (props.type === 'dot' ? selectedOptions.value[0]?.dot ?? 'brand' : undefined))

const visibleOptions = computed(() => {
  const q = query.value.trim().toLowerCase()
  return q ? props.options.filter((o) => o.label.toLowerCase().includes(q)) : props.options
})

const labelId = useId()
const float = computed(() => !!props.label && (open.value || hasValue.value || !!query.value))

const classes = computed(() => [
  'select',
  'input',
  `select--${props.type}`,
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

// pending state for multi (committed via Apply); tags commit instantly
const pending = ref<Value[]>([])
watch(open, (v) => {
  if (v) pending.value = [...selected.value]
  else query.value = ''
})

function toggle() {
  if (props.disabled) return
  if (isTags.value) {
    open.value = true
    nextTick(() => queryInput.value?.focus())
    return
  }
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
function toggleTag(value: Value) {
  const next = selected.value.includes(value) ? selected.value.filter((v) => v !== value) : [...selected.value, value]
  emit('update:modelValue', next)
}
function removeTag(value: Value) {
  emit('update:modelValue', selected.value.filter((v) => v !== value))
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
      :aria-labelledby="label ? labelId : undefined"
      :aria-label="label ? undefined : 'Вибір'"
      :aria-expanded="open"
      :aria-required="required || undefined"
      :aria-disabled="disabled || undefined"
      :tabindex="isTags ? -1 : 0"
      @click="toggle"
      @keydown.enter.prevent="toggle"
      @keydown.space="!isTags && ($event.preventDefault(), toggle())"
    >
      <Icon v-if="fieldIcon" :name="fieldIcon" :size="20" class="select__lead-icon" />
      <span v-else-if="fieldDot" class="select__dot select__dot--lead" :class="`select__dot--${fieldDot}`" />

      <div class="input__control">
        <!-- Tags: removable chips + search input -->
        <div v-if="isTags" class="select__tags">
          <button
            v-for="opt in selectedOptions"
            :key="opt.value"
            type="button"
            class="select__tag"
            :aria-label="`Прибрати «${opt.label}»`"
            :disabled="disabled"
            @click.stop="removeTag(opt.value)"
          >
            <Badge color="gray" :size="22" icon-right="x">{{ opt.label }}</Badge>
          </button>
          <input
            ref="queryInput"
            v-model="query"
            class="select__query"
            type="text"
            :disabled="disabled"
            :aria-label="label || 'Пошук'"
            @focus="open = true"
          />
        </div>
        <span v-else-if="displayText" class="select__value">{{ displayText }}</span>
        <label v-if="label" :id="labelId" class="input__label">
          {{ label }}<span v-if="required" class="input__req" aria-hidden="true">&nbsp;*</span>
        </label>
      </div>

      <template v-if="!isTags">
        <Counter v-if="multiple && hasValue" :value="selected.length" color="grey" :size="20" />
        <Icon name="chevron-down" :size="16" class="select__chevron" />
      </template>
    </div>

    <p v-if="error || helper" class="input__helper">{{ error || helper }}</p>

    <div v-if="open" class="select__panel">
      <DropdownMenu :role="isMulti ? 'group' : 'listbox'" :label="label">
        <template v-if="!visibleOptions.length" #empty>
          <DropdownEmptyState
            :title="emptyTitle"
            :description="emptyDescription"
            :action-label="query ? 'Очистити пошук' : ''"
            @action="query = ''"
          />
        </template>

        <!-- Single -->
        <template v-if="!isMulti">
          <button
            v-for="opt in visibleOptions"
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
              <Icon v-if="type === 'icon' && opt.icon" :name="opt.icon" :size="20" class="select-item__icon" />
              <span v-else-if="type === 'dot'" class="select__dot" :class="`select__dot--${opt.dot ?? 'brand'}`" />
              <span class="select-item__label">{{ opt.label }}</span>
            </span>
          </button>
        </template>

        <!-- Tags: instant toggle -->
        <template v-else-if="isTags">
          <div v-for="opt in visibleOptions" :key="opt.value" class="select__option">
            <Checkbox
              :model-value="selected.includes(opt.value)"
              :label="opt.label"
              :disabled="opt.disabled"
              @change="toggleTag(opt.value)"
            />
            <span v-if="opt.hint" class="select__hint">{{ opt.hint }}</span>
          </div>
        </template>

        <!-- Multi: pending until Apply -->
        <template v-else>
          <div v-for="opt in visibleOptions" :key="opt.value" class="select__option">
            <Checkbox
              :model-value="pending.includes(opt.value)"
              :label="opt.label"
              :disabled="opt.disabled"
              @change="togglePending(opt.value)"
            />
            <span v-if="opt.hint" class="select__hint">{{ opt.hint }}</span>
          </div>
        </template>

        <template v-if="multiple && !isTags && visibleOptions.length" #footer>
          <DropdownFooter layout="horizontal" @clear="clearAll" @apply="applyMulti" />
        </template>
      </DropdownMenu>
    </div>
  </div>
</template>
