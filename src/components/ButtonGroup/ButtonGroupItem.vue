<script setup lang="ts">
import { computed, inject, useSlots, type ComputedRef } from 'vue'
import Icon from '../Icon/Icon.vue'
import { BUTTON_SIZES } from '../Button/button.tokens'

const props = defineProps<{
  /** Leading icon name */
  icon?: string
  /** Trailing icon name */
  iconRight?: string
  disabled?: boolean
}>()

const emit = defineEmits<{ (e: 'click', ev: MouseEvent): void }>()

const slots = useSlots()
const size = inject<ComputedRef<number>>('buttonGroupSize')

const iconSize = computed(() => (BUTTON_SIZES[size?.value ?? 40] ?? BUTTON_SIZES[40]).icon)
const isIconOnly = computed(() => !!props.icon && !slots.default)

const onClick = (ev: MouseEvent) => {
  if (props.disabled) return
  emit('click', ev)
}
</script>

<template>
  <button
    type="button"
    class="button-group__item"
    :class="{ 'button-group__item--icon-only': isIconOnly }"
    :disabled="disabled"
    @click="onClick"
  >
    <Icon v-if="icon" :name="icon" :size="iconSize" class="button-group__icon" />
    <span v-if="slots.default"><slot /></span>
    <Icon v-if="iconRight" :name="iconRight" :size="iconSize" class="button-group__icon" />
  </button>
</template>
