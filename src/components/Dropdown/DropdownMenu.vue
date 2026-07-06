<script setup lang="ts">
import './dropdown.css'

withDefaults(
  defineProps<{
    /** Panel width in px (default 240) */
    width?: number
  }>(),
  { width: 240 },
)
</script>

<template>
  <div class="dropdown-menu" role="menu" :style="{ '--dropdown-width': `${width}px` }">
    <slot />
  </div>
</template>
