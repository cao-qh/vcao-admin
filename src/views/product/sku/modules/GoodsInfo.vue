<template>
  <a-drawer v-model:open="open" title="查看商品详情">
    <a-space direction="vertical">
      <a-row>
        <a-col :span="6">名称</a-col>
        <a-col :span="18">{{ skuInfo.skuName }}</a-col>
      </a-row>
      <a-row>
        <a-col :span="6">描述</a-col>
        <a-col :span="18">{{ skuInfo.skuDesc }}</a-col>
      </a-row>
      <a-row>
        <a-col :span="6">价格</a-col>
        <a-col :span="18">{{ skuInfo.price }}</a-col>
      </a-row>
      <a-row>
        <a-col :span="6">平台属性</a-col>
        <a-col :span="18">
          <a-tag v-for="item in skuInfo.skuAttrValueList" :key="item.attrId">
            {{ item.attrName }}
          </a-tag>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="6">销售属性</a-col>
        <a-col :span="18">
          <a-tag
            v-for="item in skuInfo.skuSaleAttrValueList"
            :key="item.saleAttrValueId"
          >
            {{ item.saleAttrValueName }}
          </a-tag>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="6">商品图片</a-col>
        <a-col :span="18">
          <a-carousel style="width: 250px" :autoplay="true">
            <div v-for="item in skuInfo.skuImageList" :key="item.id">
              <img :src="item.imgUrl" width="100%" height="100%" />
            </div>
          </a-carousel>
        </a-col>
      </a-row>
    </a-space>
  </a-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
//引入请求
import { reqSkuInfo } from '@/api/product/sku'
import type { SkuInfoData, SkuData } from '@/api/product/sku/type'

const open = ref<boolean>(false)
const skuInfo = ref<SkuData>({})

const show = async (id: number) => {
  open.value = true
  const res: SkuInfoData = await reqSkuInfo(id)
  skuInfo.value = res.data
}

defineExpose({
  show,
})
</script>

<style lang="scss" scoped>
:deep(.slick-dots) {
  li {
    background-color: #bdc3c7;
  }
  li.slick-active button {
    background-color: #34495e;
  }
}
</style>
