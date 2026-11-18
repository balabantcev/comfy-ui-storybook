<script setup lang="ts">
import { computed } from 'vue'
import { getIcon } from '../../icons'

const props = withDefaults(
  defineProps<{
    /** Icon name, e.g. "arrow-up" */
    name: string
    /** Size in px (applied to width & height) */
    size?: number | string
    /** Color — defaults to currentColor (inherits text color) */
    color?: string
  }>(),
  { size: 24 },
)

const entry = computed(() => getIcon(props.name))

const sizeValue = computed(() =>
  typeof props.size === 'number' ? `${props.size}px` : props.size,
)
</script>

<template>
  <span
    v-if="entry"
    class="comfy-icon"
    :style="{ width: sizeValue, height: sizeValue, color: color }"
    :data-icon="name"
    role="img"
    :aria-label="name"
    v-html="entry.svg"
  />
  <span v-else class="comfy-icon comfy-icon--missing" :title="`Unknown icon: ${name}`">?</span>
</template>

<style scoped>
.comfy-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  line-height: 0;
}
.comfy-icon :deep(svg) {
  width: 100%;
  height: 100%;
  display: block;
}
.comfy-icon--missing {
  border: 1px dashed var(--border-primary);
  border-radius: var(--radius-4);
  color: var(--icon-tertiary);
  font-size: var(--font-caption-1-size, 12px);
  width: 24px;
  height: 24px;
}
</style>
