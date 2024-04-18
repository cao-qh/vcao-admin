<template>
  <PageWrapper>
    <a-descriptions title="个人信息" :column="1">
      <a-descriptions-item label="账户">Zhou Maomao</a-descriptions-item>
      <a-descriptions-item label="昵称">1810000000</a-descriptions-item>
      <a-descriptions-item label="密码">Hangzhou, Zhejiang</a-descriptions-item>
      <a-descriptions-item label="手机号">empty</a-descriptions-item>
    </a-descriptions>
    <a-button type="primary">修改</a-button>
  </PageWrapper>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { reqInfo } from '@/api/admin/personal-manager/info'

onMounted(async () => {
  const res = await reqInfo()
  console.log('res :>> ', res)
})
</script>

<style></style>
