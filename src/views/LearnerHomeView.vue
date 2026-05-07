<template>
  <div class="relative min-h-screen overflow-auto">
    <SubtleBackground />
    <div class="relative z-10 pt-20 pb-16 px-6 max-w-7xl mx-auto">

      <!-- Admin announcements -->
      <div v-if="activeAnnouncements.length > 0" class="mb-6 space-y-2">
        <div v-for="a in activeAnnouncements" :key="a.id"
             class="px-4 py-3 rounded-xl border text-sm font-space flex items-center gap-3"
             :class="{
               'bg-solar-amber/10 border-solar-amber/30 text-solar-amber': a.type === 'warning',
               'bg-red-500/10 border-red-500/30 text-red-400': a.type === 'error',
               'bg-github-green/10 border-github-green/30 text-github-green': a.type === 'success',
               'bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan': a.type === 'info' || !['warning','error','success'].includes(a.type)
             }">
          <span>{{ a.type === 'warning' ? '⚠️' : a.type === 'error' ? '🚨' : a.type === 'success' ? '✅' : 'ℹ️' }}</span>
          <span>{{ a.text }}</span>
        </div>
      </div>

      <!-- Welcome bar -->
      <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <p class="font-terminal text-white/40 text-xs tracking-widest mb-1">WELCOME BACK, EXPLORER</p>
          <h1 class="font-orbitron text-2xl font-black text-white">{{ auth.learnerName }}</h1>
        </div>
        <XPBar
          :xp="learner.xp % learner.xpForNextLevel"
          :level="learner.level"
          :xp-for-next="learner.xpForNextLevel"
          :progress="learner.xpProgress"
          :rank="learner.rank"
          class="w-full sm:w-64"
        />
      </div>

      <!-- Quick stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <div v-for="s in quickStats" :key="s.label" class="dark-card p-4 text-center">
          <p class="font-orbitron text-xl font-bold" :class="s.color">{{ s.value }}</p>
          <p class="text-white/40 text-xs font-terminal mt-1">{{ s.label }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- Left: Daily missions + nav -->
        <div class="space-y-5">
          <!-- Daily missions -->
          <div class="dark-card p-5">
            <h3 class="font-orbitron text-xs font-bold text-solar-amber mb-4 flex items-center gap-2">
              <span>🌅</span> DAILY MISSIONS
            </h3>
            <div class="space-y-3">
              <div v-for="m in learner.dailyMissions" :key="m.id"
                   class="flex items-center gap-3 p-3 rounded-xl"
                   :class="m.completed ? 'bg-github-green/8 border border-github-green/20' : 'bg-white/3 border border-white/6'">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                     :class="m.completed ? 'bg-github-green/20 text-github-green' : 'bg-white/5 text-white/30'">
                  {{ m.completed ? '✓' : '○' }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-orbitron text-xs font-bold text-white/80">{{ m.title }}</p>
                  <p class="text-white/40 text-xs font-space truncate">{{ m.desc }}</p>
                </div>
                <button v-if="!m.completed"
                        class="text-xs font-terminal text-neon-cyan border border-neon-cyan/30 px-2 py-1
                               rounded-lg hover:bg-neon-cyan/10 transition-all flex-shrink-0"
                        @click="learner.completeDaily(m.id); audio.xp()">
                  +{{ m.xp }}
                </button>
                <span v-else class="text-xs font-terminal text-github-green flex-shrink-0">✓</span>
              </div>
            </div>
          </div>

          <!-- Quick nav -->
          <div class="dark-card p-5">
            <h3 class="font-orbitron text-xs font-bold text-white/50 mb-3">QUICK NAVIGATION</h3>
            <div class="space-y-2">
              <RouterLink v-for="nav in quickNav" :key="nav.path" :to="nav.path"
                          class="flex items-center gap-3 p-3 rounded-xl transition-all group"
                          :class="nav.path === '/interview'
                            ? 'bg-neon-cyan/8 border border-neon-cyan/30 hover:border-neon-cyan/60 hover:bg-neon-cyan/12'
                            : 'bg-white/3 border border-white/6 hover:border-white/15'"
                          @click="audio.click()">
                <span class="text-base">{{ nav.icon }}</span>
                <div>
                  <p class="font-orbitron text-xs font-bold"
                     :class="nav.path === '/interview' ? 'text-neon-cyan' : 'text-white/80'">{{ nav.label }}</p>
                  <p class="text-white/35 text-xs font-space">{{ nav.sub }}</p>
                </div>
                <span class="ml-auto text-xs"
                      :class="nav.path === '/interview' ? 'text-neon-cyan/50 group-hover:text-neon-cyan' : 'text-white/20 group-hover:text-white/50'">→</span>
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- Center: Planet grid -->
        <div class="lg:col-span-2 space-y-5">
          <div class="dark-card p-5">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-orbitron text-xs font-bold text-neon-cyan">🌌 GALAXY MAP</h3>
              <RouterLink to="/galaxy" class="text-white/35 hover:text-white/70 font-terminal text-xs transition-colors">
                VIEW ALL →
              </RouterLink>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <RouterLink
                v-for="p in planets.slice(0, 6)" :key="p.id"
                :to="'/planet/' + p.id"
                class="planet-mini-card group"
                @click="audio.click()"
              >
                <div class="flex items-center gap-3 p-3">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                       :style="{ border: `1.5px solid ${p.color}40`, background: `${p.color}10` }">
                    {{ p.icon }}
                  </div>
                  <div class="min-w-0">
                    <p class="font-orbitron text-xs font-bold text-white/80 truncate">{{ p.name.split(' ')[0] }}</p>
                    <p class="text-white/35 text-xs font-terminal">{{ p.missions.length }} missions</p>
                    <div class="h-0.5 bg-white/8 rounded mt-1 overflow-hidden">
                      <div class="h-full rounded" :style="{
                        width: (learner.completedQuestions.has(p.missions[0]?.id) ? 20 : 0) + '%',
                        background: p.color
                      }" />
                    </div>
                  </div>
                </div>
              </RouterLink>
            </div>
          </div>

          <!-- Achievements -->
          <div class="dark-card p-5">
            <h3 class="font-orbitron text-xs font-bold text-solar-amber mb-4">🏆 ACHIEVEMENTS</h3>
            <div class="grid grid-cols-3 sm:grid-cols-5 gap-3">
              <div v-for="a in learner.achievements.slice(0, 10)" :key="a.id"
                   class="text-center p-3 rounded-xl transition-all"
                   :class="a.unlocked ? 'bg-solar-amber/8 border border-solar-amber/25' : 'bg-white/3 border border-white/6 opacity-40'">
                <div class="text-2xl mb-1">{{ a.unlocked ? a.icon : '🔒' }}</div>
                <p class="font-orbitron text-xs font-bold" :class="a.unlocked ? 'text-solar-amber' : 'text-white/30'">
                  {{ a.title.split(' ')[0] }}
                </p>
              </div>
            </div>
          </div>

          <!-- Games shortcut -->
          <div class="dark-card p-5">
            <h3 class="font-orbitron text-xs font-bold text-plasma-purple mb-4">🎮 ARCADE</h3>
            <div class="grid grid-cols-3 gap-3">
              <RouterLink v-for="g in gameLinks" :key="g.path" :to="g.path"
                          class="text-center p-4 rounded-xl border border-white/6 hover:border-white/15 transition-all group"
                          @click="audio.click()">
                <div class="text-2xl mb-2 group-hover:scale-110 transition-transform">{{ g.icon }}</div>
                <p class="font-orbitron text-xs font-bold text-white/70">{{ g.name }}</p>
                <p class="text-white/30 text-xs font-terminal mt-1">{{ learner.highScores[g.key] || 0 }}</p>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SubtleBackground from '../components/space/SubtleBackground.vue'
import XPBar from '../components/ui/XPBar.vue'
import { useLearnerStore } from '../stores/learner'
import { useAuthStore } from '../stores/auth'
import { useAudio } from '../composables/useAudio'
import { planets } from '../data/planets'
import { useAdminStore } from '../stores/admin'

const learner = useLearnerStore()
const auth = useAuthStore()
const audio = useAudio()
const admin = useAdminStore()
const activeAnnouncements = computed(() => admin.announcements.filter(a => a.active))

const quickStats = computed(() => [
  { value: learner.level,                    label: 'LEVEL',     color: 'text-neon-cyan' },
  { value: learner.xp,                       label: 'TOTAL XP',  color: 'text-plasma-purple' },
  { value: learner.completedQuestions.size,  label: 'ANSWERED',  color: 'text-github-green' },
  { value: learner.completedPlanets.size + '/10', label: 'PLANETS', color: 'text-solar-amber' }
])

const quickNav = [
  { path: '/interview',     icon: '📋', label: 'Interview Q&A',  sub: 'Study questions from your instructor' },
  { path: '/galaxy',        icon: '🌌', label: 'Galaxy Map',     sub: '10 planets to explore' },
  { path: '/games',         icon: '🎮', label: 'Arcade',         sub: '3 games available'    },
  { path: '/discussions',   icon: '💬', label: 'Discussions',    sub: 'Community forum'      },
  { path: '/git-commands',  icon: '🌿', label: 'Git Commands',   sub: 'Full reference guide' },
  { path: '/learner',       icon: '⭐', label: 'My Profile',     sub: 'Progress & skills'    }
]

const gameLinks = [
  { path: '/games/temple-run', key: 'temple', icon: '🏃', name: 'Temple Run' },
  { path: '/games/snake',      key: 'snake',  icon: '🐍', name: 'Snake'      },
  { path: '/games/space-combat', key: 'combat', icon: '🚀', name: 'Combat'   }
]
</script>

<style scoped>
.dark-card {
  background: rgba(5, 8, 16, 0.85);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px;
  backdrop-filter: blur(20px);
}
.planet-mini-card {
  background: rgba(5, 8, 16, 0.7);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px;
  transition: all 0.25s ease;
}
.planet-mini-card:hover {
  border-color: rgba(255,255,255,0.15);
  background: rgba(255,255,255,0.04);
  transform: translateY(-2px);
}
</style>
