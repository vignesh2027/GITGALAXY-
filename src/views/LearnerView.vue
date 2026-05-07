<template>
  <div class="relative min-h-screen overflow-auto bg-space-black">
    <div class="fixed inset-0 pointer-events-none"
         style="background: radial-gradient(ellipse at 70% 10%, rgba(0,245,255,0.06), transparent 60%)" />
    <SubtleBackground />

    <div class="relative z-10 pt-20 pb-16 px-6 max-w-7xl mx-auto">
      <!-- Hero profile -->
      <div class="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
        <!-- Avatar & level -->
        <div class="relative flex-shrink-0 text-center">
          <div class="w-28 h-28 rounded-full border-4 border-neon-cyan/40 flex items-center justify-center
                      text-5xl bg-gradient-to-br from-galaxy-navy to-space-black"
               style="box-shadow: 0 0 30px rgba(0,245,255,0.3)">
            🧑‍🚀
          </div>
          <div class="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-space-black border-2 border-neon-cyan
                      flex items-center justify-center font-orbitron text-xs font-bold text-neon-cyan">
            {{ learner.level }}
          </div>
        </div>

        <!-- Stats -->
        <div class="flex-1 min-w-0">
          <h1 class="font-orbitron text-2xl font-black gradient-text mb-1">Space Explorer</h1>
          <p class="font-terminal text-neon-cyan text-sm mb-4">{{ learner.rank }}</p>

          <XPBar
            :xp="learner.xp % learner.xpForNextLevel"
            :level="learner.level"
            :xp-for-next="learner.xpForNextLevel"
            :progress="learner.xpProgress"
            :rank="learner.rank"
          />

          <div class="mt-5 flex flex-wrap gap-4">
            <div v-for="s in profileStats" :key="s.label"
                 class="glass px-4 py-2 rounded-xl text-center">
              <p class="font-orbitron font-bold" :class="s.color">{{ s.value }}</p>
              <p class="text-white/40 text-xs font-terminal">{{ s.label }}</p>
            </div>
          </div>
        </div>

        <!-- Share button -->
        <div class="text-center">
          <button class="btn-neon px-5 py-2.5 rounded-xl font-orbitron text-xs"
                  @click="shareProfile">🌌 SHARE PROFILE</button>
          <p class="text-white/30 text-xs font-terminal mt-2">Level {{ learner.level }} Explorer</p>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex gap-2 mb-6 border-b border-white/10 pb-3 overflow-x-auto">
        <button v-for="tab in tabs" :key="tab"
                class="px-4 py-2 rounded-t-lg text-sm font-space font-medium whitespace-nowrap transition-all"
                :class="activeTab === tab ? 'text-neon-cyan border-b-2 border-neon-cyan' : 'text-white/40 hover:text-white/70'"
                @click="activeTab = tab; audio.click()">
          {{ tab }}
        </button>
      </div>

      <!-- DASHBOARD TAB -->
      <div v-if="activeTab === 'Dashboard'" class="space-y-6">
        <!-- Daily missions -->
        <div class="glass-card p-6">
          <div class="flex items-center justify-between mb-5">
            <h3 class="font-orbitron text-sm font-bold text-solar-amber">🌅 DAILY MISSIONS</h3>
            <span class="font-terminal text-xs text-white/40">Resets daily</span>
          </div>
          <div class="space-y-3">
            <div v-for="m in learner.dailyMissions" :key="m.id"
                 class="flex items-center gap-4 p-4 rounded-xl border transition-all duration-300"
                 :class="m.completed
                   ? 'border-github-green/30 bg-github-green/5'
                   : 'border-white/10 hover:border-neon-cyan/30'">
              <div class="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                   :class="m.completed ? 'bg-github-green/20 text-github-green' : 'bg-white/5 text-white/30'">
                {{ m.completed ? '✓' : '○' }}
              </div>
              <div class="flex-1">
                <p class="font-orbitron text-xs font-bold text-white/90">{{ m.title }}</p>
                <p class="text-white/50 text-xs font-space mt-0.5">{{ m.desc }}</p>
              </div>
              <div class="text-right">
                <p class="font-terminal text-xs text-neon-cyan">+{{ m.xp }} XP</p>
                <button v-if="!m.completed"
                        class="mt-1 text-xs font-orbitron px-3 py-1 rounded-lg border border-neon-cyan/30
                               text-neon-cyan hover:bg-neon-cyan/10 transition-all"
                        @click="learner.completeDaily(m.id); audio.xp()">
                  CLAIM
                </button>
                <span v-else class="mt-1 block text-xs font-terminal text-github-green">DONE</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick actions -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <RouterLink to="/galaxy" class="glass-card p-5 text-center hover:border-neon-cyan/30 group transition-all">
            <div class="text-3xl mb-3 group-hover:scale-110 transition-transform">🌌</div>
            <p class="font-orbitron text-xs font-bold text-white">Explore Galaxy</p>
            <p class="text-white/40 text-xs font-space mt-1">{{ 10 - learner.completedPlanets.size }} planets remaining</p>
          </RouterLink>
          <RouterLink to="/games" class="glass-card p-5 text-center hover:border-plasma-purple/30 group transition-all">
            <div class="text-3xl mb-3 group-hover:scale-110 transition-transform">🎮</div>
            <p class="font-orbitron text-xs font-bold text-white">Play Games</p>
            <p class="text-white/40 text-xs font-space mt-1">Earn XP in arcade</p>
          </RouterLink>
          <RouterLink to="/planet/git" class="glass-card p-5 text-center hover:border-github-green/30 group transition-all">
            <div class="text-3xl mb-3 group-hover:scale-110 transition-transform">🌿</div>
            <p class="font-orbitron text-xs font-bold text-white">Continue Git</p>
            <p class="text-white/40 text-xs font-space mt-1">Most popular planet</p>
          </RouterLink>
        </div>
      </div>

      <!-- ACHIEVEMENTS TAB -->
      <div v-if="activeTab === 'Achievements'">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="a in learner.achievements" :key="a.id"
               class="glass-card p-5 flex items-center gap-4 transition-all duration-300"
               :class="a.unlocked ? 'border-solar-amber/30' : 'opacity-50'">
            <div class="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                 :class="a.unlocked ? 'bg-solar-amber/20 border border-solar-amber/40' : 'bg-white/5 border border-white/10'">
              {{ a.unlocked ? a.icon : '🔒' }}
            </div>
            <div>
              <p class="font-orbitron text-xs font-bold" :class="a.unlocked ? 'text-solar-amber' : 'text-white/40'">
                {{ a.title }}
              </p>
              <p class="text-white/50 text-xs font-space mt-0.5">{{ a.desc }}</p>
              <p class="font-terminal text-xs mt-1" :class="a.unlocked ? 'text-neon-cyan' : 'text-white/20'">
                {{ a.unlocked ? '+' + a.xp + ' XP EARNED' : a.xp + ' XP on unlock' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- SCORES TAB -->
      <div v-if="activeTab === 'High Scores'">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div v-for="g in gameScores" :key="g.key"
               class="glass-card p-7 text-center"
               :style="{ borderColor: g.color + '30' }">
            <div class="text-5xl mb-4">{{ g.icon }}</div>
            <p class="font-orbitron text-3xl font-bold mb-1"
               :style="{ color: g.color }">{{ learner.highScores[g.key] || 0 }}</p>
            <p class="font-terminal text-white/40 text-sm">{{ g.name }}</p>
            <RouterLink :to="g.path"
                        class="mt-4 inline-block px-4 py-2 rounded-xl border text-xs font-orbitron transition-all"
                        :style="{ borderColor: g.color + '50', color: g.color }">
              PLAY NOW
            </RouterLink>
          </div>
        </div>
        <div class="glass-card p-6">
          <h3 class="font-orbitron text-sm font-bold text-neon-cyan mb-4">QUESTIONS ANSWERED</h3>
          <div class="flex items-center gap-4">
            <div class="text-4xl font-orbitron font-bold gradient-text">{{ learner.completedQuestions.size }}</div>
            <div>
              <div class="h-3 bg-white/5 rounded-full overflow-hidden w-64">
                <div class="h-full xp-bar-fill rounded-full"
                     :style="{ width: Math.min((learner.completedQuestions.size / 600) * 100, 100) + '%' }" />
              </div>
              <p class="text-white/40 text-xs font-terminal mt-1">{{ learner.completedQuestions.size }}/600 total questions</p>
            </div>
          </div>
        </div>
      </div>

      <!-- SKILL TREE TAB -->
      <div v-if="activeTab === 'Skill Tree'">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div v-for="skill in skillTree" :key="skill.id"
               class="glass-card p-5 text-center cursor-pointer hover:border-white/20 transition-all group"
               :class="skill.unlocked ? '' : 'opacity-40'"
               @click="audio.click()">
            <div class="text-3xl mb-3 group-hover:scale-110 transition-transform">{{ skill.icon }}</div>
            <p class="font-orbitron text-xs font-bold text-white/90">{{ skill.name }}</p>
            <div class="flex gap-0.5 mt-2 justify-center">
              <div v-for="i in skill.maxLevel" :key="i"
                   class="h-1.5 w-5 rounded-full transition-all"
                   :style="{ background: i <= skill.level ? skill.color : 'rgba(255,255,255,0.1)' }" />
            </div>
            <p class="text-white/30 text-xs font-terminal mt-1">Lv {{ skill.level }}/{{ skill.maxLevel }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SubtleBackground from '../components/space/SubtleBackground.vue'
import XPBar from '../components/ui/XPBar.vue'
import { useLearnerStore } from '../stores/learner'
import { useAudio } from '../composables/useAudio'

const learner = useLearnerStore()
const audio = useAudio()
const activeTab = ref('Dashboard')
const tabs = ['Dashboard', 'Achievements', 'High Scores', 'Skill Tree']

const profileStats = computed(() => [
  { value: learner.xp, label: 'TOTAL XP', color: 'text-neon-cyan' },
  { value: learner.completedQuestions.size, label: 'ANSWERED', color: 'text-plasma-purple' },
  { value: learner.streak + ' 🔥', label: 'DAY STREAK', color: 'text-solar-amber' },
  { value: learner.completedPlanets.size + '/10', label: 'PLANETS', color: 'text-github-green' }
])

const gameScores = [
  { key: 'temple', name: 'Temple Run', icon: '🏃', color: '#00F5FF', path: '/games/temple-run' },
  { key: 'snake',  name: 'Neural Serpent', icon: '🐍', color: '#39FF14', path: '/games/snake' },
  { key: 'combat', name: 'Space Combat', icon: '🚀', color: '#7B61FF', path: '/games/space-combat' }
]

const skillTree = computed(() => [
  { id: 'git',    name: 'Git Master',   icon: '🌿', color: '#39FF14', level: Math.min(5, Math.floor(learner.xp/200)), maxLevel: 5, unlocked: true },
  { id: 'github', name: 'GitHub Pro',   icon: '🐙', color: '#00F5FF', level: Math.min(5, Math.floor(learner.xp/300)), maxLevel: 5, unlocked: learner.xp > 100 },
  { id: 'linux',  name: 'Linux Sage',   icon: '🐧', color: '#FFB703', level: Math.min(5, Math.floor(learner.xp/400)), maxLevel: 5, unlocked: learner.xp > 300 },
  { id: 'cloud',  name: 'Cloud Rider',  icon: '☁️', color: '#00FFB3', level: Math.min(5, Math.floor(learner.xp/500)), maxLevel: 5, unlocked: learner.xp > 500 },
  { id: 'ai',     name: 'AI Wizard',    icon: '🤖', color: '#FF61D8', level: Math.min(5, Math.floor(learner.xp/600)), maxLevel: 5, unlocked: learner.xp > 800 },
  { id: 'devops', name: 'DevOps Ninja', icon: '⚙️', color: '#7B61FF', level: Math.min(5, Math.floor(learner.xp/700)), maxLevel: 5, unlocked: learner.xp > 1000 },
  { id: 'sec',    name: 'Sec Guardian',icon: '🛡️', color: '#FF3366', level: Math.min(5, Math.floor(learner.xp/800)), maxLevel: 5, unlocked: learner.xp > 1200 },
  { id: 'debug',  name: 'Debug Guru',   icon: '🔍', color: '#EAFBFF', level: Math.min(5, Math.floor(learner.xp/900)), maxLevel: 5, unlocked: learner.xp > 1500 },
  { id: 'full',   name: 'Full Stack',   icon: '🌐', color: '#FFB703', level: Math.min(5, Math.floor(learner.xp/1000)), maxLevel: 5, unlocked: learner.xp > 2000 },
  { id: 'quantum',name: 'Quantum Sage', icon: '⚛️', color: '#7B61FF', level: Math.min(5, Math.floor(learner.xp/1200)), maxLevel: 5, unlocked: learner.xp > 3000 }
])

function shareProfile() {
  const text = `I'm Level ${learner.level} on GITGALAXY — The Infinite Learning Cosmos! 🌌 ${learner.xp} XP earned. Join me!`
  if (navigator.share) {
    navigator.share({ title: 'GITGALAXY Profile', text })
  } else {
    navigator.clipboard.writeText(text)
    audio.success()
  }
}
</script>
