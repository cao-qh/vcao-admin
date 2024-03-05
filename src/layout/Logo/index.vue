<template>
  <div v-if="!setting.logoHidden" class="logo">
    <img :src="setting.logo" alt="logo" />
    <span>{{ setting.title }}</span>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
</script>

<style scoped lang="scss">
.logo {
  height: 32px;
  line-height: 32px;
  margin: 10px 16px;
  color: #fff;
  display: flex;
  justify-content: center;

  span {
    margin-left: 8px;
    font-size: 16px;
  }
}
</style>
