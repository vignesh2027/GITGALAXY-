<template>
  <div class="relative min-h-screen overflow-auto">
    <SubtleBackground />
    <div class="relative z-10 pt-20 pb-16 px-6 max-w-5xl mx-auto">

      <!-- Header -->
      <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <RouterLink to="/learner-home" class="text-white/40 hover:text-white font-space text-xs mb-2 block transition-colors">
            ← Back to Home
          </RouterLink>
          <h1 class="font-orbitron text-2xl font-black text-white">Interview Q&amp;A</h1>
          <p class="text-white/40 font-space text-sm mt-1">
            Study questions uploaded by your instructor — {{ questions.length }} questions total
          </p>
        </div>
        <div class="flex flex-wrap gap-2">
          <button v-for="cat in categories" :key="cat"
                  class="px-3 py-1.5 rounded-lg text-xs font-terminal transition-all"
                  :class="activeCategory === cat
                    ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40'
                    : 'glass text-white/40 hover:text-white/70 border border-white/10'"
                  @click="activeCategory = cat">
            {{ cat === 'all' ? 'All' : cat }}
          </button>
        </div>
      </div>

      <!-- Search + mode toggle -->
      <div class="flex flex-wrap gap-3 mb-6">
        <input v-model="search" type="text"
               placeholder="Search questions..."
               class="flex-1 min-w-48 glass px-4 py-2 rounded-xl text-sm font-space text-white/80 outline-none border border-white/10 focus:border-neon-cyan/40" />
        <div class="flex gap-2">
          <button v-for="m in ['study', 'quiz']" :key="m"
                  class="px-4 py-2 rounded-xl text-xs font-terminal transition-all capitalize"
                  :class="mode === m
                    ? 'bg-plasma-purple/20 text-plasma-purple border border-plasma-purple/40'
                    : 'glass text-white/40 hover:text-white/60 border border-white/10'"
                  @click="mode = m as any; resetAll()">
            {{ m === 'study' ? '📖 Study Mode' : '🧪 Quiz Mode' }}
          </button>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="questions.length === 0" class="text-center py-24">
        <div class="text-6xl mb-4">📭</div>
        <h2 class="font-orbitron text-lg font-bold text-white/40 mb-2">No Questions Yet</h2>
        <p class="font-space text-sm text-white/30">
          Your instructor hasn't uploaded any Interview Q&amp;A questions yet.<br>
          Check back after they use the Admin Panel → Bulk Upload → Interview Q&amp;A.
        </p>
      </div>

      <!-- Quiz mode score bar -->
      <div v-if="mode === 'quiz' && filtered.length > 0" class="dark-card p-4 mb-6 flex flex-wrap items-center gap-4">
        <div class="flex items-center gap-2">
          <span class="font-orbitron text-xs text-white/40">PROGRESS</span>
          <span class="font-orbitron text-sm font-bold text-neon-cyan">{{ answered }}/{{ filtered.length }}</span>
        </div>
        <div class="flex-1 h-2 rounded-full bg-white/5 min-w-32">
          <div class="h-2 rounded-full bg-neon-cyan transition-all duration-500"
               :style="{ width: filtered.length ? `${(answered / filtered.length) * 100}%` : '0%' }" />
        </div>
        <div class="flex items-center gap-2">
          <span class="font-terminal text-xs text-github-green">✓ {{ correct }}</span>
          <span class="font-terminal text-xs text-red-400">✗ {{ answered - correct }}</span>
        </div>
        <button class="px-3 py-1.5 rounded-lg text-xs font-terminal glass text-white/40 hover:text-white/70 transition-colors"
                @click="resetAll">Reset</button>
      </div>

      <!-- Question cards -->
      <div v-if="filtered.length > 0" class="space-y-4">
        <div v-for="(q, idx) in filtered" :key="q.id"
             class="glass-card p-5 border border-white/8 hover:border-white/15 transition-all">

          <!-- Question header -->
          <div class="flex items-start gap-3 mb-4">
            <span class="font-orbitron text-xs text-white/30 flex-shrink-0 mt-0.5">Q{{ idx + 1 }}</span>
            <div class="flex-1">
              <div class="flex flex-wrap gap-2 mb-2">
                <span class="px-2 py-0.5 rounded text-xs font-terminal bg-plasma-purple/15 text-plasma-purple border border-plasma-purple/20">
                  {{ q.category || 'general' }}
                </span>
                <span class="px-2 py-0.5 rounded text-xs font-terminal"
                      :class="q.difficulty === 1 ? 'bg-github-green/15 text-github-green border border-github-green/20'
                            : q.difficulty === 3 ? 'bg-red-500/15 text-red-400 border border-red-500/20'
                            : 'bg-solar-amber/15 text-solar-amber border border-solar-amber/20'">
                  {{ q.difficulty === 1 ? 'Easy' : q.difficulty === 3 ? 'Hard' : 'Medium' }}
                </span>
              </div>
              <p class="font-space text-white text-sm leading-relaxed">{{ q.question }}</p>
            </div>
          </div>

          <!-- Study mode: show all options, reveal answer on click -->
          <div v-if="mode === 'study'" class="space-y-2">
            <div v-for="(opt, i) in q.options" :key="i"
                 class="px-4 py-2.5 rounded-xl border text-sm font-space transition-all"
                 :class="revealed.has(q.id)
                   ? i === q.answer
                     ? 'border-github-green/50 bg-github-green/10 text-github-green'
                     : 'border-white/5 text-white/30'
                   : 'border-white/10 text-white/60'">
              <span class="font-orbitron text-xs mr-2"
                    :class="revealed.has(q.id) && i === q.answer ? 'text-github-green' : 'text-white/30'">
                {{ 'ABCD'[i] }}.
              </span>{{ opt }}
            </div>
            <button class="mt-2 px-4 py-1.5 rounded-lg text-xs font-terminal transition-all"
                    :class="revealed.has(q.id)
                      ? 'bg-white/5 text-white/30'
                      : 'bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30 hover:bg-neon-cyan/25'"
                    @click="toggleReveal(q.id)">
              {{ revealed.has(q.id) ? '▲ Hide Answer' : '▼ Reveal Answer' }}
            </button>
            <p v-if="revealed.has(q.id) && q.explanation"
               class="mt-2 px-4 py-2.5 rounded-xl bg-white/3 border border-white/6 text-xs font-space text-white/50 leading-relaxed">
              💡 {{ q.explanation }}
            </p>
          </div>

          <!-- Quiz mode: answer before seeing result -->
          <div v-else class="space-y-2">
            <button v-for="(opt, i) in getShuffled(q).options" :key="i"
                    class="w-full px-4 py-2.5 rounded-xl border text-sm font-space text-left transition-all"
                    :class="quizState[q.id] === undefined
                      ? 'border-white/10 text-white/70 hover:border-plasma-purple/40 hover:bg-plasma-purple/8'
                      : i === getShuffled(q).answer
                        ? 'border-github-green/50 bg-github-green/10 text-github-green'
                        : quizState[q.id] === i
                          ? 'border-red-400/50 bg-red-500/10 text-red-400'
                          : 'border-white/5 text-white/25'"
                    :disabled="quizState[q.id] !== undefined"
                    @click="submitAnswer(q, i)">
              <span class="font-orbitron text-xs mr-2 text-white/30">{{ 'ABCD'[i] }}.</span>{{ opt }}
            </button>
            <p v-if="quizState[q.id] !== undefined && q.explanation"
               class="mt-2 px-4 py-2.5 rounded-xl bg-white/3 border border-white/6 text-xs font-space text-white/50 leading-relaxed">
              💡 {{ q.explanation }}
            </p>
          </div>
        </div>
      </div>

      <!-- No results for search -->
      <div v-else-if="questions.length > 0" class="text-center py-16 text-white/30">
        <div class="text-4xl mb-3">🔍</div>
        <p class="font-space text-sm">No questions match your search.</p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SubtleBackground from '../components/space/SubtleBackground.vue'
import { useAdminStore } from '../stores/admin'
import { shuffleQuestion } from '../data/questions'

const admin = useAdminStore()

const search = ref('')
const activeCategory = ref('all')
const mode = ref<'study' | 'quiz'>('study')
const revealed = ref(new Set<string>())
const quizState = ref<Record<string, number>>({})
const shuffleCache = new Map<string, { options: string[]; answer: number }>()

const questions = computed(() => admin.interviewQuestions as any[])

const categories = computed(() => {
  const cats = new Set(questions.value.map(q => q.category || 'general'))
  return ['all', ...Array.from(cats).sort()]
})

const filtered = computed(() => {
  let q = questions.value
  if (activeCategory.value !== 'all') q = q.filter(x => (x.category || 'general') === activeCategory.value)
  if (search.value.trim()) {
    const s = search.value.toLowerCase()
    q = q.filter(x => x.question.toLowerCase().includes(s) || x.options?.some((o: string) => o.toLowerCase().includes(s)))
  }
  return q
})

const answered = computed(() => Object.keys(quizState.value).length)
const correct = computed(() => Object.entries(quizState.value).filter(([id, chosen]) => {
  const q = questions.value.find(x => x.id === id)
  if (!q) return false
  return chosen === getShuffled(q).answer
}).length)

function toggleReveal(id: string) {
  if (revealed.value.has(id)) revealed.value.delete(id)
  else revealed.value.add(id)
  revealed.value = new Set(revealed.value)
}

function getShuffled(q: any): { options: string[]; answer: number } {
  if (!shuffleCache.has(q.id)) {
    shuffleCache.set(q.id, shuffleQuestion(q))
  }
  return shuffleCache.get(q.id)!
}

function submitAnswer(q: any, i: number) {
  if (quizState.value[q.id] !== undefined) return
  quizState.value = { ...quizState.value, [q.id]: i }
}

function resetAll() {
  revealed.value = new Set()
  quizState.value = {}
  shuffleCache.clear()
}
</script>
