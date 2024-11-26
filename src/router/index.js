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
        },{
          path:'/category/:id',
          component:() => import('@/views/category/index.vue')
        }
      ]
    }
  ],
})

export default router
