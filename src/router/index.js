import { createRouter, createWebHistory } from 'vue-router'
import UserInfo from '@/views/member/components/userInfo.vue'
import UserOrder from '@/views/member/components/userOrder.vue'
import ErrorMessage from '@/components/errorMessage.vue'
import { useUserInfoStore } from '@/stores'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      component: () => import('@/views/layOut/index.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/home/index.vue')
        }, {
          path: '/category/:id',
          component: () => import('@/views/category/index.vue')
        }, {
          path: '/category/other/:id',
          component: () => import('@/views/sonCategory/index.vue')
        },
        {
          path: '/detail/:id',
          component: () => import('@/views/detail/index.vue')
        }, {
          path: '/carts/detail',
          component: () => import('@/views/cartListDetail/index.vue')
        }, {
          path: '/pay',
          component: () => import('@/views/payDetail/payDetail.vue')
        }, {
          path: '/payorder',
          component: () => import('@/views/payDetail/payOrder.vue')
        },
        {
          path: '/payback',
          component: () => import('@/views/payDetail/payBack.vue')
        },
        {
          path: '/member',
          component: () => import('@/views/member/index.vue'),
          redirect: '/member/userinfo',
          children: [
            {
              path: '/member/userinfo',
              component: UserInfo
            },
            {
              path: '/member/userorder',
              component: UserOrder
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/error',
      component: ErrorMessage
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/error'
    },

  ],
  // 切换路由返回顶部
  scrollBehavior() {
    return { top: 0 }
  }
})
// 路由守卫
const pathViews = ['/pay', '/userinfo', '/userorder']
router.beforeEach((to, from, next) => {
  const userStore = useUserInfoStore()
  if (!pathViews.includes(to.path)) {
    next()
    return
  }

  if (userStore.userInfo.token) {
    next()
  }
  else {
    window.confirm('需要登录才能访问重要路由！')
    next('/login')
    return false
  }
  
})
export default router
