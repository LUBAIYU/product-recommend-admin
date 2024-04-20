import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/common/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/common/RegisterView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/index.vue'),
      children: [
        {
          path: 'person',
          name: 'person',
          component: () => import('../views/common/PersonView.vue')
        },
        {
          path: 'manage',
          name: 'manage',
          component: () => import('../views/admin/UserManage.vue')
        }
      ]
    }
  ]
})

export default router
