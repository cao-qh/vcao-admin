import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// svg插件需要的配置代码
import 'virtual:svg-icons-register'
// 引入自定义擦火箭对象：注册整个项目全局组件
import gloalComponent from '@/components'
// 安装自定义插件
app.use(gloalComponent)
// 引入模板的全局样式
import './styles/index.scss'

/* // 测试代码：测试假的接口能否使用
import axios from 'axios'
// 登录接口
axios({
  url: '/api/user/login',
  method: 'post',
  data: {
    username: 'admin',
    password: '111111',
  },
})
 */
// 将应用挂在到挂在点上
app.mount('#app')
