<template>
  <button
    class="btn-neon px-6 py-2.5 rounded-lg font-space font-semibold text-sm tracking-wide
           flex items-center gap-2 transition-all duration-300 select-none"
    :class="[variantClass, { 'opacity-50 cursor-not-allowed': disabled }]"
    :disabled="disabled"
    @mouseenter="audio.hover()"
    @click="!disabled && (audio.click(), $emit('click'))"
  >
    <span v-if="icon" class="text-base">{{ icon }}</span>
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAudio } from '../../composables/useAudio'
const audio = useAudio()
const props = defineProps<{ variant?: 'cyan'|'purple'|'green'|'amber'; icon?: string; disabled?: boolean }>()
defineEmits<{ click: [] }>()
const variantClass = computed(() => ({
  'btn-neon': !props.variant || props.variant === 'cyan',
  'btn-purple': props.variant === 'purple',
  'btn-green': props.variant === 'green',
  'border-solar-amber/50 text-solar-amber hover:border-solar-amber': props.variant === 'amber'
}))
</script>
