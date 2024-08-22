import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/AdminLayout.vue'),
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

export default router
