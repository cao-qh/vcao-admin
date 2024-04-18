<template>
  <a-table
    bordered
    :columns="columns"
    :row-key="rowKey"
    :row-selection="rowSelection"
    :pagination="pagination"
    :data-source="dataSource"
    :loading="loading"
    :scroll="scroll"
    @change="handleTableChange"
  >
    <template #bodyCell="{ column, row }">
      <slot name="bodyCell" :column="column" :row="row"></slot>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import type { STableProps } from './type'

defineOptions({ name: 'STable' })

const props = withDefaults(defineProps<STableProps>(), {
  pageSizeOptions: () => ['10', '20', '30'],
})

const dataSource = ref([])
const loading = ref(false)

// 分页器对象
const pagination = reactive({
  pageSize: Number(props.pageSizeOptions[0]),
  total: 0,
  pageSizeOptions: props.pageSizeOptions,
  current: 1,
  showSizeChanger: true,
})

onMounted(() => {
  getData()
})

const getData = async () => {
  loading.value = true
  const res = await props.data(pagination.current, pagination.pageSize)
  loading.value = false
  if (res.code == 200) {
    dataSource.value = res.data.records
    pagination.total = res.data.total
  }
}

// 处理表格变化
const handleTableChange = (pag: any) => {
  pagination.current = pag.current
  pagination.pageSize = pag.pageSize
  getData()
}

// 处理表格刷新
const refresh = (reset: boolean) => {
  if (reset) pagination.current = 1
  getData()
}

defineExpose({
  refresh,
})
</script>

<style></style>
