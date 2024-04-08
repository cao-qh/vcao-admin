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
      :scroll="{ y: 'calc(100vh - 340px)' }"
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
            <a-button type="primary" size="small" @click="handleEdit(record)">
              <template #icon>
                <EditOutlined />
              </template>
            </a-button>
            <a-popconfirm
              :title="`确定删除${record.tmName}吗？`"
              ok-text="是"
              cancel-text="否"
              @confirm="handleDelete(record.id)"
            >
              <template #icon>
                <question-circle-outlined style="color: red" />
              </template>
              <a-button type="primary" size="small" danger>
                <template #icon>
                  <DeleteOutlined />
                </template>
              </a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>

    <Add
      ref="add"
      :visible="addModule.visible"
      :confirm-loading="addModule.confirmLoading"
      @ok="handleAddOk"
      @cancel="handleAddCancel"
    />

    <Edit
      ref="edit"
      :visible="editModule.visible"
      :confirm-loading="editModule.confirmLoading"
      :mdl="editModule.mdl"
      @ok="handleEditOk"
      @cancel="handleEditCancel"
    />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import {
  reqHasTrademark,
  reqAddOrUpdateTradeMark,
  reqDeleteTradeMark,
} from '@/api/product/trademark'
import Add from './modules/Add.vue'
import Edit from './modules/Edit.vue'
import type {
  Records,
  TradeMarkResponseData,
} from '@/api/product/trademark/type'
import type { TradeMark } from '@/api/product/trademark/type'

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

onMounted(() => {
  getHasTrademark()
})

const getHasTrademark = async (reset = false) => {
  const res: TradeMarkResponseData = await reqHasTrademark(
    reset ? 1 : pagination.current,
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

const add = ref()
// 添加弹窗
const addModule = reactive({
  visible: false,
  confirmLoading: false,
})
// 处理添加
const handleAdd = () => {
  add.value.form?.resetFields()
  addModule.visible = true
}
// 处理添加完成
const handleAddOk = async () => {
  const form = add.value.form
  try {
    const values = await form.validate()
    addModule.confirmLoading = true
    const res = await reqAddOrUpdateTradeMark(values as TradeMark)
    addModule.confirmLoading = false
    if (res.code == 200) {
      addModule.visible = false
      getHasTrademark()
      message.success(res.message)
    } else {
      message.error(res.message)
    }
  } catch (error) {
    console.log('error :>> ', error)
  }
}
// 处理添加取消
const handleAddCancel = () => {
  addModule.visible = false
}

const edit = ref()
const editModule = reactive({
  visible: false,
  confirmLoading: false,
  mdl: {},
})
// 处理编辑
const handleEdit = (record: TradeMark) => {
  const { id, tmName, logoUrl } = record
  editModule.mdl = { id, tmName, logoUrl }
  editModule.visible = true
}
// 处理编辑确定
const handleEditOk = async () => {
  const form = edit.value.form
  const values = await form.validate()
  editModule.confirmLoading = true
  const res = await reqAddOrUpdateTradeMark(values as TradeMark)
  editModule.confirmLoading = false
  if (res.code == 200) {
    editModule.visible = false
    getHasTrademark()
    message.success(res.message)
  } else {
    message.error(res.message)
  }
}
// 处理编辑取消
const handleEditCancel = () => {
  editModule.visible = false
}

// 处理删除
const handleDelete = async (id: number) => {
  const res = await reqDeleteTradeMark(id)
  if (res.code == 200) {
    message.success(res.message)
    // 重新获取数据
    getHasTrademark()
    return true
  } else {
    message.error(res.message)
  }
}
</script>
