<template>
  <PageWrapper>
    <a-form :model="formState">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="一级分类">
            <a-select v-model:value="formState.region">
              <a-select-option value="jack">Jack</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="二级分类">
            <a-select v-model:value="formState.region">
              <a-select-option value="jack">Jack</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="三级分类">
            <a-select v-model:value="formState.region">
              <a-select-option value="jack">Jack</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

    <a-button style="margin-bottom: 8px" type="primary">
      <template #icon>
        <PlusOutlined />
      </template>
      添加属性
    </a-button>

    <a-table :columns="columns"></a-table>
  </PageWrapper>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '属性名称',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '属性值名称',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'id',
    align: 'center',
  },
]

const formState = reactive({})
</script>

<style></style>
