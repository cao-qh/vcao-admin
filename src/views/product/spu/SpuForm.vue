<template>
  <div>
    <a-form>
      <a-form-item label="SPU名称">
        <a-input placeholder="请你输入SPU名称"></a-input>
      </a-form-item>
      <a-form-item label="SPU品牌">
        <a-select placeholder="请选择产品">
          <a-select-option value="1">Apple</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="SPU描述">
        <a-textarea placeholder="请输入SPU描述" />
      </a-form-item>
      <a-form-item label="SPU图片">
        <a-upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          list-type="picture-card"
        >
          <div>
            <plus-outlined />
            <div style="margin-top: 8px">Upload</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item label="SPU的销售属性">
        <a-space>
          <a-select placeholder="请选择产品" style="width: 300px">
            <a-select-option value="1">Apple</a-select-option>
          </a-select>
          <a-button type="primary">
            <template #icon>
              <plus-outlined />
            </template>
            添加属性值
          </a-button>
        </a-space>
        <a-table style="margin-top: 6px" :columns="columns"></a-table>
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
import {
  reqAllTradeMark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
} from '@/api/product/spu'
import type {
  SpuData,
  AllTrademark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  Trademark,
  SpuImg,
  SaleAttr,
  HasSaleAttr,
} from '@/api/product/spu/type'

const emit = defineEmits(['changeScene'])

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
  },
  {
    title: '属性名',
    dataIndex: 'index',
    align: 'center',
  },
  {
    title: '属性值',
    dataIndex: 'index',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'index',
    align: 'center',
  },
]

const cancel = () => {
  emit('changeScene', 0)
}

// 存储已有的spu这些数据
const allTrademark = ref<Trademark[]>([])
// 存储已有的spu图片
const spuImg = ref<SpuImg[]>([])
// spu销售属性
const saleAttr = ref<SaleAttr[]>([])
// 全部销售属性
const allSaleAttr = ref<HasSaleAttr[]>([])

const initHasSpuData = async (record: SpuData) => {
  const [res, res1, res2, res3]: [
    AllTrademark,
    SpuHasImg,
    SaleAttrResponseData,
    HasSaleAttrResponseData,
  ] = await Promise.all([
    reqAllTradeMark(),
    reqSpuImageList(record.id as number),
    reqSpuHasSaleAttr(record.id as number),
    reqAllSaleAttr(),
  ])

  // 存储全部品牌的数据
  allTrademark.value = res.data
  // 存储已有的spu图片
  spuImg.value = res1.data
  // 存储已有的spu销售属性
  saleAttr.value = res2.data
  // 存储全部销售属性
  allSaleAttr.value = res3.data
}

defineExpose({
  initHasSpuData,
})
</script>

<style></style>
