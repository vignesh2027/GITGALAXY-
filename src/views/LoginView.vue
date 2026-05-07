<template>
  <div class="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
    <SubtleBackground />

    <div class="relative z-10 w-full max-w-4xl px-6 py-12">
      <!-- Header -->
      <div class="text-center mb-14">
        <div class="inline-flex items-center gap-3 mb-5">
          <div class="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-2xl">🌌</div>
          <h1 class="font-orbitron text-4xl font-black tracking-wider text-white">GITGALAXY</h1>
        </div>
        <p class="font-terminal text-white/40 text-sm tracking-[0.3em] uppercase">
          The Infinite Learning Cosmos
        </p>
        <div class="mt-4 h-px w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto" />
      </div>

      <!-- Login cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">

        <!-- Learner card -->
        <div class="login-card group" @click="showLearnerForm = true">
          <div class="login-card-inner">
            <div class="login-icon learner-icon">🧑‍🚀</div>
            <h2 class="font-orbitron text-xl font-bold text-white mb-2">LEARNER</h2>
            <p class="text-white/50 font-space text-sm leading-relaxed mb-5">
              Start your cosmic journey. Explore planets, play games, and master engineering skills.
            </p>
            <div class="features">
              <span v-for="f in learnerFeatures" :key="f" class="feature-tag">{{ f }}</span>
            </div>
            <div class="login-btn learner-btn mt-6">
              🚀 ENTER AS LEARNER
            </div>
          </div>
        </div>

        <!-- Admin card -->
        <div class="login-card group" @click="showAdminForm = true">
          <div class="login-card-inner">
            <div class="login-icon admin-icon">🛸</div>
            <h2 class="font-orbitron text-xl font-bold text-white mb-2">ADMIN</h2>
            <p class="text-white/50 font-space text-sm leading-relaxed mb-5">
              Mission Control Panel. Manage content, learners, analytics, and the entire galaxy.
            </p>
            <div class="features">
              <span v-for="f in adminFeatures" :key="f" class="feature-tag admin-tag">{{ f }}</span>
            </div>
            <div class="login-btn admin-btn mt-6">
              🔐 MISSION CONTROL
            </div>
          </div>
        </div>
      </div>

      <!-- Demo note -->
      <p class="text-center text-white/25 font-terminal text-xs mt-8 tracking-wider">
        DEMO PLATFORM · ALL PROGRESS SAVED LOCALLY
      </p>
    </div>

    <!-- Learner form modal -->
    <Transition name="modal-pop">
      <div v-if="showLearnerForm" class="fixed inset-0 z-50 flex items-center justify-center px-6"
           style="background:rgba(3,6,9,0.92)">
        <div class="modal-box w-full max-w-sm">
          <div class="text-4xl mb-5 text-center">🧑‍🚀</div>
          <h3 class="font-orbitron text-lg font-bold text-white text-center mb-1">JOIN AS LEARNER</h3>
          <p class="text-white/40 font-space text-xs text-center mb-6">No account needed — just enter your name</p>

          <label class="label-text">Your Name (optional)</label>
          <input
            v-model="learnerName"
            class="input-field mb-2"
            placeholder="Space Explorer..."
            @keyup.enter="doLearnerLogin"
            maxlength="30"
          />
          <p class="text-white/30 font-terminal text-xs mb-6">Leave blank to stay anonymous</p>

          <button class="login-btn learner-btn w-full mb-3" @click="doLearnerLogin">
            🚀 LAUNCH JOURNEY
          </button>
          <button class="text-white/30 hover:text-white/60 text-xs font-space transition-colors block w-full text-center"
                  @click="showLearnerForm = false">
            ← Back
          </button>
        </div>
      </div>
    </Transition>

    <!-- Admin form modal -->
    <Transition name="modal-pop">
      <div v-if="showAdminForm" class="fixed inset-0 z-50 flex items-center justify-center px-6"
           style="background:rgba(3,6,9,0.92)">
        <div class="modal-box w-full max-w-sm">
          <div class="text-4xl mb-5 text-center">🛸</div>
          <h3 class="font-orbitron text-lg font-bold text-white text-center mb-1">MISSION CONTROL</h3>
          <p class="text-white/40 font-space text-xs text-center mb-6">Admin access required</p>

          <label class="label-text">Admin Password</label>
          <input
            v-model="adminPassword"
            type="password"
            class="input-field mb-1"
            placeholder="Enter password..."
            @keyup.enter="doAdminLogin"
          />
          <p v-if="adminError" class="text-red-400 text-xs font-terminal mb-4">✕ Incorrect password</p>
          <p v-else class="mb-6"></p>

          <button class="login-btn admin-btn w-full mb-3" @click="doAdminLogin">
            🔐 ACCESS CONTROL
          </button>
          <button class="text-white/30 hover:text-white/60 text-xs font-space transition-colors block w-full text-center"
                  @click="showAdminForm = false; adminError = false">
            ← Back
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SubtleBackground from '../components/space/SubtleBackground.vue'
import { useAuthStore } from '../stores/auth'
import { useAudioStore } from '../stores/audio'

const router = useRouter()
const auth = useAuthStore()
const audioStore = useAudioStore()

const showLearnerForm = ref(false)
const showAdminForm = ref(false)
const learnerName = ref('')
const adminPassword = ref('')
const adminError = ref(false)

const learnerFeatures = ['10 Planets', '3 Games', 'XP System', 'Achievements', 'Quiz Arena']
const adminFeatures = ['Content Mgr', 'Bulk Upload', 'Analytics', 'Announcements', 'Planet Editor']

function doLearnerLogin() {
  audioStore.playUI('success')
  auth.loginLearner(learnerName.value.trim())
  router.push('/learner-home')
}

function doAdminLogin() {
  audioStore.playUI('click')
  if (auth.loginAdmin(adminPassword.value)) {
    adminError.value = false
    router.push('/admin-home')
  } else {
    adminError.value = true
    audioStore.playUI('error')
  }
}
</script>

<style scoped>
.login-card {
  background: rgba(3, 6, 9, 0.8);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}
.login-card:hover {
  border-color: rgba(255,255,255,0.18);
  transform: translateY(-4px);
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}
.login-card-inner { padding: 2rem; }

.login-icon {
  font-size: 3rem; margin-bottom: 1.25rem;
  width: 72px; height: 72px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.3s ease;
}
.login-card:hover .login-icon { transform: scale(1.1) rotate(-5deg); }

.learner-icon { background: rgba(0,245,255,0.08); border: 1px solid rgba(0,245,255,0.2); }
.admin-icon   { background: rgba(123,97,255,0.08); border: 1px solid rgba(123,97,255,0.2); }

.features { display: flex; flex-wrap: wrap; gap: 6px; }
.feature-tag {
  font-family: 'Share Tech Mono', monospace;
  font-size: 10px;
  padding: 3px 8px;
  border-radius: 20px;
  background: rgba(0,245,255,0.07);
  color: rgba(0,245,255,0.7);
  border: 1px solid rgba(0,245,255,0.15);
}
.admin-tag {
  background: rgba(123,97,255,0.07);
  color: rgba(123,97,255,0.8);
  border-color: rgba(123,97,255,0.15);
}

.login-btn {
  font-family: 'Orbitron', monospace;
  font-size: 12px; font-weight: 700;
  padding: 12px 24px;
  border-radius: 10px;
  border: 1px solid;
  cursor: pointer;
  transition: all 0.25s ease;
  text-align: center;
  display: block;
  letter-spacing: 0.05em;
}
.learner-btn {
  border-color: rgba(0,245,255,0.4);
  color: #00F5FF;
  background: rgba(0,245,255,0.06);
}
.learner-btn:hover { background: rgba(0,245,255,0.12); border-color: #00F5FF; box-shadow: 0 0 20px rgba(0,245,255,0.2); }
.admin-btn {
  border-color: rgba(123,97,255,0.4);
  color: #7B61FF;
  background: rgba(123,97,255,0.06);
}
.admin-btn:hover { background: rgba(123,97,255,0.12); border-color: #7B61FF; box-shadow: 0 0 20px rgba(123,97,255,0.2); }

.modal-box {
  background: rgba(5, 8, 16, 0.97);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  padding: 2.5rem;
}
.label-text {
  display: block;
  font-family: 'Share Tech Mono', monospace;
  font-size: 11px;
  color: rgba(255,255,255,0.4);
  margin-bottom: 8px;
  letter-spacing: 0.1em;
}
.input-field {
  width: 100%;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  padding: 10px 14px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 14px;
  color: rgba(255,255,255,0.85);
  outline: none;
  transition: border-color 0.2s;
  display: block;
}
.input-field:focus { border-color: rgba(0,245,255,0.4); }

.modal-pop-enter-active { animation: pop-modal 0.3s cubic-bezier(0.34,1.56,0.64,1); }
.modal-pop-leave-active { animation: pop-modal 0.2s ease reverse; }
@keyframes pop-modal { from { opacity:0; transform:scale(0.92); } to { opacity:1; transform:scale(1); } }
</style>
