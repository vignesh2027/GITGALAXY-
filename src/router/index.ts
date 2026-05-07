import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/',             component: () => import('../views/LoginView.vue'),      name: 'login',        meta: { public: true } },
    { path: '/learner-home', component: () => import('../views/LearnerHomeView.vue'), name: 'learner-home', meta: { role: 'learner' } },
    { path: '/admin-home',   component: () => import('../views/AdminHomeView.vue'),   name: 'admin-home',   meta: { role: 'admin' } },
    { path: '/galaxy',       component: () => import('../views/GalaxyView.vue'),      name: 'galaxy',       meta: { auth: true } },
    { path: '/planet/:id',   component: () => import('../views/PlanetView.vue'),      name: 'planet',       meta: { auth: true } },
    { path: '/games',        component: () => import('../views/GamesView.vue'),        name: 'games',        meta: { auth: true } },
    { path: '/games/temple-run',   component: () => import('../views/TempleRunView.vue'),   name: 'temple-run',   meta: { auth: true } },
    { path: '/games/snake',        component: () => import('../views/SnakeView.vue'),        name: 'snake',        meta: { auth: true } },
    { path: '/games/space-combat', component: () => import('../views/SpaceCombatView.vue'), name: 'space-combat', meta: { auth: true } },
    { path: '/games/linus-race',   component: () => import('../views/LinusRaceView.vue'),   name: 'linus-race',   meta: { auth: true } },
    { path: '/admin',        component: () => import('../views/AdminView.vue'),        name: 'admin',        meta: { role: 'admin' } },
    { path: '/learner',      component: () => import('../views/LearnerView.vue'),      name: 'learner',      meta: { auth: true } },
    { path: '/discussions',  component: () => import('../views/DiscussionView.vue'),   name: 'discussions',  meta: { auth: true } },
    { path: '/git-commands', component: () => import('../views/GitCommandsView.vue'),  name: 'git-commands', meta: { auth: true } },
    { path: '/interview',    component: () => import('../views/InterviewView.vue'),    name: 'interview',    meta: { auth: true } },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

router.beforeEach((to, _from, next) => {
  const auth = useAuthStore()
  if (to.meta.public) { next(); return }
  if (!auth.isLoggedIn) { next('/'); return }
  if (to.meta.role === 'admin' && !auth.isAdmin) { next('/learner-home'); return }
  if (to.meta.role === 'learner' && !auth.isLearner) { next('/admin-home'); return }
  next()
})

export default router
