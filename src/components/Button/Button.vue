<script setup lang="ts">
import { computed, useSlots } from 'vue'
import Icon from '../Icon/Icon.vue'
import { BUTTON_SIZES, type ButtonVariant, type ButtonIntent } from './button.tokens'
import './button.css'

const props = withDefaults(
  defineProps<{
    /** Visual hierarchy */
    variant?: ButtonVariant
    /** Color intent */
    intent?: ButtonIntent
    /** Height in px — one of the Figma sizes */
    size?: number
    /** Softer filled style (brand-tinted background) — applies to `primary` */
    subtle?: boolean
    /** Full corner radius (pill) */
    pill?: boolean
    /** Render as a square icon-only button */
    iconOnly?: boolean
    /** Icon name shown before the label */
    iconLeft?: string
    /** Icon name shown after the label */
    iconRight?: string
    /** The single icon for an icon-only button */
    icon?: string
    loading?: boolean
    disabled?: boolean
    /** Native button type */
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    variant: 'primary',
    intent: 'brand',
    size: 40,
    type: 'button',
  },
)

const emit = defineEmits<{ (e: 'click', ev: MouseEvent): void }>()

const slots = useSlots()
const spec = computed(() => BUTTON_SIZES[props.size] ?? BUTTON_SIZES[40])

const isIconOnly = computed(() => props.iconOnly || (!!props.icon && !slots.default))

const classes = computed(() => [
  'btn',
  `btn--${props.variant}`,
  `btn--${props.intent}`,
  {
    'btn--subtle': props.subtle && props.variant === 'primary',
    'btn--pill': props.pill,
    'btn--icon-only': isIconOnly.value,
    'btn--loading': props.loading,
  },
])

const cssVars = computed(() => {
  const s = spec.value
  // Fixed height (border-box) so the border sits inside the box and the total
  // height matches the Figma "Size" exactly. Vertical centering via flex.
  const pad = isIconOnly.value ? '0' : `0 ${s.px}px`
  return {
    '--btn-height': props.variant === 'link' ? 'auto' : `${props.size}px`,
    '--btn-padding': pad,
    '--btn-radius': props.pill ? '999px' : `var(--radius-${s.radius}, ${s.radius}px)`,
    '--btn-font-size': `var(--font-${s.font}-size, ${s.fontSize}px)`,
    '--btn-line-height': `var(--font-${s.font}-line-height, ${s.lineHeight}px)`,
    '--btn-icon-size': `${s.icon}px`,
    '--btn-gap': `${s.gap}px`,
  } as Record<string, string>
})

const onClick = (ev: MouseEvent) => {
  if (props.disabled || props.loading) return
  emit('click', ev)
}
</script>

<template>
  <button
    :type="type"
    :class="classes"
    :style="cssVars"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
    @click="onClick"
  >
    <span v-if="loading" class="btn__spinner" aria-hidden="true" />
    <Icon
      v-else-if="iconLeft || (isIconOnly && icon)"
      :name="(isIconOnly ? icon : iconLeft) as string"
      :size="spec.icon"
      class="btn__icon"
    />
    <span v-if="!isIconOnly" class="btn__label"><slot /></span>
    <Icon v-if="iconRight && !isIconOnly && !loading" :name="iconRight" :size="spec.icon" class="btn__icon" />
  </button>
</template>
