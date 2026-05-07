<template>
  <div
    class="glass-card p-5 cursor-pointer select-none"
    :class="[glowClass, { 'energy-border': energyBorder }]"
    @mouseenter="audio.hover(); $emit('hover')"
    @click="audio.click(); $emit('click')"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAudio } from '../../composables/useAudio'
const audio = useAudio()
const props = defineProps<{ glow?: 'cyan'|'purple'|'green'|'none'; energyBorder?: boolean }>()
defineEmits<{ hover: []; click: [] }>()
const glowClass = computed(() => ({
  'hover:shadow-neon-cyan': props.glow === 'cyan' || !props.glow,
  'hover:shadow-neon-purple': props.glow === 'purple',
  'hover:shadow-neon-green': props.glow === 'green'
}))
</script>
