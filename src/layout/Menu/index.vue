<template>
  <div class="menu-container">
    <a-menu
      class="menu"
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      :open-keys="state.openKeys"
      :items="items"
      theme="dark"
      @openChange="onOpenChange"
    ></a-menu>
  </div>
</template>

<script lang="ts" setup>
import { VueElement, h, reactive } from 'vue'
import {
  HomeOutlined,
  DesktopOutlined,
  LockOutlined,
} from '@ant-design/icons-vue'
import type { ItemType } from 'ant-design-vue'
import type { MenuState } from './type'

function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: 'group',
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as ItemType
}

const items: ItemType[] = reactive([
  getItem('首页', 'home', () => h(HomeOutlined)),
  getItem('数据大屏', 'screen', () => h(DesktopOutlined)),
  getItem('权限管理', 'permission', () => h(LockOutlined), [
    getItem('用户管理', 'user'),
    getItem('角色管理', 'role'),
    getItem('菜单管理', 'menu'),
  ]),
])

const state: MenuState = reactive({
  rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
  openKeys: [],
  selectedKeys: [],
})
const onOpenChange = (openKeys: string[]) => {
  console.log('openKeys :>> ', openKeys)
  const latestOpenKey = openKeys.find(
    (key) => state.openKeys.indexOf(key) === -1,
  )
  console.log('latestOpenKey :>> ', latestOpenKey)
  if (state.rootSubmenuKeys.indexOf(latestOpenKey as string) === -1) {
    state.openKeys = openKeys
  } else {
    state.openKeys = latestOpenKey ? [latestOpenKey] : []
  }
}
</script>

<style scoped lang="scss">
.menu-container {
  height: calc(100% - $base-header-height);
  overflow-y: scroll;
  user-select: none;

  .menu {
    background-color: $base-menu-color;
  }
}

.menu-container::-webkit-scrollbar {
  display: none;
}
</style>
