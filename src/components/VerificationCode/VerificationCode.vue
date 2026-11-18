<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import './verification-code.css'

// Figma: Base components / Input / Verification code (node 13421:8616).
// One Figma cell = one <input>; the component lays out `length` of them.

const props = withDefaults(
  defineProps<{
    /** The code (digits only) — v-model */
    modelValue?: string
    /** Number of cells */
    length?: number
    /** Cell size in px — 56, 48 or 44 (Figma "Size") */
    size?: number
    /** Error message (string) or flag — Figma "Destructive" */
    error?: string | boolean
    /** Helper text below the cells */
    helper?: string
    disabled?: boolean
    /** Accessible name for the group */
    label?: string
  }>(),
  { modelValue: '', length: 4, size: 56, error: false, disabled: false, label: 'Код підтвердження' },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  /** Fired once every cell holds a digit */
  (e: 'complete', value: string): void
}>()

const cells = ref<HTMLInputElement[]>([])
const digits = computed(() => Array.from({ length: props.length }, (_, i) => props.modelValue[i] ?? ''))
const hasError = computed(() => !!props.error && !props.disabled)
const message = computed(() => (typeof props.error === 'string' && props.error ? props.error : props.helper))

function commit(next: string[]) {
  // keep only the leading run of digits so the value stays contiguous
  let value = ''
  for (const d of next) {
    if (!d) break
    value += d
  }
  emit('update:modelValue', value)
  if (value.length === props.length) emit('complete', value)
}

function focusCell(i: number) {
  const el = cells.value[Math.max(0, Math.min(i, props.length - 1))]
  el?.focus()
  el?.select()
}

function onInput(i: number, e: Event) {
  const el = e.target as HTMLInputElement
  const typed = el.value.replace(/\D/g, '')
  const next = [...digits.value]
  if (!typed) {
    next[i] = ''
    el.value = ''
    commit(next)
    return
  }
  // Typing next to an existing digit yields "old+new" or "new+old" → keep only the new one.
  // Several new digits at once (autofill / one-time-code) are spread across the cells.
  const prev = next[i]
  let incoming = typed
  if (prev && typed.length === 2) incoming = typed[0] === prev ? typed[1] : typed[1] === prev ? typed[0] : typed
  for (let k = 0; k < incoming.length && i + k < props.length; k++) next[i + k] = incoming[k]
  el.value = next[i]
  commit(next)
  nextTick(() => focusCell(Math.min(i + incoming.length, props.length - 1)))
}

function onKeydown(i: number, e: KeyboardEvent) {
  if (e.key === 'Backspace' && !digits.value[i] && i > 0) {
    e.preventDefault()
    const next = [...digits.value]
    next[i - 1] = ''
    commit(next)
    nextTick(() => focusCell(i - 1))
  } else if (e.key === 'ArrowLeft' && i > 0) {
    e.preventDefault()
    focusCell(i - 1)
  } else if (e.key === 'ArrowRight' && i < props.length - 1) {
    e.preventDefault()
    focusCell(i + 1)
  }
}

function onPaste(i: number, e: ClipboardEvent) {
  const pasted = (e.clipboardData?.getData('text') ?? '').replace(/\D/g, '')
  if (!pasted) return
  e.preventDefault()
  const next = [...digits.value]
  for (let k = 0; k < pasted.length && i + k < props.length; k++) next[i + k] = pasted[k]
  commit(next)
  nextTick(() => focusCell(Math.min(i + pasted.length, props.length - 1)))
}

const classes = computed(() => [
  'vcode',
  { 'vcode--error': hasError.value, 'vcode--disabled': props.disabled },
])
const cssVars = computed(() => ({ '--vcode-size': `${props.size}px` }))
</script>

<template>
  <div :class="classes" :style="cssVars">
    <div class="vcode__cells" role="group" :aria-label="label">
      <input
        v-for="(d, i) in digits"
        :key="i"
        :ref="(el) => { if (el) cells[i] = el as HTMLInputElement }"
        class="vcode__cell"
        type="text"
        inputmode="numeric"
        pattern="[0-9]*"
        :autocomplete="i === 0 ? 'one-time-code' : 'off'"
        placeholder="0"
        :value="d"
        :disabled="disabled"
        :aria-label="`${label}: цифра ${i + 1} з ${length}`"
        :aria-invalid="hasError || undefined"
        @input="onInput(i, $event)"
        @keydown="onKeydown(i, $event)"
        @paste="onPaste(i, $event)"
        @focus="($event.target as HTMLInputElement).select()"
      />
    </div>
    <p v-if="message" class="vcode__helper">{{ message }}</p>
  </div>
</template>
