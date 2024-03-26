<template>
  <a-form :model="formState" :disabled="disabled">
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
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import type { SelectProps } from 'ant-design-vue'
import { reqC1, reqC2, reqC3 } from '@/api/product/attr/index'
import type { CategoryLevel } from './type'

withDefaults(defineProps<{ disabled?: boolean }>(), {
  disabled: false,
})

const emit = defineEmits(['c3Change'])

const formState = reactive<CategoryLevel>({})

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

const handleC3Change = async (value: number) => {
  if (!value) return
  emit('c3Change', formState)
}
</script>

<style></style>
