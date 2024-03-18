<template>
  <PageWrapper>
    <a-button style="margin-bottom: 8px" type="primary" @click="handleAdd">
      <template #icon>
        <PlusOutlined />
      </template>
      添加品牌
    </a-button>

    <!-- 表格 -->
    <a-table
      :data-source="dataSource"
      :columns="columns"
      :bordered="true"
      :pagination="pagination"
      @change="handleTableChange"
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

    <Add
      :visible="addModule.visible"
      :confirm-loading="addModule.confirmLoading"
      @ok="handleAddOk"
      @cancel="handleAddCancel"
    />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import {
  reqHasTrademark,
  reqAddOrUpdateTradeMark,
} from '@/api/product/trademark'
import Add from './modules/Add.vue'
import type {
  Records,
  TradeMarkResponseData,
} from '@/api/product/trademark/type'
import type { FormInstance } from 'ant-design-vue'

// 定义组件名
defineOptions({ name: 'Trademark' })

// 数据列表
let dataSource = ref<Records>([])
// 分页器对象
let pagination = reactive({
  pageSize: 10,
  total: 0,
  pageSizeOptions: ['5', '10', '20'],
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
    pagination.current,
    pagination.pageSize,
  )
  if (res.code == 200) {
    dataSource.value = res.data.records
    pagination.total = res.data.total
  }
}

// 处理表格变化
const handleTableChange = (pag: any) => {
  pagination.current = pag.current
  pagination.pageSize = pag.pageSize
  getHasTrademark()
}

// 添加弹窗
const addModule = reactive({
  visible: false,
  confirmLoading: false,
})
// 处理添加
const handleAdd = () => {
  addModule.visible = true
}
// 处理添加完成
const handleAddOk = async (formRef: FormInstance) => {
  const values = await formRef.validate()
  addModule.confirmLoading = true
  const res = await reqAddOrUpdateTradeMark(values)
  addModule.confirmLoading = false
  if (res.code == 200) {
    addModule.visible = false
    getHasTrademark()
    message.success(res.message)
    formRef.resetFields()
  } else {
    message.error(res.message)
  }
}
// 处理添加取消
const handleAddCancel = () => {
  addModule.visible = false
}

onMounted(() => {
  getHasTrademark()
})
</script>

<style></style>
