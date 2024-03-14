<template>
  <a-upload
    accept="image/png, image/jpeg"
    :file-list="fileList"
    list-type="picture-card"
    :isImageUrl="handleMiniImage"
    :before-upload="handleBeforeUpload"
    @remove="handleRemove"
  >
    <div class="upload-selector" v-if="fileList && fileList.length === 0">
      <PlusOutlined />
      <span>选择图片</span>
    </div>
  </a-upload>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UploadProps } from 'ant-design-vue'

const fileList = ref<UploadProps['fileList']>([])

// 上传前回调
const handleBeforeUpload: UploadProps['beforeUpload'] = (file) => {
  const newFile = {
    ...file,
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  }
  console.log('file :>> ', file)
  console.log('newFile :>> ', newFile)
  if (fileList.value) {
    fileList.value.splice(0, 1, newFile)
  }
  return false
}
// 处理删除
const handleRemove: UploadProps['onRemove'] = () => {
  fileList.value = []
}
// 展示缩略图
const handleMiniImage: UploadProps['isImageUrl'] = (file) => {
  console.log('file :>> ', file)
  return false
}
</script>

<style scoped lang="scss">
.upload-selector {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  > span {
    font-size: 12px;
  }
}
</style>
