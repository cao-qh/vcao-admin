<template>
  <a-modal
    :open="visible"
    title="添加品牌"
    @ok="$emit('onOk')"
    @cancel="$emit('onCancel')"
  >
    <a-form
      :mode="formState"
      :labelCol="{
        xs: { span: 24 },
        sm: { span: 7 },
      }"
      :wrapperCol="{
        xs: { span: 24 },
        sm: { span: 13 },
      }"
    >
      <a-form-item label="品牌名称" name="trademarkName">
        <a-input
          v-model:value="formState.trademarkName"
          placeholder="请输入名称"
        />
      </a-form-item>
      <a-form-item label="品牌Logo" name="trademarkLogo">
        <a-upload
          v-model:file-list="fileList"
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
          <div v-else>
            <loading-outlined v-if="loading"></loading-outlined>
            <plus-outlined v-else></plus-outlined>
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
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
