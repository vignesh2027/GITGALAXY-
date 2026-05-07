import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Mission { id: string; title: string; desc: string; xp: number; completed: boolean; type: string }
export interface Achievement { id: string; title: string; desc: string; icon: string; unlocked: boolean; xp: number }
export interface SkillNode { id: string; name: string; level: number; maxLevel: number; unlocked: boolean; children: string[] }

export const useLearnerStore = defineStore('learner', () => {
  const xp = ref(Number(localStorage.getItem('gg_xp') || '0'))
  const level = ref(Number(localStorage.getItem('gg_level') || '1'))
  const completedQuestions = ref<Set<string>>(new Set(JSON.parse(localStorage.getItem('gg_cq') || '[]')))
  const completedPlanets = ref<Set<string>>(new Set(JSON.parse(localStorage.getItem('gg_cp') || '[]')))
  const streak = ref(Number(localStorage.getItem('gg_streak') || '0'))
  const lastActiveDate = ref(localStorage.getItem('gg_lad') || '')
  const pendingAchievement = ref<Achievement | null>(null)
  const highScores = ref<Record<string, number>>(JSON.parse(localStorage.getItem('gg_hs') || '{}'))

  const xpForNextLevel = computed(() => level.value * 500)
  const xpProgress = computed(() => (xp.value % xpForNextLevel.value) / xpForNextLevel.value * 100)
  const rank = computed(() => {
    if (level.value >= 20) return 'Galactic Master'
    if (level.value >= 15) return 'Stellar Commander'
    if (level.value >= 10) return 'Cosmic Explorer'
    if (level.value >= 5)  return 'Space Cadet'
    return 'Nebula Rookie'
  })

  const dailyMissions = ref<Mission[]>([
    { id: 'dm1', title: 'First Commit', desc: 'Answer 5 Git questions', xp: 100, completed: false, type: 'quiz' },
    { id: 'dm2', title: 'Snake Run',    desc: 'Score 500+ in Snake',       xp: 150, completed: false, type: 'game' },
    { id: 'dm3', title: 'Speed Coder',  desc: 'Complete 3 questions in <30s each', xp: 200, completed: false, type: 'speed' },
    { id: 'dm4', title: 'Explorer',     desc: 'Visit 2 different planets',  xp: 75,  completed: false, type: 'explore' },
    { id: 'dm5', title: 'Combat Ready', desc: 'Survive 1 space battle',     xp: 120, completed: false, type: 'game' }
  ])

  const achievements = ref<Achievement[]>([
    { id: 'first_blood', title: 'First Blood',   desc: 'Answer your first question',       icon: '⚡', unlocked: false, xp: 50  },
    { id: 'streak_3',   title: '3-Day Streak',   desc: 'Learn 3 days in a row',            icon: '🔥', unlocked: false, xp: 150 },
    { id: 'git_master', title: 'Git Master',      desc: 'Complete all Git Planet missions', icon: '🌿', unlocked: false, xp: 500 },
    { id: 'speed_run',  title: 'Speed Runner',    desc: 'Answer 10 questions in 5 minutes', icon: '⚡', unlocked: false, xp: 300 },
    { id: 'centurion',  title: 'Centurion',       desc: 'Answer 100 questions total',       icon: '💯', unlocked: false, xp: 400 },
    { id: 'level_5',    title: 'Space Cadet',     desc: 'Reach Level 5',                    icon: '🚀', unlocked: false, xp: 200 },
    { id: 'level_10',   title: 'Cosmic Explorer', desc: 'Reach Level 10',                   icon: '🌌', unlocked: false, xp: 500 },
    { id: 'snake_500',  title: 'Snake Charmer',   desc: 'Score 500 in Snake',               icon: '🐍', unlocked: false, xp: 200 },
    { id: 'no_mistakes','title': 'Flawless',      desc: 'Complete a quiz with no errors',   icon: '✨', unlocked: false, xp: 350 },
    { id: 'all_planets','title': 'Galactic Traveler', desc: 'Unlock all 10 planets',        icon: '🪐', unlocked: false, xp: 1000 }
  ])

  function addXP(amount: number) {
    xp.value += amount
    const newLevel = Math.floor(xp.value / 500) + 1
    if (newLevel > level.value) {
      level.value = newLevel
      checkAchievements()
    }
    save()
  }

  function checkAchievements() {
    achievements.value.forEach(a => {
      if (a.unlocked) return
      if (a.id === 'level_5' && level.value >= 5) unlock(a)
      if (a.id === 'level_10' && level.value >= 10) unlock(a)
      if (a.id === 'centurion' && completedQuestions.value.size >= 100) unlock(a)
      if (a.id === 'all_planets' && completedPlanets.value.size >= 10) unlock(a)
    })
  }

  function unlock(a: Achievement) {
    a.unlocked = true
    pendingAchievement.value = a
    addXP(a.xp)
    save()
  }

  function markQuestion(id: string) {
    completedQuestions.value.add(id)
    if (!achievements.value.find(a => a.id === 'first_blood')?.unlocked) {
      const a = achievements.value.find(a => a.id === 'first_blood')!
      unlock(a)
    }
    checkAchievements()
    save()
  }

  function completeDaily(id: string) {
    const m = dailyMissions.value.find(m => m.id === id)
    if (m && !m.completed) { m.completed = true; addXP(m.xp) }
  }

  function setHighScore(game: string, score: number) {
    if (!highScores.value[game] || score > highScores.value[game]) {
      highScores.value[game] = score
      if (game === 'snake' && score >= 500) {
        const a = achievements.value.find(a => a.id === 'snake_500')
        if (a && !a.unlocked) unlock(a)
      }
      save()
    }
  }

  function clearPendingAchievement() { pendingAchievement.value = null }

  function save() {
    localStorage.setItem('gg_xp', String(xp.value))
    localStorage.setItem('gg_level', String(level.value))
    localStorage.setItem('gg_cq', JSON.stringify([...completedQuestions.value]))
    localStorage.setItem('gg_cp', JSON.stringify([...completedPlanets.value]))
    localStorage.setItem('gg_streak', String(streak.value))
    localStorage.setItem('gg_hs', JSON.stringify(highScores.value))
  }

  return {
    xp, level, streak, rank, completedQuestions, completedPlanets,
    dailyMissions, achievements, pendingAchievement, highScores,
    xpForNextLevel, xpProgress,
    addXP, markQuestion, completeDaily, setHighScore, clearPendingAchievement, checkAchievements
  }
})
