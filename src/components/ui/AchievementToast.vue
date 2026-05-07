<template>
  <Transition name="achievement-pop">
    <div
      v-if="learner.pendingAchievement"
      class="fixed bottom-6 right-6 z-[200] glass border border-solar-amber/40 rounded-2xl p-4
             flex items-center gap-4 shadow-neon-cyan max-w-xs"
      style="min-width: 280px"
    >
      <div class="w-12 h-12 rounded-full bg-solar-amber/20 border border-solar-amber/50
                  flex items-center justify-center text-2xl animate-pulse">
        {{ learner.pendingAchievement.icon }}
      </div>
      <div>
        <p class="font-orbitron text-xs text-solar-amber font-bold tracking-wider">ACHIEVEMENT UNLOCKED</p>
        <p class="font-space font-semibold text-white text-sm">{{ learner.pendingAchievement.title }}</p>
        <p class="text-white/50 text-xs mt-0.5">{{ learner.pendingAchievement.desc }}</p>
        <p class="text-neon-cyan text-xs mt-1 font-terminal">+{{ learner.pendingAchievement.xp }} XP</p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useLearnerStore } from '../../stores/learner'
import { useAudio } from '../../composables/useAudio'

const learner = useLearnerStore()
const audio = useAudio()

watch(() => learner.pendingAchievement, (v) => {
  if (v) {
    audio.achievement()
    setTimeout(() => learner.clearPendingAchievement(), 4000)
  }
})
</script>

<style scoped>
.achievement-pop-enter-active { animation: pop-in 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }
.achievement-pop-leave-active { animation: pop-out 0.3s ease forwards; }
@keyframes pop-in  { from { transform: scale(0.5) translateY(40px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
@keyframes pop-out { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(0.9) translateX(40px); } }
</style>
