<template>
  <PageWrapper>
    <SearchForm
      :formItems="formItems"
      @search="search"
      :searchLoading="searchLoading"
    />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import type { FormItems } from '@/components/SearchForm/type'

const searchLoading = ref(false)
const formItems = reactive<FormItems>([
  {
    filed: 'templateName',
    label: '模板名称',
    type: 'input',
    placeholder: '请输入模板名称',
    value: '',
  },
])

const search = () => {
  searchLoading.value = true
  console.log('search')
  setTimeout(() => {
    searchLoading.value = false
  }, 2000)
}
</script>

<style></style>
