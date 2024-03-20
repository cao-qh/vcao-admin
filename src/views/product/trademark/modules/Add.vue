<template>
  <a-modal
    title="添加品牌"
    :open="visible"
    :confirmLoading="confirmLoading"
    @ok="$emit('ok')"
    @cancel="$emit('cancel')"
  >
    <a-form ref="form" :model="formState" :rules="rules" v-bind="layout">
      <a-form-item label="品牌名称" name="tmName">
        <a-input v-model:value="formState.tmName" />
      </a-form-item>
      <a-form-item label="品牌Logo" name="logoUrl">
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
            v-if="formState.logoUrl"
            :src="formState.logoUrl"
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
import type { FormInstance } from 'ant-design-vue'

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
// 定义方法
defineEmits(['ok', 'cancel'])

const form = ref<FormInstance>()

// 表单布局
const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 13 },
  },
}

interface FormState {
  logoUrl: string
  tmName: string
}

const formState = reactive<FormState>({
  logoUrl: '',
  tmName: '',
})

const rules = {
  tmName: [{ required: true, message: '请输入品牌名称' }],
  logoUrl: [{ required: true, message: '请上传品牌Logo' }],
}

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
    formState.logoUrl = info.file.response.data
  }
  if (info.file.status === 'error') {
    loading.value = false
    message.error('upload error')
  }
}

defineExpose({
  form,
})
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
