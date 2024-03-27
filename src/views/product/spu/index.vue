<template>
  <PageWrapper>
    <Category @c3-change="handleC3Change" />

    <a-button
      style="margin-bottom: 8px"
      type="primary"
      @click="handleAdd"
      :disabled="!category3"
    >
      <template #icon>
        <PlusOutlined />
      </template>
      添加SPU
    </a-button>

    <a-table
      :columns="columns"
      :pagination="pagination"
      :data-source="records"
      bordered
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <a-space>
            <a-button type="primary" size="small" title="添加SKU">
              <template #icon>
                <PlusOutlined />
              </template>
            </a-button>
            <a-button type="primary" size="small" title="修改SPU">
              <template #icon>
                <EditOutlined />
              </template>
            </a-button>
            <a-button type="primary" size="small" title="查看SKU列表">
              <template #icon>
                <EyeOutlined />
              </template>
            </a-button>
            <a-button type="primary" danger size="small" title="删除SPU">
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
import { reactive, ref } from 'vue'
import { reqHasSpu } from '@/api/product/spu'
import Category from '@/components/Category/index.vue'

import type { HasSpuResponseData, Records } from '@/api/product/spu/type'

defineOptions({ name: 'Spu' })

const handleAdd = () => {}

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: 'SPU名称',
    dataIndex: 'spuName',
    align: 'center',
  },
  {
    title: 'SPU描述',
    dataIndex: 'description',
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

const category3 = ref<number | null>(null)
const records = ref<Records>([])

const handleC3Change = ({ c3 }: { c3: number }) => {
  category3.value = c3 as number
  getHasSpu()
}

// 获取三级分类下额已有的spu
const getHasSpu = async (reset = false) => {
  const res: HasSpuResponseData = await reqHasSpu(
    reset ? 1 : pagination.current,
    pagination.pageSize,
    category3.value as number,
  )
  if (res.code == 200) {
    records.value = res.data.records
    pagination.total = res.data.total
  }
}
// 处理表格变化
const handleTableChange = (pag: any) => {
  pagination.current = pag.current
  pagination.pageSize = pag.pageSize
  getHasSpu()
}
</script>

<style></style>
