import { defineStore } from 'pinia'
import { ref } from 'vue'
import { planets as defaultPlanets } from '../data/planets'
import { allQuestions } from '../data/questions'

export const useAdminStore = defineStore('admin', () => {
  const customPlanets = ref(JSON.parse(localStorage.getItem('gg_admin_planets') || 'null') || defaultPlanets)
  // customQuestions = admin-added game questions only (not built-in allQuestions)
  const customQuestions = ref<any[]>(JSON.parse(localStorage.getItem('gg_admin_custom_q') || '[]'))
  // interviewQuestions = admin-uploaded interview Q&A shown on learner Interview page
  const interviewQuestions = ref<any[]>(JSON.parse(localStorage.getItem('gg_admin_interview_q') || '[]'))
  const uploadedAssets = ref<{name:string;type:string;url:string;date:string}[]>(
    JSON.parse(localStorage.getItem('gg_admin_assets') || '[]')
  )
  const announcements = ref<{id:string;text:string;type:string;active:boolean}[]>(
    JSON.parse(localStorage.getItem('gg_admin_ann') || '[]')
  )
  const siteSettings = ref({
    galaxyTitle: localStorage.getItem('gg_admin_title') || 'GITGALAXY',
    galaxySubtitle: localStorage.getItem('gg_admin_sub') || 'THE INFINITE LEARNING COSMOS',
    featuredPlanet: localStorage.getItem('gg_admin_fp') || 'git',
    maintenanceMode: false,
    xpMultiplier: Number(localStorage.getItem('gg_admin_xpm') || '1')
  })

  function updateSetting(key: string, value: any) {
    (siteSettings.value as any)[key] = value
    localStorage.setItem(`gg_admin_${key}`, String(value))
  }

  function addAnnouncement(text: string, type: string) {
    const a = { id: Date.now().toString(), text, type, active: true }
    announcements.value.unshift(a)
    save()
  }

  function removeAnnouncement(id: string) {
    announcements.value = announcements.value.filter(a => a.id !== id)
    save()
  }

  function addAsset(name: string, type: string, url: string) {
    uploadedAssets.value.unshift({ name, type, url, date: new Date().toLocaleDateString() })
    save()
  }

  function addQuestion(q: any) {
    customQuestions.value.unshift(q)
    localStorage.setItem('gg_admin_custom_q', JSON.stringify(customQuestions.value))
  }

  function removeQuestion(id: string) {
    customQuestions.value = customQuestions.value.filter((q: any) => q.id !== id)
    localStorage.setItem('gg_admin_custom_q', JSON.stringify(customQuestions.value))
  }

  function addInterviewQuestion(q: any) {
    interviewQuestions.value.unshift(q)
    localStorage.setItem('gg_admin_interview_q', JSON.stringify(interviewQuestions.value))
  }

  function removeInterviewQuestion(id: string) {
    interviewQuestions.value = interviewQuestions.value.filter((q: any) => q.id !== id)
    localStorage.setItem('gg_admin_interview_q', JSON.stringify(interviewQuestions.value))
  }

  // Per-planet case studies uploaded by admin
  function getPlanetCases(planetId: string): any[] {
    try { return JSON.parse(localStorage.getItem(`gg_planet_cases_${planetId}`) || '[]') } catch { return [] }
  }

  function addPlanetCases(planetId: string, cases: any[]) {
    const existing = getPlanetCases(planetId)
    const existingIds = new Set(existing.map((c: any) => c.id))
    const fresh = cases.filter(c => !existingIds.has(c.id))
    const merged = [...fresh, ...existing]
    localStorage.setItem(`gg_planet_cases_${planetId}`, JSON.stringify(merged))
  }

  function removePlanetCase(planetId: string, caseId: string) {
    const existing = getPlanetCases(planetId).filter((c: any) => c.id !== caseId)
    localStorage.setItem(`gg_planet_cases_${planetId}`, JSON.stringify(existing))
  }

  function updatePlanet(id: string, data: any) {
    const idx = customPlanets.value.findIndex((p: any) => p.id === id)
    if (idx !== -1) {
      customPlanets.value[idx] = { ...customPlanets.value[idx], ...data }
      localStorage.setItem('gg_admin_planets', JSON.stringify(customPlanets.value))
    }
  }

  function save() {
    localStorage.setItem('gg_admin_assets', JSON.stringify(uploadedAssets.value))
    localStorage.setItem('gg_admin_ann', JSON.stringify(announcements.value))
  }

  const stats = ref({
    totalLearners: 2847,
    activeToday: 342,
    questionsAnswered: 158340,
    avgScore: 74,
    topPlanet: 'Git',
    completionRate: 68
  })

  return {
    customPlanets, customQuestions, interviewQuestions, uploadedAssets, announcements,
    siteSettings, stats,
    updateSetting, addAnnouncement, removeAnnouncement, addAsset,
    addQuestion, removeQuestion, addInterviewQuestion, removeInterviewQuestion, updatePlanet,
    getPlanetCases, addPlanetCases, removePlanetCase
  }
})
