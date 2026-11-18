<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import StepIcon from './StepIcon.vue'
import FeaturedIcon from '../FeaturedIcon/FeaturedIcon.vue'
import {
  STEP_SIZES,
  stepStatus,
  type ProgressStep,
  type ProgressStepsLayout,
  type ProgressStepsSize,
  type ProgressStepsType,
  type ProgressStepsVariant,
} from './progress-steps.tokens'
import './progress-steps.css'

// Figma: Progress steps — steps built from "-Step base" (+ "-Step icon base" / Featured icon):
//   layout horizontal = Breakpoint Desktop (Icon top · Number top · Featured icon top · Line top)
//   layout vertical   = Breakpoint Mobile / "Only vertical" (… left)
//   variant minimal / connected = "Progress steps-Minimal icons" (-Connected)
// Each step's status comes from `current` (before → complete, at → current, after → incomplete).

const props = withDefaults(
  defineProps<{
    steps: ProgressStep[]
    /** Index (0-based) of the current step; steps.length marks everything complete */
    current?: number
    type?: ProgressStepsType
    size?: ProgressStepsSize
    layout?: ProgressStepsLayout
    variant?: ProgressStepsVariant
    /** Minimal variants: the "Крок X з N" text */
    summary?: (current: number, total: number) => string
    /** Accessible name of the list */
    label?: string
  }>(),
  {
    current: 0,
    type: 'icon',
    size: 's',
    layout: 'auto',
    variant: 'default',
    summary: (current: number, total: number) => `Крок ${Math.min(current + 1, total)} з ${total}`,
    label: 'Кроки',
  },
)

// layout "auto": horizontal from 768px (Figma Desktop), vertical below (Mobile)
const wide = ref(true)
let mq: MediaQueryList | undefined
const onMq = () => (wide.value = !!mq?.matches)
onMounted(() => {
  if (typeof window === 'undefined' || !window.matchMedia) return
  mq = window.matchMedia('(min-width: 768px)')
  onMq()
  mq.addEventListener('change', onMq)
})
onBeforeUnmount(() => mq?.removeEventListener('change', onMq))

const resolvedLayout = computed(() => (props.layout === 'auto' ? (wide.value ? 'horizontal' : 'vertical') : props.layout))
const spec = computed(() => STEP_SIZES[props.size] ?? STEP_SIZES.s)
// minimal variants show check / number icons only
const iconType = computed(() => (props.type === 'number' ? 'number' : 'check'))

const items = computed(() =>
  props.steps.map((s, i) => ({ ...s, status: stepStatus(i, props.current, s.status), index: i })),
)

const classes = computed(() => [
  'ps',
  `ps--${props.variant}`,
  `ps--${props.type}`,
  `ps--${props.size}`,
  `ps--${resolvedLayout.value}`,
])
const style = computed(() => {
  const s = spec.value
  const railGap = props.type === 'line' ? 0 : s.railGap[props.type]
  return {
    '--ps-icon': `${props.type === 'featured' ? s.featured : s.icon}px`,
    '--ps-gap': `var(--padding-${s.gap})`,
    '--ps-rail-gap': `var(--padding-${railGap})`,
    '--ps-pad-top': props.type === 'featured' ? '0px' : `var(--padding-${s.padTop})`,
    '--ps-pad-bottom': `var(--padding-${props.type === 'featured' ? 32 : s.padBottom})`,
    '--ps-font-size': `var(--font-${s.font}-size)`,
    '--ps-line-height': `var(--font-${s.font}-line-height)`,
  }
})
const STATUS_TEXT = { complete: 'завершено', current: 'поточний крок', incomplete: 'не розпочато' } as const
</script>

<template>
  <!-- Minimal: "Крок X з N" + step icons (optionally joined by lines) -->
  <div v-if="variant !== 'default'" :class="classes" :style="style" role="group" :aria-label="label">
    <span class="ps__summary">{{ summary(current, steps.length) }}</span>
    <span class="ps__progress" aria-hidden="true">
      <template v-for="it in items" :key="it.index">
        <span
          v-if="variant === 'connected' && it.index > 0"
          :class="['ps__link', { 'ps__link--done': items[it.index - 1].status === 'complete' }]"
        />
        <StepIcon :type="iconType" :status="it.status" :size="spec.icon" :number="it.index + 1" />
      </template>
    </span>
  </div>

  <ol v-else :class="classes" :style="style" :aria-label="label">
    <li
      v-for="it in items"
      :key="it.index"
      :class="['ps-step', `ps-step--${it.status}`]"
      :aria-current="it.status === 'current' ? 'step' : undefined"
    >
      <span v-if="type === 'line'" class="ps-step__bar" aria-hidden="true" />
      <span v-else class="ps-step__rail">
        <FeaturedIcon
          v-if="type === 'featured'"
          class="ps-step__marker"
          type="modern"
          :color="it.status === 'complete' ? 'success' : 'gray'"
          :icon="it.icon ?? 'check-circle'"
          :size="spec.featured"
        />
        <StepIcon
          v-else
          class="ps-step__marker"
          :type="type === 'number' ? 'number' : 'check'"
          :status="it.status"
          :size="spec.icon"
          :number="it.index + 1"
        />
        <span class="ps-step__connector" aria-hidden="true" />
      </span>
      <span class="ps-step__content">
        <span class="ps-step__title">{{ it.title }}</span>
        <span v-if="it.description" class="ps-step__desc">{{ it.description }}</span>
        <span class="ps__sr"> ({{ STATUS_TEXT[it.status] }})</span>
      </span>
    </li>
  </ol>
</template>
