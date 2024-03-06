// 对外暴漏配置路由(常量路由)
export const constantRoute = [
  {
    // 测试
    path: '/test',
    component: () => import('@/views/test/index.vue'),
    name: 'test',
    meta: {
      title: '测试',
      icon: 'HomeOutlined',
    },
    children: [
      // 系统管理
      {
        path: '/system',
        component: () => import('@/views/test/index.vue'),
        name: 'system',
        meta: {
          title: '系统管理',
        },
        children: [
          // 抖音抓单
          {
            path: '/douyin',
            component: () => import('@/views/test/index.vue'),
            name: 'douyin',
            meta: {
              title: '抖音抓单',
            },
          },
        ],
      },
      // 用户管理
      {
        path: '/user',
        component: () => import('@/views/test/index.vue'),
        name: 'user',
        meta: {
          title: '用户管理',
        },
      },
    ],
  },
  {
    // 登录
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: '登录',
    },
  },
  {
    // 登录成功以后展示数据的路由
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
      title: '主页',
    },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: {
          title: '首页',
        },
      },
    ],
  },
  {
    // 404
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '任意路由',
    },
  },
]
