<template>
  <div class="relative min-h-screen bg-[#030609] overflow-hidden">
    <NavBar v-if="auth.isLoggedIn" />
    <AchievementToast />
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import NavBar from './components/ui/NavBar.vue'
import AchievementToast from './components/ui/AchievementToast.vue'
import { useAuthStore } from './stores/auth'
import { useAudioStore } from './stores/audio'

const auth = useAuthStore()
const audioStore = useAudioStore()

onMounted(() => {
  // Auto-init audio on first interaction
  const start = () => { audioStore.init(); document.removeEventListener('click', start) }
  document.addEventListener('click', start)
})
</script>
