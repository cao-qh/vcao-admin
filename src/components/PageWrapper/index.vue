<template>
  <div class="page-wrapper">
    <div class="breadcrumb" v-if="isShowBreadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>
          <a href="/">主页</a>
        </a-breadcrumb-item>
        <a-breadcrumb-item v-for="route in $route.matched" :key="route.path">
          <a :href="route.path">{{ route.meta.title }}</a>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
// 使用路由对象
const $route = useRoute()

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
