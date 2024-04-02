<template>
  <PageWrapper>
    <Category :disabled="scene !== 0" @c3-change="handleC3Change" />

    <div v-show="scene === 0">
      <a-button
        style="margin-bottom: 8px"
        type="primary"
        @click="addSpu"
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
              <a-button
                type="primary"
                size="small"
                title="添加SKU"
                @click="addSku(record)"
              >
                <template #icon>
                  <PlusOutlined />
                </template>
              </a-button>
              <a-button
                type="primary"
                size="small"
                title="修改SPU"
                @click="updateSpu(record)"
              >
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
    </div>

    <SpuForm ref="spuFrom" v-show="scene === 1" @changeScene="changeScene" />
    <SkuForm v-show="scene === 2" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { reqHasSpu } from '@/api/product/spu'
import Category from '@/components/Category/index.vue'
import SpuForm from './SpuForm.vue'
import SkuForm from './SkuForm.vue'

import type {
  HasSpuResponseData,
  Records,
  SpuData,
} from '@/api/product/spu/type'

defineOptions({ name: 'Spu' })

// 场景数据 0：显示已有SPU  1：添加或修改SPU 2：添加SKU
const scene = ref<number>(2)

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
const pagination = reactive({
  pageSize: 3,
  total: 0,
  pageSizeOptions: ['3', '5', '10'],
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
  if (reset) {
    pagination.current = 1
  }
  const res: HasSpuResponseData = await reqHasSpu(
    pagination.current,
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

const addSpu = () => {
  scene.value = 1
  spuFrom.value.initAddSpu(category3.value as number)
}

const changeScene = ({ flag, param }: { flag: number; param: string }) => {
  scene.value = flag
  if (param === 'update') {
    getHasSpu()
  } else {
    getHasSpu(true)
  }
}
const updateSpu = (record: SpuData) => {
  scene.value = 1
  spuFrom.value.initHasSpuData(record)
}

const addSku = (record: SpuData) => {
  scene.value = 2
  // spuFrom.value.initHasSpuData(record)
}

// 获取子组件实例spuform
const spuFrom = ref<any>()
</script>

<style></style>
