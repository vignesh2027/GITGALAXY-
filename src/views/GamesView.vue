<template>
  <div class="relative min-h-screen overflow-hidden">
    <SubtleBackground />
    <div class="relative z-10 pt-20 pb-16 px-4 max-w-6xl mx-auto">

      <!-- Header -->
      <div class="text-center mb-10">
        <p class="font-terminal text-neon-cyan text-xs tracking-widest mb-3 animate-pulse-neon">── GAME TERMINAL ──</p>
        <h1 class="font-orbitron text-4xl font-black gradient-text mb-3">ARCADE GALAXY</h1>
        <p class="text-white/40 font-space text-sm">Three games. Real questions. Earn XP every run.</p>
      </div>

      <!-- Game cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div v-for="g in games" :key="g.path"
             class="glass-card group relative overflow-hidden p-0 transition-all duration-300"
             :class="expandedGame === g.key ? 'ring-1' : 'hover:scale-[1.02]'"
             :style="expandedGame === g.key ? `ring-color: ${g.color}40` : ''">
          <div class="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
               :style="{ background: `linear-gradient(135deg, ${g.color}, transparent)` }" />
          <div class="p-6 relative z-10">
            <div class="flex items-start justify-between mb-3">
              <div class="text-4xl group-hover:scale-110 transition-transform duration-300">{{ g.icon }}</div>
              <span class="font-terminal text-xs px-2 py-1 rounded"
                    :style="{ background: g.color + '15', color: g.color }">
                {{ learner.highScores[g.key] ? 'BEST: ' + learner.highScores[g.key] : 'NEW' }}
              </span>
            </div>
            <h2 class="font-orbitron text-base font-bold text-white mb-1">{{ g.title }}</h2>
            <p class="text-white/50 font-space text-xs leading-relaxed mb-4">{{ g.desc }}</p>
            <div class="flex flex-wrap gap-1.5 mb-4">
              <span v-for="tag in g.tags" :key="tag"
                    class="px-2 py-0.5 rounded-full text-xs font-terminal"
                    :style="{ background: g.color + '18', color: g.color }">
                {{ tag }}
              </span>
            </div>
            <div class="flex gap-2">
              <RouterLink :to="g.path"
                          class="flex-1 py-2 rounded-xl text-center font-orbitron text-xs font-bold transition-all"
                          :style="{ background: g.color + '18', color: g.color, border: `1px solid ${g.color}40` }"
                          @click="audio.click()">
                ▶ PLAY
              </RouterLink>
              <button class="px-3 py-2 rounded-xl font-terminal text-xs transition-all glass text-white/40 hover:text-white/70"
                      @click="expandedGame = expandedGame === g.key ? null : g.key">
                {{ expandedGame === g.key ? '▲ HIDE' : '? HOW' }}
              </button>
            </div>
          </div>

          <!-- How to play panel -->
          <Transition name="expand">
            <div v-if="expandedGame === g.key"
                 class="border-t px-6 pb-6 pt-4 relative z-10"
                 :style="{ borderColor: g.color + '25' }">
              <p class="font-orbitron text-xs mb-4 tracking-widest" :style="{ color: g.color }">
                📖 HOW TO PLAY
              </p>
              <div class="space-y-3">
                <div v-for="(step, i) in g.instructions" :key="i" class="flex gap-3">
                  <span class="font-orbitron text-xs w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                        :style="{ background: g.color + '20', color: g.color }">{{ i+1 }}</span>
                  <p class="text-white/60 font-space text-xs leading-relaxed">{{ step }}</p>
                </div>
              </div>
              <div class="mt-4 p-3 rounded-lg" :style="{ background: g.color + '08', border: `1px solid ${g.color}15` }">
                <p class="font-terminal text-xs mb-2" :style="{ color: g.color }">⌨️ CONTROLS</p>
                <div class="space-y-1">
                  <div v-for="ctrl in g.controls" :key="ctrl.key" class="flex items-center gap-2">
                    <kbd class="px-2 py-0.5 rounded text-xs font-terminal bg-white/8 text-white/60 border border-white/10">
                      {{ ctrl.key }}
                    </kbd>
                    <span class="text-white/40 font-space text-xs">{{ ctrl.action }}</span>
                  </div>
                </div>
              </div>
              <div class="mt-3 p-3 rounded-lg bg-solar-amber/5 border border-solar-amber/15">
                <p class="font-terminal text-xs text-solar-amber mb-1">💡 PRO TIP</p>
                <p class="text-white/50 font-space text-xs">{{ g.tip }}</p>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Scores + XP summary -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="glass-card p-6">
          <h3 class="font-orbitron text-sm font-bold gradient-text mb-5">🏆 YOUR HIGH SCORES</h3>
          <div class="grid grid-cols-3 gap-3">
            <div v-for="g in games" :key="g.key" class="text-center p-4 rounded-xl transition-all"
                 :style="{ background: g.color + '08', border: `1px solid ${g.color}25` }">
              <p class="text-3xl mb-2">{{ g.icon }}</p>
              <p class="font-orbitron text-xl font-bold" :style="{ color: g.color }">
                {{ learner.highScores[g.key] || 0 }}
              </p>
              <p class="text-white/40 text-xs font-terminal mt-1">{{ g.shortName }}</p>
            </div>
          </div>
        </div>

        <div class="glass-card p-6">
          <h3 class="font-orbitron text-sm font-bold gradient-text mb-4">⚡ XP REWARDS</h3>
          <div class="space-y-3">
            <div v-for="r in xpRewards" :key="r.label" class="flex items-center gap-3 p-3 rounded-lg bg-white/3">
              <span class="text-lg">{{ r.icon }}</span>
              <div class="flex-1">
                <p class="font-space text-xs text-white/70">{{ r.label }}</p>
                <p class="font-terminal text-xs text-white/35 mt-0.5">{{ r.desc }}</p>
              </div>
              <span class="font-orbitron text-sm font-bold" :style="{ color: r.color }">{{ r.xp }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Learning topics covered -->
      <div class="glass-card p-6 mt-6">
        <h3 class="font-orbitron text-sm font-bold gradient-text mb-4">📚 TOPICS COVERED IN GAMES</h3>
        <div class="flex flex-wrap gap-2">
          <span v-for="topic in topics" :key="topic.label"
                class="px-3 py-1.5 rounded-full text-xs font-terminal transition-all hover:scale-105 cursor-default"
                :style="{ background: topic.color + '15', color: topic.color, border: `1px solid ${topic.color}30` }">
            {{ topic.icon }} {{ topic.label }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SubtleBackground from '../components/space/SubtleBackground.vue'
import { useLearnerStore } from '../stores/learner'
import { useAudio } from '../composables/useAudio'

const learner = useLearnerStore()
const audio = useAudio()
const expandedGame = ref<string | null>(null)

const games = [
  {
    path: '/games/temple-run', key: 'temple', shortName: 'TEMPLE',
    title: 'NEON TEMPLE RUN',
    desc: 'Endless neon runner with quiz checkpoints. Every 600 frames a knowledge test appears — answer correctly for a speed boost.',
    icon: '🏃', color: '#00F5FF',
    tags: ['Endless', 'Platform', 'Quiz Boost', 'Double Jump'],
    instructions: [
      'Run automatically — your character never stops. Your job is to jump over obstacles.',
      'Tap the screen or press SPACE / ↑ to jump. You have double-jump — press again mid-air.',
      'Every ~600 frames a ⚡ CHECKPOINT quiz appears. The game pauses and a question modal opens.',
      'Choose the correct answer to earn XP and get a speed boost. Wrong answer = lose 1 life.',
      'A gold progress bar at the bottom shows how close the next checkpoint is.',
      'Speed increases over time — stay alive and keep answering correctly for massive combos!',
      'Lose all 3 lives and the run ends. Your score × combo multiplier is saved as your best.'
    ],
    controls: [
      { key: 'SPACE', action: 'Jump / Double jump' },
      { key: '↑ Arrow', action: 'Jump' },
      { key: 'Tap', action: 'Jump (mobile)' },
      { key: 'ENTER', action: 'Start game from menu' }
    ],
    tip: 'Watch the gold checkpoint bar at the bottom — when it\'s nearly full, mentally prepare for a question. Correct answers give speed boosts AND increase your combo multiplier!'
  },
  {
    path: '/games/snake', key: 'snake', shortName: 'SERPENT',
    title: 'NEURAL SERPENT',
    desc: 'Git-themed snake with a brain twist — eat quiz food to triple your length and earn massive XP.',
    icon: '🐍', color: '#39FF14',
    tags: ['Snake', 'Git Theme', 'Quiz Food', 'Strategy'],
    instructions: [
      'Control your snake with WASD or Arrow keys. It cannot reverse direction.',
      'Eat food items to grow longer and earn points. Different foods give different rewards.',
      'Watch out for a special ❓ purple question food — eating it pauses the game for a quiz!',
      'Answer the quiz correctly: snake grows ×3 instantly + 75 XP + bonus points!',
      'Answer wrong: snake shrinks by half — be careful!',
      'Red 🔴 BUG food is dangerous — eating it shrinks your snake and costs points.',
      'Speed increases as you grow longer. Use walls strategically — hitting a wall ends the game.',
      'Try to answer all quiz foods correctly — they appear roughly every 6-7 regular foods.'
    ],
    controls: [
      { key: 'WASD', action: 'Move snake' },
      { key: '↑↓←→', action: 'Move snake (arrows)' },
      { key: 'P', action: 'Pause game' },
      { key: 'Tap buttons', action: 'Move on mobile' }
    ],
    tip: 'When you see the ❓ quiz food, plan your path so you hit it from a safe angle with enough room to maneuver after it grows you by 3x. A long snake is hard to steer!'
  },
  {
    path: '/games/space-combat', key: 'combat', shortName: 'COMBAT',
    title: 'SPACE COMBAT QUIZ',
    desc: 'Enemy ships carry questions. Shoot the correct answer label to destroy them. Wrong shots cost shields.',
    icon: '🚀', color: '#7B61FF',
    tags: ['Shooter', 'Quiz Battle', 'Multi-Topic', 'Shields'],
    instructions: [
      'Enemy ships descend from above carrying question text on their hulls.',
      'Multiple enemy ships show different answer options — shoot the correct one!',
      'Use ← → arrow keys to aim your ship left and right.',
      'Press SPACE or ↑ to fire a laser at the targeted enemy.',
      'Hitting the correct answer: enemy destroyed, XP awarded, question explained briefly.',
      'Hitting a wrong answer: your shields take damage. Lose all shields = game over.',
      'Enemies that reach the bottom also damage your shields — act fast!',
      'Questions cover all topics: Git, Linux, Cloud, Security, DevOps, and more.'
    ],
    controls: [
      { key: '← →', action: 'Move ship left/right' },
      { key: 'SPACE', action: 'Fire laser' },
      { key: '↑ Arrow', action: 'Fire laser' },
      { key: 'Tap', action: 'Fire (mobile)' }
    ],
    tip: 'Read the question on the incoming ship first, then look at ALL enemy ships before shooting — they each carry different answer options. Don\'t just shoot the first ship you see!'
  },
  {
    path: '/games/linus-race', key: 'linus', shortName: 'LINUS',
    title: 'LINUS HIGHWAY RACE',
    desc: 'Race Linus Torvalds on his bike through the open-source highway! Answer Git & Linux questions to boost speed and beat your distance record.',
    icon: '🐧', color: '#39FF14',
    tags: ['Racing', 'Speed', 'Linux', 'Reflexes'],
    instructions: [
      'You are Linus Torvalds, racing a bike down the open-source highway.',
      'Use ← → or A / D keys to steer the bike left and right.',
      'Dodge obstacles: rocks 🪨, traffic cones 🔶, code bugs 🐛, and merge conflicts ⚡.',
      'Every few seconds a question pops up — the game PAUSES while you answer.',
      'Correct answer: big speed boost + XP! Wrong answer: speed reduction + lose a life.',
      'Your speed increases automatically over time — the longer you survive, the faster it gets.',
      'You have 3 lives. Crashing into obstacles or answering wrong costs a life.',
      'Score = distance × speed. Aim for the longest run possible!'
    ],
    controls: [
      { key: 'A / ←', action: 'Steer left' },
      { key: 'D / →', action: 'Steer right' },
      { key: 'Tap buttons', action: 'Steer on mobile' }
    ],
    tip: 'Stay near the center of the road so you can dodge in either direction. When a quiz appears, take your time — the road is paused. Stack correct answers for massive speed bursts!'
  }
]

const xpRewards = [
  { icon: '⚡', label: 'Quiz Checkpoint (Temple Run)', desc: 'Correct answer at checkpoint', xp: '+50–150 XP', color: '#00F5FF' },
  { icon: '❓', label: 'Quiz Food (Snake)', desc: 'Answer quiz food correctly', xp: '+75 XP', color: '#39FF14' },
  { icon: '💥', label: 'Enemy Destroyed (Space Combat)', desc: 'Correct shot in Space Combat', xp: '+50–150 XP', color: '#7B61FF' },
  { icon: '🐧', label: 'Speed Boost (Linus Race)', desc: 'Correct quiz answer while racing', xp: '+100 XP', color: '#39FF14' },
  { icon: '🏁', label: 'Game Completion Bonus', desc: 'XP earned from final score', xp: '+variable', color: '#FFB703' },
  { icon: '🔥', label: 'Combo Multiplier', desc: 'Consecutive correct answers', xp: '×2–×8', color: '#FF3366' }
]

const topics = [
  { icon: '🌿', label: 'Git & Version Control', color: '#39FF14' },
  { icon: '🐙', label: 'GitHub & CI/CD', color: '#00F5FF' },
  { icon: '🐧', label: 'Linux & Shell', color: '#FFB703' },
  { icon: '☁️', label: 'Cloud & AWS', color: '#00FFB3' },
  { icon: '⚙️', label: 'DevOps & Containers', color: '#7B61FF' },
  { icon: '🛡️', label: 'Security', color: '#FF3366' },
  { icon: '🌐', label: 'Fullstack & APIs', color: '#00F5FF' },
  { icon: '🤖', label: 'AI & Machine Learning', color: '#FFB703' },
  { icon: '🐛', label: 'Debugging', color: '#39FF14' },
  { icon: '💡', label: 'CS Fundamentals', color: '#7B61FF' }
]
</script>

<style scoped>
.expand-enter-active, .expand-leave-active { transition: all 0.3s ease; overflow: hidden; }
.expand-enter-from, .expand-leave-to { max-height: 0; opacity: 0; }
.expand-enter-to, .expand-leave-from { max-height: 600px; opacity: 1; }
</style>
