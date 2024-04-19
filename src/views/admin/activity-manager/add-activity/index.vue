<template>
  <PageWrapper>
    <SearchForm :searchLoading="searchLoading" :formItems="formItems" />
    <STable rowKey="id" :columns="columns" :data="reqData" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import type { FormItems } from '@/components/SearchForm/type'
import STable from '@/components/STable/index.vue'
import type { Columns } from '@/components/STable/type'

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

const columns: Columns = [
  {
    title: '序号',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '单价',
    dataIndex: 'price',
    align: 'center',
  },
  {
    title: '总价',
    dataIndex: 'collPrice',
    align: 'center',
  },
  {
    title: '每个月几号开始',
    dataIndex: 'startDay',
    align: 'center',
  },
  {
    title: '每个月几号结束',
    dataIndex: 'endDay',
    align: 'center',
  },
  {
    title: '月数',
    dataIndex: 'monthNum',
    align: 'center',
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
  },
]

const reqData = () => {
  return []
}
</script>

<style></style>
