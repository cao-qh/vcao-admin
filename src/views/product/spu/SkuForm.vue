<template>
  <div>
    <a-form :label-col="labelCol">
      <a-form-item label="SKU名称">
        <a-input
          placeholder="请输入SKU名称"
          v-model:value="skuParams.skuName"
        />
      </a-form-item>
      <a-form-item label="价格(元)">
        <a-input-number
          placeholder="请输入价格"
          style="width: 100%"
          v-model:value="skuParams.price"
        />
      </a-form-item>
      <a-form-item label="重量(g)">
        <a-input-number
          placeholder="请输入重量"
          style="width: 100%"
          v-model:value="skuParams.weight"
        />
      </a-form-item>
      <a-form-item label="SKU描述">
        <a-textarea
          placeholder="请输入SKU描述"
          v-model:value="skuParams.skuDesc"
        />
      </a-form-item>
      <a-form-item label="平台属性">
        <a-form layout="inline" :colon="false">
          <a-form-item
            v-for="item in attrArr"
            :key="item.id"
            :label="item.attrName"
          >
            <a-select
              placeholder="请选择产品"
              v-model:value="item.attrIdAndValueId"
            >
              <a-select-option
                v-for="attrValue in item.attrValueList"
                :key="attrValue.id"
                :value="`${item.id}:${attrValue.id}`"
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
            <a-select placeholder="请选择产品" v-model="item.saleIdAndValueId">
              <a-select-option
                v-for="saleAttrValue in item.spuSaleAttrValueList"
                :key="saleAttrValue.id"
                :value="`${item.id}:${saleAttrValue.id}`"
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
          :row-selection="{ selectedRowKeys: selectedRowKeys }"
          :data-source="imgArr"
          rowKey="id"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'imgUrl'">
              <img :src="record.imgUrl" style="width: 100px; height: 100px" />
            </template>
            <template v-if="column.dataIndex === 'action'">
              <a-button type="primary" @click="setDefault(record)">
                设置默认
              </a-button>
            </template>
          </template>
        </a-table>
      </a-form-item>
    </a-form>

    <a-space>
      <a-button type="primary" @click="save">保存</a-button>
      <a-button @click="cancel">取消</a-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { reqAttr } from '@/api/product/attr'
import {
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAddSku,
} from '@/api/product/spu'
import type { SpuData } from '@/api/product/spu/type'
import type { SkuData } from '@/api/product/spu/type'
import { message } from 'ant-design-vue'

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
// 收集SKU的参数
const skuParams = reactive<SkuData>({
  //父组件传递过来的数据
  category3Id: '', //三级分类的ID
  spuId: '', //已有的SPU的ID
  tmId: '', //SPU品牌的ID
  //v-model收集
  skuName: '', //sku名字
  price: '', //sku价格
  weight: '', //sku重量
  skuDesc: '', //sku的描述
  skuAttrValueList: [
    //平台属性的收集
  ],
  skuSaleAttrValueList: [
    //销售属性
  ],
  skuDefaultImg: '', //sku图片地址
})

const initSkuData = async (c1: number, c2: number, spuData: SpuData) => {
  //收集数据
  skuParams.category3Id = spuData.category3Id
  skuParams.spuId = spuData.id as number
  skuParams.tmId = spuData.tmId

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

const selectedRowKeys = ref<number[]>([])
const setDefault = (record: any) => {
  // 将当前行选中
  selectedRowKeys.value = [record.id]
  //收集图片地址
  skuParams.skuDefaultImg = record.imgUrl
}

const save = async () => {
  // 整理参数
  // 平台属性
  skuParams.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
    if (next.attrIdAndValueId) {
      let [attrId, valueId] = next.attrIdAndValueId.split(':')
      prev.push({
        attrId,
        valueId,
      })
    }
    return prev
  }, [])
  // 销售属性
  skuParams.skuSaleAttrValueList = saleArr.value.reduce(
    (prev: any, next: any) => {
      if (next.saleIdAndValueId) {
        let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
        prev.push({
          saleAttrId,
          saleAttrValueId,
        })
      }
      return prev
    },
    [],
  )
  // 发请求
  let result: any = await reqAddSku(skuParams)
  if (result.code == 200) {
    // 成功
    message.success('添加sku成功')
    emit('changeScene', { flag: 0, param: '' })
  } else {
    // 失败
    message.error('添加sku失败')
  }
}

defineExpose({
  initSkuData,
})
</script>

<style></style>
