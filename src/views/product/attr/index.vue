<template>
  <PageWrapper>
    <a-form :model="formState">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="一级分类">
            <a-select
              allow-clear
              show-search
              :filterOption="filterOption"
              v-model:value="formState.c1"
              :fieldNames="fieldNames"
              :options="c1Arr"
              @change="handleC1Change"
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="二级分类">
            <a-select
              allow-clear
              show-search
              :filterOption="filterOption"
              v-model:value="formState.c2"
              :fieldNames="fieldNames"
              :options="c2Arr"
              @change="handleC2Change"
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="三级分类">
            <a-select
              allow-clear
              show-search
              :filterOption="filterOption"
              v-model:value="formState.c3"
              :fieldNames="fieldNames"
              :options="c3Arr"
              @change="handleC3Change"
            ></a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

    <a-button
      style="margin-bottom: 8px"
      type="primary"
      :disabled="!formState.c3"
    >
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
import { reqC1, reqC2, reqC3 } from '@/api/product/attr/index'
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

interface FormState {
  c1?: number
  c2?: number
  c3?: number
}
const formState = reactive<FormState>({})

const fieldNames = { label: 'name', value: 'id' }
const c1Arr = ref<SelectProps['options']>([])
const c2Arr = ref<SelectProps['options']>([])
const c3Arr = ref<SelectProps['options']>([])

onMounted(async () => {
  const res = await reqC1()
  if (res.code == 200) {
    c1Arr.value = res.data
  }
})

const filterOption = (input: string, option: any) => {
  return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0
}

const handleC1Change = async (value: number) => {
  formState.c2 = undefined
  formState.c3 = undefined
  c3Arr.value = []
  const res = await reqC2(value)
  if (res.code == 200) {
    c2Arr.value = res.data
  }
}
const handleC2Change = async (value: number) => {
  formState.c3 = undefined
  c3Arr.value = []
  const res = await reqC3(value)
  if (res.code == 200) {
    c3Arr.value = res.data
  }
}
const handleC3Change = async () => {
  console.log('formSate :>> ', formState)
}
</script>

<style></style>
