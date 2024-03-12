<template>
  <PageWrapper>
    <a-button style="margin-bottom: 8px" type="primary">
      <template #icon>
        <PlusOutlined />
      </template>
      添加品牌
    </a-button>

    <!-- 表格 -->
    <a-table
      :dataSource="dataSource"
      :columns="columns"
      :bordered="true"
      :pagination="pagination"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'logoUrl'">
          <a :href="record.logoUrl" target="_blank">
            <img style="width: 80px; height: 80px" :src="record.logoUrl" />
          </a>
        </template>
        <template v-if="column.dataIndex === 'action'">
          <a-space>
            <a-button type="primary">
              <template #icon>
                <EditOutlined />
              </template>
            </a-button>
            <a-button type="primary">
              <template #icon>
                <DeleteOutlined />
              </template>
            </a-button>
          </a-space>
        </template>
      </template>
    </a-table>
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark'
import type {
  Records,
  TradeMarkResponseData,
} from '@/api/product/trademark/type'

// 定义组件名
defineOptions({ name: 'Trademark' })

// 当前页面
let pageNo = ref<number>(1)
// 像每一页展示多少条数据
let limit = ref<number>(5)
// 数据列表
let dataSource = ref<Records>([])
// 分页器对象
let pagination = ref({
  total: 0,
  pageSizeOptions: ['10', '20', '30'],
  current: 1,
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
    dataIndex: 'action',
    align: 'center',
  },
]

const getHasTrademark = async () => {
  const res: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
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
