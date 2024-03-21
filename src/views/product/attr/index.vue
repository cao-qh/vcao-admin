<template>
  <PageWrapper>
    <a-form :model="formState">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="一级分类">
            <a-select
              show-search
              :filterOption="filterOption"
              v-model:value="formState.c1"
              :fieldNames="{ label: 'name', value: 'id' }"
              :options="c1Arr"
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="二级分类"></a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="三级分类"></a-form-item>
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
import { reactive, ref, onMounted } from 'vue'
import { reqC1 } from '@/api/product/attr/index'
import type { SelectProps } from 'ant-design-vue'

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

const c1Arr = ref<SelectProps['options']>([])

onMounted(async () => {
  const res = await reqC1()
  if (res.code == 200) {
    c1Arr.value = res.data
  }
})

const filterOption = (input: string, option: any) => {
  return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0
}
</script>

<style></style>
