<template>
  <div class="page-wrapper">
    <div class="breadcrumb" v-if="isShowBreadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>
          <a href="/">主页</a>
        </a-breadcrumb-item>
        <a-breadcrumb-item><a href="">Application Center</a></a-breadcrumb-item>
        <a-breadcrumb-item><a href="">Application List</a></a-breadcrumb-item>
        <a-breadcrumb-item>An Application</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
// 定义属性
export interface Props {
  isShowBreadcrumb: boolean
}

withDefaults(defineProps<Props>(), {
  isShowBreadcrumb: true,
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
