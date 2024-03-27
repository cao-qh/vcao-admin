<template>
  <PageWrapper>
    <Category @c3-change="handleC3Change" />

    <a-button style="margin-bottom: 8px" type="primary" @click="handleAdd">
      <template #icon>
        <PlusOutlined />
      </template>
      添加SPU
    </a-button>

    <a-table :columns="columns" :pagination="pagination"></a-table>
  </PageWrapper>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import Category from '@/components/Category/index.vue'
import type { CategoryLevel } from '@/components/Category/type'

const handleC3Change = (categoryLevel: CategoryLevel) => {
  console.log('categoryLevel :>> ', categoryLevel)
}

const handleAdd = () => {}

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: 'SPU名称',
    dataIndex: 'tmName',
    align: 'center',
  },
  {
    title: 'SPU描述',
    dataIndex: 'logoUrl',
    align: 'center',
  },
  {
    title: 'SPU操作',
    dataIndex: 'action',
    align: 'center',
  },
]
// 分页器对象
let pagination = reactive({
  pageSize: 10,
  total: 0,
  pageSizeOptions: ['5', '10', '20'],
  current: 1,
  showSizeChanger: true,
})
</script>

<style></style>
