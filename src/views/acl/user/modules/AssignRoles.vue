<template>
  <a-drawer title="分配角色" :open="open" @close="open = false">
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
          :options="plainOptions"
        />
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<script setup lang="ts">
import type { User } from '@/api/acl/user/type'
import { ref, reactive, watch } from 'vue'

defineOptions({ name: 'AssignRoles' })

const open = ref(false)
const userParams = reactive<User>({})

const show = (row: User) => {
  open.value = true
  Object.assign(userParams, row)
}

const plainOptions = ['Apple', 'Pear', 'Orange']
const state = reactive({
  indeterminate: true,
  checkAll: false,
  checkedList: ['Apple', 'Orange'],
})
const onCheckAllChange = (e: any) => {
  Object.assign(state, {
    checkedList: e.target.checked ? plainOptions : [],
    indeterminate: false,
  })
}
watch(
  () => state.checkedList,
  (val) => {
    state.indeterminate = !!val.length && val.length < plainOptions.length
    state.checkAll = val.length === plainOptions.length
  },
)

defineExpose({
  show,
})
</script>

<style></style>
