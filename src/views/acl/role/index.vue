<template>
  <PageWrapper>
    <a-form>
      <a-row>
        <a-col :span="6">
          <a-form-item label="职位搜索">
            <a-input placeholder="请输入职位" v-model:value="keyword" />
          </a-form-item>
        </a-col>
        <a-col :span="18">
          <a-space style="float: right">
            <a-button type="primary" :disabled="!keyword" @click="search">
              查询
            </a-button>
            <a-button @click="reset">重置</a-button>
          </a-space>
        </a-col>
      </a-row>
    </a-form>

    <a-space style="margin-bottom: 8px">
      <a-button type="primary" @click="handleAdd">添加职位</a-button>
    </a-space>

    <a-table
      bordered
      :columns="columns"
      row-key="id"
      :pagination="pagination"
      :data-source="allRole"
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
              @click="handleAssignPermission(record)"
            >
              <template #icon>
                <UserOutlined />
              </template>
              分配权限
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

    <AddOrEdit ref="addOrEdit" @success="getHasRole" />
    <AssignPermission ref="assignPermission" @success="getHasRole" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { reqAllRoleList } from '@/api/acl/role'
import type { RoleResponseData, Records, RoleData } from '@/api/acl/role/type'
import useLayoutSettingStore from '@/store/modules/setting'
import AddOrEdit from './modules/AddOrEdit.vue'
import AssignPermission from './modules/AssignPermission.vue'

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '角色名称',
    dataIndex: 'roleName',
    align: 'center',
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

const keyword = ref('')
const allRole = ref<Records>([])
const settingStore = useLayoutSettingStore()

onMounted(() => {
  getHasRole()
})

const getHasRole = async (reset = false) => {
  if (reset) {
    pagination.current = 1
  }
  const res: RoleResponseData = await reqAllRoleList(
    pagination.current,
    pagination.pageSize,
    keyword.value,
  )
  if (res.code == 200) {
    allRole.value = res.data.records
    pagination.total = res.data.total
  }
}

const search = () => {
  getHasRole(true)
  keyword.value = ''
}

const reset = () => {
  settingStore.refsh = !settingStore.refsh
}

// 处理表格变化
const handleTableChange = (pag: any) => {
  pagination.current = pag.current
  pagination.pageSize = pag.pageSize
  getHasRole()
}

const addOrEdit = ref()
const handleAdd = () => {
  addOrEdit.value.show()
}

const handleEdit = (row: RoleData) => {
  addOrEdit.value.show(row)
}

const assignPermission = ref()
const handleAssignPermission = (row: RoleData) => {
  assignPermission.value.show(row)
}
</script>

<style></style>
