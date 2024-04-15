<template>
  <a-modal :open="open" @cancel="open = false" :title="title" @ok="submit">
    <a-form
      ref="formRef"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
      :model="roleParams"
      :rules="rules"
    >
      <a-form-item label="名称" name="roleName">
        <a-input
          v-model:value="roleParams.roleName"
          placeholder="请输入菜单名称"
        />
      </a-form-item>
      <a-form-item label="权限" name="roleName">
        <a-input
          v-model:value="roleParams.roleName"
          placeholder="请输入权限数值"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { Permisstion } from '@/api/acl/menu/type'
import { reqAddOrUpdateRole } from '@/api/acl/role'
import { message } from 'ant-design-vue'

defineOptions({ name: 'AddOrEdit' })
const emit = defineEmits(['success'])

const open = ref<boolean>(false)
const title = ref<string>('')
const roleParams = reactive<RoleData>({
  roleName: '',
})
const rules = {
  roleName: [
    {
      required: true,
      message: '角色名不能为空',
      trigger: 'change',
    },
  ],
}
const formRef = ref<any>()

const show = (row: Permisstion) => {
  open.value = true
  Object.assign(roleParams, {
    id: 0,
    roleName: '',
  })
  formRef.value?.resetFields()
  if (row) {
    title.value = '更新菜单'
    Object.assign(roleParams, row)
  } else {
    title.value = '添加菜单'
  }
}

const submit = async () => {
  try {
    await formRef.value.validate()
    const res = await reqAddOrUpdateRole(roleParams)
    if (res.code == 200) {
      open.value = false
      message.success(roleParams.id ? '修改成功' : '添加成功')
      emit('success', roleParams.id ? false : true)
    } else {
      message.error(roleParams.id ? '修改失败' : '添加失败')
    }
  } catch (error) {
    console.log('error :>> ', error)
  }
}

defineExpose({
  show,
})
</script>

<style></style>
