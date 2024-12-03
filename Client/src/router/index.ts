import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../pages/index.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../pages/User.vue')
    },
    {
      path: '/friends',
      name: 'friends',
      component: () => import('../pages/Friends.vue')
    },
    {
      path: '/people',
      name: 'people',
      component: () => import('../pages/People.vue')
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: () => import('../pages/Statistics.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../pages/Signup.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../pages/About.vue')
    }
  ]
})

export default router
