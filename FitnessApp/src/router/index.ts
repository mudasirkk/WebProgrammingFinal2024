import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/index',
      name: 'index',
      component: () => import('../pages/index.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../pages/AdminView.vue')
    },
    {
      path: '/friends',
      name: 'friends',
      component: () => import('../pages/FriendsView.vue')
    },
    {
      path: '/people',
      name: 'people',
      component: () => import('../pages/PeopleSearch.vue')
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: () => import('../pages/StatisticsView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/AboutView.vue')
    }
  ]
})

export default router
