<template>
  <a-modal :open="open" @cancel="open = false" :title="title" @ok="submit">
    <a-form
      ref="formRef"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
      :model="userParams"
      :rules="rules"
    >
      <a-form-item label="用户姓名" name="username">
        <a-input
          v-model:value="userParams.username"
          placeholder="请输入用户名"
        />
      </a-form-item>
      <a-form-item label="用户昵称" name="name">
        <a-input v-model:value="userParams.name" placeholder="请输入昵称" />
      </a-form-item>
      <a-form-item v-if="!userParams.id" label="用户密码" name="password">
        <a-input v-model:value="userParams.password" placeholder="请输入密码" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { User } from '@/api/acl/user/type'
import { reqAddOrUpdateUser } from '@/api/acl/user'
import { message } from 'ant-design-vue'

defineOptions({ name: 'AddOrEdit' })

const open = ref<boolean>(false)
const title = ref<string>('添加用户')
const userParams = reactive<User>({
  username: '',
  name: '',
  password: '',
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
  name: [
    {
      required: true,
      message: '昵称不能为空',
      trigger: 'change',
    },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'change',
    },
    {
      min: 5,
      max: 15,
      message: '密码长度为5-15位',
      trigger: 'change',
    },
  ],
}
const formRef = ref<any>()

const show = (row: User) => {
  open.value = true
  Object.assign(userParams, {
    id: 0,
    username: '',
    name: '',
    password: '',
  })
  formRef.value?.resetFields()
  if (row) {
    title.value = '修改用户'
    Object.assign(userParams, row)
  } else {
    title.value = '添加用户'
  }
}

const submit = async () => {
  try {
    await formRef.value.validate()
    const res = await reqAddOrUpdateUser(userParams)
    if (res.code == 200) {
      open.value = false
      message.success(userParams.id ? '修改成功' : '添加成功')
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
