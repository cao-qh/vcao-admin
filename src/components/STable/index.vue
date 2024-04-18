<template>
  <a-table
    bordered
    :columns="columns"
    row-key="id"
    :row-selection="rowSelection"
    :pagination="pagination"
    :data-source="dataSource"
    :loading="loading"
    :scroll="{ y: 'calc(100vh - 400px)' }"
    @change="handleTableChange"
  >
    <template #bodyCell="{ column, row }">
      <slot name="bodyCell" :column="column" :row="row"></slot>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import type { TableColumnType } from 'ant-design-vue'

defineOptions({ name: 'STable' })

const props = defineProps<{
  columns: TableColumnType[]
  rowSelection: any
  data: (currentPage: number, pageSize: number) => any
  pageSizeOptions: string[]
}>()

const dataSource = ref([])
const loading = ref(false)

// 分页器对象
const pagination = reactive({
  pageSize: 10,
  total: 0,
  pageSizeOptions: props.pageSizeOptions || ['10', '20', '30'],
  current: 1,
  showSizeChanger: true,
})

onMounted(() => {
  getData()
})

const getData = async () => {
  const res = await props.data(pagination.current, pagination.pageSize)
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
