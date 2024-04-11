<template>
  <PageWrapper>
    <a-form>
      <a-row>
        <a-col :span="6">
          <a-form-item label="用户名">
            <a-input placeholder="请输入用户名" />
          </a-form-item>
        </a-col>
        <a-col :span="18">
          <a-space style="float: right">
            <a-button type="primary">查询</a-button>
            <a-button>重置</a-button>
          </a-space>
        </a-col>
      </a-row>
    </a-form>

    <a-space style="margin-bottom: 8px">
      <a-button type="primary" @click="handleAdd">添加</a-button>
      <a-button
        :disabled="!deleteKeys.length"
        type="primary"
        danger
        @click="batchDelete"
      >
        批量删除
      </a-button>
    </a-space>

    <a-table
      bordered
      :columns="columns"
      row-key="id"
      :row-selection="{ type: 'checkbox', onChange: selectionChange }"
      :pagination="pagination"
      :data-source="userArr"
      :scroll="{ y: 'calc(100vh - 400px)' }"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <a-space>
            <a-button
              type="primary"
              size="small"
              title="分配角色"
              @click="handleAssignRoles(record)"
            >
              <template #icon>
                <UserOutlined />
              </template>
              分配角色
            </a-button>
            <a-button
              type="primary"
              size="small"
              title="编辑"
              @click="handleEdit(record)"
            >
              <template #icon>
                <EditOutlined />
              </template>
              编辑
            </a-button>
            <a-popconfirm
              title="是否确认删除?"
              ok-text="确认"
              cancel-text="取消"
              @confirm="deleteUser(record.id)"
            >
              <a-button type="primary" size="small" title="删除SPU" danger>
                <template #icon>
                  <DeleteOutlined />
                </template>
                删除
              </a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>

    <AddOrEdit ref="addOrEdit" />
    <AssignRoles ref="assignRoles" @success="getHasUser" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { reqUserInfo, reqRemoveUser, reqSelectUser } from '@/api/acl/user'
import type { UserResponseData, Records, User } from '@/api/acl/user/type'
import AddOrEdit from './modules/AddOrEdit.vue'
import AssignRoles from './modules/AssignRoles.vue'
import { message } from 'ant-design-vue'

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '用户名字',
    dataIndex: 'username',
    align: 'center',
  },
  {
    title: '用户名称',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '用户角色',
    dataIndex: 'roleName',
    align: 'center',
    ellipsis: {
      showTitle: true,
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'center',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    width: '280px',
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

const userArr = ref<Records>([])

onMounted(() => {
  getHasUser()
})

const getHasUser = async (reset = false) => {
  if (reset) {
    pagination.current = 1
  }
  const res: UserResponseData = await reqUserInfo(
    pagination.current,
    pagination.pageSize,
  )
  if (res.code == 200) {
    userArr.value = res.data.records
    pagination.total = res.data.total
  }
}

// 处理表格变化
const handleTableChange = (pag: any) => {
  pagination.current = pag.current
  pagination.pageSize = pag.pageSize
  getHasUser()
}

const deleteUser = async (id: number) => {
  const res = await reqRemoveUser(id)
  if (res.code == 200) {
    message.success('删除成功')
    getHasUser(true)
  } else {
    message.error('删除失败')
  }
}

const addOrEdit = ref()
const handleAdd = () => {
  addOrEdit.value.show()
}
const handleEdit = (row: User) => {
  addOrEdit.value.show(row)
}

const assignRoles = ref()
const handleAssignRoles = (row: User) => {
  assignRoles.value.show(row)
}

const deleteKeys = ref<number[]>([])
const selectionChange = (selectedRowKeys: number[]) => {
  deleteKeys.value = selectedRowKeys
}

const batchDelete = async () => {
  const res = await reqSelectUser(deleteKeys.value)
  if (res.code === 200) {
    message.success('删除成功')
    getHasUser(true)
  } else {
    message.error('删除失败')
  }
}
</script>

<style></style>
