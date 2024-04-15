<template>
  <PageWrapper>
    <a-table
      :columns="columns"
      :data-source="permissionArr"
      row-key="id"
      :scroll="{ y: 'calc(100vh - 300px)' }"
      bordered
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <a-space>
            <a-button
              type="primary"
              size="small"
              title="分配角色"
              :disabled="record.level === 4"
              @click="addPermisstion(record)"
            >
              {{ record.level === 3 ? '添加功能' : '添加菜单' }}
            </a-button>
            <a-button
              type="primary"
              size="small"
              title="编辑"
              :disabled="record.level === 1"
              @click="updatePermisstion(record)"
            >
              编辑
            </a-button>
            <a-popconfirm
              title="是否确认删除?"
              ok-text="确认"
              cancel-text="取消"
              @confirm="deletePermisstion(record)"
            >
              <a-button
                type="primary"
                size="small"
                title="删除"
                :disabled="record.level === 1"
              >
                删除
              </a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>

    <AddOrEdit ref="addOrEdit" @success="getHasPermission" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqAllPermisstion, reqRemoveMenu } from '@/api/acl/menu'
import type {
  PermisstionResponseData,
  PermisstionList,
  Permisstion,
} from '@/api/acl/menu/type'
import AddOrEdit from './modules/AddOrEdit.vue'
import { message } from 'ant-design-vue'

defineOptions({ name: 'Permission' })

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '权限值',
    dataIndex: 'code',
    align: 'center',
  },
  {
    title: '修改时间',
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

const permissionArr = ref<PermisstionList>([])

onMounted(() => {
  getHasPermission()
})

const getHasPermission = async () => {
  const res: PermisstionResponseData = await reqAllPermisstion()
  if (res.code === 200) {
    permissionArr.value = res.data
  }
}

const addOrEdit = ref()
const addPermisstion = (record: Permisstion) => {
  addOrEdit.value.show(record, 'add')
}
const updatePermisstion = (record: Permisstion) => {
  addOrEdit.value.show(record, 'update')
}

const deletePermisstion = async (record: Permisstion) => {
  const res = await reqRemoveMenu(record.id as number)
  if (res.code === 200) {
    message.success('删除成功')
    getHasPermission()
  } else {
    message.error('删除失败')
  }
}
</script>

<style></style>
