<template>
  <PageWrapper :isShowBreadcrumb="false">
    <a-config-provider
      :theme="{
        algorithm: theme.darkAlgorithm,
      }"
    >
      <a-button>按钮</a-button>
    </a-config-provider>
  </PageWrapper>
</template>

<script setup lang="ts">
import { message, theme } from 'ant-design-vue'
import { onMounted } from 'vue'

onMounted(() => {
  message.success('欢迎使用')
})
</script>

<style></style>
