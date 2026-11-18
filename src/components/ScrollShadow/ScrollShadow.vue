<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import './scroll-shadow.css'

// Figma: ScrollShadow (node 16728:3274) — Variant BG Primary | Primary-alt | Secondary | Disabled-subtle.
// A layer in the surface color masked by a gradient (transparent → solid at 80 %), laid over the
// edge of a scroll area. The fade appears only on a side that still has content to scroll to.

export type ScrollShadowBg = 'primary' | 'primary-alt' | 'secondary' | 'disabled-subtle'

const props = withDefaults(
  defineProps<{
    /** Figma "Variant BG" — must match the surface behind the content */
    bg?: ScrollShadowBg
    orientation?: 'vertical' | 'horizontal'
    /** Fade depth in px (Figma: 80) */
    size?: number
    /** Accessible name of the scroll region */
    label?: string
  }>(),
  { bg: 'primary', orientation: 'vertical', size: 80 },
)

const viewport = ref<HTMLElement>()
const atStart = ref(true)
const atEnd = ref(true)

function update() {
  const el = viewport.value
  if (!el) return
  const vertical = props.orientation === 'vertical'
  const pos = vertical ? el.scrollTop : el.scrollLeft
  const max = vertical ? el.scrollHeight - el.clientHeight : el.scrollWidth - el.clientWidth
  atStart.value = pos <= 1
  atEnd.value = pos >= max - 1
}

let ro: ResizeObserver | undefined
onMounted(() => {
  update()
  if (typeof ResizeObserver === 'undefined' || !viewport.value) return
  ro = new ResizeObserver(update)
  ro.observe(viewport.value)
  for (const child of Array.from(viewport.value.children)) ro.observe(child)
})
onBeforeUnmount(() => ro?.disconnect())

const style = computed(() => ({ '--ss-bg': `var(--bg-${props.bg})`, '--ss-size': `${props.size}px` }))
</script>

<template>
  <div :class="['scroll-shadow', `scroll-shadow--${orientation}`]" :style="style">
    <div
      ref="viewport"
      class="scroll-shadow__viewport"
      tabindex="0"
      :role="label ? 'region' : undefined"
      :aria-label="label"
      @scroll.passive="update"
    >
      <slot />
    </div>
    <div class="scroll-shadow__fade scroll-shadow__fade--start" :class="{ 'is-visible': !atStart }" aria-hidden="true" />
    <div class="scroll-shadow__fade scroll-shadow__fade--end" :class="{ 'is-visible': !atEnd }" aria-hidden="true" />
  </div>
</template>
