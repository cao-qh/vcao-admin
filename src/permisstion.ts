// 路由鉴权，项目当中的路由是否可以访问
import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 全局首位：项目当中任意路由切换都会触发的钩子
// 全局前置守卫
router.beforeEach((to, from, next) => {
  // to:你将要访问的路由
  // from:你从哪个路由而来
  // next: 一定要调用这个next(),表示允许通过
  nprogress.start()
  next()
})
// 全局后置守卫
router.afterEach((to, from) => {
  nprogress.done()
})
