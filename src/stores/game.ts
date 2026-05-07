import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameStore = defineStore('game', () => {
  const activeGame = ref<string | null>(null)
  const score = ref(0)
  const lives = ref(3)
  const combo = ref(0)
  const isPaused = ref(false)
  const gameOver = ref(false)
  const currentQuestion = ref<any>(null)
  const showQuestion = ref(false)
  const answerResult = ref<'correct' | 'wrong' | null>(null)

  function startGame(name: string) {
    activeGame.value = name
    score.value = 0
    lives.value = 3
    combo.value = 0
    isPaused.value = false
    gameOver.value = false
    currentQuestion.value = null
  }

  function addScore(points: number) {
    const multiplier = 1 + (combo.value * 0.1)
    score.value += Math.floor(points * multiplier)
  }

  function loseLife() {
    lives.value--
    combo.value = 0
    if (lives.value <= 0) { gameOver.value = true }
  }

  function correctAnswer() {
    combo.value++
    answerResult.value = 'correct'
    addScore(100 + combo.value * 25)
    setTimeout(() => { answerResult.value = null; showQuestion.value = false }, 1200)
  }

  function wrongAnswer() {
    combo.value = 0
    answerResult.value = 'wrong'
    loseLife()
    setTimeout(() => { answerResult.value = null; showQuestion.value = false }, 1200)
  }

  function presentQuestion(q: any) {
    currentQuestion.value = q
    showQuestion.value = true
    isPaused.value = true
  }

  function dismissQuestion() {
    showQuestion.value = false
    isPaused.value = false
    currentQuestion.value = null
  }

  function togglePause() { isPaused.value = !isPaused.value }
  function endGame() { gameOver.value = true }
  function reset() { startGame(activeGame.value || '') }

  return {
    activeGame, score, lives, combo, isPaused, gameOver,
    currentQuestion, showQuestion, answerResult,
    startGame, addScore, loseLife, correctAnswer, wrongAnswer,
    presentQuestion, dismissQuestion, togglePause, endGame, reset
  }
})
