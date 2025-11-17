import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/components/LoginPage.vue'
import Layout from '@/layouts/Layout.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: {
      title: '登录',
      requiresAuth: false,
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: Layout,
    meta: {
      title: '主页',
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: {
          title: '仪表盘',
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/login',
    meta: {
      title: '页面未找到',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 路由守卫 - 可以在这里添加登录验证逻辑
router.beforeEach((to, _from, next) => {
  try {
    // 设置页面标题
    if (to.meta?.title) {
      document.title = `${to.meta.title} - Monorepo Test`
    }

    // 这里可以添加权限验证逻辑
    // 例如检查用户登录状态
    // const isAuthenticated = checkAuth()

    // if (to.meta.requiresAuth && !isAuthenticated) {
    //   next('/login')
    // } else {
    //   next()
    // }

    next()
  } catch (error) {
    console.error('Route guard error:', error)
    next()
  }
})

export default router
