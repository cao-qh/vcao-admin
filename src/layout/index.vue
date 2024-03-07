<template>
  <a-layout class="layout-container">
    <a-layout-sider
      class="layout-sider"
      v-model:collapsed="layoutSettingStore.fold"
      collapsible
      :trigger="null"
      width="220px"
      collapsedWidth="50px"
    >
      <Logo v-show="!layoutSettingStore.fold" />
      <Menu :menuList="userStore.menuRoutes" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="layout-header">
        <Navbar />
      </a-layout-header>
      <a-layout-content>
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import Logo from './Logo/index.vue'
import Menu from './Menu/index.vue'
import Navbar from './Navbar/index.vue'
// 获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
import useLayoutSettingStore from '@/store/modules/setting'
const userStore = useUserStore()
const layoutSettingStore = useLayoutSettingStore()
</script>

<style scoped lang="scss">
.layout-container {
  height: 100vh;

  .layout-sider {
    background-color: $base-menu-color;
  }

  .layout-header {
    background: #fff;
    padding: 0 10px;
    height: $base-header-height;
    line-height: $base-header-height;
  }
}
</style>
