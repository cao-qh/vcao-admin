<template>
  <div v-if="!setting.logoHidden" class="logo">
    <img :src="setting.logo" alt="logo" />
    <span>{{ setting.title }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import setting from '@/setting'
import useLayoutSettingStore from '@/store/modules/setting'
const layoutSettingStore = useLayoutSettingStore()

defineOptions({
  name: 'Logo',
})

const color = computed(() => {
  return layoutSettingStore.dark ? '#d9d9d9' : layoutSettingStore.themeColor
})
</script>

<style scoped lang="scss">
.logo {
  height: $base-logo-height;
  line-height: calc($base-logo-height - 20px);
  padding: 5px 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 100%;
  }

  span {
    margin-left: 8px;
    font-size: 16px;
    font-weight: bold;
    color: v-bind(color);
  }
}
</style>
