import { createRouter, createWebHistory } from 'vue-router'

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
          path:'/detail/:id',
          component:() => import('@/views/detail/index.vue')
        }
      ]
    }
  ],
  // 切换路由返回顶部
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
