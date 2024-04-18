<template>
  <PageWrapper>
    <a-form>
      <a-row>
        <a-col :span="6">
          <a-form-item label="用户名">
            <a-input placeholder="请输入用户名" v-model:value="username" />
          </a-form-item>
        </a-col>
        <a-col :span="18">
          <a-space style="float: right">
            <a-button type="primary" :disabled="!username" @click="search">
              查询
            </a-button>
            <a-button @click="reset">重置</a-button>
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

    <STable
      ref="table"
      :columns="columns"
      :row-selection="rowSelection"
      :data="reqData"
      :pageSizeOptions="['3', '5', '10']"
    >
      <template #bodyCell="{ column, row }">
        <template v-if="column.dataIndex === 'action'">
          <a-space>
            <a-button
              type="primary"
              size="small"
              title="分配角色"
              @click="handleAssignRoles(row)"
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
              @click="handleEdit(row)"
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
              @confirm="deleteUser(row.id)"
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
    </STable>

    <AddOrEdit ref="addOrEdit" />
    <AssignRoles ref="assignRoles" @success="table?.refresh" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { reqUserInfo, reqRemoveUser, reqSelectUser } from '@/api/acl/user'
import type { User } from '@/api/acl/user/type'
import AddOrEdit from './modules/AddOrEdit.vue'
import AssignRoles from './modules/AssignRoles.vue'
import { message } from 'ant-design-vue'
import useLayoutSettingStore from '@/store/modules/setting'
import STable from '@/components/STable/index.vue'
import type { TableColumnType } from 'ant-design-vue'

const columns: TableColumnType[] = [
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

const settingStore = useLayoutSettingStore()
const username = ref('')
const table = ref()

const reqData = async (currentPage: number, pageSize: number) => {
  return reqUserInfo(currentPage, pageSize, username.value)
}

const selectionChange = (selectedRowKeys: number[]) => {
  deleteKeys.value = selectedRowKeys
}

const rowSelection = { type: 'checkbox', onChange: selectionChange }

const search = () => {
  table.value.refresh()
  username.value = ''
}

const reset = () => {
  settingStore.refresh = true
}

const deleteUser = async (id: number) => {
  const res = await reqRemoveUser(id)
  if (res.code == 200) {
    message.success('删除成功')
    table.value.refresh(true)
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

const batchDelete = async () => {
  const res = await reqSelectUser(deleteKeys.value)
  if (res.code === 200) {
    message.success('删除成功')
    table.value.refresh(true)
  } else {
    message.error('删除失败')
  }
}
</script>

<style></style>
