<template>
  <div>
    <a-form :label-col="labelCol">
      <a-form-item label="SKU名称">
        <a-input placeholder="请输入SKU名称" />
      </a-form-item>
      <a-form-item label="价格(元)">
        <a-input-number placeholder="请输入价格" style="width: 100%" />
      </a-form-item>
      <a-form-item label="重量(g)">
        <a-input-number placeholder="请输入重量" style="width: 100%" />
      </a-form-item>
      <a-form-item label="SKU描述">
        <a-textarea placeholder="请输入SKU描述" />
      </a-form-item>
      <a-form-item label="平台属性">
        <a-form layout="inline" :colon="false">
          <a-form-item
            v-for="item in attrArr"
            :key="item.id"
            :label="item.attrName"
          >
            <a-select placeholder="请选择产品">
              <a-select-option
                v-for="attrValue in item.attrValueList"
                :key="attrValue.id"
              >
                {{ attrValue.valueName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-form-item>
      <a-form-item label="销售属性">
        <a-form layout="inline" :colon="false">
          <a-form-item
            v-for="item in saleArr"
            :key="item.id"
            :label="item.saleAttrName"
          >
            <a-select placeholder="请选择产品">
              <a-select-option
                v-for="saleAttrValue in item.spuSaleAttrValueList"
                :key="saleAttrValue.id"
              >
                {{ saleAttrValue.saleAttrValueName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-form-item>
      <a-form-item label="图片名称">
        <a-table
          bordered
          :columns="columns"
          :row-selection="{}"
          :data-source="imgArr"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'imgUrl'">
              <img :src="record.imgUrl" style="width: 100px; height: 100px" />
            </template>
            <template v-if="column.dataIndex === 'action'">
              <a-button type="primary">设置默认</a-button>
            </template>
          </template>
        </a-table>
      </a-form-item>
    </a-form>

    <a-space>
      <a-button type="primary">保存</a-button>
      <a-button @click="cancel">取消</a-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { reqAttr } from '@/api/product/attr'
import { reqSpuImageList, reqSpuHasSaleAttr } from '@/api/product/spu'
import type { SpuData } from '@/api/product/spu/type'

const labelCol = {
  xs: 24,
  sm: 6,
  md: 4,
}

const columns = [
  {
    title: '图片',
    dataIndex: 'imgUrl',
    align: 'center',
  },
  {
    title: '名称',
    dataIndex: 'imgName',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
  },
]

defineOptions({ name: 'SkuForm' })
const emit = defineEmits(['changeScene'])

// 平台属性
const attrArr = ref<any>([])
// 销售属性
const saleArr = ref<any>([])
// 照片的数据
const imgArr = ref<any>([])

const initSkuData = async (c1: number, c2: number, spuData: SpuData) => {
  const [res, res1, res2] = await Promise.all([
    reqAttr(c1, c2, spuData.category3Id),
    reqSpuHasSaleAttr(spuData.id as number),
    reqSpuImageList(spuData.id as number),
  ])
  attrArr.value = res.data
  saleArr.value = res1.data
  imgArr.value = res2.data
}

const cancel = () => {
  emit('changeScene', { flag: 0, param: '' })
}

defineExpose({
  initSkuData,
})
</script>

<style></style>
