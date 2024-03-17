<template>
  <a-modal
    :open="visible"
    title="添加品牌"
    @ok="$emit('onOk')"
    @cancel="$emit('onCancel')"
  >
    <a-form
      :model="formState"
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
          name="file"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          action="/api/admin/product/fileUpload"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <img
            v-if="formState.trademarkLogo"
            :src="formState.trademarkLogo"
            alt="avatar"
            style="width: 100px"
          />
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
import { reactive, ref } from 'vue'
import type { UploadChangeParam, UploadProps } from 'ant-design-vue'
import { message } from 'ant-design-vue'

defineOptions({ name: 'Add' })

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
  trademarkLogo: string
}

const formState = reactive<FormState>({
  trademarkName: '',
  trademarkLogo: '',
})

const fileList = ref([])
const loading = ref<boolean>(false)

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  if (
    file.type == 'image/jpeg' ||
    file.type == 'image/png' ||
    file.type == 'image/gif'
  ) {
    if (file.size / 1024 / 1024 < 4) {
      return true
    } else {
      message.error('图片大小不能超过4M')
      return false
    }
  } else {
    message.error('上传格式为PNG|JPG|GIF')
    return false
  }
}

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status === 'uploading') {
    loading.value = true
    return
  }
  if (info.file.status === 'done') {
    loading.value = false
    formState.trademarkLogo = info.file.response.data
  }
  if (info.file.status === 'error') {
    loading.value = false
    message.error('upload error')
  }
}
</script>
<style scoped>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
