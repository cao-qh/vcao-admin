<template>
  <div class="page-wrapper">
    <div class="breadcrumb" v-if="isShowBreadcrumb">
      <a-breadcrumb :routes="routes"></a-breadcrumb>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import type { Route } from './type'

// 使用路由对象
const $route = useRoute()
const randerBreadcrumb: Route[] = $route.matched.map(
  (item): Route => ({
    path: item.path,
    breadcrumbName: item.meta.title as string,
  }),
)
const routes = ref<Route[]>([
  {
    path: '/',
    breadcrumbName: '主页',
  },
  ...randerBreadcrumb,
])

// 定义属性
defineProps({
  isShowBreadcrumb: { type: Boolean, default: true },
})
</script>

<style scoped lang="scss">
.page-wrapper {
  overflow: auto;

  .breadcrumb {
    background-color: #fff;
    border-top: 1px solid #ecf0f1;
    border-bottom: 1px solid #ecf0f1;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
  .content {
    padding: 10px;
  }
}
</style>
