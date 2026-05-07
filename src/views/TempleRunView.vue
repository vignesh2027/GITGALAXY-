<template>
  <div class="relative min-h-screen overflow-hidden bg-space-black">
    <!-- HUD -->
    <div class="fixed top-0 left-0 right-0 z-30 px-6 py-3 flex items-center justify-between glass border-b border-neon-cyan/10">
      <RouterLink to="/games" class="text-white/50 hover:text-white transition-colors font-space text-sm">← Back</RouterLink>
      <div class="flex items-center gap-6">
        <span class="font-orbitron text-sm font-bold text-neon-cyan">{{ score }}</span>
        <div class="flex gap-1">
          <span v-for="i in 3" :key="i" :class="i <= lives ? 'text-red-400' : 'text-white/20'">❤</span>
        </div>
        <span class="font-terminal text-xs text-white/40">x{{ combo }}</span>
        <span class="font-terminal text-xs text-solar-amber">Q: {{ questionsAnswered }}</span>
      </div>
      <span class="font-orbitron text-xs text-solar-amber">BEST: {{ bestScore }}</span>
    </div>

    <!-- Canvas -->
    <canvas ref="canvas" class="block w-full" :width="cw" :height="ch" @click="handleTap" />

    <!-- Quiz Modal -->
    <Transition name="fade-center">
      <div v-if="quizActive && currentQ" class="fixed inset-0 z-50 flex items-center justify-center"
           style="background:rgba(3,6,9,0.92)">
        <div class="glass-card p-8 max-w-lg w-full mx-4 border border-neon-cyan/20">
          <!-- Header -->
          <div class="flex items-center justify-between mb-4">
            <span class="font-orbitron text-xs text-neon-cyan tracking-widest">⚡ CHECKPOINT</span>
            <div class="flex items-center gap-2">
              <span class="font-terminal text-xs px-2 py-0.5 rounded"
                    :class="currentQ.difficulty === 1 ? 'text-github-green border border-github-green/30' :
                            currentQ.difficulty === 2 ? 'text-solar-amber border border-solar-amber/30' :
                            'text-plasma-purple border border-plasma-purple/30'">
                {{ currentQ.difficulty === 1 ? 'EASY' : currentQ.difficulty === 2 ? 'MED' : 'HARD' }}
              </span>
              <span class="font-terminal text-xs text-white/30">+{{ currentQ.xp }} XP</span>
            </div>
          </div>

          <!-- Question -->
          <p class="font-space text-white/90 text-base mb-5 leading-relaxed">{{ currentQ.question }}</p>

          <!-- Options -->
          <div class="space-y-2">
            <button v-for="(opt, i) in displayOptions" :key="i"
                    class="w-full text-left px-4 py-3 rounded-xl border font-space text-sm transition-all duration-200"
                    :class="quizAnswered
                      ? i === displayAnswer
                        ? 'border-github-green/60 bg-github-green/10 text-github-green'
                        : i === quizSelected && i !== displayAnswer
                          ? 'border-red-500/60 bg-red-500/10 text-red-400'
                          : 'border-white/5 text-white/30'
                      : 'border-white/10 text-white/70 hover:border-neon-cyan/40 hover:bg-neon-cyan/5 hover:text-white'"
                    :disabled="quizAnswered"
                    @click="answerQuiz(i)">
              <span class="font-terminal text-neon-cyan/50 mr-2">{{ String.fromCharCode(65+i) }}.</span>{{ opt }}
            </button>
          </div>

          <!-- Feedback -->
          <Transition name="fade-center">
            <div v-if="quizAnswered" class="mt-4 p-3 rounded-xl"
                 :class="quizCorrect ? 'bg-github-green/10 border border-github-green/20' : 'bg-red-500/10 border border-red-500/20'">
              <p class="font-terminal text-sm mb-1" :class="quizCorrect ? 'text-github-green' : 'text-red-400'">
                {{ quizCorrect ? '✓ CORRECT! +' + currentQ?.xp + ' XP • SPEED BOOST!' : '✗ WRONG! -1 LIFE' }}
              </p>
              <p class="text-white/50 font-space text-xs">{{ currentQ.explanation }}</p>
              <button class="mt-3 w-full py-2 rounded-lg font-orbitron text-xs border transition-all"
                      :class="quizCorrect ? 'border-github-green/40 text-github-green hover:bg-github-green/10' : 'border-red-400/40 text-red-400 hover:bg-red-400/10'"
                      @click="resumeAfterQuiz">
                {{ quizCorrect ? '▶ CONTINUE RUN' : '▶ KEEP GOING' }}
              </button>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>

    <!-- Game Over Overlay -->
    <Transition name="fade-center">
      <div v-if="state === 'over'" class="fixed inset-0 z-40 flex items-center justify-center"
           style="background:rgba(5,8,22,0.85)">
        <div class="glass-card p-10 text-center max-w-sm w-full mx-4 energy-border">
          <div class="text-6xl mb-4">💫</div>
          <h2 class="font-orbitron text-2xl font-bold gradient-text mb-2">GAME OVER</h2>
          <p class="font-space text-white/60 mb-1">Score: <span class="text-neon-cyan font-bold">{{ score }}</span></p>
          <p class="font-space text-white/40 mb-1 text-sm">Questions: <span class="text-solar-amber">{{ questionsAnswered }} correct</span></p>
          <p class="font-space text-white/60 mb-6">Best: <span class="text-solar-amber font-bold">{{ bestScore }}</span></p>
          <button class="btn-neon px-8 py-3 rounded-xl font-orbitron font-bold w-full mb-3" @click="restart">
            🔄 PLAY AGAIN
          </button>
          <RouterLink to="/games" class="text-white/40 hover:text-white font-space text-sm transition-colors">
            ← Game Menu
          </RouterLink>
        </div>
      </div>
    </Transition>

    <!-- Start Overlay -->
    <Transition name="fade-center">
      <div v-if="state === 'idle'" class="fixed inset-0 z-40 flex items-center justify-center"
           style="background:rgba(5,8,22,0.9)">
        <div class="glass-card p-10 text-center max-w-sm w-full mx-4">
          <div class="text-6xl mb-4 animate-float">🏃</div>
          <h2 class="font-orbitron text-2xl font-bold gradient-text mb-2">NEON TEMPLE RUN</h2>
          <p class="text-white/50 font-space text-sm mb-2">Jump over obstacles. Answer checkpoints to earn XP.</p>
          <p class="text-white/40 font-terminal text-xs mb-1">SPACE / TAP to jump · DOUBLE JUMP supported</p>
          <p class="text-white/30 font-terminal text-xs mb-6">⚡ Quiz checkpoints every 600 pts — correct = speed boost!</p>
          <button class="btn-neon px-8 py-3 rounded-xl font-orbitron font-bold w-full" @click="startGame">
            🚀 START RUN
          </button>
        </div>
      </div>
    </Transition>

    <!-- Touch hint -->
    <div v-if="state === 'running' && !quizActive"
         class="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 font-terminal text-white/20 text-xs pointer-events-none">
      TAP TO JUMP
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useLearnerStore } from '../stores/learner'
import { useAudioStore } from '../stores/audio'
import { type Question } from '../data/questions'
import { useQuestionPool } from '../composables/useQuestionPool'

const canvas = ref<HTMLCanvasElement | null>(null)
const state = ref<'idle' | 'running' | 'over'>('idle')
const score = ref(0)
const lives = ref(3)
const combo = ref(1)
const bestScore = ref(Number(localStorage.getItem('gg_best_temple') || '0'))
const questionsAnswered = ref(0)

// Quiz state — store shuffled display options separately from the raw question
const quizActive = ref(false)
const currentQ = ref<Question | null>(null)
const displayOptions = ref<string[]>([])
const displayAnswer = ref(-1)       // correct index AFTER shuffle
const quizAnswered = ref(false)
const quizSelected = ref(-1)
const quizCorrect = ref(false)

const learner = useLearnerStore()
const audioStore = useAudioStore()
const { pickShuffled } = useQuestionPool()

const cw = ref(window.innerWidth)
const ch = ref(window.innerHeight)

let animId = 0
let ctx: CanvasRenderingContext2D | null = null

let player = { x: 120, y: 0, vy: 0, jumps: 0, w: 32, h: 48, grounded: false }
let ground = 0
let obstacles: { x: number; w: number; h: number; color: string }[] = []
let particles: { x: number; y: number; vx: number; vy: number; life: number; color: string; s: number }[] = []
let bgOffset = 0
let speed = 5
let frameCount = 0
let obstacleTimer = 0
let glitchLines: { y: number; w: number; life: number }[] = []
let nextQuizAt = 600
let usedQIds = new Set<string>()

const COLORS = ['#00F5FF', '#7B61FF', '#39FF14', '#FFB703', '#FF3366']

function getCtx() {
  if (!canvas.value) return null
  if (!ctx) ctx = canvas.value.getContext('2d')
  return ctx
}

function triggerQuiz() {
  cancelAnimationFrame(animId)
  const { q, options, answer } = pickShuffled(usedQIds)
  usedQIds.add(q.id)
  currentQ.value = q
  displayOptions.value = options
  displayAnswer.value = answer
  quizAnswered.value = false
  quizSelected.value = -1
  quizCorrect.value = false
  quizActive.value = true
}

function answerQuiz(i: number) {
  if (quizAnswered.value || !currentQ.value) return
  quizSelected.value = i
  quizAnswered.value = true
  quizCorrect.value = i === displayAnswer.value
  if (quizCorrect.value) {
    learner.addXP(currentQ.value.xp)
    questionsAnswered.value++
    combo.value = Math.min(combo.value + 1, 8)
    audioStore.playUI('xp')
  } else {
    lives.value--
    combo.value = 1
    audioStore.playUI('error')
    if (lives.value <= 0) { quizActive.value = false; endGame(); return }
  }
}

function resumeAfterQuiz() {
  quizActive.value = false
  if (quizCorrect.value) speed = Math.min(speed + 1.5, 18)
  nextQuizAt = frameCount + 500 + Math.floor(Math.random() * 300)
  animate()
}

function startGame() {
  cw.value = window.innerWidth
  ch.value = window.innerHeight
  ground = ch.value - 100
  player = { x: 120, y: ground - 48, vy: 0, jumps: 0, w: 32, h: 48, grounded: true }
  obstacles = []; particles = []; glitchLines = []
  speed = 5; frameCount = 0; obstacleTimer = 0
  score.value = 0; lives.value = 3; combo.value = 1
  questionsAnswered.value = 0; nextQuizAt = 600
  usedQIds.clear()
  quizActive.value = false
  state.value = 'running'
  animate()
}

function jump() {
  if (state.value !== 'running' || quizActive.value) return
  if (player.jumps < 2) {
    player.vy = -18
    player.jumps++
    player.grounded = false
    audioStore.playUI('click')
    spawnJumpParticles()
  }
}

function handleTap() {
  if (state.value === 'running') jump()
}

function spawnJumpParticles() {
  for (let i = 0; i < 8; i++) {
    particles.push({
      x: player.x + player.w / 2, y: player.y + player.h,
      vx: (Math.random() - 0.5) * 4, vy: Math.random() * -3 - 1,
      life: 1, color: '#00F5FF', s: 3 + Math.random() * 3
    })
  }
}

function spawnExplosion(x: number, y: number, color: string) {
  for (let i = 0; i < 20; i++) {
    const angle = (i / 20) * Math.PI * 2
    const sp = 2 + Math.random() * 5
    particles.push({ x, y, vx: Math.cos(angle) * sp, vy: Math.sin(angle) * sp, life: 1, color, s: 2 + Math.random() * 4 })
  }
}

function spawnObstacle() {
  const h = 30 + Math.random() * 60
  obstacles.push({ x: cw.value + 20, w: 20 + Math.random() * 20, h, color: COLORS[Math.floor(Math.random() * COLORS.length)] })
}

function animate() {
  const c = getCtx()
  if (!c || state.value !== 'running' || quizActive.value) return
  animId = requestAnimationFrame(animate)
  frameCount++

  // Quiz checkpoint
  if (frameCount >= nextQuizAt) { triggerQuiz(); return }

  c.fillStyle = 'rgba(5,8,22,0.4)'
  c.fillRect(0, 0, cw.value, ch.value)

  // Scrolling grid
  bgOffset = (bgOffset + speed * 0.5) % 80
  c.strokeStyle = 'rgba(0,245,255,0.06)'
  c.lineWidth = 1
  for (let x = -bgOffset; x < cw.value; x += 80) {
    c.beginPath(); c.moveTo(x, 0); c.lineTo(x + cw.value * 0.3, ch.value); c.stroke()
  }

  // Ground
  const gradient = c.createLinearGradient(0, ground, cw.value, ground)
  gradient.addColorStop(0, '#00F5FF'); gradient.addColorStop(0.5, '#7B61FF'); gradient.addColorStop(1, '#39FF14')
  c.strokeStyle = gradient; c.lineWidth = 2
  c.shadowColor = '#00F5FF'; c.shadowBlur = 15
  c.beginPath(); c.moveTo(0, ground); c.lineTo(cw.value, ground); c.stroke()
  c.shadowBlur = 0

  // Gravity
  player.vy += 0.9
  player.y += player.vy
  if (player.y >= ground - player.h) {
    player.y = ground - player.h; player.vy = 0; player.jumps = 0; player.grounded = true
  }

  // Obstacles
  const minInterval = Math.max(40, 90 - Math.floor(speed * 5))
  obstacleTimer++
  if (obstacleTimer > minInterval + Math.random() * 40) { spawnObstacle(); obstacleTimer = 0 }

  obstacles = obstacles.filter(o => {
    o.x -= speed
    if (player.x + player.w - 6 > o.x && player.x + 6 < o.x + o.w && player.y + player.h - 4 > ground - o.h) {
      lives.value--
      spawnExplosion(player.x + player.w / 2, player.y + player.h / 2, '#FF3366')
      combo.value = 1
      audioStore.playUI('error')
      if (lives.value <= 0) { endGame(); return false }
      obstacles = []; return false
    }
    const g2 = c.createLinearGradient(o.x, ground - o.h, o.x, ground)
    g2.addColorStop(0, o.color); g2.addColorStop(1, o.color + '40')
    c.fillStyle = g2; c.shadowColor = o.color; c.shadowBlur = 12
    c.fillRect(o.x, ground - o.h, o.w, o.h)
    c.shadowBlur = 0; c.fillStyle = o.color; c.fillRect(o.x, ground - o.h, o.w, 2)
    return o.x > -o.w
  })

  // Player
  const px = player.x, py = player.y
  c.shadowColor = '#00F5FF'; c.shadowBlur = 20
  c.fillStyle = '#050816'; c.strokeStyle = '#00F5FF'; c.lineWidth = 2
  c.beginPath(); c.roundRect(px, py, player.w, player.h, 6); c.fill(); c.stroke()
  c.fillStyle = '#00F5FF'
  c.fillRect(px + 8, py + 8, 4, 4); c.fillRect(px + 20, py + 8, 4, 4)
  if (!player.grounded) {
    c.strokeStyle = '#00F5FF40'; c.lineWidth = 1
    for (let i = 0; i < 3; i++) {
      c.beginPath(); c.moveTo(px - 10, py + 10 + i * 14); c.lineTo(px - 30 - Math.random() * 20, py + 10 + i * 14); c.stroke()
    }
  }
  c.shadowBlur = 0

  // Quiz checkpoint indicator
  const qProgress = (frameCount / nextQuizAt)
  const barW = 160, barH = 4, barX = cw.value / 2 - barW / 2, barY = ch.value - 30
  c.fillStyle = 'rgba(255,255,255,0.06)'; c.fillRect(barX, barY, barW, barH)
  c.fillStyle = '#FFB703'; c.shadowColor = '#FFB703'; c.shadowBlur = 6
  c.fillRect(barX, barY, barW * Math.min(qProgress, 1), barH)
  c.shadowBlur = 0
  c.fillStyle = 'rgba(255,183,3,0.5)'; c.font = '9px Orbitron,monospace'; c.textAlign = 'center'
  c.fillText('⚡ CHECKPOINT', cw.value / 2, barY - 4)

  // Particles
  particles = particles.filter(p => {
    p.x += p.vx; p.y += p.vy; p.vy += 0.1; p.life -= 0.04
    c.globalAlpha = p.life; c.fillStyle = p.color; c.shadowColor = p.color; c.shadowBlur = 8
    c.beginPath(); c.arc(p.x, p.y, p.s * p.life, 0, Math.PI * 2); c.fill()
    c.globalAlpha = 1; c.shadowBlur = 0
    return p.life > 0
  })

  // Glitch
  if (Math.random() < 0.02) glitchLines.push({ y: Math.random() * ch.value, w: 50 + Math.random() * 200, life: 1 })
  glitchLines = glitchLines.filter(g => {
    c.fillStyle = `rgba(0,245,255,${g.life * 0.3})`; c.fillRect(Math.random() * cw.value, g.y, g.w, 1)
    g.life -= 0.1; return g.life > 0
  })

  speed = 5 + frameCount * 0.002
  score.value = Math.floor(frameCount * combo.value * 0.5)
}

function endGame() {
  cancelAnimationFrame(animId)
  state.value = 'over'
  if (score.value > bestScore.value) {
    bestScore.value = score.value
    localStorage.setItem('gg_best_temple', String(score.value))
    learner.setHighScore('temple', score.value)
  }
  const xpEarned = Math.floor(score.value / 10)
  if (xpEarned > 0) learner.addXP(xpEarned)
}

function restart() { startGame() }

const onKey = (e: KeyboardEvent) => {
  if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); jump() }
  if (e.code === 'Enter' && state.value === 'idle') startGame()
}
const onResize = () => { cw.value = window.innerWidth; ch.value = window.innerHeight }

onMounted(() => { window.addEventListener('keydown', onKey); window.addEventListener('resize', onResize) })
onUnmounted(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
.fade-center-enter-active, .fade-center-leave-active { transition: all 0.3s ease; }
.fade-center-enter-from, .fade-center-leave-to { opacity: 0; transform: scale(0.95); }
</style>
