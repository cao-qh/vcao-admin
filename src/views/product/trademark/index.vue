<template>
  <PageWrapper>
    <a-button
      class="editable-add-btn"
      style="margin-bottom: 8px"
      :icon="resolveIcon('PlusOutlined')"
      type="primary"
    >
      添加品牌
    </a-button>

    <!-- 表格 -->
    <a-table
      :dataSource="dataSource"
      :columns="columns"
      :bordered="true"
      :pagination="pagination"
      :scroll="{ y: 500 }"
    ></a-table>
  </PageWrapper>
</template>

<script setup lang="ts">
import resolveIcon from '@/utils/resolveIcon'
import { ref, onMounted } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark'

// 定义组件名
defineOptions({ name: 'Trademark' })

// 当前页面
let pageNo = ref<number>(1)
// 像每一页展示多少条数据
let limit = ref<number>(3)
// 数据列表
let dataSource = ref<any[]>([])
// 分页器对象
let pagination = ref({
  total: 0,
  pageSizeOptions: ['10', '20', '30'],
  current: 2,

  showSizeChanger: true,
})

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '品牌名称',
    dataIndex: 'tmName',
    align: 'center',
  },
  {
    title: '品牌LOGO',
    dataIndex: 'logoUrl',
    align: 'center',
  },
  {
    title: '品牌操作',
    dataIndex: 'address',
    align: 'center',
  },
]

const getHasTrademark = async () => {
  const res = await reqHasTrademark(pageNo.value, limit.value)
  if (res.code == 200) {
    dataSource.value = res.data.records
    pagination.value.total = res.data.total
  }
}

onMounted(() => {
  getHasTrademark()
})
</script>

<style></style>
