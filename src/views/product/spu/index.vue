<template>
  <PageWrapper>
    <Category @c3-change="handleC3Change" />
  </PageWrapper>
</template>

<script setup lang="ts">
import Category from '@/components/Category/index.vue'
import type { CategoryLevel } from '@/components/Category/type'

const handleC3Change = (categoryLevel: CategoryLevel) => {
  console.log('categoryLevel :>> ', categoryLevel)
}
</script>

<style></style>
