<template>
  <a-layout class="layout-container">
    <a-layout-sider
      class="layout-sider"
      v-model:collapsed="collapsed"
      collapsible
      :trigger="null"
      :collapsedWidth="0"
      width="220px"
    >
      <Logo />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="layout-header">Header</a-layout-header>
      <a-layout-content class="layout-content"></a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Logo from './Logo/index.vue'
// 侧边栏折叠
const collapsed = ref(false)
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
  }

  .layout-content {
    padding: 16px;
    overflow: auto;
  }
}
</style>
