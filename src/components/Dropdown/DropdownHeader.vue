<script setup lang="ts">
import Input from '../Input/Input.vue'
import './dropdown.css'

// Figma: Dropdowns / -Dropdown-header (node 13710:1669) — Variant "Search" | "Title".
withDefaults(
  defineProps<{
    variant?: 'search' | 'title'
    /** Title text (variant "title") */
    title?: string
    /** Search query (variant "search", v-model) */
    modelValue?: string
    placeholder?: string
  }>(),
  { variant: 'search', title: '', modelValue: '', placeholder: 'Пошук' },
)

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()
</script>

<template>
  <div class="dropdown-header" :class="`dropdown-header--${variant}`">
    <Input
      v-if="variant === 'search'"
      :model-value="modelValue"
      :size="44"
      icon="search"
      :placeholder="placeholder"
      @update:model-value="(v: string | number) => emit('update:modelValue', String(v ?? ''))"
    />
    <div v-else class="dropdown-header__title"><slot>{{ title }}</slot></div>
  </div>
</template>
