<template>
  <div class="space-y-1.5">
    <div class="flex justify-between text-xs font-terminal">
      <span class="text-neon-cyan">⚡ Level {{ level }}</span>
      <span class="text-white/50">{{ xp }} / {{ xpForNext }} XP</span>
    </div>
    <div class="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
      <div
        class="h-full xp-bar-fill rounded-full"
        :style="{ width: progress + '%', transition: 'width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' }"
      />
    </div>
    <p class="text-white/40 text-xs font-space">{{ rank }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ xp: number; level: number; xpForNext: number; progress: number; rank: string }>()
</script>
