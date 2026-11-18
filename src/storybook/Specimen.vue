<script setup lang="ts">
// A single component sample with an optional caption beneath it (e.g. "40px").
defineProps<{ caption?: string | number }>()
</script>

<template>
  <div class="sb-specimen">
    <slot />
    <span v-if="caption !== undefined && caption !== ''" class="sb-caption">{{ caption }}</span>
  </div>
</template>
