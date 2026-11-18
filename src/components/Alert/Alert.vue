<script setup lang="ts">
import { computed, useSlots } from 'vue'
import Icon from '../Icon/Icon.vue'
import Button from '../Button/Button.vue'
import FeaturedIcon from '../FeaturedIcon/FeaturedIcon.vue'
import {
  ALERT_ACTION_INTENT,
  ALERT_FEATURED_COLOR,
  type AlertIconStyle,
  type AlertVariant,
} from './alert.tokens'
import './alert.css'

// Figma: Alert & Toast / Alert (node 12231:4230)
//   Color → `variant`, Variant icon → `iconStyle`, ↳ Icon → `icon`, Show Icon → `showIcon`,
//   Button-X → `closable`, Button control → `dismissLabel` / `actionLabel` (or #actions)

export type { AlertVariant, AlertIconStyle }

const props = withDefaults(
  defineProps<{
    /** Color intent (Figma "Color") */
    variant?: AlertVariant
    /** Figma "Variant icon": 20px glyph or a 32px Outline Featured icon */
    iconStyle?: AlertIconStyle
    /** Title text (or use the #title slot) */
    title?: string
    /** Description text (or use the default slot) */
    description?: string
    /** Leading icon name (Figma uses info-circle for every color) */
    icon?: string
    /** Show the leading icon */
    showIcon?: boolean
    /** Show a close (×) button — emits `close` */
    closable?: boolean
    /** Label for the neutral dismiss action (Link gray) — emits `dismiss` */
    dismissLabel?: string
    /** Label for the accent action — emits `action` */
    actionLabel?: string
    /** Live-region role: `alert` (assertive) or `status` (polite, e.g. toasts) */
    role?: 'alert' | 'status'
  }>(),
  {
    variant: 'default',
    iconStyle: 'default',
    icon: 'info-circle',
    showIcon: true,
    closable: false,
    role: 'alert',
  },
)

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'dismiss'): void
  (e: 'action'): void
}>()

const slots = useSlots()

const hasActions = computed(() => !!props.dismissLabel || !!props.actionLabel || !!slots.actions)
</script>

<template>
  <div
    :class="['alert', `alert--${variant}`, `alert--icon-${iconStyle}`, { 'alert--closable': closable }]"
    :role="role"
  >
    <template v-if="showIcon">
      <FeaturedIcon
        v-if="iconStyle === 'featured'"
        class="alert__featured"
        :icon="icon"
        type="outline"
        :color="ALERT_FEATURED_COLOR[variant]"
        :size="32"
      />
      <Icon v-else :name="icon" :size="20" class="alert__icon" aria-hidden="true" />
    </template>

    <div class="alert__body">
      <div class="alert__text">
        <p v-if="title || slots.title" class="alert__title"><slot name="title">{{ title }}</slot></p>
        <p v-if="description || slots.default" class="alert__desc"><slot>{{ description }}</slot></p>
      </div>

      <div v-if="hasActions" class="alert__actions">
        <slot name="actions">
          <Button v-if="dismissLabel" variant="link" intent="gray" :size="32" @click="emit('dismiss')">
            {{ dismissLabel }}
          </Button>
          <Button
            v-if="actionLabel"
            class="alert__action-main"
            variant="link"
            :intent="ALERT_ACTION_INTENT[variant]"
            :size="32"
            @click="emit('action')"
          >
            {{ actionLabel }}
          </Button>
        </slot>
      </div>
    </div>

    <button v-if="closable" type="button" class="alert__close" aria-label="Закрити" @click="emit('close')">
      <Icon name="x-close" :size="20" aria-hidden="true" />
    </button>
  </div>
</template>
