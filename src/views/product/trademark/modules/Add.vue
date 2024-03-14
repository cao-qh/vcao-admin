<template>
  <a-modal
    :open="visible"
    title="添加品牌"
    @ok="$emit('onOk')"
    @cancel="$emit('onCancel')"
  >
    <a-form :mode="formState">
      <a-form-item label="品牌名称" name="trademarkName">
        <a-input v-model:value="formState.trademarkName" />
      </a-form-item>
      <a-form-item label="Logo" name="trademarkLogo">
        <a-input v-model:value="formState.trademarkLogo" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'

// 定义属性
defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  confirmLoading: {
    type: Boolean,
    default: false,
  },
})

interface FormState {
  trademarkName: string
  trademarkLogo: object | null
}

const formState = reactive<FormState>({
  trademarkName: '',
  trademarkLogo: null,
})
</script>
