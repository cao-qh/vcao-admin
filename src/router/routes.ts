// 布局组件
import Layout from '@/layout/index.vue'

// 对外暴漏配置路由(常量路由)
export const constantRoute = [
  {
    // 测试
    path: '/test',
    component: () => import('@/views/test/index.vue'),
    name: 'test',
    meta: {
      title: '测试',
      icon: 'ExperimentOutlined',
    },
    children: [
      // 系统管理
      {
        path: '/test/system',
        component: () => import('@/views/test/index.vue'),
        name: 'system',
        meta: {
          title: '系统管理',
        },
        children: [
          // 抖音抓单
          {
            path: '/test/system/douyin',
            component: () => import('@/views/test/index.vue'),
            name: 'douyin',
            meta: {
              title: '抖音抓单',
            },
          },
        ],
      },
      // 套餐管理
      {
        path: '/test/combo',
        component: () => import('@/views/test/index.vue'),
        name: 'combo',
        meta: {
          title: '套餐管理',
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
    component: Layout,
    name: 'layout',
    redirect: '/home',
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
  // 数据大屏
  {
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'screen',
    meta: {
      title: '数据大屏',
      icon: 'FundProjectionScreenOutlined',
    },
  },
  // 权限管理
  {
    path: '/acl',
    component: Layout,
    name: 'acl',
    meta: {
      title: '权限管理',
      icon: 'LockOutlined',
    },
    redirect: '/acl/user',
    children: [
      // 用户管理
      {
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        name: 'user',
        meta: {
          title: '用户管理',
        },
      },
      // 角色管理
      {
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        name: 'role',
        meta: {
          title: '角色管理',
        },
      },
      // 菜单管理
      {
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'permission',
        meta: {
          title: '菜单管理',
        },
      },
    ],
  },
  // 商品管理
  {
    path: '/product',
    component: Layout,
    name: 'product',
    meta: {
      title: '商品管理',
      icon: 'ShoppingOutlined',
    },
    redirect: '/product/tradeMark',
    children: [
      // 品牌管理
      {
        path: '/product/tradeMark',
        component: () => import('@/views/product/trademark/index.vue'),
        name: 'trademark',
        meta: {
          title: '品牌管理',
        },
      },
      // spu管理
      {
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        name: 'spu',
        meta: {
          title: 'SPU管理',
        },
      },
      // sku管理
      {
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        name: 'sku',
        meta: {
          title: 'SKU管理',
        },
      },
      // 属性管理
      {
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'attr',
        meta: {
          title: '属性管理',
        },
      },
    ],
  },
  // 系统管理
  {
    path: '/system',
    component: Layout,
    name: 'system',
    meta: {
      title: '系统管理',
      icon: 'SettingOutlined',
    },
    redirect: '/system/interface-template',
    children: [
      // 接口模板
      {
        path: '/system/interface-template',
        component: () =>
          import('@/views/admin/system/interface-template/index.vue'),
        name: 'interface-template',
        meta: {
          title: '接口模板',
        },
      },
    ],
  },
  // 活动管理
  {
    path: '/activity-manager',
    component: Layout,
    name: 'activity-manager',
    meta: {
      title: '活动管理',
      icon: 'GiftOutlined',
    },
    redirect: '/activity-manager/add-activity',
    children: [
      // 添加活动
      {
        path: '/activity-manager/add-activity',
        component: () =>
          import('@/views/admin/activity-manager/add-activity/index.vue'),
        name: 'add-activity',
        meta: {
          title: '添加活动',
        },
      },
    ],
  },
  // 个人管理
  {
    path: '/personal-manager',
    component: Layout,
    name: 'personal-manager',
    meta: {
      title: '个人管理',
      icon: 'UserOutlined',
    },
    redirect: '/personal-manager/info',
    children: [
      // 个人信息
      {
        path: '/personal-manager/info',
        component: () =>
          import('@/views/admin/personal-manager/info/index.vue'),
        name: 'info',
        meta: {
          title: '个人信息',
        },
      },
      // 个人日志
      {
        path: '/personal-manager/log',
        component: () => import('@/views/admin/personal-manager/log/index.vue'),
        name: 'log',
        meta: {
          title: '个人日志',
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
    name: 'any',
    meta: {
      title: '任意路由',
    },
  },
]
