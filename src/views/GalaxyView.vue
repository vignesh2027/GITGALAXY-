<template>
  <div class="relative min-h-screen overflow-hidden">
    <SubtleBackground />

    <div class="relative z-10 pt-20 pb-12 px-6">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-12" ref="headerRef">
          <p class="font-terminal text-neon-cyan text-xs tracking-widest mb-3 animate-pulse-neon">
            ── GALACTIC MAP ──
          </p>
          <h1 class="font-orbitron text-4xl font-black gradient-text mb-3">CHOOSE YOUR PLANET</h1>
          <p class="text-white/40 font-space text-sm">10 worlds. Each a realm of mastery.</p>
        </div>

        <!-- Search & Filter -->
        <div class="flex flex-wrap gap-3 justify-center mb-8">
          <div class="glass flex items-center gap-2 px-4 py-2 rounded-xl w-full max-w-xs">
            <span class="text-white/30">🔍</span>
            <input
              v-model="search"
              class="bg-transparent text-sm font-space text-white/80 placeholder-white/30 outline-none w-full"
              placeholder="Search planets..."
            />
          </div>
          <div class="flex flex-wrap gap-2 justify-center">
            <button
              v-for="cat in categories" :key="cat"
              class="px-3 py-1.5 rounded-lg text-xs font-terminal transition-all duration-200"
              :class="activeCategory === cat
                ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50'
                : 'glass text-white/50 hover:text-white/80 border border-transparent hover:border-white/10'"
              @click="activeCategory = cat; audio.click()"
            >{{ cat }}</button>
          </div>
        </div>

        <!-- Planets Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <PlanetCard
            v-for="p in filteredPlanets" :key="p.id"
            :planet="p"
          />
        </div>

        <!-- Empty state -->
        <div v-if="filteredPlanets.length === 0" class="text-center py-20">
          <div class="text-5xl mb-4">🔭</div>
          <p class="text-white/40 font-space">No planets match your search</p>
        </div>

        <!-- Quick stats -->
        <div class="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="s in overviewStats" :key="s.label"
               class="glass-card p-4 text-center">
            <p class="font-orbitron text-2xl font-bold" :class="s.color">{{ s.value }}</p>
            <p class="text-white/40 text-xs font-terminal mt-1">{{ s.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'
import SubtleBackground from '../components/space/SubtleBackground.vue'
import PlanetCard from '../components/space/PlanetCard.vue'
import { planets } from '../data/planets'
import { useLearnerStore } from '../stores/learner'
import { useAudio } from '../composables/useAudio'

const audio = useAudio()
const learner = useLearnerStore()
const headerRef = ref<HTMLElement | null>(null)
const search = ref('')
const activeCategory = ref('ALL')
const categories = ['ALL', 'git', 'github', 'linux', 'cloud', 'devops', 'security', 'fullstack', 'ai', 'ml', 'quantum']

const filteredPlanets = computed(() => {
  let list = planets
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
  }
  if (activeCategory.value !== 'ALL') {
    list = list.filter(p => p.category === activeCategory.value)
  }
  return list
})

const overviewStats = computed(() => [
  { value: learner.level, label: 'YOUR LEVEL', color: 'text-neon-cyan' },
  { value: learner.xp, label: 'TOTAL XP', color: 'text-plasma-purple' },
  { value: learner.completedQuestions.size, label: 'QUESTIONS', color: 'text-github-green' },
  { value: learner.completedPlanets.size + '/10', label: 'PLANETS', color: 'text-solar-amber' }
])

onMounted(() => {
  if (headerRef.value) {
    gsap.from(headerRef.value.children, {
      opacity: 0, y: 20, stagger: 0.1, duration: 0.6, ease: 'power2.out', delay: 0.1
    })
  }
})
</script>
