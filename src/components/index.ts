// 引入项目中全部的全局组件
import PageWrapper from './PageWrapper/index.vue'
import SvgIcom from './SvgIcon/index.vue'
import * as AntDesignIconsVue from '@ant-design/icons-vue'

const allGloablComponent: { [key: string]: any } = {
  SvgIcom,
  PageWrapper,
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

    // 将ant-design-vue的图标注册到全局
    for (const [key, component] of Object.entries(AntDesignIconsVue)) {
      app.component(key, component)
    }
  },
}
