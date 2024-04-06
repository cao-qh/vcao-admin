<template>
  <a-modal
    title="SKU列表"
    :open="visible"
    :footer="null"
    :maskClosable="false"
    @cancel="visible = false"
  >
    <a-table
      bordered
      :columns="columns"
      :data-source="skuArr"
      :pagination="false"
      :scroll="{ y: '300px' }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'skuDefaultImg'">
          <a :href="record.skuDefaultImg" target="_blank">
            <img
              style="width: 80px; height: 80px"
              :src="record.skuDefaultImg"
            />
          </a>
        </template>
      </template>
    </a-table>
  </a-modal>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { reqSkuList } from '@/api/product/spu'
import type { SpuData, SkuInfoData, SkuData } from '@/api/product/spu/type'

defineOptions({ name: 'SkuInfo' })

const visible = ref<boolean>(false)
const skuArr = ref<SkuData[]>([])

const columns = [
  {
    title: 'SKU名称',
    dataIndex: 'skuName',
    align: 'center',
  },
  {
    title: 'SKU价格',
    dataIndex: 'price',
    align: 'center',
  },
  {
    title: 'SKU重量',
    dataIndex: 'weight',
    align: 'center',
  },
  {
    title: 'SKU图片',
    dataIndex: 'skuDefaultImg',
    align: 'center',
  },
]

const show = async (record: SpuData) => {
  const result: SkuInfoData = await reqSkuList(record.id as number)
  if (result.code == 200) {
    skuArr.value = result.data
    visible.value = true
  } else {
    message.error('查询sku列表失败')
  }
}

defineExpose({
  show,
})
</script>
