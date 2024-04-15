<template>
  <a-modal
    :open="open"
    @cancel="open = false"
    :title="title"
    @ok="submit"
    :confirmLoading="confirmLoading"
  >
    <a-form
      ref="formRef"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
      :model="menuParams"
    >
      <a-form-item label="名称">
        <a-input v-model:value="menuParams.name" placeholder="请输入菜单名称" />
      </a-form-item>
      <a-form-item label="权限">
        <a-input v-model:value="menuParams.code" placeholder="请输入权限数值" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { Permisstion, MenuParams } from '@/api/acl/menu/type'
import { reqAddOrUpdateMenu } from '@/api/acl/menu'
import { message } from 'ant-design-vue'

defineOptions({ name: 'AddOrEdit' })
const emit = defineEmits(['success'])

const open = ref<boolean>(false)
const confirmLoading = ref<boolean>(false)
const title = ref<string>('')
const menuParams = reactive<MenuParams>({
  code: '',
  level: -1,
  name: '',
  pid: -1,
})

const formRef = ref<any>()

const show = (row: Permisstion, type: string) => {
  open.value = true
  Object.assign(menuParams, {
    id: 0,
    code: '',
    level: -1,
    name: '',
    pid: -1,
  })
  formRef.value?.resetFields()
  if (type === 'update') {
    title.value = '更新菜单'
    Object.assign(menuParams, row)
  } else {
    title.value = '添加菜单'
    menuParams.level = row.level + 1
    menuParams.pid = row.id as number
  }
}

const submit = async () => {
  try {
    await formRef.value.validate()
    confirmLoading.value = true

    const res: any = await reqAddOrUpdateMenu(menuParams)
    confirmLoading.value = false

    if (res.code == 200) {
      open.value = false
      message.success(menuParams.id ? '修改成功' : '添加成功')
      emit('success', menuParams.id ? false : true)
    } else {
      message.error(menuParams.id ? '修改失败' : '添加失败')
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
