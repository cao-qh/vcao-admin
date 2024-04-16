// 小仓库：layout组件相关配置仓库
import { defineStore } from 'pinia'

const useLayoutSettingStore = defineStore('settingStore', {
  state: () => {
    return {
      fold: false, //用户控制菜单折叠还是收起控制
      refsh: true, //仓库这个属性用于控制刷新效果
      side: false, //用控制侧板的折叠
      dark: false, //是否暗黑模式
      themeColor: '#1677ff', //主题廧
    }
  },
})

export default useLayoutSettingStore
