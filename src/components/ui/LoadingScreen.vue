<template>
  <div class="fixed inset-0 z-[100] bg-space-black flex flex-col items-center justify-center">
    <div class="relative w-32 h-32 mb-8">
      <div v-for="i in 3" :key="i"
           class="absolute inset-0 rounded-full border-2 border-neon-cyan/30"
           :style="{ animation: `spin ${1 + i * 0.5}s linear infinite`, transform: `scale(${0.5 + i * 0.25})` }" />
      <div class="absolute inset-0 flex items-center justify-center text-4xl animate-pulse">🌌</div>
    </div>
    <p class="font-orbitron text-neon-cyan text-lg font-bold tracking-widest animate-pulse-neon">
      INITIALIZING COSMOS
    </p>
    <div class="mt-6 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
      <div class="h-full bg-gradient-to-r from-neon-cyan via-plasma-purple to-github-green rounded-full"
           :style="{ width: progress + '%', transition: 'width 0.3s ease' }" />
    </div>
    <p class="mt-3 font-terminal text-white/40 text-sm">{{ progress }}%</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const progress = ref(0)
onMounted(() => {
  const iv = setInterval(() => {
    progress.value = Math.min(progress.value + Math.random() * 15, 100)
    if (progress.value >= 100) clearInterval(iv)
  }, 150)
})
</script>
