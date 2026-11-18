<script setup lang="ts">
import { computed, watch, onBeforeUnmount, useId, useSlots } from 'vue'
import Icon from '../Icon/Icon.vue'
import Button from '../Button/Button.vue'
import Checkbox from '../Checkbox/Checkbox.vue'
import FeaturedIcon from '../FeaturedIcon/FeaturedIcon.vue'
import './alert-dialog.css'

// Figma: Patterns / Modal window → "Modal view" (node 12488:888)
//   Background  → `overlay`    (true: full-screen backdrop; false: the panel inline, no backdrop)
//   Aligned     → `align`      (left | center | horizontal = "Horizontal right (checkbox)")
//   Breakpoint  → `breakpoint` (auto by viewport < 768px, or forced desktop / mobile)
//   Destructive → `destructive`
//   ↳ Slot      → the `body` slot (custom content between the header and the actions)

export type AlertDialogAlign = 'left' | 'center' | 'horizontal'
export type AlertDialogBreakpoint = 'auto' | 'desktop' | 'mobile'

const props = withDefaults(
  defineProps<{
    /** Controls visibility (v-model) */
    modelValue?: boolean
    /** Red/destructive treatment for the confirm action and featured icon */
    destructive?: boolean
    /** Figma "Aligned": left, center, or horizontal (icon beside the text, actions right + checkbox) */
    align?: AlertDialogAlign
    /** Figma "Background": render over a full-screen backdrop (true) or inline (false) */
    overlay?: boolean
    /** Figma "Breakpoint" */
    breakpoint?: AlertDialogBreakpoint
    /** Featured icon name; defaults per destructive flag */
    icon?: string
    showIcon?: boolean
    title?: string
    description?: string
    confirmLabel?: string
    cancelLabel?: string
    /** Show the × close button */
    closable?: boolean
    /** Footer button layout for left / center (horizontal = side by side, vertical = stacked) */
    actionsLayout?: 'horizontal' | 'vertical'
    /** Divider above the footer */
    divider?: boolean
    /** Confirm button loading state */
    loading?: boolean
    /** Close when clicking the backdrop */
    closeOnOverlay?: boolean
    /** Footer checkbox label, e.g. "Не показувати знову" (Figma Action control "Checkbox") */
    checkboxLabel?: string
    /** Footer checkbox state (v-model:checked) */
    checked?: boolean
  }>(),
  {
    modelValue: false,
    destructive: false,
    align: 'left',
    overlay: true,
    breakpoint: 'auto',
    showIcon: true,
    confirmLabel: 'Підтвердити',
    cancelLabel: 'Скасувати',
    closable: true,
    actionsLayout: 'horizontal',
    divider: true,
    closeOnOverlay: true,
    checked: false,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'update:checked', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
  (e: 'close'): void
}>()

const titleId = useId()
const descId = useId()
const slots = useSlots()
const hasTitle = computed(() => !!props.title || !!slots.title)
const hasDesc = computed(() => !!props.description || !!slots.default)

const iconName = computed(() => props.icon ?? (props.destructive ? 'alert' : 'check-circle'))

const dialogClasses = computed(() => [
  'alert-dialog',
  `alert-dialog--${props.align}`,
  `alert-dialog--bp-${props.breakpoint}`,
  {
    'alert-dialog--destructive': props.destructive,
    'alert-dialog--inline': !props.overlay,
  },
])
const footerClasses = computed(() => [
  'alert-dialog__footer',
  `alert-dialog__footer--${props.align === 'horizontal' ? 'right' : props.actionsLayout}`,
])

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

// Scroll lock + Escape only apply to the modal (backdrop) form.
watch(
  () => props.modelValue && props.overlay,
  (active) => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = active ? 'hidden' : ''
    if (active) window.addEventListener('keydown', onKey)
    else window.removeEventListener('keydown', onKey)
  },
  { immediate: true },
)
onBeforeUnmount(() => {
  if (typeof document !== 'undefined') document.body.style.overflow = ''
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <Teleport to="body" :disabled="!overlay">
    <Transition name="ad-fade">
      <div
        v-if="modelValue"
        :class="['alert-dialog__overlay', `alert-dialog__overlay--bp-${breakpoint}`, { 'alert-dialog__overlay--inline': !overlay }]"
        @click.self="overlay && onOverlay()"
      >
        <div
          :class="dialogClasses"
          :role="overlay ? 'alertdialog' : 'dialog'"
          :aria-modal="overlay || undefined"
          :aria-labelledby="hasTitle ? titleId : undefined"
          :aria-describedby="hasDesc ? descId : undefined"
        >
          <div class="alert-dialog__header">
            <FeaturedIcon
              v-if="showIcon"
              class="alert-dialog__featured-icon"
              :icon="iconName"
              type="light"
              :color="destructive ? 'error' : 'gray'"
              :size="48"
            />

            <div class="alert-dialog__text">
              <p v-if="hasTitle" :id="titleId" class="alert-dialog__title">
                <slot name="title">{{ title }}</slot>
              </p>
              <p v-if="hasDesc" :id="descId" class="alert-dialog__desc">
                <slot>{{ description }}</slot>
              </p>
            </div>

            <button
              v-if="closable"
              type="button"
              class="alert-dialog__close"
              aria-label="Закрити"
              @click="cancel"
            >
              <Icon name="x-close" :size="24" />
            </button>
          </div>

          <div v-if="$slots.body" class="alert-dialog__body"><slot name="body" /></div>

          <div v-if="divider" class="alert-dialog__divider" />

          <div :class="footerClasses">
            <Checkbox
              v-if="checkboxLabel"
              class="alert-dialog__checkbox"
              :size="16"
              :label="checkboxLabel"
              :model-value="checked"
              @update:model-value="(v: boolean) => emit('update:checked', v)"
            />
            <div class="alert-dialog__actions">
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
      </div>
    </Transition>
  </Teleport>
</template>
