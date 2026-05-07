<template>
  <div
    class="glass-card relative overflow-hidden cursor-pointer group"
    :style="{ '--glow': planet.glowColor }"
    @mouseenter="hovered = true; audio.hover()"
    @mouseleave="hovered = false"
    @click="$router.push('/planet/' + planet.id); audio.click()"
  >
    <!-- Animated gradient background -->
    <div
      class="absolute inset-0 opacity-10 group-hover:opacity-25 transition-opacity duration-500"
      :style="{ background: `radial-gradient(circle at 50% 0%, ${planet.color}, transparent 70%)` }"
    />

    <!-- Planet visual -->
    <div class="relative flex items-start gap-4 p-5">
      <div class="relative flex-shrink-0">
        <div
          class="w-16 h-16 rounded-full flex items-center justify-center text-3xl
                 border-2 transition-all duration-500 group-hover:scale-110"
          :style="{
            borderColor: planet.color + '60',
            background: `radial-gradient(circle, ${planet.color}20, ${planet.color}05)`,
            boxShadow: hovered ? `0 0 20px ${planet.color}60` : 'none'
          }"
        >
          {{ planet.icon }}
        </div>
        <!-- Orbit ring -->
        <div
          class="absolute inset-[-8px] rounded-full border opacity-30 group-hover:opacity-70 transition-opacity"
          :style="{ borderColor: planet.color, animation: 'spin-planet 6s linear infinite' }"
        />
      </div>

      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1">
          <h3 class="font-orbitron text-sm font-bold text-white/90 group-hover:text-white transition-colors">
            {{ planet.name }}
          </h3>
          <span v-if="isCompleted"
                class="text-xs px-2 py-0.5 rounded-full font-terminal"
                :style="{ background: planet.color + '20', color: planet.color }">
            ✓ DONE
          </span>
        </div>
        <p class="font-terminal text-xs mb-2" :style="{ color: planet.color }">{{ planet.subtitle }}</p>
        <p class="text-white/50 text-xs font-space leading-relaxed line-clamp-2">{{ planet.description }}</p>

        <!-- Mission progress -->
        <div class="mt-3 flex items-center gap-2">
          <div class="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
            <div class="h-full rounded-full transition-all duration-500"
                 :style="{ width: completionPercent + '%', background: planet.color }" />
          </div>
          <span class="text-xs font-terminal text-white/40">
            {{ completedMissions }}/{{ planet.missions.length }}
          </span>
        </div>
      </div>
    </div>

    <!-- Hover overlay -->
    <div class="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-center
                opacity-0 group-hover:opacity-100 transition-all duration-300
                border-t border-white/5">
      <span class="text-xs font-terminal text-white/40">{{ planet.missions.length }} Missions</span>
      <span class="text-xs font-terminal" :style="{ color: planet.color }">EXPLORE →</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLearnerStore } from '../../stores/learner'
import { useAudio } from '../../composables/useAudio'
import type { Planet } from '../../data/planets'

const props = defineProps<{ planet: Planet }>()
const router = useRouter()
const learner = useLearnerStore()
const audio = useAudio()
const hovered = ref(false)

const isCompleted = computed(() => learner.completedPlanets.has(props.planet.id))
const completedMissions = computed(() =>
  props.planet.missions.filter(m => learner.completedQuestions.has(m.id)).length
)
const completionPercent = computed(() =>
  (completedMissions.value / props.planet.missions.length) * 100
)
</script>
