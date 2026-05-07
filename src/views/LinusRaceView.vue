<template>
  <div class="relative min-h-screen overflow-hidden" style="background:#030609">

    <!-- HUD -->
    <div class="fixed top-0 left-0 right-0 z-30 px-5 py-3 flex items-center justify-between"
         style="background:rgba(3,6,9,0.88);backdrop-filter:blur(16px);border-bottom:1px solid rgba(255,255,255,0.06)">
      <RouterLink to="/games" class="text-white/50 hover:text-white font-space text-sm transition-colors">← Games</RouterLink>
      <div class="flex items-center gap-5">
        <span class="font-orbitron text-xs text-solar-amber">{{ Math.floor(speed * 10) }} km/h</span>
        <span class="font-orbitron text-sm font-bold text-neon-cyan">{{ score }} pts</span>
        <div class="flex gap-1">
          <span v-for="i in maxLives" :key="i" class="text-sm"
                :class="i <= lives ? 'opacity-100' : 'opacity-20'">❤️</span>
        </div>
      </div>
      <span class="font-orbitron text-xs text-github-green">BEST: {{ best }}</span>
    </div>

    <!-- Canvas -->
    <canvas ref="canvas" class="block" :width="CW" :height="CH" style="margin-top:52px" />

    <!-- Quiz overlay -->
    <Transition name="quiz-pop">
      <div v-if="quizActive" class="fixed inset-x-0 top-1/2 -translate-y-1/2 z-40 px-4">
        <div class="max-w-lg mx-auto p-6 rounded-2xl border border-github-green/30"
             style="background:rgba(3,8,3,0.97);backdrop-filter:blur(24px)">
          <div class="flex items-center gap-3 mb-3">
            <span class="text-2xl">🐧</span>
            <div>
              <p class="font-orbitron text-xs text-github-green">LINUS ASKS — ANSWER TO BOOST!</p>
              <p class="font-terminal text-xs text-white/40">Correct = +speed +XP | Wrong = lose speed</p>
            </div>
          </div>
          <p class="font-space text-white text-sm leading-relaxed mb-4">{{ quizQ?.question }}</p>
          <div class="grid grid-cols-1 gap-2">
            <button v-for="(opt, i) in quizOptions" :key="i"
                    class="px-4 py-2.5 rounded-xl border text-sm font-space text-left transition-all"
                    :class="quizAnswered
                      ? i === quizAnswer ? 'border-github-green/60 bg-github-green/12 text-github-green'
                        : i === quizSelected ? 'border-red-400/50 bg-red-500/10 text-red-400'
                        : 'border-white/8 text-white/30'
                      : 'border-white/15 text-white/70 hover:border-github-green/40 hover:bg-github-green/8'"
                    :disabled="quizAnswered"
                    @click="answerQuiz(i)">
              <span class="font-orbitron text-xs mr-2"
                    :class="quizAnswered && i === quizAnswer ? 'text-github-green' : 'text-white/30'">
                {{ 'ABCD'[i] }}.
              </span>{{ opt }}
            </button>
          </div>
          <p v-if="quizAnswered" class="mt-3 text-xs font-space text-white/50 leading-relaxed">
            {{ quizCorrect ? '⚡ Speed boost activated!' : '💥 Speed reduced. Keep going!' }}
            <span v-if="quizQ?.explanation" class="block mt-1 text-white/35">{{ quizQ.explanation }}</span>
          </p>
        </div>
      </div>
    </Transition>

    <!-- Start / Game Over -->
    <Transition name="fade-center">
      <div v-if="state !== 'running'" class="fixed inset-0 z-40 flex items-center justify-center"
           style="background:rgba(3,6,9,0.92)">
        <div class="text-center max-w-sm w-full mx-4 p-10 rounded-2xl border border-white/10"
             style="background:rgba(5,10,5,0.95)">
          <div class="text-6xl mb-4 animate-bounce">🐧</div>
          <h2 class="font-orbitron text-2xl font-bold text-github-green mb-1">
            {{ state === 'idle' ? 'LINUS RACE' : 'WIPED OUT!' }}
          </h2>
          <p v-if="state === 'idle'" class="text-white/50 font-space text-sm mb-2">
            Race through the open-source highway!<br>
            Dodge obstacles. Answer questions to boost speed.<br>
            How far can you ride?
          </p>
          <div v-if="state === 'idle'" class="mb-6 space-y-1.5 text-xs font-terminal text-white/35">
            <p>← → or A / D keys to steer</p>
            <p>Questions pop up every few seconds</p>
            <p>Correct answers = speed burst + XP</p>
          </div>
          <div v-if="state === 'over'" class="mb-6">
            <p class="text-white/60 font-space">Distance: <span class="text-github-green font-bold">{{ Math.floor(distance) }}m</span></p>
            <p class="text-white/50 font-space text-sm">Score: <span class="text-neon-cyan font-bold">{{ score }}</span></p>
            <p class="text-white/40 font-space text-sm">Best: <span class="text-solar-amber font-bold">{{ best }}</span></p>
          </div>
          <button class="w-full py-3 px-8 rounded-xl font-orbitron font-bold text-sm transition-all"
                  style="border:1px solid rgba(57,255,20,0.5);color:#39FF14;background:rgba(57,255,20,0.06)"
                  @click="startGame">
            {{ state === 'idle' ? '🐧 START RIDING' : '🔄 TRY AGAIN' }}
          </button>
        </div>
      </div>
    </Transition>

    <!-- Mobile controls -->
    <div v-if="state === 'running' && !quizActive" class="fixed bottom-6 left-0 right-0 z-20 flex justify-center gap-8 md:hidden">
      <button @touchstart.prevent="keys.left = true" @touchend.prevent="keys.left = false"
              class="w-16 h-16 rounded-full text-2xl flex items-center justify-center"
              style="background:rgba(57,255,20,0.1);border:1px solid rgba(57,255,20,0.3)">←</button>
      <button @touchstart.prevent="keys.right = true" @touchend.prevent="keys.right = false"
              class="w-16 h-16 rounded-full text-2xl flex items-center justify-center"
              style="background:rgba(57,255,20,0.1);border:1px solid rgba(57,255,20,0.3)">→</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useLearnerStore } from '../stores/learner'
import { useQuestionPool } from '../composables/useQuestionPool'
import { type Question } from '../data/questions'

const CW = Math.min(480, window.innerWidth)
const CH = window.innerHeight - 52

const canvas = ref<HTMLCanvasElement | null>(null)
const state = ref<'idle' | 'running' | 'over'>('idle')
const score = ref(0)
const lives = ref(3)
const maxLives = 3
const best = ref(Number(localStorage.getItem('gg_best_linus') || '0'))
const distance = ref(0)
const speed = ref(0)

const quizActive = ref(false)
const quizQ = ref<Question | null>(null)
const quizOptions = ref<string[]>([])
const quizAnswer = ref(-1)
const quizSelected = ref(-1)
const quizAnswered = ref(false)
const quizCorrect = ref(false)

const learner = useLearnerStore()
const { pickShuffled } = useQuestionPool()

const keys = { left: false, right: false }
let usedQIds = new Set<string>()
let animId = 0
let quizTimer = 0
let resumeTimer: ReturnType<typeof setTimeout> | null = null

// Road & world state
let rider = { x: CW / 2, y: CH - 100, w: 28, h: 44, lean: 0 }
let roadOffset = 0
let laneLines: number[] = []
let obstacles: { x: number; y: number; w: number; h: number; type: string; speed: number }[] = []
let boostParticles: { x: number; y: number; vy: number; life: number; color: string }[] = []
let bgTrees: { x: number; y: number; size: number; side: 'L' | 'R' }[] = []
let frameCount = 0
let lastObstacleFrame = 0

const ROAD_LEFT = CW * 0.12
const ROAD_RIGHT = CW * 0.88
const ROAD_W = ROAD_RIGHT - ROAD_LEFT

function startGame() {
  rider = { x: CW / 2, y: CH - 100, w: 28, h: 44, lean: 0 }
  obstacles = []; boostParticles = []; usedQIds = new Set()
  laneLines = [0, CH / 4, CH / 2, (3 * CH) / 4, CH]
  bgTrees = Array.from({ length: 12 }, (_, i) => ({
    x: i % 2 === 0 ? ROAD_LEFT * 0.5 : ROAD_RIGHT + (CW - ROAD_RIGHT) * 0.5,
    y: (i / 12) * CH,
    size: 20 + Math.random() * 20,
    side: i % 2 === 0 ? 'L' : 'R'
  }))
  score.value = 0; lives.value = 3; distance.value = 0; speed.value = 1.5
  frameCount = 0; lastObstacleFrame = 0; quizTimer = 0
  quizActive.value = false; quizQ.value = null
  state.value = 'running'
  animate()
}

function spawnObstacle() {
  const types = ['rock', 'cone', 'bug', 'merge_conflict']
  const type = types[Math.floor(Math.random() * types.length)]
  const lane = ROAD_LEFT + Math.random() * (ROAD_W - 36)
  obstacles.push({ x: lane, y: -40, w: 32, h: 32, type, speed: speed.value * 0.7 })
}

function triggerQuiz() {
  if (quizActive.value) return
  const { q, options, answer } = pickShuffled(usedQIds)
  usedQIds.add(q.id)
  quizQ.value = q
  quizOptions.value = options
  quizAnswer.value = answer
  quizSelected.value = -1
  quizAnswered.value = false
  quizCorrect.value = false
  quizActive.value = true
}

function answerQuiz(i: number) {
  if (quizAnswered.value) return
  quizSelected.value = i
  quizAnswered.value = true
  if (i === quizAnswer.value) {
    quizCorrect.value = true
    speed.value = Math.min(speed.value + 0.8, 8)
    score.value += 200
    learner.addXP(quizQ.value?.xp || 100)
    learner.markQuestion(quizQ.value?.id || '')
    for (let p = 0; p < 12; p++) {
      boostParticles.push({ x: rider.x, y: rider.y, vy: -3 - Math.random() * 4, life: 1, color: '#39FF14' })
    }
  } else {
    quizCorrect.value = false
    speed.value = Math.max(1, speed.value - 0.6)
    lives.value--
    if (lives.value <= 0) { quizActive.value = false; endGame(); return }
  }
  resumeTimer = setTimeout(() => { quizActive.value = false }, 2000)
}

function animate() {
  const c = canvas.value?.getContext('2d')
  if (!c || state.value !== 'running') return
  animId = requestAnimationFrame(animate)
  if (quizActive.value) { drawStatic(c); return }

  frameCount++
  distance.value += speed.value * 0.05
  score.value += Math.floor(speed.value * 0.3)
  speed.value = Math.min(speed.value + 0.0015, 9)
  quizTimer++

  // Steer rider
  const steerAmt = 3.5 + speed.value * 0.3
  if (keys.left && rider.x > ROAD_LEFT + 10) { rider.x -= steerAmt; rider.lean = -0.35 }
  else if (keys.right && rider.x < ROAD_RIGHT - rider.w - 10) { rider.x += steerAmt; rider.lean = 0.35 }
  else rider.lean *= 0.8

  // Road scroll
  roadOffset = (roadOffset + speed.value * 4) % (CH / 4)
  laneLines = laneLines.map(y => { y += speed.value * 4; return y > CH ? y - CH : y })

  // Trees scroll
  bgTrees.forEach(t => {
    t.y += speed.value * 3
    if (t.y > CH + 40) t.y = -40
  })

  // Spawn obstacles
  if (frameCount - lastObstacleFrame > Math.max(40, 100 - frameCount * 0.05)) {
    spawnObstacle(); lastObstacleFrame = frameCount
  }

  // Obstacle movement + collision
  obstacles = obstacles.filter(o => {
    o.y += (speed.value + o.speed) * 1.5
    if (o.y > CH + 50) return false
    // Hit check
    if (
      rider.x < o.x + o.w && rider.x + rider.w > o.x &&
      rider.y < o.y + o.h && rider.y + rider.h > o.y
    ) {
      lives.value--
      speed.value = Math.max(1, speed.value - 1)
      for (let p = 0; p < 8; p++)
        boostParticles.push({ x: rider.x, y: rider.y, vy: -2 - Math.random() * 3, life: 1, color: '#FF3366' })
      if (lives.value <= 0) { endGame(); return false }
      return false
    }
    return true
  })

  // Quiz trigger
  if (quizTimer > 180 + Math.random() * 120) { quizTimer = 0; triggerQuiz() }

  // Boost particles
  boostParticles = boostParticles.filter(p => {
    p.y += p.vy; p.life -= 0.05
    return p.life > 0
  })

  drawFrame(c)
}

function drawStatic(c: CanvasRenderingContext2D) {
  drawFrame(c)
}

function drawFrame(c: CanvasRenderingContext2D) {
  // Sky
  const sky = c.createLinearGradient(0, 0, 0, CH * 0.55)
  sky.addColorStop(0, '#020810')
  sky.addColorStop(1, '#0a1a08')
  c.fillStyle = sky; c.fillRect(0, 0, CW, CH)

  // Ground
  c.fillStyle = '#0d1a0a'; c.fillRect(0, CH * 0.45, CW, CH * 0.55)

  // Side grass
  c.fillStyle = '#0d1f08'
  c.fillRect(0, CH * 0.3, ROAD_LEFT, CH)
  c.fillRect(ROAD_RIGHT, CH * 0.3, CW - ROAD_RIGHT, CH)

  // Trees
  bgTrees.forEach(t => {
    c.fillStyle = '#0a3010'
    c.beginPath(); c.arc(t.x, t.y, t.size, 0, Math.PI * 2); c.fill()
    c.fillStyle = '#051808'
    c.fillRect(t.x - 4, t.y, 8, t.size * 1.2)
  })

  // Road surface
  c.fillStyle = '#1a1a1e'
  c.beginPath()
  c.moveTo(ROAD_LEFT, 0); c.lineTo(ROAD_RIGHT, 0)
  c.lineTo(ROAD_RIGHT, CH); c.lineTo(ROAD_LEFT, CH)
  c.closePath(); c.fill()

  // Road edges
  c.strokeStyle = '#FFB70360'; c.lineWidth = 4
  c.beginPath(); c.moveTo(ROAD_LEFT, 0); c.lineTo(ROAD_LEFT, CH); c.stroke()
  c.beginPath(); c.moveTo(ROAD_RIGHT, 0); c.lineTo(ROAD_RIGHT, CH); c.stroke()

  // Lane dashes
  const laneX = CW / 2
  c.strokeStyle = 'rgba(255,255,255,0.15)'; c.lineWidth = 2
  c.setLineDash([30, 30])
  laneLines.forEach(y => {
    c.beginPath(); c.moveTo(laneX, y - 20); c.lineTo(laneX, y + 20); c.stroke()
  })
  c.setLineDash([])

  // Obstacles
  obstacles.forEach(o => {
    c.save(); c.translate(o.x + o.w / 2, o.y + o.h / 2)
    if (o.type === 'rock') {
      c.fillStyle = '#555'; c.shadowColor = '#888'; c.shadowBlur = 6
      c.beginPath(); c.arc(0, 0, o.w / 2, 0, Math.PI * 2); c.fill()
    } else if (o.type === 'cone') {
      c.fillStyle = '#FF5500'; c.shadowColor = '#FF8800'; c.shadowBlur = 8
      c.beginPath(); c.moveTo(0, -o.h / 2); c.lineTo(-o.w / 2, o.h / 2); c.lineTo(o.w / 2, o.h / 2); c.closePath(); c.fill()
    } else if (o.type === 'bug') {
      c.fillStyle = '#FF3366'; c.shadowColor = '#FF3366'; c.shadowBlur = 10
      c.font = `${o.w}px serif`; c.textAlign = 'center'; c.textBaseline = 'middle'
      c.fillText('🐛', 0, 0)
    } else {
      c.fillStyle = '#7B61FF'; c.shadowColor = '#7B61FF'; c.shadowBlur = 10
      c.font = `${o.w * 0.7}px serif`; c.textAlign = 'center'; c.textBaseline = 'middle'
      c.fillText('⚡', 0, 0)
    }
    c.shadowBlur = 0; c.restore()
  })

  // Rider (Linus on bike)
  const rx = rider.x + rider.w / 2, ry = rider.y + rider.h / 2
  c.save(); c.translate(rx, ry); c.rotate(rider.lean)

  // Bike wheels
  c.strokeStyle = '#39FF14'; c.lineWidth = 3; c.shadowColor = '#39FF14'; c.shadowBlur = 8
  c.beginPath(); c.arc(0, 12, 10, 0, Math.PI * 2); c.stroke()
  c.beginPath(); c.arc(0, -12, 10, 0, Math.PI * 2); c.stroke()
  // Frame
  c.beginPath(); c.moveTo(0, -12); c.lineTo(0, 12); c.stroke()
  c.beginPath(); c.moveTo(0, -2); c.lineTo(-8, 4); c.stroke()
  // Linus body
  c.shadowBlur = 0
  c.fillStyle = '#222'; c.fillRect(-8, -20, 16, 18)
  c.fillStyle = '#39FF14'; c.fillRect(-6, -20, 12, 4)
  // Head
  c.fillStyle = '#F5D5A0'; c.beginPath(); c.arc(0, -26, 8, 0, Math.PI * 2); c.fill()
  // Beard
  c.fillStyle = '#8B6914'; c.fillRect(-6, -22, 12, 5)
  // Linux penguin on shirt
  c.fillStyle = '#fff'; c.font = '8px serif'; c.textAlign = 'center'
  c.fillText('🐧', 0, -12)

  c.shadowBlur = 0; c.restore()

  // Boost particles
  boostParticles.forEach(p => {
    c.globalAlpha = p.life
    c.fillStyle = p.color; c.shadowColor = p.color; c.shadowBlur = 6
    c.beginPath(); c.arc(p.x + rider.w / 2, p.y, 3 * p.life, 0, Math.PI * 2); c.fill()
  })
  c.globalAlpha = 1; c.shadowBlur = 0

  // Speed-o-meter bar
  const sBarW = 80, sBarH = 6
  const sBarX = CW / 2 - sBarW / 2, sBarY = CH - 20
  c.fillStyle = 'rgba(255,255,255,0.08)'; c.fillRect(sBarX, sBarY, sBarW, sBarH)
  const pct = (speed.value - 1) / 8
  const sGrad = c.createLinearGradient(sBarX, 0, sBarX + sBarW, 0)
  sGrad.addColorStop(0, '#39FF14'); sGrad.addColorStop(1, '#FFB703')
  c.fillStyle = sGrad; c.fillRect(sBarX, sBarY, sBarW * pct, sBarH)
}

function endGame() {
  cancelAnimationFrame(animId)
  state.value = 'over'
  if (score.value > best.value) {
    best.value = score.value
    localStorage.setItem('gg_best_linus', String(score.value))
    learner.setHighScore('linus', score.value)
  }
  learner.addXP(Math.floor(score.value / 8))
}

const onKey = (e: KeyboardEvent) => {
  const down = e.type === 'keydown'
  if (e.key === 'ArrowLeft'  || e.key === 'a') keys.left  = down
  if (e.key === 'ArrowRight' || e.key === 'd') keys.right = down
}

onMounted(() => {
  window.addEventListener('keydown', onKey)
  window.addEventListener('keyup', onKey)
})
onUnmounted(() => {
  cancelAnimationFrame(animId)
  if (resumeTimer) clearTimeout(resumeTimer)
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('keyup', onKey)
})
</script>

<style scoped>
.fade-center-enter-active, .fade-center-leave-active { transition: all 0.4s ease; }
.fade-center-enter-from, .fade-center-leave-to { opacity: 0; transform: scale(0.95); }
.quiz-pop-enter-active { animation: quiz-pop-in 0.3s cubic-bezier(0.34,1.56,0.64,1); }
.quiz-pop-leave-active { animation: quiz-pop-in 0.2s ease reverse; }
@keyframes quiz-pop-in { from { opacity:0; transform: translateY(-20px) scale(0.95); } to { opacity:1; transform: none; } }
</style>
