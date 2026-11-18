<script setup lang="ts">
import Button from '../Button/Button.vue'
import './dropdown.css'

// Figma: Dropdowns / -Dropdown-empty_state (node 15564:52247) — shown when a search finds nothing.
withDefaults(
  defineProps<{
    title?: string
    description?: string
    /** Label of the trailing link action; empty hides it */
    actionLabel?: string
    icon?: string
  }>(),
  {
    title: 'Нічого не вдалося знайти',
    description: 'Спробуйте змінити запит.',
    actionLabel: 'Очистити пошук',
    icon: 'search',
  },
)

const emit = defineEmits<{ (e: 'action', ev: MouseEvent): void }>()
</script>

<template>
  <div class="dropdown-empty" role="status">
    <div class="dropdown-empty__content">
      <!-- Figma: a non-interactive outlined icon "button" -->
      <span class="dropdown-empty__icon" aria-hidden="true">
        <Button variant="secondary" intent="gray" :size="32" pill :icon="icon" tabindex="-1" />
      </span>
      <div class="dropdown-empty__text">
        <p class="dropdown-empty__title">{{ title }}</p>
        <p v-if="description" class="dropdown-empty__desc">{{ description }}</p>
      </div>
    </div>
    <Button v-if="actionLabel" variant="link" intent="brand" :size="32" @click="(ev: MouseEvent) => emit('action', ev)">
      {{ actionLabel }}
    </Button>
  </div>
</template>
