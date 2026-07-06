<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import DropdownMenu from './DropdownMenu.vue'
import './dropdown.css'

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    width?: number
    align?: 'left' | 'right'
  }>(),
  { modelValue: false, width: 240, align: 'left' },
)

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

const root = ref<HTMLElement>()
const open = ref(props.modelValue)

watch(() => props.modelValue, (v) => (open.value = v))

function setOpen(v: boolean) {
  open.value = v
  emit('update:modelValue', v)
}
function toggle() {
  setOpen(!open.value)
}
function onDocClick(e: MouseEvent) {
  if (open.value && root.value && !root.value.contains(e.target as Node)) setOpen(false)
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') setOpen(false)
}

watch(open, (v) => {
  if (typeof document === 'undefined') return
  if (v) {
    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onKey)
  } else {
    document.removeEventListener('click', onDocClick)
    document.removeEventListener('keydown', onKey)
  }
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div ref="root" class="dropdown">
    <div class="dropdown__trigger" @click="toggle">
      <slot name="trigger" :open="open" :toggle="toggle" />
    </div>
    <div v-if="open" :class="['dropdown__panel', { 'dropdown__panel--right': align === 'right' }]">
      <DropdownMenu :width="width">
        <slot :close="() => setOpen(false)" />
      </DropdownMenu>
    </div>
  </div>
</template>
