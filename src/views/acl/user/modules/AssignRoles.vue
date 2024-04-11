<template>
  <a-drawer
    title="分配角色"
    :open="open"
    @close="open = false"
    :footer-style="{ textAlign: 'right' }"
  >
    <a-form>
      <a-form-item label="用户姓名">
        <a-input
          placeholder="请输入用户姓名"
          v-model:value="userParams.username"
          readonly
        />
      </a-form-item>
      <a-form-item label="角色列表">
        <a-checkbox
          v-model:checked="state.checkAll"
          :indeterminate="state.indeterminate"
          @change="onCheckAllChange"
        >
          全选
        </a-checkbox>
        <a-checkbox-group
          v-model:value="state.checkedList"
          :options="allRoleArr"
        />
      </a-form-item>
    </a-form>

    <template #footer>
      <a-button style="margin-right: 8px" @click="open = false">取消</a-button>
      <a-button type="primary" @click="">确定</a-button>
    </template>
  </a-drawer>
</template>

<script setup lang="ts">
import type { User } from '@/api/acl/user/type'
import { ref, reactive, watch } from 'vue'
import { reqAllRole } from '@/api/acl/user'
import type { AllRoleResponseData, AllRole } from '@/api/acl/user/type'

defineOptions({ name: 'AssignRoles' })

const open = ref(false)
const userParams = reactive<User>({})

const show = async (row: User) => {
  open.value = true
  Object.assign(userParams, row)
  const res: AllRoleResponseData = await reqAllRole(userParams.id as number)
  if (res.code === 200) {
    allRoleArr.value = res.data.allRolesList.map((item) => {
      return {
        label: item.roleName,
        value: item.id as number,
      }
    })
    state.checkedList = res.data.assignRoles.map((item) => item.id as number)
  }
}

const allRoleArr = ref<{ label: string; value: number }[]>([])
const state = reactive<{
  indeterminate: boolean
  checkAll: boolean
  checkedList: number[]
}>({
  indeterminate: false,
  checkAll: false,
  checkedList: [],
})
const onCheckAllChange = (e: any) => {
  Object.assign(state, {
    checkedList: e.target.checked
      ? allRoleArr.value.map((item) => item.value)
      : [],
    indeterminate: false,
  })
}
watch(
  () => state.checkedList,
  (val) => {
    state.indeterminate = !!val.length && val.length < allRoleArr.value.length
    state.checkAll = val.length === allRoleArr.value.length
  },
)

defineExpose({
  show,
})
</script>

<style></style>
