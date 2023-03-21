
import getPageTitle from './utils/pageTitle';
//路由拦截
import router from '@/router/index'
import { userInfoStore } from '@/store/user'
import { ElLoading } from 'element-plus'
let loadingInstance = null
router.beforeEach(async (to: any, from: any, next: any) => {

  //设置标题
  document.title = getPageTitle(to.meta)

  // loadingInstance = ElLoading.service({
  //   fullscreen: true,
  //   lock: true,
  //   text: '数据加载中 ......',
  //   background: 'rgba(0, 0, 0, 0.9)',
  // })
  //进入文章编辑权限路由
  if (to.path === '/ArticleEditor') {
    const userInfoStores = userInfoStore()
    const hasPermission = await userInfoStores.getPermission()

    if (hasPermission) { next() }
    else {
      router.push('/401')
    }

  }
  else {
    next()
  }
})

router.afterEach(() => {
  // setTimeout(() => {
  //   loadingInstance.close()
  // }, 1000);
})