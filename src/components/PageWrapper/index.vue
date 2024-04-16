<template>
  <div class="page-wrapper">
    <div
      class="breadcrumb"
      :class="{ dark: layoutSettingStore.dark }"
      v-if="isShowBreadcrumb"
    >
      <a-breadcrumb :routes="routes"></a-breadcrumb>
    </div>
    <div class="content">
      <a-card class="content-card" :bordered="false">
        <slot></slot>
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import type { Route } from './type'
import useLayoutSettingStore from '@/store/modules/setting'

const layoutSettingStore = useLayoutSettingStore()

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
  height: 100%;
  .breadcrumb {
    background-color: #fff;
    border-top: 1px solid #ecf0f1;
    border-bottom: 1px solid #ecf0f1;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
  .dark {
    background-color: #141414;
    border-top: 1px solid #636e72;
    border-bottom: 1px solid #636e72;
  }

  .content {
    padding: 16px;
    height: calc(100% - 50px);
    overflow: auto;

    .content-card {
      padding: 0;
      border-radius: 0;
    }
  }
}
</style>
