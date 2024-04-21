// 布局组件
import Layout from '@/layout/index.vue'

// 对外暴漏配置路由(常量路由)
export const constantRoute = [
  // 登录
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'Login',
    meta: {
      title: '登录',
    },
  },
  // 登录成功以后展示数据的路由
  {
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
        name: 'Home',
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
    name: 'Screen',
    meta: {
      title: '数据大屏',
      icon: 'FundProjectionScreenOutlined',
    },
  },
  // 404
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
    },
  },
]

// 异步路由
export const asyncRoute = [
  // 权限管理
  {
    path: '/acl',
    component: Layout,
    name: 'Acl',
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
        name: 'User',
        meta: {
          title: '用户管理',
        },
      },
      // 角色管理
      {
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
        },
      },
      // 菜单管理
      {
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'Permission',
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
    name: 'Product',
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
        name: 'Trademark',
        meta: {
          title: '品牌管理',
        },
      },
      // spu管理
      {
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'SPU管理',
        },
      },
      // sku管理
      {
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'SKU管理',
        },
      },
      // 属性管理
      {
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'Attr',
        meta: {
          title: '属性管理',
        },
      },
    ],
  },
]

// 任意路由
export const anyRoute = {
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  name: 'any',
  meta: {
    title: '任意路由',
  },
}
