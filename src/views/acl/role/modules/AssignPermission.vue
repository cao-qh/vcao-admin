<template>
  <a-drawer
    title="分配权限"
    :open="open"
    @close="open = false"
    :footer-style="{ textAlign: 'right' }"
  >
    <a-tree :tree-data="menuArr" :fieldNames="fieldNames" checkable></a-tree>
    <template #footer>
      <a-button style="margin-right: 8px" @click="open = false">取消</a-button>
      <a-button type="primary" @click="confirm">确定</a-button>
    </template>
  </a-drawer>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'
import type { RoleData, MenuResponseData, MenuList } from '@/api/acl/role/type'
import { reqAllMenuList } from '@/api/acl/role'

defineOptions({ name: 'AssignPermission' })
const emit = defineEmits(['success'])

const open = ref(false)

const show = async (row: RoleData) => {
  open.value = true
  const res: MenuResponseData = await reqAllMenuList(row.id as number)
  if (res.code === 200) {
    menuArr.value = res.data
  }
}

const confirm = async () => {}

const menuArr = ref<MenuList>([])
const fieldNames = { key: 'id', title: 'name' }

defineExpose({
  show,
})
</script>

<style></style>
