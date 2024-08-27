import { useStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/Home.vue')
        },
        {
          path: '/movies',
          name: 'movies-create',
          component: () => import('@/views/MovieForm.vue')
        },
        {
          path: '/movies/:id/edit',
          name: 'movies-update',
          component: () => import('@/views/MovieForm.vue')
        },
        {
          path: '/movies/:id/show',
          name: 'movies-show',
          component: () => import('@/views/MovieDetails.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('@/views/Profile.vue')
        }
      ]
    },

    {
      path: '/login',
      redirect: { name: 'login' }
    },
    {
      path: '/auth',
      component: () => import('@/layouts/AuthLayout.vue'),
      meta: { requiresUnauth: true },
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/Login.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/Register.vue')
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const { getCurrentUser } = useStore()

  const user = await getCurrentUser()

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresUnauth = to.matched.some(record => record.meta.requiresUnauth)

  if (requiresAuth && !user) next({ name: 'login' })
  else if (requiresUnauth && user) next({ name: 'home' })
  else next()
})

export default router
