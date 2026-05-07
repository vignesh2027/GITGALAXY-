<template>
  <div class="relative min-h-screen bg-space-black overflow-hidden">
    <!-- HUD -->
    <div class="fixed top-0 left-0 right-0 z-30 px-6 py-3 glass border-b border-plasma-purple/20 flex items-center justify-between">
      <RouterLink to="/games" class="text-white/50 hover:text-white font-space text-sm transition-colors">← Back</RouterLink>
      <div class="flex items-center gap-5">
        <span class="font-orbitron text-sm font-bold text-plasma-purple">{{ score }}</span>
        <div class="flex gap-1.5">
          <span v-for="i in maxLives" :key="i"
                class="w-4 h-4 rounded-full transition-all duration-300"
                :style="{ background: i <= lives ? '#7B61FF' : 'rgba(255,255,255,0.1)',
                          boxShadow: i <= lives ? '0 0 8px #7B61FF' : 'none' }" />
        </div>
        <span class="font-terminal text-xs text-white/40">COMBO x{{ combo }}</span>
      </div>
      <span class="font-orbitron text-xs text-solar-amber">BEST: {{ best }}</span>
    </div>

    <!-- Canvas -->
    <canvas ref="canvas" class="block mx-auto" :width="CW" :height="CH" style="margin-top:56px" />

    <!-- Question overlay -->
    <Transition name="question-slide">
      <div v-if="pendingQuestion" class="fixed inset-x-0 bottom-0 z-40 p-4">
        <div class="max-w-2xl mx-auto glass-card p-5 border-plasma-purple/30">
          <p class="font-orbitron text-xs text-plasma-purple mb-2">SELECT THE CORRECT ANSWER SHIP</p>
          <p class="font-space text-white text-sm leading-relaxed mb-4">{{ pendingQuestion.question }}</p>
          <div class="grid grid-cols-2 gap-2">
            <button v-for="(opt, i) in pendingOptions" :key="i"
                    class="p-3 rounded-xl border text-left text-xs font-space transition-all duration-200"
                    :class="'border-white/10 text-white/70 hover:border-plasma-purple/50 hover:bg-plasma-purple/10'"
                    @click="selectAnswer(i)">
              <span class="font-orbitron text-plasma-purple mr-2">{{ 'ABCD'[i] }}</span>{{ opt }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Start / Over overlay -->
    <Transition name="fade-center">
      <div v-if="state !== 'running'" class="fixed inset-0 z-40 flex items-center justify-center"
           style="background:rgba(5,8,22,0.88)">
        <div class="glass-card p-10 text-center max-w-sm w-full mx-4">
          <div class="text-6xl mb-4" :class="state === 'idle' ? 'animate-float' : ''">🚀</div>
          <h2 class="font-orbitron text-2xl font-bold text-plasma-purple mb-1">
            {{ state === 'idle' ? 'SPACE COMBAT QUIZ' : 'MISSION FAILED' }}
          </h2>
          <p v-if="state === 'idle'" class="text-white/50 font-space text-sm mb-6">
            Enemy ships carry questions.<br>Fly near them to engage.<br>Answer correctly to destroy them!
          </p>
          <div v-if="state === 'over'" class="mb-6">
            <p class="text-white/60 font-space">Score: <span class="text-plasma-purple font-bold">{{ score }}</span></p>
            <p class="text-white/40 font-space text-sm">Best: <span class="text-solar-amber">{{ best }}</span></p>
          </div>
          <button class="btn-neon btn-purple px-8 py-3 rounded-xl font-orbitron font-bold w-full"
                  @click="startGame">
            {{ state === 'idle' ? '🚀 LAUNCH' : '🔄 RETRY' }}
          </button>
        </div>
      </div>
    </Transition>

    <!-- Controls -->
    <div v-if="state === 'running'" class="fixed bottom-6 left-6 z-20 grid grid-cols-3 gap-1 md:hidden">
      <button @click="moveLeft"  class="glass p-3 rounded text-white/60 col-start-1">←</button>
      <button @click="moveRight" class="glass p-3 rounded text-white/60 col-start-3">→</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useLearnerStore } from '../stores/learner'
import { useAudioStore } from '../stores/audio'
import { type Question } from '../data/questions'
import { useQuestionPool } from '../composables/useQuestionPool'

const CW = Math.min(600, window.innerWidth)
const CH = window.innerHeight - 56

const canvas = ref<HTMLCanvasElement | null>(null)
const state = ref<'idle'|'running'|'over'>('idle')
const score = ref(0)
const lives = ref(3)
const combo = ref(1)
const maxLives = 3
const best = ref(Number(localStorage.getItem('gg_best_combat') || '0'))
const pendingQuestion = ref<Question | null>(null)
const pendingOptions = ref<string[]>([])
const pendingAnswer = ref(-1)

const learner = useLearnerStore()
const audioStore = useAudioStore()
const { pickShuffled } = useQuestionPool()

type Enemy = { x: number; y: number; w: number; h: number; q: Question; displayOptions: string[]; displayAnswer: number; hit: boolean; color: string }

let animId = 0
let player = { x: CW/2, y: CH - 80, w: 40, h: 50, vx: 0 }
let bullets: { x: number; y: number; active: boolean }[] = []
let enemies: Enemy[] = []
let bgStars: { x: number; y: number; speed: number; size: number }[] = []
let particles: { x: number; y: number; vx: number; vy: number; life: number; color: string }[] = []
let frameCount = 0
let usedQIds = new Set<string>()
let shotCooldown = 0
let pendingEnemy: Enemy | null = null

function startGame() {
  player = { x: CW/2, y: CH - 80, w: 40, h: 50, vx: 0 }
  bullets = []; enemies = []; particles = []
  usedQIds = new Set()
  bgStars = Array.from({ length: 150 }, () => ({
    x: Math.random() * CW, y: Math.random() * CH,
    speed: 0.5 + Math.random() * 2, size: 0.5 + Math.random() * 2
  }))
  score.value = 0; lives.value = 3; combo.value = 1
  frameCount = 0; shotCooldown = 0
  state.value = 'running'
  pendingQuestion.value = null
  pendingOptions.value = []; pendingAnswer.value = -1
  animate()
}

function spawnEnemy() {
  const { q, options, answer } = pickShuffled(usedQIds)
  usedQIds.add(q.id)
  const colors = ['#7B61FF', '#00F5FF', '#FF3366', '#FFB703']
  enemies.push({
    x: 60 + Math.random() * (CW - 120),
    y: -60,
    w: 48, h: 36,
    q, displayOptions: options, displayAnswer: answer,
    hit: false,
    color: colors[Math.floor(Math.random() * colors.length)]
  })
}

function shoot() {
  if (shotCooldown > 0 || pendingQuestion.value) return
  bullets.push({ x: player.x + player.w/2 - 3, y: player.y, active: true })
  shotCooldown = 8
  audioStore.playUI('click')
}

function moveLeft()  { player.x = Math.max(20, player.x - 30) }
function moveRight() { player.x = Math.min(CW - 60, player.x + 30) }

function selectAnswer(i: number) {
  if (!pendingQuestion.value || !pendingEnemy) return
  if (i === pendingAnswer.value) {
    score.value += 100 * combo.value
    combo.value++
    learner.addXP(pendingQuestion.value.xp || 100)
    learner.markQuestion(pendingQuestion.value.id)
    audioStore.playUI('success')
    spawnExplosion(pendingEnemy.x, pendingEnemy.y, pendingEnemy.color)
    enemies = enemies.filter(e => e !== pendingEnemy)
  } else {
    lives.value--
    combo.value = 1
    audioStore.playUI('error')
    if (lives.value <= 0) { endGame(); return }
  }
  pendingQuestion.value = null
  pendingOptions.value = []; pendingAnswer.value = -1
  pendingEnemy = null
}

function spawnExplosion(x: number, y: number, color: string) {
  for (let i = 0; i < 20; i++) {
    const angle = (i / 20) * Math.PI * 2
    const speed = 2 + Math.random() * 5
    particles.push({ x, y, vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed, life: 1, color })
  }
}

function animate() {
  const c = canvas.value?.getContext('2d')
  if (!c || state.value !== 'running') return
  animId = requestAnimationFrame(animate)
  frameCount++
  if (shotCooldown > 0) shotCooldown--

  c.fillStyle = '#050816'
  c.fillRect(0, 0, CW, CH)

  // Stars
  bgStars.forEach(s => {
    s.y += s.speed
    if (s.y > CH) { s.y = 0; s.x = Math.random() * CW }
    c.fillStyle = `rgba(234,251,255,${0.3 + s.speed * 0.2})`
    c.fillRect(s.x, s.y, s.size, s.size)
  })

  // Spawn enemies
  if (frameCount % 90 === 0) spawnEnemy()

  // Draw player ship
  const px = player.x, py = player.y
  c.shadowColor = '#7B61FF'; c.shadowBlur = 20
  c.fillStyle = '#7B61FF'
  c.beginPath()
  c.moveTo(px + player.w/2, py)
  c.lineTo(px, py + player.h)
  c.lineTo(px + player.w/2, py + player.h - 12)
  c.lineTo(px + player.w, py + player.h)
  c.closePath(); c.fill()
  // Cockpit
  c.fillStyle = '#00F5FF'
  c.beginPath(); c.arc(px + player.w/2, py + player.h*0.5, 6, 0, Math.PI*2); c.fill()
  // Engine glow
  c.fillStyle = '#FFB703'
  c.beginPath(); c.arc(px + player.w/2, py + player.h, 5, 0, Math.PI*2); c.fill()
  c.shadowBlur = 0

  // Bullets
  bullets = bullets.filter(b => {
    if (!b.active) return false
    b.y -= 14
    c.shadowColor = '#00F5FF'; c.shadowBlur = 12
    c.fillStyle = '#00F5FF'
    c.fillRect(b.x, b.y, 6, 14)
    c.shadowBlur = 0

    // Hit enemy
    for (const e of enemies) {
      if (b.x > e.x && b.x < e.x + e.w && b.y > e.y && b.y < e.y + e.h) {
        b.active = false
        pendingQuestion.value = e.q
        pendingOptions.value = e.displayOptions
        pendingAnswer.value = e.displayAnswer
        pendingEnemy = e
        return false
      }
    }
    return b.y > -20
  })

  // Enemies
  enemies = enemies.filter(e => {
    e.y += 1.2 + frameCount * 0.0008
    if (e.y > CH + 20) {
      // Enemy escaped
      lives.value--
      combo.value = 1
      if (lives.value <= 0) endGame()
      return false
    }

    // Draw enemy ship
    const ex = e.x, ey = e.y
    c.shadowColor = e.color; c.shadowBlur = 16
    c.fillStyle = e.color + 'CC'
    c.beginPath()
    c.moveTo(ex + e.w/2, ey + e.h)
    c.lineTo(ex, ey)
    c.lineTo(ex + e.w/2, ey + e.h - 10)
    c.lineTo(ex + e.w, ey)
    c.closePath(); c.fill()
    c.shadowBlur = 0

    // Question label
    const maxW = 160
    const label = e.q.question.length > 40 ? e.q.question.slice(0, 40) + '…' : e.q.question
    c.fillStyle = 'rgba(5,8,22,0.8)'
    const tw = Math.min(c.measureText(label).width + 16, maxW)
    c.fillRect(ex + e.w/2 - tw/2, ey - 30, tw, 22)
    c.fillStyle = '#EAFBFF'
    c.font = '9px Space Grotesk, sans-serif'
    c.textAlign = 'center'; c.textBaseline = 'middle'
    c.fillText(label, ex + e.w/2, ey - 19)
    c.textAlign = 'left'

    return true
  })

  // Particles
  particles = particles.filter(p => {
    p.x += p.vx; p.y += p.vy; p.vy += 0.08; p.life -= 0.035
    c.globalAlpha = p.life
    c.fillStyle = p.color; c.shadowColor = p.color; c.shadowBlur = 8
    c.beginPath(); c.arc(p.x, p.y, 3*p.life, 0, Math.PI*2); c.fill()
    c.globalAlpha = 1; c.shadowBlur = 0
    return p.life > 0
  })
}

function endGame() {
  cancelAnimationFrame(animId)
  state.value = 'over'
  pendingQuestion.value = null
  if (score.value > best.value) {
    best.value = score.value
    localStorage.setItem('gg_best_combat', String(score.value))
    learner.setHighScore('combat', score.value)
  }
  learner.addXP(Math.floor(score.value / 5))
}

const onKey = (e: KeyboardEvent) => {
  if (state.value !== 'running') return
  if (e.key === 'ArrowLeft'  || e.key === 'a') moveLeft()
  if (e.key === 'ArrowRight' || e.key === 'd') moveRight()
  if (e.key === ' ' || e.key === 'ArrowUp') { e.preventDefault(); shoot() }
}

onMounted  (() => window.addEventListener('keydown', onKey))
onUnmounted(() => { cancelAnimationFrame(animId); window.removeEventListener('keydown', onKey) })
</script>

<style scoped>
.fade-center-enter-active, .fade-center-leave-active { transition: all 0.4s ease; }
.fade-center-enter-from, .fade-center-leave-to { opacity: 0; transform: scale(0.95); }
.question-slide-enter-active { animation: slide-up 0.3s ease; }
.question-slide-leave-active { animation: slide-up 0.2s ease reverse; }
@keyframes slide-up { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
</style>
