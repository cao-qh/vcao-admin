<template>
  <a-drawer
    title="主题设置"
    :open="layoutSettingStore.side"
    :closable="false"
    @close="layoutSettingStore.side = false"
  >
    <a-form :wrapper-col="{ span: 6 }">
      <a-form-item label="主题颜色">
        <a-input type="color" :value="layoutSettingStore.themeColor" />
      </a-form-item>
      <a-form-item label="暗黑模式">
        <a-switch v-model:checked="layoutSettingStore.dark"></a-switch>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting'
const layoutSettingStore = useLayoutSettingStore()
</script>

<style></style>
