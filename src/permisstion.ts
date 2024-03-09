// 路由鉴权，项目当中的路由是否可以访问
import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { notification } from 'ant-design-vue'
// 获取用户token数据，去判断用户是否登录成功
import pinia from './store'
import useUserStore from './store/modules/user'

NProgress.configure({ showSpinner: false })
const userStore = useUserStore(pinia)

// 全局首位：项目当中任意路由切换都会触发的钩子
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  // to:你将要访问的路由
  // from:你从哪个路由而来
  // next: 一定要调用这个next(),表示允许通过
  NProgress.start()
  // 获取token,去判断用户登录，还是未登录
  const token = userStore.token
  // 获取用户名称
  const username = userStore.username
  if (token) {
    // 登录成功，访问login，不能访问，指向首页
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 登录成功，访问除了登录页的其他页面
      // 有用户信息
      if (username) {
        next()
      } else {
        // 如果没有用户信息，则去获取用户信息
        try {
          // 获取用户信息
          await userStore.userInfo()
          next()
        } catch (error) {
          // token过期了，或者用户手动修改了token
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
          notification.error({
            message: '登录失效',
            description: `登录已过期，请重新登录`,
          })
        }
      }
    }
  } else {
    // 用户未登录判断
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})
// 全局后置守卫
router.afterEach((to) => {
  document.title = to.meta.title as string
  NProgress.done()
})
