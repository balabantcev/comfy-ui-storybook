<script setup lang="ts">
import { computed, ref } from 'vue'
import Icon from '../Icon/Icon.vue'
import Flag from '../Flag/Flag.vue'
import type { FlagCode } from '../Flag/flag.tokens'
import Dropdown from '../Dropdown/Dropdown.vue'
import DropdownItem from '../Dropdown/DropdownItem.vue'
import './input.css'

// Figma: Base components / Input (node 11215:919) — Type: Default | Phone number | Price.
export type InputKind = 'default' | 'phone' | 'price'
export interface InputCountry {
  code: FlagCode
  /** Dial code, e.g. "+380" */
  dial: string
}

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
    /** Figma "Type": phone (country + masked number) or price (grouped amount + currency) */
    kind?: InputKind
    /** Phone mask — `#` is a digit (Figma: "(--) --- -- --") */
    mask?: string
    /** Phone: selected country (v-model:country) */
    country?: FlagCode
    /** Phone: countries to pick from; omit for a static country */
    countries?: InputCountry[]
    /** Price: selected currency code (v-model:currency), e.g. "UAH" */
    currency?: string
    /** Price: currencies to pick from; omit for a static code */
    currencies?: string[]
  }>(),
  {
    required: false,
    size: 56,
    type: 'text',
    help: false,
    clearable: false,
    disabled: false,
    kind: 'default',
    mask: '(##) ### ## ##',
    country: 'UA',
    currency: 'UAH',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'update:country', value: FlagCode): void
  (e: 'update:currency', value: string): void
  (e: 'clear'): void
}>()

// ---------- Phone mask / price formatting ----------
const DEFAULT_COUNTRIES: InputCountry[] = [{ code: 'UA', dial: '+380' }]
const countryList = computed(() => props.countries ?? DEFAULT_COUNTRIES)
const activeCountry = computed(() => countryList.value.find((c) => c.code === props.country) ?? countryList.value[0])

const maskDigits = computed(() => (props.mask.match(/#/g) ?? []).length)
function applyMask(digits: string): string {
  if (!digits) return ''
  let out = ''
  let i = 0
  for (const ch of props.mask) {
    if (i >= digits.length) break
    out += ch === '#' ? digits[i++] : ch
  }
  return out
}
/** Split a typed price into integer + up to 2 decimals (comma or dot as the separator). */
function parsePrice(text: string): { int: string; dec?: string } {
  const cleaned = text.replace(/[^\d.,]/g, '')
  const sep = cleaned.search(/[.,]/)
  if (sep === -1) return { int: cleaned.replace(/^0+(?=\d)/, '') }
  return {
    int: cleaned.slice(0, sep).replace(/[.,]/g, '').replace(/^0+(?=\d)/, '') || '0',
    dec: cleaned.slice(sep + 1).replace(/[.,]/g, '').slice(0, 2),
  }
}
function formatPrice(int: string, dec?: string): string {
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return dec === undefined ? grouped : `${grouped},${dec}`
}

const displayValue = computed(() => {
  const raw = props.modelValue === undefined || props.modelValue === null ? '' : String(props.modelValue)
  if (props.kind === 'phone') return applyMask(raw.replace(/\D/g, '').slice(0, maskDigits.value))
  if (props.kind === 'price') {
    if (!raw) return ''
    const [int, dec] = raw.split('.')
    return formatPrice(int, dec)
  }
  return raw
})

const placeholderText = computed(() => {
  if (props.placeholder !== undefined) return props.placeholder
  if (props.kind === 'phone') return props.mask.replace(/#/g, '-')
  return ' '
})
const inputMode = computed(() => (props.kind === 'phone' ? 'tel' : props.kind === 'price' ? 'decimal' : undefined))
const nativeType = computed(() => (props.kind === 'phone' ? 'tel' : props.kind === 'price' ? 'text' : props.type))

/** Count digits before the caret so it can be restored after reformatting. */
const digitsBefore = (s: string, pos: number) => (s.slice(0, pos).match(/\d/g) ?? []).length
function caretAfterDigits(s: string, n: number): number {
  if (n === 0) return 0
  let seen = 0
  for (let i = 0; i < s.length; i++) if (/\d/.test(s[i]) && ++seen === n) return i + 1
  return s.length
}

const focused = ref(false)
const spec = computed(() => SIZE_SPEC[props.size] ?? SIZE_SPEC[56])

const hasValue = computed(() => props.modelValue !== undefined && props.modelValue !== null && props.modelValue !== '')
const hasLabel = computed(() => !!props.label)
const float = computed(() => hasLabel.value && (focused.value || hasValue.value || !!props.prefix || props.kind === 'phone'))

const classes = computed(() => [
  'input',
  `input--${props.kind}`,
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
  const el = e.target as HTMLInputElement
  if (props.kind === 'default') {
    emit('update:modelValue', el.value)
    return
  }
  const caretDigits = digitsBefore(el.value, el.selectionStart ?? el.value.length)
  let formatted: string
  if (props.kind === 'phone') {
    const digits = el.value.replace(/\D/g, '').slice(0, maskDigits.value)
    formatted = applyMask(digits)
    emit('update:modelValue', digits)
  } else {
    const { int, dec } = parsePrice(el.value)
    formatted = int || dec !== undefined ? formatPrice(int || '0', dec) : ''
    emit('update:modelValue', int || dec !== undefined ? (dec === undefined ? int : `${int || '0'}.${dec}`) : '')
  }
  // keep the field in sync even when the model value did not change (e.g. a rejected key)
  el.value = formatted
  const pos = caretAfterDigits(formatted, caretDigits)
  el.setSelectionRange(pos, pos)
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

      <!-- Phone: country (Figma: Flags + dial code + chevron) -->
      <Dropdown v-if="kind === 'phone' && countries && countries.length > 1 && !disabled" :width="200" class="input__addon">
        <template #trigger>
          <button type="button" class="input__picker" :aria-label="`Країна: ${activeCountry.code}`">
            <Flag :code="activeCountry.code" />
            <span class="input__picker-text">{{ activeCountry.dial }}</span>
            <Icon name="chevron-down" :size="16" class="input__picker-chevron" />
          </button>
        </template>
        <template #default="{ close }">
          <DropdownItem
            v-for="c in countries"
            :key="c.code"
            :size="32"
            :active="c.code === activeCountry.code"
            @click="emit('update:country', c.code); close()"
          >
            <template #leading><Flag :code="c.code" /></template>
            {{ c.dial }}
          </DropdownItem>
        </template>
      </Dropdown>
      <span v-else-if="kind === 'phone'" class="input__picker input__picker--static">
        <Flag :code="activeCountry.code" />
        <span class="input__picker-text">{{ activeCountry.dial }}</span>
      </span>

      <span v-if="prefix" class="input__prefix">{{ prefix }}</span>

      <div class="input__control">
        <input
          class="input__field"
          :type="nativeType"
          :inputmode="inputMode"
          :value="displayValue"
          :placeholder="placeholderText"
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

      <!-- Price: currency (Figma: "UAH" + chevron) -->
      <Dropdown v-if="kind === 'price' && currencies && currencies.length > 1 && !disabled" :width="120" align="right" class="input__addon">
        <template #trigger>
          <button type="button" class="input__picker" :aria-label="`Валюта: ${currency}`">
            <span class="input__picker-text">{{ currency }}</span>
            <Icon name="chevron-down" :size="16" class="input__picker-chevron" />
          </button>
        </template>
        <template #default="{ close }">
          <DropdownItem
            v-for="c in currencies"
            :key="c"
            :size="32"
            :active="c === currency"
            @click="emit('update:currency', c); close()"
          >
            {{ c }}
          </DropdownItem>
        </template>
      </Dropdown>
      <span v-else-if="kind === 'price'" class="input__picker input__picker--static">
        <span class="input__picker-text">{{ currency }}</span>
      </span>
    </div>

    <p v-if="error || helper" class="input__helper">{{ error || helper }}</p>
  </div>
</template>
