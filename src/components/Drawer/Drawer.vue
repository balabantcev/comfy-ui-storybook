<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useId, useSlots, watch } from 'vue'
import Icon from '../Icon/Icon.vue'
import Button from '../Button/Button.vue'
import FeaturedIcon from '../FeaturedIcon/FeaturedIcon.vue'
import './drawer.css'

// Figma: Drawer (node 15846:1966) = -Drawer header (15825:13114) + Slot + -Drawer footer (15833:11111)
//   Breakpoint Desktop: 700px panel on the right, radius 16 on the left, E400
//   Breakpoint Mobile:  full screen, buttons share the width
//   header: optional Featured icon (Modern, Gray, 40) · title (Label-2 / Label-3 Bold) · supporting
//   text · round × (Button-X 40) · "Slot header" (#header slot); footer: Secondary gray + Primary.

export type DrawerBreakpoint = 'auto' | 'desktop' | 'mobile'

const props = withDefaults(
  defineProps<{
    /** Open state (v-model) */
    modelValue?: boolean
    title?: string
    /** Figma "Supporting text" */
    description?: string
    /** Figma "Icon": a Featured icon above the title */
    icon?: string
    closable?: boolean
    confirmLabel?: string
    cancelLabel?: string
    /** Hide the default footer buttons (the #footer slot still renders) */
    hideActions?: boolean
    loading?: boolean
    /** Figma "Breakpoint": auto = mobile below 768px */
    breakpoint?: DrawerBreakpoint
    /** Panel width on desktop, px (Figma: 700) */
    width?: number
    closeOnOverlay?: boolean
  }>(),
  {
    modelValue: false,
    closable: true,
    confirmLabel: 'Застосувати',
    cancelLabel: 'Скасувати',
    hideActions: false,
    loading: false,
    breakpoint: 'auto',
    width: 700,
    closeOnOverlay: true,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
  (e: 'close'): void
}>()

const slots = useSlots()
const titleId = useId()
const descId = useId()
const panel = ref<HTMLElement>()
let returnFocus: HTMLElement | null = null

const hasFooter = computed(() => !props.hideActions || !!slots.footer)

function close() {
  emit('update:modelValue', false)
  emit('close')
}
function cancel() {
  emit('cancel')
  close()
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') cancel()
}

watch(
  () => props.modelValue,
  async (open) => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) {
      returnFocus = document.activeElement as HTMLElement | null
      window.addEventListener('keydown', onKey)
      await nextTick()
      panel.value?.focus()
    } else {
      window.removeEventListener('keydown', onKey)
      returnFocus?.focus?.()
      returnFocus = null
    }
  },
  { immediate: true },
)
onBeforeUnmount(() => {
  if (typeof document !== 'undefined') document.body.style.overflow = ''
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div
        v-if="modelValue"
        :class="['drawer__overlay', `drawer__overlay--bp-${breakpoint}`]"
        @click.self="closeOnOverlay && cancel()"
      >
        <section
          ref="panel"
          :class="['drawer', `drawer--bp-${breakpoint}`]"
          :style="{ '--drawer-width': `${width}px` }"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="title || $slots.title ? titleId : undefined"
          :aria-describedby="description ? descId : undefined"
          tabindex="-1"
        >
          <header class="drawer__header">
            <FeaturedIcon v-if="icon" :icon="icon" type="modern" color="gray" :size="40" />
            <div class="drawer__heading">
              <h2 v-if="title || $slots.title" :id="titleId" class="drawer__title">
                <slot name="title">{{ title }}</slot>
              </h2>
              <p v-if="description" :id="descId" class="drawer__desc">{{ description }}</p>
            </div>
            <slot name="header" />
            <button v-if="closable" type="button" class="drawer__close" aria-label="Закрити" @click="cancel">
              <Icon name="x-close" :size="20" aria-hidden="true" />
            </button>
          </header>

          <div class="drawer__body"><slot /></div>

          <footer v-if="hasFooter" class="drawer__footer">
            <slot name="footer" />
            <div v-if="!hideActions" class="drawer__actions">
              <Button variant="secondary" intent="gray" :size="40" pill @click="cancel">{{ cancelLabel }}</Button>
              <Button variant="primary" intent="brand" :size="40" pill :loading="loading" @click="emit('confirm')">
                {{ confirmLabel }}
              </Button>
            </div>
          </footer>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>
