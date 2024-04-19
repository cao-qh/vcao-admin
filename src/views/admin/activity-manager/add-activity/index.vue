<template>
  <PageWrapper>
    <SearchForm
      :searchLoading="searchLoading"
      :formItems="formItems"
      @search="table.refresh()"
    />
    <STable ref="table" rowKey="id" :columns="columns" :data="reqData" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import type { FormItems } from '@/components/SearchForm/type'
import STable from '@/components/STable/index.vue'
import type { Columns } from '@/components/STable/type'
import { reqAddActivity } from '@/api/admin/activity-manager/add-activity'
import type { RequestParams } from '@/api/type'

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

const table = ref()
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

const reqData = async (currentPage: number, pageSize: number) => {
  const data: RequestParams = {
    currentPage,
    pageSize,
  }
  formItems.forEach((item) => {
    if (item.value) {
      data[item.filed] = item.value
    }
  })
  searchLoading.value = true
  return reqAddActivity(data).then((res) => {
    searchLoading.value = false
    return res
  })
}
</script>

<style></style>
