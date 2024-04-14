<template>
  <a-drawer
    title="分配权限"
    :open="open"
    @close="open = false"
    :footer-style="{ textAlign: 'right' }"
  >
    <a-tree
      :tree-data="menuArr"
      :fieldNames="fieldNames"
      checkable
      v-model:checkedKeys="checkedKeys"
      v-model:expandedKeys="expandedKeys"
      @check="handleTreeCheckd"
    ></a-tree>
    <template #footer>
      <a-button style="margin-right: 8px" @click="open = false">取消</a-button>
      <a-button type="primary" @click="confirm">确定</a-button>
    </template>
  </a-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import type { RoleData, MenuResponseData, MenuList } from '@/api/acl/role/type'
import { reqAllMenuList, reqSetPermisstion } from '@/api/acl/role'

defineOptions({ name: 'AssignPermission' })

const open = ref(false)
const roleId = ref<number>(0)

const show = async (row: RoleData) => {
  roleId.value = row.id as number
  message.loading('加载中...', 0)
  const res: MenuResponseData = await reqAllMenuList(roleId.value)
  message.destroy()
  if (res.code === 200) {
    menuArr.value = res.data
    checkedKeys.value = filterCheckedArr(menuArr.value, [])
    open.value = true
  } else {
    message.error(res.message)
  }
}

const confirm = async () => {
  const res: any = await reqSetPermisstion(roleId.value, [
    ...checkedKeys.value,
    ...halfCheckedKeys.value,
  ])
  if (res.code === 200) {
    open.value = false
    message.success('分配权限成功')
    window.location.reload()
  } else {
    message.error('分配权限失败')
  }
}

const menuArr = ref<MenuList>([])
const fieldNames = { key: 'id', title: 'name' }
const checkedKeys = ref<number[]>([])
const halfCheckedKeys = ref<number[]>([])
const expandedKeys = ref<number[]>([1])

const filterCheckedArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level === 4) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      filterCheckedArr(item.children, initArr)
    }
  })
  return initArr
}

const handleTreeCheckd = (
  checkeds: number[],
  { halfCheckedKeys: halfCheckeds }: { halfCheckedKeys: number[] },
) => {
  checkedKeys.value = checkeds
  halfCheckedKeys.value = halfCheckeds
}

defineExpose({
  show,
})
</script>

<style></style>
