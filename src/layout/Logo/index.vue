<template>
  <div v-if="!setting.logoHidden" class="logo">
    <img :src="setting.logo" alt="logo" />
    <span :class="{ dark: !layoutSettingStore.dark }">{{ setting.title }}</span>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
import useLayoutSettingStore from '@/store/modules/setting'
const layoutSettingStore = useLayoutSettingStore()

defineOptions({
  name: 'Logo',
})
</script>

<style scoped lang="scss">
.logo {
  height: $base-logo-height;
  line-height: calc($base-logo-height - 20px);
  padding: 10px 16px;
  color: #fff;
  display: flex;
  justify-content: center;

  span {
    margin-left: 8px;
    font-size: 16px;
    font-weight: bold;
  }

  span.dark {
    color: #1890ff;
  }
}
</style>
