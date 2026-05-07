<template>
  <div class="relative min-h-screen overflow-hidden">
    <!-- Three.js Galaxy -->
    <SubtleBackground />

    <!-- Hero Content -->
    <div class="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-20">
      <!-- Floating particles -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div v-for="p in particles" :key="p.id"
             class="absolute rounded-full"
             :style="{
               left: p.x + '%', top: p.y + '%',
               width: p.s + 'px', height: p.s + 'px',
               background: p.c,
               animation: `float ${p.d}s ease-in-out infinite ${p.delay}s`,
               opacity: p.o,
               boxShadow: `0 0 ${p.s*2}px ${p.c}`
             }" />
      </div>

      <!-- Title block -->
      <div ref="titleRef" class="text-center mb-10">
        <div class="mb-4 inline-block">
          <span class="font-terminal text-neon-cyan text-sm tracking-[0.4em] animate-pulse-neon">
            ── MISSION: KNOWLEDGE ──
          </span>
        </div>

        <h1
          class="font-orbitron font-black leading-none mb-4"
          style="font-size: clamp(3rem, 10vw, 8rem)"
        >
          <span class="gradient-text">GIT</span>
          <span class="text-white">GALAXY</span>
        </h1>

        <div class="flex items-center justify-center gap-3 mb-6">
          <div class="h-px w-16 bg-gradient-to-r from-transparent to-neon-cyan" />
          <p class="font-terminal text-neon-cyan/70 text-sm tracking-[0.3em] uppercase">
            The Infinite Learning Cosmos
          </p>
          <div class="h-px w-16 bg-gradient-to-l from-transparent to-neon-cyan" />
        </div>

        <p class="font-space text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
          A next-generation gamified metaverse where mastering Git, Linux, Cloud, and AI
          feels like exploring an interstellar civilization.
        </p>
      </div>

      <!-- CTA Buttons -->
      <div ref="ctaRef" class="flex flex-wrap gap-4 justify-center mb-14">
        <RouterLink to="/galaxy">
          <button class="btn-neon px-8 py-3.5 rounded-xl font-orbitron font-bold text-sm tracking-wider
                         flex items-center gap-2 hover:scale-105 transition-transform duration-200"
                  @click="audio.click()">
            🚀 ENTER GALAXY
          </button>
        </RouterLink>
        <RouterLink to="/games">
          <button class="btn-purple px-8 py-3.5 rounded-xl font-orbitron font-bold text-sm tracking-wider
                         flex items-center gap-2 hover:scale-105 transition-transform duration-200 btn-neon"
                  @click="audio.click()">
            🎮 PLAY GAMES
          </button>
        </RouterLink>
        <RouterLink to="/learner">
          <button class="btn-green px-8 py-3.5 rounded-xl font-orbitron font-bold text-sm tracking-wider
                         flex items-center gap-2 hover:scale-105 transition-transform duration-200 btn-neon"
                  @click="audio.click()">
            ⭐ MY JOURNEY
          </button>
        </RouterLink>
      </div>

      <!-- Stats bar -->
      <div ref="statsRef"
           class="flex flex-wrap gap-6 justify-center mb-16">
        <div v-for="s in stats" :key="s.label"
             class="glass px-5 py-3 rounded-xl text-center hover:border-neon-cyan/30 transition-all duration-300">
          <p class="font-orbitron font-bold text-xl gradient-text">{{ s.value }}</p>
          <p class="font-terminal text-white/40 text-xs mt-0.5">{{ s.label }}</p>
        </div>
      </div>

      <!-- Planet preview strip -->
      <div ref="planetsRef" class="w-full max-w-5xl overflow-x-auto pb-4">
        <div class="flex gap-4 min-w-max px-4 justify-center flex-wrap">
          <RouterLink
            v-for="p in planets.slice(0, 6)" :key="p.id"
            :to="'/planet/' + p.id"
            class="group flex flex-col items-center gap-2 cursor-pointer"
            @click="audio.click()"
          >
            <div
              class="w-14 h-14 rounded-full flex items-center justify-center text-2xl
                     border-2 transition-all duration-300 group-hover:scale-125"
              :style="{
                borderColor: p.color + '60',
                background: `radial-gradient(circle, ${p.color}20, transparent)`,
                boxShadow: `0 0 15px ${p.color}40`
              }"
            >{{ p.icon }}</div>
            <span class="font-terminal text-[10px] text-white/50 group-hover:text-white/80 transition-colors">
              {{ p.name.split(' ')[0] }}
            </span>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
      <div class="w-5 h-9 border-2 border-neon-cyan/30 rounded-full flex items-start justify-center pt-2">
        <div class="w-1 h-2 bg-neon-cyan rounded-full animate-pulse" />
      </div>
    </div>

    <!-- Features section -->
    <div class="relative z-10 py-24 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-14">
          <h2 class="font-orbitron text-3xl font-bold gradient-text mb-3">WHY GITGALAXY?</h2>
          <p class="text-white/40 font-space">Not a tutorial. Not a course. A universe.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="f in features" :key="f.title"
               class="glass-card p-6 hover:border-neon-cyan/30 group transition-all duration-300">
            <div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{{ f.icon }}</div>
            <h3 class="font-orbitron text-sm font-bold text-white mb-2">{{ f.title }}</h3>
            <p class="text-white/50 text-sm font-space leading-relaxed">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import SubtleBackground from '../components/space/SubtleBackground.vue'
import { planets } from '../data/planets'
import { useAudio } from '../composables/useAudio'

const audio = useAudio()
const titleRef = ref<HTMLElement | null>(null)
const ctaRef = ref<HTMLElement | null>(null)
const statsRef = ref<HTMLElement | null>(null)
const planetsRef = ref<HTMLElement | null>(null)

const stats = [
  { value: '10', label: 'Planets' },
  { value: '600+', label: 'Questions' },
  { value: '40', label: 'Case Studies' },
  { value: '3', label: 'Arcade Games' },
  { value: '∞', label: 'Adventures' }
]

const features = [
  { icon: '🌌', title: '3D Galaxy Universe',    desc: 'Real-time Three.js galaxy with 120K particles, planetary orbits, bloom shaders, and procedural nebulas.' },
  { icon: '🎮', title: 'Arcade Learning Games', desc: 'Temple Run, Snake, and Space Combat — all with integrated quizzes and XP rewards.' },
  { icon: '🧠', title: '600+ Expert Questions', desc: 'Real-world scenarios from production incidents, Git crises, security breaches, and system design.' },
  { icon: '🚀', title: 'XP Progression System', desc: 'Level up, unlock achievements, climb the galactic rankings as you master engineering.' },
  { icon: '📖', title: 'GitHub Foundation Blog', desc: 'Deep-dive into the birth of Git, the rise of GitHub, and how they shaped modern software.' },
  { icon: '🛸', title: 'Mission Control Admin',  desc: 'Full admin panel with content management, analytics, and real-time learner stats.' }
]

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  s: Math.random() * 4 + 2,
  c: ['#00F5FF', '#7B61FF', '#39FF14', '#FFB703'][i % 4],
  d: 4 + Math.random() * 6,
  delay: Math.random() * -6,
  o: 0.3 + Math.random() * 0.5
}))

onMounted(() => {
  const tl = gsap.timeline({ delay: 0.2 })
  if (titleRef.value) {
    tl.from(titleRef.value.children, {
      opacity: 0, y: 40, stagger: 0.12, duration: 0.7, ease: 'power3.out'
    })
  }
  if (ctaRef.value) {
    tl.from(ctaRef.value.children, {
      opacity: 0, y: 20, stagger: 0.1, duration: 0.5, ease: 'back.out(1.5)'
    }, '-=0.3')
  }
  if (statsRef.value) {
    tl.from(statsRef.value.children, {
      opacity: 0, scale: 0.8, stagger: 0.07, duration: 0.4, ease: 'back.out(2)'
    }, '-=0.2')
  }
  if (planetsRef.value) {
    tl.from(planetsRef.value.querySelectorAll('a'), {
      opacity: 0, y: 20, stagger: 0.05, duration: 0.4, ease: 'power2.out'
    }, '-=0.2')
  }
})
</script>
