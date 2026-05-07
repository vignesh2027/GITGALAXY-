<template>
  <div class="relative min-h-screen flex flex-col items-center justify-center bg-space-black overflow-hidden">
    <!-- Background grid -->
    <div class="fixed inset-0 pointer-events-none"
         style="background-image: linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px),
                                   linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px);
                background-size: 40px 40px;" />

    <!-- HUD -->
    <div class="fixed top-0 left-0 right-0 z-30 px-6 py-3 glass border-b border-github-green/10 flex items-center justify-between">
      <RouterLink to="/games" class="text-white/50 hover:text-white font-space text-sm transition-colors">← Back</RouterLink>
      <div class="flex items-center gap-6">
        <span class="font-orbitron text-sm font-bold text-github-green">{{ score }}</span>
        <span class="font-terminal text-xs text-white/40">LEN: {{ snakeLen }}</span>
        <span class="font-terminal text-xs text-solar-amber">Q: {{ questionsRight }}/{{ questionsTotal }}</span>
      </div>
      <span class="font-orbitron text-xs text-solar-amber">BEST: {{ best }}</span>
    </div>

    <!-- Canvas -->
    <canvas ref="canvas" :width="COLS * CELL" :height="ROWS * CELL"
            class="border border-github-green/20 rounded-lg"
            style="box-shadow: 0 0 40px rgba(57,255,20,0.15)" />

    <!-- Controls hint -->
    <div class="mt-4 flex gap-6 text-xs font-terminal text-white/25">
      <span>WASD / ARROWS</span>
      <span>P = Pause</span>
      <span>❓ = Quiz food!</span>
    </div>
    <div class="mt-2 grid grid-cols-3 gap-1 md:hidden">
      <button @click="dir='UP'"    class="col-start-2 glass p-3 rounded text-white/60 text-lg">↑</button>
      <button @click="dir='LEFT'"  class="glass p-3 rounded text-white/60 text-lg">←</button>
      <button @click="dir='DOWN'"  class="glass p-3 rounded text-white/60 text-lg">↓</button>
      <button @click="dir='RIGHT'" class="col-start-3 row-start-2 glass p-3 rounded text-white/60 text-lg">→</button>
    </div>

    <!-- Quiz Modal -->
    <Transition name="fade-center">
      <div v-if="quizActive && currentQ" class="fixed inset-0 z-50 flex items-center justify-center"
           style="background:rgba(3,6,9,0.93)">
        <div class="glass-card p-8 max-w-lg w-full mx-4 border border-plasma-purple/25">
          <div class="flex items-center justify-between mb-4">
            <span class="font-orbitron text-xs text-plasma-purple tracking-widest">🧠 QUIZ FOOD</span>
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

          <p class="font-space text-white/90 text-base mb-5 leading-relaxed">{{ currentQ.question }}</p>

          <div class="space-y-2">
            <button v-for="(opt, i) in displayOptions" :key="i"
                    class="w-full text-left px-4 py-3 rounded-xl border font-space text-sm transition-all duration-200"
                    :class="quizAnswered
                      ? i === displayAnswer
                        ? 'border-github-green/60 bg-github-green/10 text-github-green'
                        : i === quizSelected && i !== displayAnswer
                          ? 'border-red-500/60 bg-red-500/10 text-red-400'
                          : 'border-white/5 text-white/30'
                      : 'border-white/10 text-white/70 hover:border-plasma-purple/40 hover:bg-plasma-purple/5 hover:text-white'"
                    :disabled="quizAnswered"
                    @click="answerQuiz(i)">
              <span class="font-terminal text-plasma-purple/50 mr-2">{{ String.fromCharCode(65+i) }}.</span>{{ opt }}
            </button>
          </div>

          <Transition name="fade-center">
            <div v-if="quizAnswered" class="mt-4 p-3 rounded-xl"
                 :class="quizCorrect ? 'bg-github-green/10 border border-github-green/20' : 'bg-red-500/10 border border-red-500/20'">
              <p class="font-terminal text-sm mb-1" :class="quizCorrect ? 'text-github-green' : 'text-red-400'">
                {{ quizCorrect ? '✓ CORRECT! +' + currentQ?.xp + ' XP • GROW x3 + BONUS!' : '✗ WRONG! Snake shrinks!' }}
              </p>
              <p class="text-white/50 font-space text-xs">{{ currentQ.explanation }}</p>
              <button class="mt-3 w-full py-2 rounded-lg font-orbitron text-xs border transition-all"
                      :class="quizCorrect ? 'border-github-green/40 text-github-green hover:bg-github-green/10' : 'border-red-400/40 text-red-400 hover:bg-red-400/10'"
                      @click="resumeAfterQuiz">
                ▶ CONTINUE
              </button>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>

    <!-- Start / Game Over overlays -->
    <Transition name="fade-center">
      <div v-if="state !== 'running'" class="fixed inset-0 z-40 flex items-center justify-center"
           style="background:rgba(5,8,22,0.88)">
        <div class="glass-card p-10 text-center max-w-xs w-full mx-4">
          <div class="text-6xl mb-4" :class="state === 'idle' ? 'animate-float' : ''">🐍</div>

          <h2 class="font-orbitron text-2xl font-bold text-github-green mb-1">
            {{ state === 'idle' ? 'NEURAL SERPENT' : 'CORRUPTED!' }}
          </h2>

          <div v-if="state === 'over'" class="mb-5">
            <p class="text-white/60 font-space text-sm mb-1">Score: <span class="text-github-green font-bold">{{ score }}</span></p>
            <p class="text-white/40 font-space text-sm mb-1">Quiz: <span class="text-plasma-purple">{{ questionsRight }}/{{ questionsTotal }}</span></p>
            <p class="text-white/40 font-space text-sm">Best: <span class="text-solar-amber font-bold">{{ best }}</span></p>
          </div>

          <p v-if="state === 'idle'" class="text-white/50 font-space text-sm mb-2">
            Eat git commits. Answer quiz food. Avoid corruption.
          </p>
          <div v-if="state === 'idle'" class="space-y-2 mb-6">
            <div v-for="f in foodTypes" :key="f.label" class="flex items-center gap-3 text-left">
              <span class="text-lg w-6 text-center">{{ f.icon }}</span>
              <div>
                <p class="font-terminal text-xs" :style="{ color: f.color }">{{ f.label }}</p>
                <p class="text-white/30 text-xs">{{ f.desc }}</p>
              </div>
            </div>
          </div>

          <button class="btn-neon px-8 py-3 rounded-xl font-orbitron font-bold w-full"
                  style="border-color: rgba(57,255,20,0.5); color: #39FF14"
                  @click="startGame">
            {{ state === 'idle' ? '🐍 SLITHER' : '🔄 RETRY' }}
          </button>
          <RouterLink v-if="state === 'over'" to="/games"
              class="block mt-3 text-center text-white/40 hover:text-white font-space text-sm transition-colors">
            ← Games Menu
          </RouterLink>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useLearnerStore } from '../stores/learner'
import { useAudioStore } from '../stores/audio'
import { type Question } from '../data/questions'
import { useQuestionPool } from '../composables/useQuestionPool'

const COLS = 20, ROWS = 20, CELL = 28

const canvas = ref<HTMLCanvasElement | null>(null)
const state = ref<'idle'|'running'|'over'>('idle')
const score = ref(0)
const snakeLen = ref(3)
const best = ref(Number(localStorage.getItem('gg_best_snake') || '0'))
const dir = ref('RIGHT')
const questionsRight = ref(0)
const questionsTotal = ref(0)

// Quiz state — display options are shuffled so answer isn't always B
const quizActive = ref(false)
const currentQ = ref<Question | null>(null)
const displayOptions = ref<string[]>([])
const displayAnswer = ref(-1)
const quizAnswered = ref(false)
const quizSelected = ref(-1)
const quizCorrect = ref(false)

const learner = useLearnerStore()
const audioStore = useAudioStore()
const { pickShuffled } = useQuestionPool()

let snake: { x: number; y: number }[] = []
let food: { x: number; y: number; type: number } | null = null
let nextDir = 'RIGHT'
let gameInterval: ReturnType<typeof setInterval> | null = null
let particles: { x: number; y: number; vx: number; vy: number; life: number; color: string }[] = []
const usedQIds = new Set<string>()
let quizGrowPending = false
let quizShrinkPending = false

const foodTypes = [
  { icon: '💚', label: 'GIT COMMIT',  color: '#39FF14', desc: '+10 pts, grow',         xp: 10,  points: 10 },
  { icon: '🔵', label: 'CODE DIFF',   color: '#00F5FF', desc: '+20 pts, speed boost',  xp: 20,  points: 20 },
  { icon: '🟣', label: 'MERGE REQ',   color: '#7B61FF', desc: '+30 pts, bonus',        xp: 30,  points: 30 },
  { icon: '🟡', label: 'HOTFIX',      color: '#FFB703', desc: '+50 pts, rare!',        xp: 50,  points: 50 },
  { icon: '🔴', label: 'BUG CORRUPT', color: '#FF3366', desc: 'DANGER: shrink snake',  xp: -5,  points: -5 },
  { icon: '❓', label: 'QUIZ FOOD',   color: '#7B61FF', desc: 'Answer to grow x3!',    xp: 75,  points: 75 }
]

function pickQuestion() {
  const pool = allQuestions.filter(q => !usedQIds.has(q.id))
  if (pool.length === 0) { usedQIds.clear(); return allQuestions[Math.floor(Math.random() * allQuestions.length)] }
  return pool[Math.floor(Math.random() * pool.length)]
}

function randomPos() {
  return { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) }
}

function spawnFood() {
  const r = Math.random()
  const typeIdx = r < 0.08 ? 4 :   // bug
                  r < 0.15 ? 5 :   // quiz
                  r < 0.2  ? 3 :   // hotfix
                  r < 0.35 ? 2 :   // merge req
                  r < 0.55 ? 1 :   // diff
                  0                // commit
  let pos = randomPos()
  while (snake.some(s => s.x === pos.x && s.y === pos.y)) pos = randomPos()
  food = { ...pos, type: typeIdx }
}

function startGame() {
  snake = [{ x: 12, y: 10 }, { x: 11, y: 10 }, { x: 10, y: 10 }]
  snakeLen.value = 3; score.value = 0
  dir.value = 'RIGHT'; nextDir = 'RIGHT'
  particles = []; usedQIds.clear()
  questionsRight.value = 0; questionsTotal.value = 0
  quizActive.value = false; quizGrowPending = false; quizShrinkPending = false
  spawnFood()
  state.value = 'running'
  if (gameInterval) clearInterval(gameInterval)
  gameInterval = setInterval(tick, 150)
  draw()
}

function pauseForQuiz(foodX: number, foodY: number, color: string) {
  if (gameInterval) { clearInterval(gameInterval); gameInterval = null }
  spawnFoodParticles(foodX * CELL + CELL/2, foodY * CELL + CELL/2, color)
  const { q, options, answer } = pickShuffled(usedQIds)
  usedQIds.add(q.id)
  currentQ.value = q
  displayOptions.value = options
  displayAnswer.value = answer
  quizAnswered.value = false; quizSelected.value = -1; quizCorrect.value = false
  quizActive.value = true
}

function answerQuiz(i: number) {
  if (quizAnswered.value || !currentQ.value) return
  quizSelected.value = i
  quizAnswered.value = true
  quizCorrect.value = i === displayAnswer.value
  questionsTotal.value++
  if (quizCorrect.value) {
    learner.addXP(currentQ.value.xp)
    questionsRight.value++
    score.value += foodTypes[5].points
    quizGrowPending = true
    audioStore.playUI('xp')
  } else {
    quizShrinkPending = true
    audioStore.playUI('error')
  }
}

function resumeAfterQuiz() {
  quizActive.value = false
  spawnFood()
  gameInterval = setInterval(tick, Math.max(60, 150 - snake.length * 4))
  draw()
}

function tick() {
  if (state.value !== 'running') return
  dir.value = nextDir

  const head = { ...snake[0] }
  if (dir.value === 'RIGHT') head.x++
  else if (dir.value === 'LEFT') head.x--
  else if (dir.value === 'UP') head.y--
  else head.y++

  if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) { endGame(); return }
  if (snake.some(s => s.x === head.x && s.y === head.y)) { endGame(); return }

  snake.unshift(head)

  // Apply pending quiz effects
  if (quizGrowPending) {
    // Grow x3: keep head + 3 extra segments by NOT popping 3 more times
    snake.push({ ...snake[snake.length - 1] })
    snake.push({ ...snake[snake.length - 1] })
    snake.push({ ...snake[snake.length - 1] })
    snakeLen.value = snake.length
    quizGrowPending = false
  } else if (quizShrinkPending) {
    // Shrink: remove half the snake
    const removeCount = Math.max(1, Math.floor(snake.length / 2))
    for (let i = 0; i < removeCount; i++) { if (snake.length > 2) snake.pop() }
    snakeLen.value = snake.length
    quizShrinkPending = false
  }

  if (food && head.x === food.x && head.y === food.y) {
    const ft = foodTypes[food.type]
    if (food.type === 5) {
      // Quiz food — pause game
      const fx = food.x, fy = food.y, fc = ft.color
      food = null
      snake.pop() // don't grow yet — quiz outcome decides
      pauseForQuiz(fx, fy, fc)
      return
    } else if (food.type === 4) {
      // Bug
      if (snake.length > 2) snake.pop(); snake.pop()
      snakeLen.value = snake.length
      audioStore.playUI('error')
      score.value = Math.max(0, score.value + ft.points)
    } else {
      score.value += ft.points; snakeLen.value++
      learner.addXP(ft.xp); audioStore.playUI('xp')
      spawnFoodParticles(food.x * CELL + CELL/2, food.y * CELL + CELL/2, ft.color)
      clearInterval(gameInterval!)
      gameInterval = setInterval(tick, Math.max(60, 150 - snake.length * 4))
    }
    spawnFood()
  } else {
    snake.pop()
  }

  draw()
}

function spawnFoodParticles(x: number, y: number, color: string) {
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2
    particles.push({ x, y, vx: Math.cos(angle) * 3, vy: Math.sin(angle) * 3, life: 1, color })
  }
}

function draw() {
  const c = canvas.value?.getContext('2d')
  if (!c) return
  const W = COLS * CELL, H = ROWS * CELL

  c.fillStyle = '#050816'; c.fillRect(0, 0, W, H)

  // Grid
  c.strokeStyle = 'rgba(0,245,255,0.04)'; c.lineWidth = 1
  for (let x = 0; x <= COLS; x++) { c.beginPath(); c.moveTo(x*CELL, 0); c.lineTo(x*CELL, H); c.stroke() }
  for (let y = 0; y <= ROWS; y++) { c.beginPath(); c.moveTo(0, y*CELL); c.lineTo(W, y*CELL); c.stroke() }

  // Snake
  snake.forEach((seg, i) => {
    const t = i / snake.length
    const gx = seg.x * CELL, gy = seg.y * CELL
    c.shadowColor = '#39FF14'; c.shadowBlur = i === 0 ? 18 : 8
    c.fillStyle = i === 0 ? '#39FF14' : `rgba(57,255,20,${1 - t * 0.7})`
    c.beginPath(); c.roundRect(gx + 2, gy + 2, CELL - 4, CELL - 4, 4); c.fill()
    if (i === 0) {
      c.shadowBlur = 0; c.fillStyle = '#050816'
      c.beginPath(); c.arc(gx + 8, gy + 8, 3, 0, Math.PI*2); c.fill()
      c.beginPath(); c.arc(gx + CELL - 8, gy + 8, 3, 0, Math.PI*2); c.fill()
      c.fillStyle = '#ffffff'
      c.beginPath(); c.arc(gx + 8, gy + 8, 1.5, 0, Math.PI*2); c.fill()
      c.beginPath(); c.arc(gx + CELL - 8, gy + 8, 1.5, 0, Math.PI*2); c.fill()
    }
    c.shadowBlur = 0
  })

  // Food
  if (food) {
    const ft = foodTypes[food.type]
    const fx = food.x * CELL + CELL/2, fy = food.y * CELL + CELL/2
    const pulse = 0.8 + Math.sin(Date.now() * 0.006) * 0.2
    c.shadowColor = ft.color; c.shadowBlur = 15 * pulse
    if (food.type === 5) {
      // Quiz food — animated question mark with glow ring
      c.strokeStyle = ft.color; c.lineWidth = 1.5
      c.beginPath(); c.arc(fx, fy, CELL * 0.42, 0, Math.PI * 2); c.stroke()
      c.shadowBlur = 0
      c.font = `bold ${CELL * 0.65}px monospace`; c.textAlign = 'center'; c.textBaseline = 'middle'
      c.fillStyle = '#7B61FF'
      c.shadowColor = '#7B61FF'; c.shadowBlur = 12 * pulse
      c.fillText('?', fx, fy)
    } else {
      c.font = `${CELL * 0.75}px serif`; c.textAlign = 'center'; c.textBaseline = 'middle'
      c.fillText(ft.icon, fx, fy)
    }
    c.shadowBlur = 0
  }

  // Particles
  particles = particles.filter(p => {
    p.x += p.vx; p.y += p.vy; p.vx *= 0.92; p.vy *= 0.92; p.life -= 0.05
    c.globalAlpha = p.life; c.fillStyle = p.color; c.shadowColor = p.color; c.shadowBlur = 6
    c.beginPath(); c.arc(p.x, p.y, 3 * p.life, 0, Math.PI*2); c.fill()
    c.globalAlpha = 1; c.shadowBlur = 0
    return p.life > 0
  })

  c.fillStyle = 'rgba(57,255,20,0.6)'; c.font = 'bold 14px Orbitron, monospace'; c.textAlign = 'left'
  c.fillText(`SCORE: ${score.value}`, 10, H - 10)
}

function endGame() {
  if (gameInterval) { clearInterval(gameInterval); gameInterval = null }
  state.value = 'over'
  if (score.value > best.value) {
    best.value = score.value
    localStorage.setItem('gg_best_snake', String(score.value))
    learner.setHighScore('snake', score.value)
  }
  learner.addXP(Math.floor(score.value / 2))
}

const onKey = (e: KeyboardEvent) => {
  if (quizActive.value) return
  const map: Record<string, string> = {
    ArrowUp: 'UP', ArrowDown: 'DOWN', ArrowLeft: 'LEFT', ArrowRight: 'RIGHT',
    w: 'UP', s: 'DOWN', a: 'LEFT', d: 'RIGHT', W: 'UP', S: 'DOWN', A: 'LEFT', D: 'RIGHT'
  }
  const opposite: Record<string, string> = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' }
  const newDir = map[e.key]
  if (newDir && newDir !== opposite[dir.value]) nextDir = newDir
  if (e.key === 'p' || e.key === 'P') {
    if (state.value === 'running') { clearInterval(gameInterval!); state.value = 'over' }
  }
}

onMounted  (() => window.addEventListener('keydown', onKey))
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  if (gameInterval) clearInterval(gameInterval)
})
</script>

<style scoped>
.fade-center-enter-active, .fade-center-leave-active { transition: all 0.3s ease; }
.fade-center-enter-from, .fade-center-leave-to { opacity: 0; transform: scale(0.9); }
</style>
