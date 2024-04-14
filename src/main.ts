import { createApp } from 'vue'
import App from './App.vue'
// 引入模板的全局样式
import './styles/index.scss'
// svg插件需要的配置代码
import 'virtual:svg-icons-register'
// 引入自定义擦火箭对象：注册整个项目全局组件
import gloalComponent from '@/components'
// 引入路由
import router from '@/router'
// 引入仓库
import pinia from './store'

const app = createApp(App)

// 安装自定义插件
app.use(gloalComponent)
// 注册模板路由
app.use(router)
// 安装仓库
app.use(pinia)
// 引入路由鉴权文件
import './permisstion'
// 将应用挂在到挂在点上
app.mount('#app')
