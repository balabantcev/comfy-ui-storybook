<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../Icon/Icon.vue'
import './pagination.css'

const props = withDefaults(
  defineProps<{
    /** Current page (v-model), 1-based */
    modelValue?: number
    /** Total number of pages */
    total: number
    /** Pages shown either side of the current page */
    siblingCount?: number
    /** Pill-shaped page cells */
    pill?: boolean
    /** Cell size in px */
    size?: number
    /** Show the prev/next buttons */
    showNav?: boolean
    prevLabel?: string
    nextLabel?: string
  }>(),
  {
    modelValue: 1,
    siblingCount: 1,
    pill: false,
    size: 40,
    showNav: true,
    prevLabel: 'Назад',
    nextLabel: 'Вперед',
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

const cssVars = computed(() => ({
  '--pg-size': `${props.size}px`,
  '--pg-radius': props.pill ? 'var(--radius-full)' : 'var(--radius-8)',
}))

function go(page: number) {
  const p = Math.min(Math.max(page, 1), props.total)
  if (p !== props.modelValue) emit('update:modelValue', p)
}
</script>

<template>
  <div class="pagination-wrap">
  <nav class="pagination" :style="cssVars" role="navigation" aria-label="Pagination">
    <div v-if="showNav" class="pagination__nav pagination__nav--prev">
      <button
        type="button"
        class="pagination__btn"
        :disabled="!canPrev"
        @click="go(modelValue - 1)"
      >
        <Icon name="arrow-left" :size="16" class="pagination__btn-icon" />
        <span v-if="prevLabel">{{ prevLabel }}</span>
      </button>
    </div>

    <div class="pagination__numbers">
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

    <div v-if="showNav" class="pagination__nav pagination__nav--next">
      <button
        type="button"
        class="pagination__btn"
        :disabled="!canNext"
        @click="go(modelValue + 1)"
      >
        <span v-if="nextLabel">{{ nextLabel }}</span>
        <Icon name="arrow-right" :size="16" class="pagination__btn-icon" />
      </button>
    </div>
  </nav>
  </div>
</template>
