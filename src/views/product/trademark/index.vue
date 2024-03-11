<template>
  <PageWrapper>
    <a-button class="editable-add-btn" style="margin-bottom: 8px">
      添加品牌
    </a-button>

    <!-- 表格 -->
    <a-table
      :dataSource="dataSource"
      :columns="columns"
      :bordered="true"
      :pagination="true"
    ></a-table>
  </PageWrapper>
</template>

<script setup lang="ts">
import resolveIcon from '@/utils/resolveIcon'

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
]
for (let i = 0; i < 100; i++) {
  dataSource.push({
    key: String(i),
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  })
}

const columns = [
  {
    title: '序号',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: '品牌名称',
    dataIndex: 'age',
    key: 'age',
    align: 'center',
  },
  {
    title: '品牌LOGO',
    dataIndex: 'address',
    key: 'address',
    align: 'center',
  },
  {
    title: '品牌操作',
    dataIndex: 'address',
    key: 'address',
    align: 'center',
  },
]
</script>

<style></style>
