<template>
  <a-config-provider :locale="locale">
    <Test />
  </a-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Test from './Test.vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
const locale = ref(zhCN)
</script>

<style></style>
