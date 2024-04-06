<template>
  <PageWrapper>
    <Category :disabled="scene !== 0" @c3-change="handleC3Change" />

    <div v-show="scene === 0">
      <a-button
        style="margin-bottom: 8px"
        type="primary"
        @click="addSpu"
        :disabled="!categoryLevel.c3"
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
              <a-button
                type="primary"
                size="small"
                title="查看SKU列表"
                @click="findSku(record)"
              >
                <template #icon>
                  <EyeOutlined />
                </template>
              </a-button>
              <a-popconfirm
                title="是否确认删除?"
                ok-text="确认"
                cancel-text="取消"
                @confirm="deleteSpu(record.id)"
              >
                <a-button type="primary" size="small" title="删除SPU" danger>
                  <template #icon>
                    <DeleteOutlined />
                  </template>
                </a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>

    <SpuForm ref="spuFrom" v-show="scene === 1" @changeScene="changeScene" />
    <SkuForm ref="skuForm" v-show="scene === 2" @changeScene="changeScene" />
    <SkuInfo ref="skuInfo" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { reqHasSpu, reqRemoveSpu } from '@/api/product/spu'
import type { CategoryLevel } from '@/components/Category/type'
import Category from '@/components/Category/index.vue'
import SpuForm from './SpuForm.vue'
import SkuForm from './SkuForm.vue'
import SkuInfo from './SkuInfo.vue'

import type {
  HasSpuResponseData,
  Records,
  SpuData,
} from '@/api/product/spu/type'
import { message } from 'ant-design-vue'

defineOptions({ name: 'Spu' })

// 场景数据 0：显示已有SPU  1：添加或修改SPU 2：添加SKU
const scene = ref<number>(0)

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

const categoryLevel = ref<CategoryLevel>({})
const records = ref<Records>([])

// 获取子组件实例spuform
const spuFrom = ref<any>()
const skuForm = ref<any>()

const handleC3Change = (clevel: CategoryLevel) => {
  categoryLevel.value = clevel
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
    categoryLevel.value.c3 as number,
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
  spuFrom.value.initAddSpu(categoryLevel.value.c3)
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
  skuForm.value.initSkuData(
    categoryLevel.value.c1,
    categoryLevel.value.c2,
    record,
  )
}

const skuInfo = ref<any>()
const findSku = async (record: SpuData) => {
  skuInfo.value.show(record)
}

const deleteSpu = async (spuId: number) => {
  const res: any = await reqRemoveSpu(spuId)
  if (res.code == 200) {
    message.success('删除成功')
    getHasSpu()
  } else {
    message.error('删除失败')
  }
}
</script>

<style></style>
