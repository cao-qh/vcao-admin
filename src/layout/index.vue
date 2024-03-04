<template>
  <a-layout class="layout-container">
    <a-layout-sider
      v-model:collapsed="collapsed"
      collapsible
      :trigger="null"
      :collapsedWidth="0"
    >
      <div class="logo" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="layout-header">Header</a-layout-header>
      <a-layout-content class="layout-content">
        <p style="height: 1000px; background-color: red">内容大苏打撒旦</p>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 侧边栏折叠
const collapsed = ref(false)
</script>

<style scoped lang="scss">
.layout-container {
  height: 100vh;
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
  }

  .layout-header {
    background: #fff;
    padding: 0 10px;
    height: 50px;
  }

  .layout-content {
    padding: 16px;
    overflow: auto;
  }
}
</style>
