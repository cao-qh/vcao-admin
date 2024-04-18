<template>
  <PageWrapper>
    <a-form>
      <a-row>
        <a-col :span="6">
          <a-form-item label="模板名称">
            <a-input v-model:value="templateName" />
          </a-form-item>
        </a-col>
        <a-col :span="18">
          <a-space style="float: right">
            <a-button type="primary" @click="search">查询</a-button>
            <a-button @click="reset">重置</a-button>
          </a-space>
        </a-col>
      </a-row>
    </a-form>
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const templateName = ref('')

const search = () => {}
const reset = () => {}
</script>

<style></style>
