<template>
  <PageWrapper>
    <SearchForm :searchLoading="searchLoading" :formItems="formItems" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import type { FormItems } from '@/components/SearchForm/type'

const searchLoading = ref(false)
const formItems = reactive<FormItems>([
  {
    filed: 'status',
    label: '状态',
    type: 'select',
    placeholder: '请选择状态',
    value: null,
    options: [
      { label: '全部', value: 0 },
      { label: '启用', value: 1 },
      { label: '禁用', value: 2 },
    ],
  },
])
</script>

<style></style>
