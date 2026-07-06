<script setup lang="ts">
import { computed, watch, onBeforeUnmount } from 'vue'
import Icon from '../Icon/Icon.vue'
import Button from '../Button/Button.vue'
import './alert-dialog.css'

const props = withDefaults(
  defineProps<{
    /** Controls visibility (v-model) */
    modelValue?: boolean
    /** Red/destructive treatment for the confirm action and featured icon */
    destructive?: boolean
    /** Header alignment */
    align?: 'left' | 'center'
    /** Featured icon name; defaults per destructive flag */
    icon?: string
    showIcon?: boolean
    title?: string
    description?: string
    confirmLabel?: string
    cancelLabel?: string
    /** Show the × close button */
    closable?: boolean
    /** Footer button layout */
    actionsLayout?: 'horizontal' | 'vertical'
    /** Divider above the footer */
    divider?: boolean
    /** Confirm button loading state */
    loading?: boolean
    /** Close when clicking the overlay */
    closeOnOverlay?: boolean
  }>(),
  {
    modelValue: false,
    destructive: false,
    align: 'left',
    showIcon: true,
    confirmLabel: 'Підтвердити',
    cancelLabel: 'Скасувати',
    closable: true,
    actionsLayout: 'horizontal',
    divider: true,
    closeOnOverlay: true,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
  (e: 'close'): void
}>()

const iconName = computed(
  () => props.icon ?? (props.destructive ? 'alert' : 'check-circle'),
)

function close() {
  emit('update:modelValue', false)
  emit('close')
}
function cancel() {
  emit('cancel')
  close()
}
function confirm() {
  emit('confirm')
}
function onOverlay() {
  if (props.closeOnOverlay) cancel()
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.modelValue) cancel()
}

watch(
  () => props.modelValue,
  (open) => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) window.addEventListener('keydown', onKey)
    else window.removeEventListener('keydown', onKey)
  },
)
onBeforeUnmount(() => {
  if (typeof document !== 'undefined') document.body.style.overflow = ''
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="ad-fade">
      <div
        v-if="modelValue"
        class="alert-dialog__overlay"
        @click.self="onOverlay"
      >
        <div
          :class="['alert-dialog', `alert-dialog--${align}`, { 'alert-dialog--destructive': destructive }]"
          role="alertdialog"
          aria-modal="true"
        >
          <div class="alert-dialog__header">
            <span v-if="showIcon" class="alert-dialog__featured-icon">
              <Icon :name="iconName" :size="24" />
            </span>

            <div class="alert-dialog__text">
              <p v-if="title || $slots.title" class="alert-dialog__title">
                <slot name="title">{{ title }}</slot>
              </p>
              <p v-if="description || $slots.default" class="alert-dialog__desc">
                <slot>{{ description }}</slot>
              </p>
            </div>

            <button
              v-if="closable"
              type="button"
              class="alert-dialog__close"
              aria-label="Close"
              @click="cancel"
            >
              <Icon name="x-close" :size="24" />
            </button>
          </div>

          <div v-if="divider" class="alert-dialog__divider" />

          <div :class="['alert-dialog__footer', `alert-dialog__footer--${actionsLayout}`]">
            <Button variant="secondary" intent="gray" :size="40" pill @click="cancel">
              {{ cancelLabel }}
            </Button>
            <Button
              variant="primary"
              :intent="destructive ? 'destructive' : 'brand'"
              :size="40"
              pill
              :loading="loading"
              @click="confirm"
            >
              {{ confirmLabel }}
            </Button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
