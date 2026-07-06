<script setup lang="ts">
import { computed } from 'vue'
import { getLogo, DEFAULT_VARIANT, type LogoKind } from '../../foundations/logo'

const props = withDefaults(
  defineProps<{
    /** Full wordmark or the icon mark */
    kind?: LogoKind
    /** wordmark: green | white | mono · mark: modern | default */
    variant?: string
    /** Rendered height (px number or any CSS length) */
    height?: number | string
  }>(),
  { kind: 'wordmark' },
)

const entry = computed(() => getLogo(props.kind, props.variant))
const heightValue = computed(() =>
  typeof props.height === 'number' ? `${props.height}px` : props.height,
)
</script>

<template>
  <span
    v-if="entry"
    class="comfy-logo"
    :style="{ height: heightValue }"
    role="img"
    :aria-label="`COMFY ${kind} ${variant ?? DEFAULT_VARIANT[kind]}`"
    v-html="entry.svg"
  />
</template>

<style scoped>
.comfy-logo {
  display: inline-flex;
  line-height: 0;
}
.comfy-logo :deep(svg) {
  height: 100%;
  width: auto;
  display: block;
}
</style>
