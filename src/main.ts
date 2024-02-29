import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// svg插件需要的配置代码
import 'virtual:svg-icons-register'
// 引入自定义擦火箭对象：注册整个项目全局组件
import gloalComponent from '@/components'
app.use(gloalComponent)
app.mount('#app')
