import { computed } from 'vue'
import { allQuestions, shuffleQuestion, type Question } from '../data/questions'
import { useAdminStore } from '../stores/admin'

/**
 * Returns the merged question pool: built-in + admin-uploaded custom questions.
 * All games and quizzes should use this so bulk-uploaded questions appear in gameplay.
 */
export function useQuestionPool() {
  const admin = useAdminStore()

  const questionPool = computed<Question[]>(() => {
    const custom = (admin.customQuestions as Question[]).filter(q => q.question && q.options?.length >= 2)
    const builtInIds = new Set(allQuestions.map(q => q.id))
    const uniqueCustom = custom.filter(q => !builtInIds.has(q.id))
    return [...allQuestions, ...uniqueCustom]
  })

  // Also include admin interview questions
  const interviewPool = computed<Question[]>(() => {
    const raw = JSON.parse(localStorage.getItem('gg_admin_interview_q') || '[]') as Question[]
    return raw.filter(q => q.question && q.options?.length >= 2)
  })

  function pickRandom(usedIds: Set<string>): Question {
    const pool = questionPool.value
    const fresh = pool.filter(q => !usedIds.has(q.id))
    const source = fresh.length > 0 ? fresh : pool
    const q = source[Math.floor(Math.random() * source.length)]
    return q
  }

  /** Pick a question and shuffle its options so answer isn't always at same position */
  function pickShuffled(usedIds: Set<string>): { q: Question; options: string[]; answer: number } {
    const q = pickRandom(usedIds)
    const { options, answer } = shuffleQuestion(q)
    return { q, options, answer }
  }

  function getByCategory(categories: string[]): Question[] {
    return questionPool.value.filter(q => categories.includes(q.category as string))
  }

  function getRandom(count: number, categories?: string[]): Question[] {
    const pool = categories ? getByCategory(categories) : questionPool.value
    return [...pool].sort(() => Math.random() - 0.5).slice(0, count)
  }

  return { questionPool, interviewPool, pickRandom, pickShuffled, getByCategory, getRandom }
}
