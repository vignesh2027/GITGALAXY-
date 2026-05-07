import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type Role = 'learner' | 'admin' | null

export const useAuthStore = defineStore('auth', () => {
  const role = ref<Role>(localStorage.getItem('gg_role') as Role || null)
  const learnerName = ref(localStorage.getItem('gg_name') || 'Space Explorer')
  const isLoggedIn = computed(() => role.value !== null)
  const isAdmin = computed(() => role.value === 'admin')
  const isLearner = computed(() => role.value === 'learner')

  const ADMIN_PASSWORD = 'admin2024'

  function loginLearner(name = 'Space Explorer') {
    role.value = 'learner'
    learnerName.value = name || 'Space Explorer'
    localStorage.setItem('gg_role', 'learner')
    localStorage.setItem('gg_name', learnerName.value)
  }

  function loginAdmin(password: string): boolean {
    if (password === ADMIN_PASSWORD) {
      role.value = 'admin'
      localStorage.setItem('gg_role', 'admin')
      return true
    }
    return false
  }

  function logout() {
    role.value = null
    localStorage.removeItem('gg_role')
  }

  return { role, learnerName, isLoggedIn, isAdmin, isLearner, loginLearner, loginAdmin, logout }
})
