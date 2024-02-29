// 引入项目中全部的全局组件
import SvgIcom from './SvgIcon/index.vue'

const allGloablComponent = {
  SvgIcom,
}

// 对外暴漏插件对象
export default {
  // 无比叫做install方法
  install(app: any): void {
    // 注册项目全部的全局组件
    Object.keys(allGloablComponent).forEach((key) => {
      // 注册全局组件
      app.component(key, allGloablComponent[key])
    })
  },
}
