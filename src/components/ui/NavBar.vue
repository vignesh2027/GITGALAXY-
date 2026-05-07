<template>
  <nav class="fixed top-0 left-0 right-0 z-40 px-5 py-3 flex items-center justify-between"
       :class="scrolled ? 'nav-glass' : ''"
       style="transition: background 0.3s ease">

    <!-- Logo -->
    <RouterLink :to="auth.isAdmin ? '/admin-home' : '/learner-home'"
                class="flex items-center gap-2.5 group">
      <div class="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-base
                  group-hover:border-white/40 transition-all duration-300">
        🌌
      </div>
      <span class="font-orbitron text-xs font-bold text-white/70 hidden sm:block tracking-wider">GITGALAXY</span>
    </RouterLink>

    <!-- Desktop links -->
    <div class="hidden md:flex items-center gap-1">
      <RouterLink v-for="item in currentNav" :key="item.path"
                  :to="item.path"
                  class="px-3 py-1.5 rounded-lg text-sm font-space text-white/50 hover:text-white/85
                         hover:bg-white/5 transition-all duration-200"
                  active-class="!text-white/90 !bg-white/8 border border-white/10"
                  @click="audio.click()">
        <span class="mr-1.5">{{ item.icon }}</span>{{ item.label }}
      </RouterLink>
    </div>

    <!-- Right controls -->
    <div class="flex items-center gap-2.5">
      <!-- XP pill (learner only) -->
      <div v-if="auth.isLearner"
           class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/8 bg-white/4 text-xs">
        <span class="font-terminal text-neon-cyan">Lv.{{ learner.level }}</span>
        <div class="w-14 h-1 bg-white/10 rounded-full overflow-hidden">
          <div class="h-full xp-bar-fill rounded-full" :style="{ width: learner.xpProgress + '%' }" />
        </div>
        <span class="font-terminal text-white/35">{{ learner.xp }}</span>
      </div>

      <!-- Admin badge -->
      <div v-if="auth.isAdmin"
           class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-plasma-purple/30 bg-plasma-purple/8 text-xs">
        <span class="font-terminal text-plasma-purple">🛸 ADMIN</span>
      </div>

      <!-- Mute -->
      <button class="w-7 h-7 flex items-center justify-center rounded-full border border-white/10
                     hover:border-white/25 transition-all text-xs"
              @click="audio.toggleMute()">
        {{ audio.muted.value ? '🔇' : '🔊' }}
      </button>

      <!-- Logout -->
      <button class="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/8
                     text-white/40 hover:text-white/70 hover:border-white/20 transition-all text-xs font-space"
              @click="logout">
        ← Exit
      </button>

      <!-- Mobile hamburger -->
      <button class="md:hidden p-1.5" @click="mobileOpen = !mobileOpen">
        <div v-for="i in 3" :key="i" class="w-5 h-0.5 bg-white/50 my-1 rounded transition-all" />
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition name="slide-down">
      <div v-if="mobileOpen"
           class="absolute top-full left-0 right-0 border-t border-white/8 p-4 md:hidden"
           style="background:rgba(3,6,9,0.97); backdrop-filter:blur(20px)">
        <RouterLink v-for="item in currentNav" :key="item.path" :to="item.path"
                    class="flex items-center gap-3 py-3 border-b border-white/5 last:border-0
                           text-sm text-white/60 hover:text-white/90 transition-colors"
                    @click="mobileOpen = false; audio.click()">
          <span>{{ item.icon }}</span><span>{{ item.label }}</span>
        </RouterLink>
        <button class="w-full mt-3 py-2.5 rounded-xl border border-white/10 text-white/40 font-space text-sm"
                @click="logout">← Logout</button>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useLearnerStore } from '../../stores/learner'
import { useAudio } from '../../composables/useAudio'

const auth = useAuthStore()
const learner = useLearnerStore()
const audio = useAudio()
const router = useRouter()
const scrolled = ref(false)
const mobileOpen = ref(false)

const learnerNav = [
  { path: '/learner-home', label: 'Home',         icon: '🏠' },
  { path: '/galaxy',       label: 'Galaxy',        icon: '🌌' },
  { path: '/games',        label: 'Games',         icon: '🎮' },
  { path: '/discussions',  label: 'Discuss',       icon: '💬' },
  { path: '/git-commands', label: 'Git Ref',       icon: '🌿' },
  { path: '/learner',      label: 'My Profile',    icon: '⭐' }
]

const adminNav = [
  { path: '/admin-home',   label: 'Dashboard',     icon: '📊' },
  { path: '/admin',        label: 'Content',        icon: '📝' },
  { path: '/galaxy',       label: 'Galaxy',         icon: '🌌' },
  { path: '/discussions',  label: 'Discussions',    icon: '💬' },
  { path: '/git-commands', label: 'Git Ref',        icon: '🌿' }
]

const currentNav = computed(() => auth.isAdmin ? adminNav : learnerNav)

function logout() {
  audio.click()
  auth.logout()
  router.push('/')
}

const onScroll = () => { scrolled.value = window.scrollY > 20 }
onMounted  (() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.nav-glass {
  background: rgba(3,6,9,0.9);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.25s ease; }
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; transform: translateY(-10px); }
</style>
