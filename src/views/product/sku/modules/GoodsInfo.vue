<template>
  <a-drawer v-model:open="open" title="查看商品详情">
    <a-space direction="vertical">
      <a-row>
        <a-col :span="6">名称</a-col>
        <a-col :span="18">华为mate60</a-col>
      </a-row>
      <a-row>
        <a-col :span="6">描述</a-col>
        <a-col :span="18">华为YYDS</a-col>
      </a-row>
      <a-row>
        <a-col :span="6">价格</a-col>
        <a-col :span="18">6999</a-col>
      </a-row>
      <a-row>
        <a-col :span="6">平台属性</a-col>
        <a-col :span="18">
          <a-tag v-for="item in 10" :key="item">{{ item }}</a-tag>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="6">销售属性</a-col>
        <a-col :span="18">
          <a-tag v-for="item in 10" :key="item">{{ item }}</a-tag>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="6">商品图片</a-col>
        <a-col :span="18"></a-col>
      </a-row>
    </a-space>
  </a-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const open = ref<boolean>(false)

const show = () => {
  open.value = true
}

defineExpose({
  show,
})
</script>

<style scoped></style>
