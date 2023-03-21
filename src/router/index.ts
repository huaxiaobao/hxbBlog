import { title } from 'process';
import { createRouter, createWebHashHistory, RouteRecordRaw, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'dashboard',
    redirect: 'home',
    meta: {
      title: '博客首页',
      // keepAlive: true,
      // requireAuth: false
    },
    component: () => import('@/Layout/index.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          title: '博客首页',
          // keepAlive: true,
          // requireAuth: false
        },
        component: () => import('@/views/dashbord/index.vue')
      },
      {
        path: 'article',
        name: 'article',
        meta: {
          title: '技术分享'
        },
        component: () => import('@/views/article/index.vue')
      },

      {
        path: 'chartRoom',
        name: 'chartRoom',
        meta: {
          title: '聊天室'
        },
        component: () => import('@/views/chartRoom/index.vue')
      },
      {
        path: 'musicWorkshop',
        name: 'musicWorkshop',
        meta: {
          title: '音乐坊'
        },
        component: () => import('@/views/musicWorkshop/index.vue')
      },
      {
        path: 'photoAlbum',
        name: 'photoAlbum',
        meta: {
          title: '相册',
        },
        component: () => import('@/views/photoAlbum/index.vue')
      },
      {
        path: 'friendlyChain',
        name: 'friendlyChain',
        meta: {
          title: '友链',
        },
        component: () => import('@/views/friendlyChain/index.vue')
      },
      {
        path: 'mySpace',
        name: 'mySpace',
        meta: {
          title: '我的空间',
        },
        component: () => import('@/views/mySpace/index.vue')

      },
      {
        path: 'blogTimeStamp',
        name: 'blogTimeStamp',
        meta: {
          title: '快乐时光轴',
        },
        component: () => import('@/views/blogTimeStamp/index.vue')
      },
      {
        path: 'user',
        name: 'User',
        meta: {
          title: '个人信息'
        },
        component: () => import('@/views/userForm/index.vue')
      },
      {
        path: 'articledetails',
        name: 'Articledetails',
        meta: { title: '文章详情' },
        component: () => import('@/views/articleDetails/index.vue')
      },
      {
        path: 'ArticleEditor',
        name: 'ArticleEditor',
        meta: { title: '文章编辑' },
        component: () => import('@/views/ArticleEditor/index.vue')
      },
      {
        path: 'management',
        name: 'Management',
        meta: { title: '后台管理' },
        component: () => import('@/views/backStageManagement/index.vue'),
        children: [
          {
            path: 'timeLine',
            name: 'TimeLine',
            meta: {
              title: '管理-时光轴',
            },
            component: () => import('@/views/backStageManagement/TimeLine.vue')
          }
        ]
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: { title: '登录' },
    component: () => import('@/views/loginPage/index.vue')
  },
  {
    path: '/chartRooms',
    name: 'ChartRooms',
    meta: { title: 'Chart--聊天室' },
    component: () => import('@/views/chartRoom/chartRoom.vue')
  },
  {
    path: '/401',
    name: 'NoRight',
    meta: { title: '暂无权限' },
    component: () => import('@/views/error-page/401.vue')
  },
  {
    path: '/404',
    name: '404',
    meta: { title: '404' },
    component: () => import('@/views/error-page/404.vue')
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 }
  }
});
export default router;