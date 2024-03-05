// 对外暴漏配置路由(常量路由)
export const constantRoute = [
  {
    // 测试
    path: '/test',
    component: () => import('@/views/test/index.vue'),
    name: 'test',
  },
  {
    // 登录
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
  },
  {
    // 登录成功以后展示数据的路由
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
      },
    ],
  },
  {
    // 404
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
  },
]
