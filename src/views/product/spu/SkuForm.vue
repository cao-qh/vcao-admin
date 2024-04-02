<template>
  <div>
    <a-form :label-col="labelCol">
      <a-form-item label="SKU名称">
        <a-input placeholder="请输入SKU名称" />
      </a-form-item>
      <a-form-item label="价格(元)">
        <a-input-number placeholder="请输入价格" style="width: 100%" />
      </a-form-item>
      <a-form-item label="重量(g)">
        <a-input-number placeholder="请输入重量" style="width: 100%" />
      </a-form-item>
      <a-form-item label="SKU描述">
        <a-textarea placeholder="请输入SKU描述" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
const labelCol = {
  xs: 24,
  sm: 4,
}
</script>

<style></style>
