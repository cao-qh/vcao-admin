<template>
  <a-modal :open="open" @cancel="open = false" :title="title" @ok="submit">
    <a-form
      ref="formRef"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
      :model="userParams"
      :rules="rules"
    >
      <a-form-item label="角色名称" name="username">
        <a-input
          v-model:value="userParams.username"
          placeholder="请输入角色名称"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { RoleData } from '@/api/acl/role/type'
import { reqAddOrUpdateUser } from '@/api/acl/user'
import { message } from 'ant-design-vue'

defineOptions({ name: 'AddOrEdit' })

const open = ref<boolean>(false)
const title = ref<string>('添加用户')
const userParams = reactive<User>({
  username: '',
})
const rules = {
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'change',
    },
    {
      min: 5,
      max: 15,
      message: '用户名长度为5-15位',
      trigger: 'change',
    },
  ],
}
const formRef = ref<any>()

const show = (row: RoleData) => {
  console.log('row :>> ', row)
  open.value = true
  Object.assign(userParams, {
    id: 0,
    username: '',
  })
  formRef.value?.resetFields()
  if (row) {
    title.value = '修改角色'
    Object.assign(userParams, row)
  } else {
    title.value = '添加角色'
  }
}

const submit = async () => {
  try {
    await formRef.value.validate()
    const res = await reqAddOrUpdateUser(userParams)
    if (res.code == 200) {
      open.value = false
      message.success(userParams.id ? '修改成功' : '添加成功')
      // emit('refresh-table', userParams.id ? false : true)
      window.location.reload()
    } else {
      message.error(userParams.id ? '修改失败' : '添加失败')
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
