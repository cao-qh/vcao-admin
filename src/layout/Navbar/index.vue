<template>
  <a-row class="navbar">
    <a-col :span="12">
      <component
        style="font-size: 20px"
        :is="
          layoutSettingStore.fold ? 'MenuFoldOutlined' : 'MenuUnfoldOutlined'
        "
        @click="changeManuFold"
      ></component>
    </a-col>
    <a-col :span="12">
      <a-flex justify="end" align="center">
        <a-space size="middle">
          <a-button
            :icon="h(resolveComponent('ReloadOutlined'))"
            size="small"
            @click="reload"
          />
          <a-button
            :icon="h(resolveComponent('FullscreenOutlined'))"
            size="small"
          />
          <a-button
            :icon="h(resolveComponent('SettingOutlined'))"
            size="small"
          />

          <a-dropdown>
            <span>
              admin
              <DownOutlined />
            </span>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;">1st menu item</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">2nd menu item</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">3rd menu item</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </a-space>
      </a-flex>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import useLayoutSettingStore from '@/store/modules/setting'
// 获取layout配置相关的仓库
let layoutSettingStore = useLayoutSettingStore()
const changeManuFold = () => {
  // 改变菜单折叠状态
  layoutSettingStore.fold = !layoutSettingStore.fold
}

// 刷新二级路由页面
const reload = () => {
  layoutSettingStore.refsh = false
}
</script>
