<script setup lang="ts">
import { computed, ref } from 'vue'
import Icon from '../Icon/Icon.vue'
import Counter from '../Counter/Counter.vue'
import {
  TABS_SIZE_SPECS,
  type TabItem,
  type TabsColor,
  type TabsSize,
  type TabsVariant,
} from './tabs.tokens'
import './tabs.css'

// Figma: Tabs — "Horizontal tabs" (segmented container: Color, Border, Full corner radius)
// with "-Tab button base" (Size 36 | 40, Active, icon, counter), and "-Tab button underline".
// Renders the tab list only (WAI-ARIA tabs pattern); the app renders the panels.

const props = withDefaults(
  defineProps<{
    /** Active tab value (v-model) */
    modelValue?: string | number
    items: TabItem[]
    variant?: TabsVariant
    /** Figma "Color" (segmented) */
    color?: TabsColor
    size?: TabsSize
    /** Figma "Border": a 4px frame around the tabs (segmented) */
    border?: boolean
    /** Figma "Full corner radius" (segmented) */
    pill?: boolean
    /** Accessible name of the tab list */
    label?: string
  }>(),
  { variant: 'segmented', color: 'brand', size: 36, border: false, pill: false },
)

const emit = defineEmits<{ (e: 'update:modelValue', value: string | number): void }>()

const spec = computed(() => TABS_SIZE_SPECS[props.size] ?? TABS_SIZE_SPECS[36])
const tabs = ref<HTMLButtonElement[]>([])

const activeIndex = computed(() => props.items.findIndex((t) => t.value === props.modelValue))
// roving tabindex: the active tab (or the first enabled one) is the single tab stop
const focusIndex = computed(() =>
  activeIndex.value >= 0 && !props.items[activeIndex.value].disabled
    ? activeIndex.value
    : props.items.findIndex((t) => !t.disabled),
)

function select(item: TabItem) {
  if (!item.disabled && item.value !== props.modelValue) emit('update:modelValue', item.value)
}

// Arrow keys move focus and activate (automatic activation); Home / End jump.
function onKeydown(e: KeyboardEvent, index: number) {
  const n = props.items.length
  const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
  let next = -1
  if (step) {
    for (let k = 1; k <= n; k++) {
      const i = (index + step * k + n) % n
      if (!props.items[i].disabled) { next = i; break }
    }
  } else if (e.key === 'Home') next = props.items.findIndex((t) => !t.disabled)
  else if (e.key === 'End') next = props.items.map((t) => !t.disabled).lastIndexOf(true)
  if (next < 0) return
  e.preventDefault()
  tabs.value[next]?.focus()
  select(props.items[next])
}

const classes = computed(() => [
  'tabs',
  `tabs--${props.variant}`,
  `tabs--${props.color}`,
  `tabs--size-${props.size}`,
  { 'tabs--border': props.border, 'tabs--pill': props.pill },
])
const style = computed(() => ({
  '--tab-height': `${props.size}px`,
  '--tab-gap': `var(--padding-${spec.value.gap})`,
  '--tab-font-size': `var(--font-${spec.value.font}-size)`,
  '--tab-line-height': `var(--font-${spec.value.font}-line-height)`,
}))
</script>

<template>
  <div :class="classes" :style="style" role="tablist" :aria-label="label">
    <button
      v-for="(item, i) in items"
      :key="item.value"
      :ref="(el) => { if (el) tabs[i] = el as HTMLButtonElement }"
      type="button"
      role="tab"
      class="tab"
      :class="{ 'tab--active': item.value === modelValue }"
      :aria-selected="item.value === modelValue"
      :aria-controls="item.panelId"
      :tabindex="i === focusIndex ? 0 : -1"
      :disabled="item.disabled"
      @click="select(item)"
      @keydown="onKeydown($event, i)"
    >
      <template v-if="variant === 'segmented'">
        <Icon v-if="item.icon" :name="item.icon" :size="spec.icon" class="tab__icon" aria-hidden="true" />
        <span class="tab__text">
          <span class="tab__label">{{ item.label }}</span>
          <Counter
            v-if="item.count !== undefined"
            class="tab__count"
            :value="item.count"
            :size="spec.counter"
            :color="item.value === modelValue && color === 'brand' ? 'brand' : 'grey'"
          />
        </span>
      </template>
      <template v-else>
        <span class="tab__label">{{ item.label }}</span>
        <Icon v-if="item.trailingIcon" :name="item.trailingIcon" :size="16" class="tab__icon" aria-hidden="true" />
      </template>
    </button>
  </div>
</template>
