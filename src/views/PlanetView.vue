<template>
  <div class="relative min-h-screen overflow-hidden" v-if="planet">
    <!-- Atmospheric background -->
    <div class="fixed inset-0 z-0"
         :style="{ background: `radial-gradient(ellipse at 50% -20%, ${planet.color}25 0%, #050816 60%)` }" />
    <SubtleBackground />

    <div class="relative z-10 pt-20 pb-20 px-6 max-w-6xl mx-auto">
      <!-- Planet hero -->
      <div class="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div class="relative flex-shrink-0">
          <div class="w-32 h-32 rounded-full flex items-center justify-center text-6xl
                      border-4 animate-pulse-neon"
               :style="{
                 borderColor: planet.color + '60',
                 background: `radial-gradient(circle, ${planet.color}30, transparent)`,
                 boxShadow: `0 0 40px ${planet.color}50`
               }">
            {{ planet.icon }}
          </div>
          <div class="absolute inset-[-16px] rounded-full border opacity-25 animate-spin-slow"
               :style="{ borderColor: planet.color }" />
        </div>
        <div>
          <p class="font-terminal text-xs tracking-widest mb-1 animate-pulse-neon"
             :style="{ color: planet.color }">── PLANET DISCOVERED ──</p>
          <h1 class="font-orbitron text-4xl font-black text-white mb-2">{{ planet.name }}</h1>
          <p class="font-terminal text-sm mb-3" :style="{ color: planet.color }">{{ planet.subtitle }}</p>
          <p class="text-white/60 font-space text-sm leading-relaxed max-w-lg">{{ planet.description }}</p>
          <div class="mt-4 flex flex-wrap gap-3">
            <span class="glass px-3 py-1 rounded-full text-xs font-terminal text-white/50">
              ☁️ {{ planet.atmosphere }}
            </span>
            <span class="glass px-3 py-1 rounded-full text-xs font-terminal"
                  :style="{ color: planet.color }">
              🎯 {{ planet.missions.length }} Missions
            </span>
          </div>
        </div>
      </div>

      <!-- Tab nav -->
      <div class="flex gap-2 mb-8 border-b border-white/10 pb-3">
        <button v-for="tab in tabs" :key="tab"
                class="px-4 py-2 rounded-t-lg text-sm font-space font-medium transition-all duration-200"
                :class="activeTab === tab
                  ? 'text-white border-b-2'
                  : 'text-white/40 hover:text-white/70'"
                :style="activeTab === tab ? { borderColor: planet.color } : {}"
                @click="activeTab = tab; audio.click()">
          {{ tab }}
        </button>
      </div>

      <!-- MISSIONS TAB -->
      <div v-if="activeTab === 'MISSIONS'" class="space-y-4">
        <div v-for="(m, i) in planet.missions" :key="m.id"
             class="glass-card p-5 flex items-center gap-5 hover:border-white/20 transition-all duration-300">
          <div class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-orbitron font-bold flex-shrink-0"
               :style="{
                 background: learner.completedQuestions.has(m.id) ? `${planet.color}30` : 'rgba(255,255,255,0.05)',
                 borderColor: planet.color,
                 border: `1px solid ${planet.color}40`,
                 color: planet.color
               }">
            {{ learner.completedQuestions.has(m.id) ? '✓' : i + 1 }}
          </div>
          <div class="flex-1">
            <h3 class="font-orbitron text-sm font-bold text-white/90">{{ m.title }}</h3>
            <p class="text-white/50 text-xs font-space mt-0.5">{{ m.desc }}</p>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs font-terminal" :style="{ color: planet.color }">+{{ m.xp }} XP</span>
            <button
              class="btn-neon px-4 py-1.5 rounded-lg text-xs font-orbitron"
              :style="{ borderColor: planet.color + '50', color: planet.color }"
              :class="learner.completedQuestions.has(m.id) ? 'opacity-50' : ''"
              @click="startMission(m)"
            >
              {{ learner.completedQuestions.has(m.id) ? 'DONE' : 'START' }}
            </button>
          </div>
        </div>
      </div>

      <!-- QUIZ TAB -->
      <div v-if="activeTab === 'QUIZ'">
        <div v-if="!quizActive" class="text-center py-16">
          <div class="text-6xl mb-4">🎯</div>
          <h2 class="font-orbitron text-2xl font-bold text-white mb-3">Planet Quiz Arena</h2>
          <p class="text-white/50 font-space mb-6 max-w-md mx-auto">
            {{ categoryQuestions.length }} questions about {{ planet.name }}. Test your knowledge and earn XP!
          </p>
          <button class="btn-neon px-8 py-3 rounded-xl font-orbitron font-bold"
                  :style="{ borderColor: planet.color + '70', color: planet.color }"
                  @click="startQuiz()">
            🚀 BEGIN QUIZ
          </button>
        </div>

        <div v-else-if="quizDone" class="text-center py-16">
          <div class="text-6xl mb-4">{{ score >= 80 ? '🏆' : score >= 50 ? '⭐' : '💪' }}</div>
          <h2 class="font-orbitron text-3xl font-bold gradient-text mb-2">
            {{ score >= 80 ? 'OUTSTANDING!' : score >= 50 ? 'GOOD JOB!' : 'KEEP TRAINING!' }}
          </h2>
          <p class="text-white/60 font-space mb-2">You scored {{ correct }}/{{ quizSet.length }}</p>
          <p class="font-terminal text-neon-cyan text-lg">+{{ earned }} XP EARNED</p>
          <div class="flex gap-4 justify-center mt-8">
            <button class="btn-neon px-6 py-2.5 rounded-xl font-orbitron text-sm" @click="startQuiz()">RETRY</button>
            <button class="btn-green btn-neon px-6 py-2.5 rounded-xl font-orbitron text-sm" @click="quizActive = false; quizDone = false">BACK</button>
          </div>
        </div>

        <div v-else class="max-w-2xl mx-auto">
          <!-- Progress -->
          <div class="flex justify-between items-center mb-6">
            <span class="font-terminal text-xs text-white/40">{{ qIdx + 1 }}/{{ quizSet.length }}</span>
            <div class="flex-1 mx-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div class="h-full xp-bar-fill rounded-full transition-all duration-300"
                   :style="{ width: ((qIdx+1)/quizSet.length*100) + '%' }" />
            </div>
            <span class="font-terminal text-xs" :style="{ color: planet.color }">{{ correct }} correct</span>
          </div>

          <!-- Question card -->
          <div class="glass-card p-7 mb-5">
            <div class="flex items-center gap-2 mb-4">
              <span class="px-2 py-0.5 rounded text-xs font-terminal"
                    :style="{ background: planet.color + '20', color: planet.color }">
                {{ currentQ?.difficulty === 1 ? '★' : currentQ?.difficulty === 2 ? '★★' : '★★★' }}
              </span>
              <span class="text-white/30 text-xs font-terminal">+{{ currentQ?.xp }} XP</span>
            </div>
            <p class="font-space text-white font-medium text-base leading-relaxed mb-6">
              {{ currentQ?.question }}
            </p>
            <div class="space-y-3">
              <button
                v-for="(opt, i) in currentQ?.options" :key="i"
                class="w-full text-left p-4 rounded-xl border transition-all duration-200 font-space text-sm"
                :class="getOptionClass(i)"
                :disabled="answered"
                @click="answer(i)"
              >
                <span class="font-orbitron text-xs mr-3" :style="{ color: planet.color }">{{ 'ABCD'[i] }}</span>
                {{ opt }}
              </button>
            </div>
          </div>

          <!-- Explanation -->
          <Transition name="fade">
            <div v-if="answered" class="glass-card p-5 border-l-4 mb-5"
                 :style="{ borderColor: selectedAnswer === currentQ?.answer ? '#39FF14' : '#FF3366' }">
              <p class="font-orbitron text-xs mb-2"
                 :class="selectedAnswer === currentQ?.answer ? 'text-github-green' : 'text-stellar-red'">
                {{ selectedAnswer === currentQ?.answer ? '✓ CORRECT' : '✗ INCORRECT' }}
              </p>
              <p class="text-white/70 font-space text-sm leading-relaxed">{{ currentQ?.explanation }}</p>
              <button class="mt-4 btn-neon px-6 py-2 rounded-lg font-orbitron text-sm"
                      :style="{ borderColor: planet.color + '60', color: planet.color }"
                      @click="nextQ()">
                {{ qIdx < quizSet.length - 1 ? 'NEXT →' : 'FINISH' }}
              </button>
            </div>
          </Transition>
        </div>
      </div>

      <!-- BLOG TAB -->
      <div v-if="activeTab === 'BLOG'">
        <div v-if="blogPost" class="max-w-3xl mx-auto prose-invert">
          <div class="glass-card p-8 mb-6">
            <div class="flex items-center gap-3 mb-4">
              <span class="text-4xl">{{ blogPost.heroEmoji }}</span>
              <div>
                <p class="font-terminal text-xs text-white/30">{{ blogPost.date }} · {{ blogPost.readTime }} read</p>
                <p class="font-terminal text-xs" :style="{ color: planet.color }">{{ blogPost.author }}</p>
              </div>
            </div>
            <h2 class="font-orbitron text-2xl font-bold text-white mb-2">{{ blogPost.title }}</h2>
          </div>
          <div v-for="sec in blogPost.sections" :key="sec.title" class="glass-card p-7 mb-4">
            <h3 class="font-orbitron text-base font-bold mb-4" :style="{ color: planet.color }">
              {{ sec.title }}
            </h3>
            <div class="text-white/70 font-space text-sm leading-relaxed whitespace-pre-line">
              {{ sec.content }}
            </div>
          </div>
        </div>
        <div v-else class="text-center py-20 text-white/40">
          <div class="text-5xl mb-4">📖</div>
          <p class="font-space">Blog content coming soon for this planet.</p>
        </div>
      </div>

      <!-- CASE STUDIES TAB -->
      <div v-if="activeTab === 'CASE STUDIES'">
        <div v-if="!activeCaseStudy" class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div v-for="cs in planetCaseStudies" :key="cs.id"
               class="glass-card p-6 cursor-pointer hover:border-white/20 transition-all duration-300"
               @click="activeCaseStudy = cs; audio.click()">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                   :style="{ background: planet.color + '20' }">
                🏢
              </div>
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <p class="font-terminal text-xs text-white/30">{{ cs.company }} · {{ cs.scenario }}</p>
                  <span v-if="!cs.questions" class="px-1.5 py-0.5 rounded text-xs font-terminal bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20">instructor</span>
                </div>
                <h3 class="font-orbitron text-sm font-bold text-white/90 mb-2">{{ cs.title }}</h3>
                <p class="text-white/50 text-xs font-space leading-relaxed line-clamp-2">{{ cs.intro }}</p>
                <div class="mt-3 flex gap-2">
                  <span v-for="d in cs.difficulty" :key="d" :style="{ color: planet.color }">★</span>
                  <span class="text-xs font-terminal text-white/30 ml-2">{{ cs.questions?.length || 0 }} questions</span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="planetCaseStudies.length === 0" class="col-span-2 text-center py-16 text-white/40">
            <div class="text-5xl mb-4">🔬</div>
            <p>Case studies being written for this planet</p>
          </div>
        </div>

        <!-- Active case study -->
        <div v-else class="max-w-3xl mx-auto">
          <button class="flex items-center gap-2 text-white/50 hover:text-white text-sm font-space mb-6 transition-colors"
                  @click="activeCaseStudy = null">
            ← Back
          </button>
          <div class="glass-card p-7 mb-5">
            <p class="font-terminal text-xs text-white/30 mb-1">{{ activeCaseStudy.company }} · {{ activeCaseStudy.scenario }}</p>
            <h2 class="font-orbitron text-xl font-bold text-white mb-3">{{ activeCaseStudy.title }}</h2>
            <div class="p-4 rounded-xl mb-4" :style="{ background: planet.color + '10', border: `1px solid ${planet.color}30` }">
              <p class="font-space text-sm text-white/80 leading-relaxed">{{ activeCaseStudy.intro }}</p>
            </div>
            <p class="text-white/60 font-space text-sm leading-relaxed">{{ activeCaseStudy.context }}</p>
          </div>

          <div v-if="!activeCaseStudy.questions?.length" class="glass-card p-5 mb-4 border border-white/6">
            <p class="font-terminal text-xs text-white/30">📋 Case study uploaded by your instructor — no interactive questions for this one.</p>
          </div>
          <div v-for="(q, i) in (activeCaseStudy.questions || [])" :key="q.id" class="glass-card p-6 mb-4">
            <p class="font-orbitron text-xs mb-3" :style="{ color: planet.color }">SCENARIO {{ i+1 }}</p>
            <p class="font-space text-white text-sm leading-relaxed mb-5">{{ q.question }}</p>
            <div class="space-y-2">
              <button
                v-for="(opt, oi) in q.options" :key="oi"
                class="w-full text-left p-3 rounded-lg border text-sm font-space transition-all duration-200"
                :class="getCsOptionClass(q.id, oi, q.answer)"
                @click="answerCs(q.id, oi, q)"
              >
                <span class="font-orbitron text-xs mr-2" :style="{ color: planet.color }">{{ 'ABCD'[oi] }}</span>
                {{ opt }}
              </button>
            </div>
            <Transition name="fade">
              <div v-if="csAnswers[q.id] !== undefined" class="mt-4 p-4 rounded-xl"
                   :style="{ background: csAnswers[q.id] === q.answer ? '#39FF1415' : '#FF336615',
                             border: `1px solid ${csAnswers[q.id] === q.answer ? '#39FF14' : '#FF3366'}40` }">
                <p class="text-xs font-space text-white/70 leading-relaxed">{{ q.explanation }}</p>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 404 -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="text-7xl mb-6">🌑</div>
      <h2 class="font-orbitron text-2xl font-bold text-white mb-3">Planet Not Found</h2>
      <RouterLink to="/galaxy" class="text-neon-cyan font-space hover:underline">← Return to Galaxy</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SubtleBackground from '../components/space/SubtleBackground.vue'
import { planets } from '../data/planets'
import { allQuestions, getRandomQuestions, type Question } from '../data/questions'
import { caseStudies, blogPosts } from '../data/achievements'
import { useLearnerStore } from '../stores/learner'
import { useAudio } from '../composables/useAudio'
import { useAdminStore } from '../stores/admin'

const route = useRoute()
const learner = useLearnerStore()
const audio = useAudio()
const adminStore = useAdminStore()

const planet = computed(() => planets.find(p => p.id === route.params.id as string))
const tabs = ['MISSIONS', 'QUIZ', 'BLOG', 'CASE STUDIES']
const activeTab = ref('MISSIONS')

// Quiz
const categoryQuestions = computed(() =>
  planet.value ? allQuestions.filter(q => q.category === planet.value!.category || q.category === planet.value!.id) : []
)
const quizActive = ref(false)
const quizDone = ref(false)
const quizSet = ref<Question[]>([])
const qIdx = ref(0)
const correct = ref(0)
const earned = ref(0)
const answered = ref(false)
const selectedAnswer = ref(-1)
const score = computed(() => quizSet.value.length ? Math.round(correct.value / quizSet.value.length * 100) : 0)
const currentQ = computed(() => quizSet.value[qIdx.value])

function startQuiz() {
  const pool = allQuestions.filter(q =>
    q.category === (planet.value?.category || '') ||
    q.category === 'general'
  )
  quizSet.value = [...pool].sort(() => Math.random() - 0.5).slice(0, 10)
  qIdx.value = 0; correct.value = 0; earned.value = 0
  answered.value = false; selectedAnswer.value = -1
  quizActive.value = true; quizDone.value = false
}

function answer(i: number) {
  if (answered.value) return
  answered.value = true
  selectedAnswer.value = i
  if (i === currentQ.value?.answer) {
    correct.value++
    const xp = currentQ.value.xp || 100
    earned.value += xp
    learner.addXP(xp)
    learner.markQuestion(currentQ.value.id)
    audio.success()
  } else {
    audio.error()
  }
}

function nextQ() {
  if (qIdx.value < quizSet.value.length - 1) {
    qIdx.value++; answered.value = false; selectedAnswer.value = -1
  } else {
    quizDone.value = true
  }
}

function getOptionClass(i: number) {
  if (!answered.value) return 'border-white/10 text-white/70 hover:border-neon-cyan/40 hover:bg-neon-cyan/5'
  if (i === currentQ.value?.answer) return 'border-github-green bg-github-green/10 text-github-green'
  if (i === selectedAnswer.value) return 'border-stellar-red bg-stellar-red/10 text-stellar-red'
  return 'border-white/5 text-white/30'
}

// Case studies — built-in + admin-uploaded for this planet
const planetCaseStudies = computed(() => {
  const cat = planet.value?.category || planet.value?.id
  const builtin = caseStudies.filter(cs => cs.category === cat)
  const adminCases = planet.value ? adminStore.getPlanetCases(planet.value.id) : []
  return [...builtin, ...adminCases]
})
const activeCaseStudy = ref<any | null>(null)
const csAnswers = ref<Record<string, number>>({})

function answerCs(qId: string, i: number, q: any) {
  if (csAnswers.value[qId] !== undefined) return
  csAnswers.value[qId] = i
  if (i === q.answer) { learner.addXP(q.xp || 100); audio.success() }
  else audio.error()
}

function getCsOptionClass(qId: string, i: number, answer: number) {
  if (csAnswers.value[qId] === undefined)
    return 'border-white/10 text-white/70 hover:border-neon-cyan/30 hover:bg-neon-cyan/5'
  if (i === answer) return 'border-github-green/70 bg-github-green/10 text-github-green'
  if (i === csAnswers.value[qId]) return 'border-stellar-red/70 bg-stellar-red/10 text-stellar-red'
  return 'border-white/5 text-white/20'
}

// Blog
const blogPost = computed(() => blogPosts.find(b => b.id === planet.value?.blogId))

// Missions
function startMission(m: any) {
  if (learner.completedQuestions.has(m.id)) return
  learner.markQuestion(m.id)
  learner.addXP(m.xp)
  audio.xp()
}

onMounted(() => {
  if (route.query.tab) activeTab.value = route.query.tab as string
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: all 0.3s ease; }
.fade-enter-from { opacity: 0; transform: translateY(-10px); }
</style>
