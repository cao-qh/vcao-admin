<template>
  <a-row class="navbar">
    <a-col :span="12">
      <component
        style="font-size: 20px"
        :is="
          layoutSettingStore.fold ? 'MenuFoldOutlined' : 'MenuUnfoldOutlined'
        "
        @click="changeManuFold"
      ></component>
    </a-col>
    <a-col :span="12">
      <a-flex justify="end" align="center">
        <a-space size="middle">
          <a-button
            :icon="h(resolveComponent('ReloadOutlined'))"
            size="small"
            @click="reload"
          />
          <a-button
            :icon="h(resolveComponent('FullscreenOutlined'))"
            size="small"
            @click="fullScreen"
          />
          <a-button
            :icon="h(resolveComponent('SettingOutlined'))"
            size="small"
          />

          <a-dropdown>
            <span>
              {{ userStore.username }}
              <DownOutlined />
            </span>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a @click="logout">退出登录</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </a-space>
      </a-flex>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import useLayoutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'

// 获取layout配置相关的仓库
const layoutSettingStore = useLayoutSettingStore()
// 获取用户相关的仓库
const userStore = useUserStore()
// 路由器对象
const $router = useRouter()
// 路由对象
const $route = useRoute()

// 改变菜单折叠
const changeManuFold = () => {
  // 改变菜单折叠状态
  layoutSettingStore.fold = !layoutSettingStore.fold
}
// 刷新二级路由页面
const reload = () => {
  layoutSettingStore.refsh = false
}
// 全屏
const fullScreen = () => {
  let full = document.fullscreenElement
  // DOM对象的额一个属性：可以用来判断当前是不是全屏模式[全屏:true,不是全屏:false]
  if (full) {
    // 退出全屏
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
}
// 退出登录
const logout = async () => {
  // 调用登出接口
  // 清空用户数据
  // 跳转到登录页
  await userStore.userLogout()
  // 跳转到登录页
  $router.push({
    path: '/login',
    query: {
      redirect: $route.path,
    },
  })
}
</script>
