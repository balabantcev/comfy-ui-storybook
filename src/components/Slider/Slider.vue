<script setup lang="ts">
import { computed, ref } from 'vue'
import './slider.css'

type Model = number | [number, number]

const props = withDefaults(
  defineProps<{
    /** Single value (number) or range ([min, max]) — v-model */
    modelValue?: Model
    min?: number
    max?: number
    step?: number
    /** Value labels below the thumbs */
    labels?: boolean
    /** Format a value for the label */
    format?: (v: number) => string
    /** Accessible names for the thumbs (screen readers) */
    thumbLabels?: string[]
    disabled?: boolean
  }>(),
  {
    modelValue: 0,
    min: 0,
    max: 100,
    step: 1,
    labels: false,
    format: (v: number) => String(v),
    thumbLabels: () => ['Мінімальне значення', 'Максимальне значення'],
    disabled: false,
  },
)

const emit = defineEmits<{ (e: 'update:modelValue', value: Model): void }>()

const trackRef = ref<HTMLElement>()
const isRange = computed(() => Array.isArray(props.modelValue))

// normalized thumb values, always [lo, hi]; single = [value]
const values = computed<number[]>(() =>
  Array.isArray(props.modelValue) ? [...props.modelValue] : [props.modelValue],
)

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi)

function thumbLabel(i: number): string {
  if (isRange.value) return props.thumbLabels[i] ?? `Повзунок ${i + 1}`
  // single thumb: a custom single label wins, the range defaults don't apply
  return props.thumbLabels.length === 1 ? props.thumbLabels[0] : 'Значення'
}
function pct(v: number) {
  return ((v - props.min) / (props.max - props.min)) * 100
}

const fillStart = computed(() => (isRange.value ? pct(values.value[0]) : 0))
const fillEnd = computed(() => pct(isRange.value ? values.value[1] : values.value[0]))

const cssVars = computed(() => ({
  '--fill-start': `${fillStart.value}%`,
  '--fill-width': `${fillEnd.value - fillStart.value}%`,
}))

function valueFromClientX(clientX: number): number {
  const rect = trackRef.value!.getBoundingClientRect()
  let p = (clientX - rect.left) / rect.width
  p = clamp(p, 0, 1)
  let v = props.min + p * (props.max - props.min)
  v = Math.round(v / props.step) * props.step
  return clamp(v, props.min, props.max)
}

function emitAt(index: number, value: number) {
  if (!isRange.value) {
    emit('update:modelValue', value)
    return
  }
  const next = [...values.value] as [number, number]
  next[index] = value
  // keep order
  if (next[0] > next[1]) {
    if (index === 0) next[0] = next[1]
    else next[1] = next[0]
  }
  emit('update:modelValue', next)
}

let activeIndex = 0
function onPointerDown(index: number, e: PointerEvent) {
  if (props.disabled) return
  activeIndex = index
  try {
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  } catch {
    /* pointer capture may be unavailable (e.g. synthetic events) */
  }
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
}
function onPointerMove(e: PointerEvent) {
  emitAt(activeIndex, valueFromClientX(e.clientX))
}
function onPointerUp() {
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
}

function onTrackClick(e: PointerEvent) {
  if (props.disabled) return
  const v = valueFromClientX(e.clientX)
  // move the nearest thumb
  let nearest = 0
  if (isRange.value) {
    nearest = Math.abs(values.value[0] - v) <= Math.abs(values.value[1] - v) ? 0 : 1
  }
  emitAt(nearest, v)
}

function onKey(index: number, e: KeyboardEvent) {
  if (props.disabled) return
  const cur = values.value[index]
  if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') emitAt(index, clamp(cur - props.step, props.min, props.max))
  else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') emitAt(index, clamp(cur + props.step, props.min, props.max))
  else return
  e.preventDefault()
}
</script>

<template>
  <div :class="['slider', { 'slider--disabled': disabled }]" :style="cssVars">
    <div ref="trackRef" class="slider__track" @pointerdown="onTrackClick" />
    <div class="slider__fill" />

    <div
      v-for="(v, i) in values"
      :key="i"
      class="slider__thumb"
      role="slider"
      tabindex="0"
      :aria-label="thumbLabel(i)"
      :aria-valuemin="min"
      :aria-valuemax="max"
      :aria-valuenow="v"
      :aria-disabled="disabled || undefined"
      :style="{ left: `${pct(v)}%` }"
      @pointerdown="onPointerDown(i, $event)"
      @keydown="onKey(i, $event)"
    />

    <template v-if="labels">
      <span
        v-for="(v, i) in values"
        :key="`l${i}`"
        class="slider__label"
        :style="{ left: `${pct(v)}%` }"
      >
        {{ format(v) }}
      </span>
    </template>
  </div>
</template>
