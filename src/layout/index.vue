<template>
  <a-layout class="layout-container">
    <a-layout-sider
      class="layout-sider"
      v-model:collapsed="layoutSettingStore.fold"
      collapsible
      :trigger="null"
      width="220px"
      :theme="layoutSettingStore.dark ? 'dark' : 'light'"
      collapsedWidth="50px"
    >
      <Logo v-show="!layoutSettingStore.fold" />
      <Menu :menuList="userStore.menuRoutes" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header
        class="layout-header"
        :style="{ background: layoutSettingStore.dark ? '#141414' : '#fff' }"
      >
        <Navbar />
      </a-layout-header>
      <a-layout-content class="layout-content">
        <RouterView v-if="!layoutSettingStore.refresh" />
        <Side />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { watch, nextTick } from 'vue'
import Logo from './Logo/index.vue'
import Menu from './Menu/index.vue'
import Navbar from './Navbar/index.vue'
import Side from './Side/index.vue'
// 获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
import useLayoutSettingStore from '@/store/modules/setting'
const userStore = useUserStore()
const layoutSettingStore = useLayoutSettingStore()

// 监听二级路由刷新状态改变
watch(
  () => layoutSettingStore.refresh,
  () => {
    nextTick(() => {
      layoutSettingStore.refresh = false
    })
  },
)
</script>

<style scoped lang="scss">
.layout-container {
  height: 100vh;

  // .layout-sider {
  //   background-color: $base-menu-color;
  // }

  .layout-header {
    padding: 0 10px;
    height: $base-header-height;
    line-height: $base-header-height;
  }

  .layout-content {
    height: calc(100vh - $base-header-height);
  }
}
</style>
