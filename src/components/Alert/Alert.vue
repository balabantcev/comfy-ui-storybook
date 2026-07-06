<script setup lang="ts">
import { computed, useSlots } from 'vue'
import Icon from '../Icon/Icon.vue'
import './alert.css'

export type AlertVariant = 'default' | 'success' | 'warning' | 'error'

const props = withDefaults(
  defineProps<{
    /** Color intent */
    variant?: AlertVariant
    /** Title text (or use the #title slot) */
    title?: string
    /** Description text (or use the default slot) */
    description?: string
    /** Leading icon name; defaults to a per-variant icon */
    icon?: string
    /** Show the leading icon */
    showIcon?: boolean
    /** Show a close (×) button — emits `close` */
    closable?: boolean
    /** Label for the neutral dismiss action — emits `dismiss` */
    dismissLabel?: string
    /** Label for the accent action — emits `action` */
    actionLabel?: string
  }>(),
  {
    variant: 'default',
    showIcon: true,
    closable: false,
  },
)

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'dismiss'): void
  (e: 'action'): void
}>()

const slots = useSlots()

// Figma uses info-circle for every variant; the icon is overridable via the prop.
const iconName = computed(() => props.icon ?? 'info-circle')

const hasActions = computed(
  () => !!props.dismissLabel || !!props.actionLabel || !!slots.actions,
)
</script>

<template>
  <div :class="['alert', `alert--${variant}`, { 'alert--closable': closable }]" role="alert">
    <Icon v-if="showIcon" :name="iconName" :size="20" class="alert__icon" />

    <div class="alert__body">
      <div class="alert__text">
        <p v-if="title || slots.title" class="alert__title"><slot name="title">{{ title }}</slot></p>
        <p v-if="description || slots.default" class="alert__desc"><slot>{{ description }}</slot></p>
      </div>

      <div v-if="hasActions" class="alert__actions">
        <slot name="actions">
          <button
            v-if="dismissLabel"
            type="button"
            class="alert__action alert__action--dismiss"
            @click="emit('dismiss')"
          >
            {{ dismissLabel }}
          </button>
          <button
            v-if="actionLabel"
            type="button"
            class="alert__action alert__action--main"
            @click="emit('action')"
          >
            {{ actionLabel }}
          </button>
        </slot>
      </div>
    </div>

    <button
      v-if="closable"
      type="button"
      class="alert__close"
      aria-label="Close"
      @click="emit('close')"
    >
      <Icon name="x-close" :size="20" />
    </button>
  </div>
</template>
