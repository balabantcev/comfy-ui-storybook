<script setup lang="ts">
import { computed } from 'vue'
import Button from '../Button/Button.vue'
import './pagination.css'

// Figma: Patterns / Pagination (node 13447:5347)
//   Type       → `type`:  "Page default" = page, "Page minimal center aligned" = minimal, "Card default" = card
//   Breakpoint → `breakpoint`: auto (by container width), or forced desktop / mobile
//   Full corner radius → `pill`
export type PaginationType = 'page' | 'minimal' | 'card'
export type PaginationBreakpoint = 'auto' | 'desktop' | 'mobile'

const props = withDefaults(
  defineProps<{
    /** Current page (v-model), 1-based */
    modelValue?: number
    /** Total number of pages */
    total: number
    /** Figma "Type": page (link nav), minimal (outlined nav), card (outlined nav, card padding) */
    type?: PaginationType
    /** Figma "Breakpoint" — `auto` switches to the mobile layout in containers ≤ 520px */
    breakpoint?: PaginationBreakpoint
    /** Pages shown either side of the current page */
    siblingCount?: number
    /** Full corner radius (pill) — page cells and nav buttons */
    pill?: boolean
    /** Page cell size in px */
    size?: number
    /** Show the prev/next buttons */
    showNav?: boolean
    /** Accessible name of the navigation landmark — make it unique when a page has several */
    label?: string
    prevLabel?: string
    nextLabel?: string
    /** Mobile summary text, e.g. "Сторінка 1 з 10" */
    summary?: (page: number, total: number) => string
  }>(),
  {
    modelValue: 1,
    type: 'page',
    breakpoint: 'auto',
    siblingCount: 1,
    pill: false,
    size: 40,
    showNav: true,
    label: 'Пагінація',
    prevLabel: 'Назад',
    nextLabel: 'Вперед',
    summary: (page: number, total: number) => `Сторінка ${page} з ${total}`,
  },
)

const emit = defineEmits<{ (e: 'update:modelValue', page: number): void }>()

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

type Item = number | 'left-dots' | 'right-dots'

const items = computed<Item[]>(() => {
  const total = props.total
  const current = props.modelValue
  const sibling = props.siblingCount
  // first + last + current + 2 siblings + 2 ellipsis
  const totalSlots = sibling * 2 + 5
  if (total <= totalSlots) return range(1, total)

  const leftSibling = Math.max(current - sibling, 1)
  const rightSibling = Math.min(current + sibling, total)
  const showLeftDots = leftSibling > 3
  const showRightDots = rightSibling < total - 2

  if (!showLeftDots && showRightDots) {
    return [...range(1, 3 + sibling * 2), 'right-dots', total]
  }
  if (showLeftDots && !showRightDots) {
    return [1, 'left-dots', ...range(total - (2 + sibling * 2), total)]
  }
  return [1, 'left-dots', ...range(leftSibling, rightSibling), 'right-dots', total]
})

const canPrev = computed(() => props.modelValue > 1)
const canNext = computed(() => props.modelValue < props.total)

// Desktop nav: "Page default" uses Link gray, the other types Secondary gray (outlined).
// Mobile nav is always an outlined icon-only button.
const desktopNavVariant = computed(() => (props.type === 'page' ? 'link' : 'secondary'))

const wrapClasses = computed(() => [
  'pagination-wrap',
  `pagination-wrap--${props.breakpoint}`,
])
const navClasses = computed(() => ['pagination', `pagination--${props.type}`])

const cssVars = computed(() => ({
  '--pg-size': `${props.size}px`,
  '--pg-radius': props.pill ? 'var(--radius-full)' : 'var(--radius-10)',
}))

function go(page: number) {
  const p = Math.min(Math.max(page, 1), props.total)
  if (p !== props.modelValue) emit('update:modelValue', p)
}
</script>

<template>
  <div :class="wrapClasses">
  <nav :class="navClasses" :style="cssVars" :aria-label="label">
    <!-- ===== Desktop layout ===== -->
    <div v-if="showNav" class="pagination__nav pagination__nav--prev pagination__desktop">
      <Button
        :variant="desktopNavVariant"
        intent="gray"
        :size="32"
        :pill="pill"
        :disabled="!canPrev"
        :icon-left="prevLabel ? 'arrow-left' : undefined"
        :icon="prevLabel ? undefined : 'arrow-left'"
        :aria-label="prevLabel ? undefined : 'Попередня сторінка'"
        @click="go(modelValue - 1)"
      >
        <template v-if="prevLabel">{{ prevLabel }}</template>
      </Button>
    </div>

    <div class="pagination__numbers pagination__desktop">
      <template v-for="(it, idx) in items" :key="idx">
        <span v-if="it === 'left-dots' || it === 'right-dots'" class="pagination__ellipsis">…</span>
        <button
          v-else
          type="button"
          class="pagination__num"
          :class="{ 'pagination__num--active': it === modelValue }"
          :aria-current="it === modelValue ? 'page' : undefined"
          @click="go(it)"
        >
          {{ it }}
        </button>
      </template>
    </div>

    <div v-if="showNav" class="pagination__nav pagination__nav--next pagination__desktop">
      <Button
        :variant="desktopNavVariant"
        intent="gray"
        :size="32"
        :pill="pill"
        :disabled="!canNext"
        :icon-right="nextLabel ? 'arrow-right' : undefined"
        :icon="nextLabel ? undefined : 'arrow-right'"
        :aria-label="nextLabel ? undefined : 'Наступна сторінка'"
        @click="go(modelValue + 1)"
      >
        <template v-if="nextLabel">{{ nextLabel }}</template>
      </Button>
    </div>

    <!-- ===== Mobile layout (Figma Breakpoint=Mobile) ===== -->
    <Button
      class="pagination__mobile"
      variant="secondary"
      intent="gray"
      :size="32"
      :pill="pill"
      icon="arrow-left"
      aria-label="Попередня сторінка"
      :disabled="!canPrev"
      @click="go(modelValue - 1)"
    />
    <span class="pagination__summary pagination__mobile" aria-live="polite">{{ summary(modelValue, total) }}</span>
    <Button
      class="pagination__mobile"
      variant="secondary"
      intent="gray"
      :size="32"
      :pill="pill"
      icon="arrow-right"
      aria-label="Наступна сторінка"
      :disabled="!canNext"
      @click="go(modelValue + 1)"
    />
  </nav>
  </div>
</template>
