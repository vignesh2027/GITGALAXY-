<template>
  <div class="relative min-h-screen overflow-auto" style="background:#030609">
    <SubtleBackground />
    <div class="relative z-10 pt-20 pb-16 px-6 max-w-5xl mx-auto">

      <!-- Header -->
      <div class="text-center mb-10">
        <p class="font-terminal text-white/40 text-xs tracking-widest mb-2">── COMMUNITY ──</p>
        <h1 class="font-orbitron text-3xl font-black text-white mb-2">DISCUSSIONS</h1>
        <p class="text-white/40 font-space text-sm">Ask. Answer. Learn. Grow together.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">

        <!-- Sidebar -->
        <div class="space-y-4">
          <button class="w-full py-3 px-4 rounded-xl border border-neon-cyan/40 text-neon-cyan
                         font-orbitron text-xs font-bold hover:bg-neon-cyan/10 transition-all"
                  @click="showNewThread = true; audio.click()">
            + NEW THREAD
          </button>

          <div class="dark-card p-4">
            <h3 class="font-orbitron text-xs font-bold text-white/50 mb-3">CATEGORIES</h3>
            <div class="space-y-1.5">
              <button v-for="cat in categories" :key="cat.id"
                      class="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all"
                      :class="activeCategory === cat.id
                        ? 'bg-white/8 text-white border border-white/12'
                        : 'text-white/50 hover:text-white/80 hover:bg-white/4'"
                      @click="activeCategory = cat.id; audio.click()">
                <span>{{ cat.icon }}</span>
                <span class="font-space">{{ cat.label }}</span>
                <span class="ml-auto font-terminal text-xs text-white/30">{{ countByCategory(cat.id) }}</span>
              </button>
            </div>
          </div>

          <div class="dark-card p-4">
            <h3 class="font-orbitron text-xs font-bold text-white/50 mb-3">TRENDING TAGS</h3>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="t in trendingTags" :key="t"
                    class="px-2 py-0.5 rounded-full text-xs font-terminal text-white/50 bg-white/5 border border-white/8 cursor-pointer hover:border-white/20">
                #{{ t }}
              </span>
            </div>
          </div>
        </div>

        <!-- Thread list / detail -->
        <div class="lg:col-span-3 space-y-4">
          <!-- Search -->
          <div class="dark-card flex items-center gap-3 px-4 py-3">
            <span class="text-white/30">🔍</span>
            <input v-model="search" class="flex-1 bg-transparent text-sm font-space text-white/80 outline-none placeholder-white/25"
                   placeholder="Search discussions..." />
          </div>

          <!-- Active thread detail -->
          <div v-if="activeThread" class="space-y-4">
            <button class="flex items-center gap-2 text-white/40 hover:text-white/70 font-space text-sm transition-colors"
                    @click="activeThread = null; audio.click()">
              ← Back to threads
            </button>

            <div class="dark-card p-6">
              <div class="flex items-start gap-4 mb-5">
                <div class="w-10 h-10 rounded-full bg-neon-cyan/15 flex items-center justify-center
                            font-orbitron text-sm font-bold text-neon-cyan flex-shrink-0">
                  {{ activeThread.author[0] }}
                </div>
                <div class="flex-1">
                  <div class="flex flex-wrap items-center gap-2 mb-1">
                    <span class="px-2 py-0.5 rounded-full text-xs font-terminal"
                          :style="getCatStyle(activeThread.category)">
                      {{ getCatLabel(activeThread.category) }}
                    </span>
                    <span class="text-white/30 text-xs font-terminal">{{ activeThread.author }} · {{ activeThread.time }}</span>
                  </div>
                  <h2 class="font-orbitron text-base font-bold text-white mb-3">{{ activeThread.title }}</h2>
                  <p class="text-white/65 font-space text-sm leading-relaxed">{{ activeThread.body }}</p>
                  <div class="flex items-center gap-4 mt-4">
                    <button class="flex items-center gap-1.5 text-xs font-terminal text-white/40 hover:text-neon-cyan transition-colors"
                            @click="upvote(activeThread)">
                      ▲ {{ activeThread.upvotes }}
                    </button>
                    <span class="text-white/20 text-xs font-terminal">{{ activeThread.replies.length }} replies</span>
                  </div>
                </div>
              </div>

              <!-- Replies -->
              <div v-if="activeThread.replies.length > 0" class="border-t border-white/6 pt-5 space-y-4">
                <div v-for="r in activeThread.replies" :key="r.id"
                     class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-full bg-plasma-purple/15 flex items-center justify-center
                              font-orbitron text-xs font-bold text-plasma-purple flex-shrink-0">
                    {{ r.author[0] }}
                  </div>
                  <div class="flex-1 bg-white/3 rounded-xl p-4">
                    <p class="font-terminal text-xs text-white/40 mb-2">{{ r.author }} · {{ r.time }}</p>
                    <p class="text-white/70 font-space text-sm leading-relaxed">{{ r.body }}</p>
                    <button class="mt-2 text-xs font-terminal text-white/30 hover:text-github-green transition-colors"
                            @click="upvote(r)">
                      ▲ {{ r.upvotes }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Reply form -->
              <div class="border-t border-white/6 pt-5 mt-5">
                <p class="font-orbitron text-xs text-white/50 mb-3">WRITE A REPLY</p>
                <textarea v-model="replyText" rows="3" placeholder="Share your knowledge..."
                          class="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-sm
                                 font-space text-white/80 outline-none resize-none placeholder-white/25 mb-3" />
                <button class="px-6 py-2.5 rounded-xl border border-neon-cyan/40 text-neon-cyan font-orbitron text-xs font-bold
                               hover:bg-neon-cyan/10 transition-all" @click="submitReply">
                  POST REPLY →
                </button>
              </div>
            </div>
          </div>

          <!-- Thread list -->
          <div v-else class="space-y-3">
            <div v-if="filteredThreads.length === 0" class="text-center py-16 text-white/30">
              <div class="text-5xl mb-4">💬</div>
              <p class="font-space">No threads yet. Be the first!</p>
            </div>
            <div v-for="t in filteredThreads" :key="t.id"
                 class="dark-card p-5 cursor-pointer hover:border-white/15 transition-all"
                 @click="activeThread = t; audio.click()">
              <div class="flex items-start gap-4">
                <div class="flex-1 min-w-0">
                  <div class="flex flex-wrap items-center gap-2 mb-2">
                    <span class="px-2 py-0.5 rounded-full text-xs font-terminal"
                          :style="getCatStyle(t.category)">
                      {{ getCatLabel(t.category) }}
                    </span>
                    <span class="text-white/30 text-xs font-terminal">{{ t.author }} · {{ t.time }}</span>
                  </div>
                  <h3 class="font-orbitron text-sm font-bold text-white/85 mb-2">{{ t.title }}</h3>
                  <p class="text-white/50 font-space text-xs leading-relaxed line-clamp-2">{{ t.body }}</p>
                  <div class="flex items-center gap-4 mt-3">
                    <span class="text-xs font-terminal text-white/35">▲ {{ t.upvotes }}</span>
                    <span class="text-xs font-terminal text-white/35">💬 {{ t.replies.length }}</span>
                    <div class="flex gap-1.5 flex-wrap">
                      <span v-for="tag in t.tags.slice(0,3)" :key="tag"
                            class="px-1.5 py-0.5 rounded text-xs font-terminal text-white/30 bg-white/5">
                        #{{ tag }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- New thread modal -->
    <Transition name="modal-pop">
      <div v-if="showNewThread" class="fixed inset-0 z-50 flex items-center justify-center px-6"
           style="background:rgba(3,6,9,0.92)">
        <div class="w-full max-w-lg bg-space-dark border border-white/10 rounded-2xl p-7"
             style="background:rgba(5,8,16,0.97)">
          <h3 class="font-orbitron text-lg font-bold text-white mb-5">NEW THREAD</h3>
          <div class="space-y-4">
            <div>
              <label class="label-sm">Title</label>
              <input v-model="newThread.title" class="input-dark" placeholder="What's your question?" />
            </div>
            <div>
              <label class="label-sm">Category</label>
              <select v-model="newThread.category" class="input-dark">
                <option v-for="c in categories.slice(1)" :key="c.id" :value="c.id" class="bg-gray-900">{{ c.label }}</option>
              </select>
            </div>
            <div>
              <label class="label-sm">Description</label>
              <textarea v-model="newThread.body" rows="4" class="input-dark resize-none"
                        placeholder="Describe your question or topic..." />
            </div>
            <div>
              <label class="label-sm">Tags (comma separated)</label>
              <input v-model="newThread.tagsInput" class="input-dark" placeholder="git, merge, conflict" />
            </div>
          </div>
          <div class="flex gap-3 mt-5">
            <button class="flex-1 py-2.5 rounded-xl border border-neon-cyan/40 text-neon-cyan font-orbitron text-xs font-bold hover:bg-neon-cyan/10 transition-all"
                    @click="submitThread">POST THREAD</button>
            <button class="px-5 py-2.5 rounded-xl border border-white/10 text-white/40 font-space text-sm hover:text-white/70 transition-all"
                    @click="showNewThread = false">Cancel</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SubtleBackground from '../components/space/SubtleBackground.vue'
import { useAuthStore } from '../stores/auth'
import { useAudio } from '../composables/useAudio'

const auth = useAuthStore()
const audio = useAudio()

interface Reply { id: string; author: string; body: string; time: string; upvotes: number }
interface Thread {
  id: string; title: string; body: string; author: string; time: string
  category: string; tags: string[]; upvotes: number; replies: Reply[]
}

const showNewThread = ref(false)
const activeThread = ref<Thread | null>(null)
const search = ref('')
const activeCategory = ref('all')
const replyText = ref('')
const newThread = ref({ title: '', category: 'git', body: '', tagsInput: '' })

const categories = [
  { id: 'all',      icon: '🌌', label: 'All',          color: '#EAFBFF' },
  { id: 'git',      icon: '🌿', label: 'Git',           color: '#39FF14' },
  { id: 'github',   icon: '🐙', label: 'GitHub',        color: '#00F5FF' },
  { id: 'linux',    icon: '🐧', label: 'Linux',         color: '#FFB703' },
  { id: 'cloud',    icon: '☁️', label: 'Cloud',         color: '#00FFB3' },
  { id: 'devops',   icon: '⚙️', label: 'DevOps',        color: '#7B61FF' },
  { id: 'security', icon: '🛡️', label: 'Security',      color: '#FF3366' },
  { id: 'general',  icon: '💬', label: 'General',       color: '#FFB703' }
]

const trendingTags = ['git-rebase','merge-conflict','docker','linux-permissions','sql-injection','kubernetes','cors','jwt','caching','microservices']

function safeParseThreads(): Thread[] {
  try { return JSON.parse(localStorage.getItem('gg_threads') || 'null') || [] } catch { return [] }
}

const storedThreads = ref<Thread[]>(safeParseThreads().length ? safeParseThreads() : [
  {
    id: 't001', title: 'What is the difference between git rebase and git merge?',
    body: 'I keep seeing both mentioned but I\'m confused about when to use each one. Can someone explain with a real-world example?',
    author: 'NovaStar', time: '2h ago', category: 'git', tags: ['git-rebase', 'merge', 'workflow'],
    upvotes: 24,
    replies: [
      { id: 'r001', author: 'CosmicDev', body: 'Great question! Merge creates a merge commit preserving full history. Rebase rewrites your commits on top of the target branch for a linear, cleaner history. Rule of thumb: rebase for local feature branches (before PR), merge for integrating shared/main branches.', time: '1h ago', upvotes: 18 },
      { id: 'r002', author: 'GalacticEng', body: 'Never rebase commits you\'ve already pushed to a shared branch — it rewrites SHAs and causes chaos for other contributors!', time: '45m ago', upvotes: 12 }
    ]
  },
  {
    id: 't002', title: 'How do I undo a git commit that was already pushed?',
    body: 'I accidentally pushed a commit with sensitive data. What\'s the safest way to remove it from both local and remote?',
    author: 'StarCoder', time: '5h ago', category: 'git', tags: ['undo','push','sensitive-data'],
    upvotes: 31,
    replies: [
      { id: 'r003', author: 'SecurityPilot', body: 'For sensitive data: git revert (safe, creates new commit undoing changes), then consider the data compromised and rotate any credentials. git reset --hard + force push is destructive and dangerous on shared branches. Also check GitHub\'s secret scanning feature.', time: '4h ago', upvotes: 22 }
    ]
  },
  {
    id: 't003', title: 'chmod 777 vs 755 — when to use which?',
    body: 'I\'ve seen both used in tutorials. When is 777 appropriate and when should I use 755?',
    author: 'LinuxLearner', time: '1d ago', category: 'linux', tags: ['permissions','chmod','security'],
    upvotes: 19,
    replies: [
      { id: 'r004', author: 'KernelGuardian', body: '777 means everyone (owner, group, others) can read+write+execute. NEVER use 777 in production — it\'s a security hole. 755 is for executables/directories: owner can modify, others can read/execute. For web servers, 644 for files, 755 for directories is the standard.', time: '23h ago', upvotes: 29 }
    ]
  },
  {
    id: 't004', title: 'Why does my Docker container exit immediately?',
    body: 'I built a Docker image and when I run it, the container starts and immediately exits with code 0. What am I doing wrong?',
    author: 'ContainerNewbie', time: '3h ago', category: 'devops', tags: ['docker','container','debugging'],
    upvotes: 15,
    replies: [
      { id: 'r005', author: 'DockerVet', body: 'Code 0 means the process completed successfully — it didn\'t crash, it finished! Docker containers run as long as their main process (PID 1) runs. If you run a script that exits, the container exits. For long-running services, make sure you start a foreground process (not a daemon). Use `docker logs <id>` to check what ran.', time: '2h ago', upvotes: 20 }
    ]
  },
  {
    id: 't005', title: 'Best practices for securing environment variables?',
    body: 'I\'ve been storing API keys in .env files. Are there better ways for production?',
    author: 'CloudAppDev', time: '6h ago', category: 'security', tags: ['env-vars','secrets','security'],
    upvotes: 27,
    replies: [
      { id: 'r006', author: 'SecureArch', body: 'For production: use AWS Secrets Manager, HashiCorp Vault, or GCP Secret Manager. For Kubernetes: use Secrets (encrypted at rest). Never commit .env files — add them to .gitignore. Use git-secrets or truffleHog to scan for leaked keys. Rotate any key you suspect was exposed immediately.', time: '5h ago', upvotes: 33 }
    ]
  }
])

const filteredThreads = computed(() => {
  let list = storedThreads.value
  if (activeCategory.value !== 'all') list = list.filter(t => t.category === activeCategory.value)
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(t => t.title.toLowerCase().includes(q) || t.body.toLowerCase().includes(q))
  }
  return [...list].sort((a, b) => b.upvotes - a.upvotes)
})

function countByCategory(id: string) {
  return id === 'all' ? storedThreads.value.length : storedThreads.value.filter(t => t.category === id).length
}

function getCatStyle(cat: string) {
  const c = categories.find(c => c.id === cat)
  return c ? { background: c.color + '18', color: c.color, border: `1px solid ${c.color}35` } : {}
}

function getCatLabel(cat: string) {
  return categories.find(c => c.id === cat)?.label || cat
}

function upvote(item: any) { item.upvotes++; saveThreads() }

function submitReply() {
  if (!replyText.value.trim() || !activeThread.value) return
  activeThread.value.replies.push({
    id: 'r' + Date.now(),
    author: auth.learnerName || 'Anonymous',
    body: replyText.value.trim(),
    time: 'just now',
    upvotes: 0
  })
  replyText.value = ''
  audio.success()
  saveThreads()
}

function submitThread() {
  if (!newThread.value.title.trim()) return
  const t: Thread = {
    id: 't' + Date.now(),
    title: newThread.value.title.trim(),
    body: newThread.value.body.trim(),
    author: auth.learnerName || 'Anonymous',
    time: 'just now',
    category: newThread.value.category,
    tags: newThread.value.tagsInput.split(',').map(t => t.trim()).filter(Boolean),
    upvotes: 0,
    replies: []
  }
  storedThreads.value.unshift(t)
  showNewThread.value = false
  newThread.value = { title: '', category: 'git', body: '', tagsInput: '' }
  audio.success()
  saveThreads()
}

function saveThreads() {
  localStorage.setItem('gg_threads', JSON.stringify(storedThreads.value))
}
</script>

<style scoped>
.dark-card {
  background: rgba(5,8,16,0.85);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 14px;
  backdrop-filter: blur(20px);
}
.label-sm {
  display: block;
  font-family: 'Share Tech Mono', monospace;
  font-size: 11px; color: rgba(255,255,255,0.4);
  margin-bottom: 6px; letter-spacing: 0.1em;
}
.input-dark {
  width: 100%;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px; padding: 10px 14px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 14px; color: rgba(255,255,255,0.85);
  outline: none; display: block;
}
.input-dark:focus { border-color: rgba(0,245,255,0.35); }
.modal-pop-enter-active { animation: pop-modal 0.3s cubic-bezier(0.34,1.56,0.64,1); }
.modal-pop-leave-active { animation: pop-modal 0.2s ease reverse; }
@keyframes pop-modal { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
</style>
