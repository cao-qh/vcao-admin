<template>
  <PageWrapper>
    <a-table
      :columns="columns"
      bordered
      :pagination="pagination"
      :data-source="skuArr"
      :scroll="{ y: 'calc(100vh - 300px' }"
      @change="handleTableChange"
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
        <template v-if="column.dataIndex === 'action'">
          <a-space>
            <a-button
              type="primary"
              size="small"
              title="上架"
              @click="updateSale(record)"
            >
              <template #icon>
                <ArrowUpOutlined v-if="record.isSale === 1" />
                <ArrowDownOutlined v-else />
              </template>
            </a-button>
            <a-button
              type="primary"
              size="small"
              title="修改"
              @click="updateSku"
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
                <InfoCircleOutlined />
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

    <GoodsInfo ref="goodsInfo" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
//引入请求
import {
  reqSkuList,
  reqSaleSku,
  reqCancelSale,
  reqSkuInfo,
  reqRemoveSku,
} from '@/api/product/sku'
import type {
  SkuResponseData,
  SkuData,
  SkuInfoData,
} from '@/api/product/sku/type'
import { message } from 'ant-design-vue'
import GoodsInfo from './modules/GoodsInfo.vue'

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    align: 'center',
    width: '80px',
  },
  {
    title: '名称',
    dataIndex: 'skuName',
    align: 'center',
    width: '150px',
    ellipsis: {
      showTitle: true,
    },
  },
  {
    title: '描述',
    dataIndex: 'skuDesc',
    align: 'center',
    width: '150px',

    ellipsis: {
      showTitle: true,
    },
  },
  {
    title: '默认图片',
    dataIndex: 'skuDefaultImg',
    align: 'center',
    width: '150px',
  },
  {
    title: '重量(g)',
    dataIndex: 'weight',
    align: 'center',
    width: '150px',
  },
  {
    title: '价格(元)',
    dataIndex: 'price',
    align: 'center',
    width: '150px',
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    width: '250px',
    fixed: 'right',
  },
]
// 分页器对象
const pagination = reactive({
  pageSize: 10,
  total: 0,
  pageSizeOptions: ['10', '20', '30'],
  current: 1,
  showSizeChanger: true,
})

let skuArr = ref<SkuData[]>([])

//组件挂载完毕
onMounted(() => {
  getHasSku()
})

// 获取三级分类下额已有的spu
const getHasSku = async (reset = false) => {
  if (reset) {
    pagination.current = 1
  }
  const res: SkuResponseData = await reqSkuList(
    pagination.current,
    pagination.pageSize,
  )
  if (res.code == 200) {
    skuArr.value = res.data.records
    pagination.total = res.data.total
  }
}

// 处理表格变化
const handleTableChange = (pag: any) => {
  pagination.current = pag.current
  pagination.pageSize = pag.pageSize
  getHasSku()
}

//商品的上架与下架的操作
const updateSale = async (row: SkuData) => {
  //如果当前商品的isSale==1,说明当前商品是上架的额状态->更新为下架
  //否则else情况与上面情况相反
  if (row.isSale == 1) {
    //下架操作
    await reqCancelSale(row.id as number)
    //提示信息
    message.success('下架成功')
    //发请求获取当前更新完毕的全部已有的SKU
    getHasSku()
  } else {
    //下架操作
    await reqSaleSku(row.id as number)
    //提示信息
    message.success('上架成功')
    //发请求获取当前更新完毕的全部已有的SKU
    getHasSku()
  }
}

const updateSku = () => {
  message.success('正在开发中...')
}

const goodsInfo = ref()
const findSku = () => {
  goodsInfo.value.show()
}
</script>
