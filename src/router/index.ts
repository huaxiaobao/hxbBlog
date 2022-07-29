import { createRouter, createWebHashHistory, RouteRecordRaw, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'dashboard',
    redirect: 'home',
    meta: {
      title: '首页',
      // keepAlive: true,
      // requireAuth: false
    },
    component: () => import('@/views/dashboard/index.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          title: '首页',
          // keepAlive: true,
          // requireAuth: false
        },
        component: () => import('@/views/home/index.vue')
      },
      {
        path: 'link',
        name: 'link',
        meta: {
          title: '链接',
          // keepAlive: true,
          // requireAuth: false
        },
        component: () => import('@/views/link/index.vue')
      },

      {
        path: 'article',
        name: 'article',
        meta: {
          title: '文章',
          // keepAlive: true,
          // requireAuth: false
        },
        component: () => import('@/views/article/index.vue')
      },
      {
        path: 'about',
        name: 'about',
        meta: {
          title: '关于',
          // keepAlive: true,
          // requireAuth: false
        },
        component: () => import('@/views/about/index.vue')
      },
      {
        path: 'remark',
        name: 'remark',
        meta: {
          title: '留言',
          // keepAlive: true,
          // requireAuth: false
        },
        component: () => import('@/views/remark/index.vue')
      },
      {
        path: 'user',
        name: 'User',
        meta: {
          title: '个人信息',
          // keepAlive: true,
          // requireAuth: false
        },
        component: () => import('@/views/userForm/index.vue')
      },
    ]


  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
export default router;