<template>
  <div class="relative min-h-screen overflow-auto">
    <SubtleBackground />
    <div class="relative z-10 pt-20 pb-16 px-6 max-w-7xl mx-auto">

      <!-- Header -->
      <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <p class="font-terminal text-white/40 text-xs tracking-widest mb-1">MISSION CONTROL</p>
          <h1 class="font-orbitron text-2xl font-black text-white">ADMIN DASHBOARD</h1>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-2 h-2 rounded-full bg-github-green animate-pulse" />
          <span class="font-terminal text-xs text-github-green">ALL SYSTEMS NOMINAL</span>
        </div>
      </div>

      <!-- Stats grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        <div v-for="s in adminStats" :key="s.label"
             class="dark-card p-4 text-center">
          <p class="font-orbitron text-xl font-bold" :class="s.color">{{ s.value }}</p>
          <p class="text-white/40 text-xs font-terminal mt-1">{{ s.label }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- Quick actions -->
        <div class="space-y-4">
          <div class="dark-card p-5">
            <h3 class="font-orbitron text-xs font-bold text-neon-cyan mb-4">⚡ QUICK ACTIONS</h3>
            <div class="space-y-2">
              <RouterLink v-for="a in quickActions" :key="a.path" :to="a.path"
                          class="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/6
                                 hover:border-white/15 transition-all group" @click="audio.click()">
                <span class="text-xl">{{ a.icon }}</span>
                <div>
                  <p class="font-orbitron text-xs font-bold text-white/80">{{ a.label }}</p>
                  <p class="text-white/35 text-xs font-space">{{ a.sub }}</p>
                </div>
                <span class="ml-auto text-white/20 group-hover:text-white/50">→</span>
              </RouterLink>
            </div>
          </div>

          <!-- Announcements quick post -->
          <div class="dark-card p-5">
            <h3 class="font-orbitron text-xs font-bold text-solar-amber mb-3">📢 QUICK ANNOUNCE</h3>
            <textarea v-model="quickAnn" rows="3" placeholder="Post to all learners..."
                      class="w-full bg-white/4 border border-white/8 rounded-xl px-3 py-2 text-sm
                             font-space text-white/80 outline-none resize-none placeholder-white/25 mb-3" />
            <button class="w-full py-2 rounded-xl border border-solar-amber/30 text-solar-amber text-xs
                           font-orbitron font-bold hover:bg-solar-amber/10 transition-all"
                    @click="postAnn">BROADCAST →</button>
          </div>
        </div>

        <!-- Center: Activity chart + planet stats -->
        <div class="lg:col-span-2 space-y-5">
          <div class="dark-card p-5">
            <h3 class="font-orbitron text-xs font-bold text-white/60 mb-4">📊 LEARNER ACTIVITY (14 DAYS)</h3>
            <canvas ref="chartRef" height="130" class="w-full" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="dark-card p-5">
              <h3 class="font-orbitron text-xs font-bold text-plasma-purple mb-3">TOP PLANETS</h3>
              <div class="space-y-2">
                <div v-for="(p, i) in topPlanets" :key="p.id" class="flex items-center gap-3">
                  <span class="text-sm w-6">{{ p.icon }}</span>
                  <div class="flex-1">
                    <div class="flex justify-between text-xs mb-0.5">
                      <span class="font-space text-white/60">{{ p.name.split(' ')[0] }}</span>
                      <span class="font-terminal" :style="{ color: p.color }">{{ 85 - i*8 }}%</span>
                    </div>
                    <div class="h-1 bg-white/8 rounded overflow-hidden">
                      <div class="h-full rounded" :style="{ width: (85-i*8)+'%', background: p.color }" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recent uploads -->
            <div class="dark-card p-5">
              <h3 class="font-orbitron text-xs font-bold text-github-green mb-3">RECENT UPLOADS</h3>
              <div class="space-y-2">
                <div v-if="admin.uploadedAssets.length === 0" class="text-center py-6">
                  <p class="text-white/25 font-space text-xs">No uploads yet</p>
                  <RouterLink to="/admin" class="text-neon-cyan text-xs font-terminal hover:underline mt-1 block">
                    Upload files →
                  </RouterLink>
                </div>
                <div v-for="a in admin.uploadedAssets.slice(0, 5)" :key="a.name"
                     class="flex items-center gap-2 p-2 rounded-lg bg-white/3">
                  <span class="text-sm">{{ getIcon(a.type) }}</span>
                  <div class="min-w-0 flex-1">
                    <p class="text-xs font-space text-white/65 truncate">{{ a.name }}</p>
                    <p class="text-xs font-terminal text-white/30">{{ a.date }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Activity feed -->
          <div class="dark-card p-5">
            <h3 class="font-orbitron text-xs font-bold text-white/50 mb-3">LIVE ACTIVITY</h3>
            <div class="space-y-2 max-h-40 overflow-y-auto">
              <div v-for="a in activity" :key="a.id"
                   class="flex items-center gap-3 p-2 rounded-lg bg-white/2 border border-white/4">
                <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                      :style="{ background: a.color + '15' }">{{ a.icon }}</span>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-space text-white/65 truncate">{{ a.text }}</p>
                </div>
                <span class="text-xs font-terminal text-white/30 flex-shrink-0">{{ a.ago }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import SubtleBackground from '../components/space/SubtleBackground.vue'
import { useAdminStore } from '../stores/admin'
import { useAudio } from '../composables/useAudio'
import { planets } from '../data/planets'

const admin = useAdminStore()
const audio = useAudio()
const chartRef = ref<HTMLCanvasElement | null>(null)
const quickAnn = ref('')

const adminStats = computed(() => [
  { value: admin.customPlanets.length,   label: 'PLANETS',    color: 'text-neon-cyan'     },
  { value: admin.customQuestions.length, label: 'QUESTIONS',  color: 'text-plasma-purple' },
  { value: admin.stats.totalLearners,    label: 'LEARNERS',   color: 'text-github-green'  },
  { value: admin.stats.activeToday,      label: 'ACTIVE',     color: 'text-solar-amber'   },
  { value: admin.stats.avgScore + '%',   label: 'AVG SCORE',  color: 'text-neon-cyan'     },
  { value: admin.stats.completionRate+'%', label: 'COMPLETION', color: 'text-github-green' }
])

const topPlanets = computed(() => planets.slice(0, 5))

const quickActions = [
  { path: '/admin?tab=Content',       icon: '➕', label: 'Add Questions',   sub: 'Single or bulk upload' },
  { path: '/admin?tab=Planets',       icon: '🪐', label: 'Edit Planets',    sub: 'Manage planet content' },
  { path: '/admin?tab=Analytics',     icon: '📊', label: 'Analytics',       sub: 'View learner data'     },
  { path: '/admin?tab=Announcements', icon: '📢', label: 'Announcements',   sub: 'Broadcast messages'    },
  { path: '/admin?tab=Settings',      icon: '⚙️', label: 'Settings',        sub: 'Configure platform'    }
]

const activity = Array.from({ length: 10 }, (_, i) => ({
  id: i, icon: ['🌿','🐙','🐧','☁️','⚙️','🛡️','🎮','⭐','💡','🔍'][i],
  color: ['#39FF14','#00F5FF','#FFB703','#00FFB3','#7B61FF','#FF3366','#7B61FF','#FFB703','#00F5FF','#39FF14'][i],
  text: ['Git Planet mission completed','GitHub PRs quiz answered','Linux chmod question correct','Cloud S3 case study started','DevOps Docker quiz perfect','Security XSS question answered','Snake game high score: 840','Level 5 achievement unlocked','New question streak started','Admin panel visited'][i],
  ago: `${i * 3 + 1}m ago`
}))

function getIcon(type: string) {
  if (type?.includes('image')) return '🖼️'
  if (type?.includes('video')) return '🎬'
  if (type?.includes('pdf'))   return '📄'
  return '📁'
}

function postAnn() {
  if (!quickAnn.value.trim()) return
  admin.addAnnouncement(quickAnn.value, 'info')
  quickAnn.value = ''
}

onMounted(() => {
  const c = chartRef.value
  if (!c) return
  const ctx = c.getContext('2d')!
  c.width = c.parentElement?.clientWidth || 500
  const W = c.width, H = 130
  const data = [180,220,195,310,280,340,290,380,320,420,390,450,410,480]
  const max = Math.max(...data)
  ctx.fillStyle = 'transparent'; ctx.fillRect(0, 0, W, H)

  // Area fill
  const pts: [number, number][] = data.map((v, i) => [
    (i / (data.length - 1)) * (W - 20) + 10,
    H - 20 - ((v / max) * (H - 35))
  ])
  ctx.beginPath()
  ctx.moveTo(pts[0][0], H - 20)
  pts.forEach(p => ctx.lineTo(p[0], p[1]))
  ctx.lineTo(pts[pts.length-1][0], H - 20)
  ctx.closePath()
  const g = ctx.createLinearGradient(0, 0, 0, H)
  g.addColorStop(0, 'rgba(0,245,255,0.12)')
  g.addColorStop(1, 'rgba(0,245,255,0)')
  ctx.fillStyle = g; ctx.fill()

  // Line
  ctx.strokeStyle = '#00F5FF'; ctx.lineWidth = 1.5; ctx.lineJoin = 'round'
  ctx.shadowColor = '#00F5FF'; ctx.shadowBlur = 6
  ctx.beginPath(); pts.forEach((p, i) => i === 0 ? ctx.moveTo(p[0],p[1]) : ctx.lineTo(p[0],p[1])); ctx.stroke()
  ctx.shadowBlur = 0

  // Dots
  pts.forEach(p => {
    ctx.beginPath(); ctx.arc(p[0], p[1], 2.5, 0, Math.PI*2)
    ctx.fillStyle = '#00F5FF'; ctx.fill()
  })

  // Baseline
  ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(0, H-20); ctx.lineTo(W, H-20); ctx.stroke()
})
</script>

<style scoped>
.dark-card {
  background: rgba(5, 8, 16, 0.88);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px;
  backdrop-filter: blur(20px);
}
</style>
