// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
// 引入数据类型
import type {
  LoginForm,
  LoginResponseData,
  UserInfoResponseData,
} from '@/api/user/type'
import type { UserState } from './types/type'
// 引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
// 引入路由（常量路由）
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes'
import router from '@/router'

// 用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asyncRoute: any, routes: string[]) {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}

// 创建用户小仓库
const useUserStore = defineStore('user', {
  // 小仓库存储数据地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(), // 用户唯一标识token
      menuRoutes: constantRoute, //仓库存储生成菜单需要数组（路由）
      username: '',
    }
  },
  // 异步|逻辑的地方
  actions: {
    // 用户登录的方法
    async userLogin(data: LoginForm) {
      const result: LoginResponseData = await reqLogin(data)
      // 登录请求：成功200->token
      // 登录请求：失败201->错误信息
      if (result.code == 200) {
        // pinia仓库存储一下token
        // 由于pinia|vuex存储数据其实利用js对象
        this.token = result.data as string
        // 本地存储持久化存储一份
        SET_TOKEN(result.data as string)
        // 能保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    // 获取用户信息方法
    async userInfo() {
      // 获取用户信息进行存储仓库当中
      const result: UserInfoResponseData = await reqUserInfo()
      // 如果获取用户信息成功，存储一下用户信息
      if (result.code == 200) {
        this.username = result.data.name
        // 过滤异步路由
        const userAsyncRoute = filterAsyncRoute(asyncRoute, result.data.routes)
        console.log('userAsyncRoute :>> ', userAsyncRoute)
        console.log('asyncRoute :>> ', asyncRoute)
        console.log('result.data.routes :>> ', result.data.routes)
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute]
        //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
        ;[...userAsyncRoute, anyRoute].forEach((route: any) => {
          router.addRoute(route)
        })
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 退出登录
    async userLogout() {
      const result: any = await reqLogout()
      if (result.code == 200) {
        this.token = ''
        this.username = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})
// 对外暴漏获取小仓库方法
export default useUserStore
