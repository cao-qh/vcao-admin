<template>
  <div>
    <a-form>
      <a-form-item label="SPU名称">
        <a-input
          v-model:value="spuParams.spuName"
          placeholder="请你输入SPU名称"
        ></a-input>
      </a-form-item>
      <a-form-item label="SPU品牌">
        <a-select placeholder="请选择产品" v-model:value="spuParams.tmId">
          <a-select-option v-for="item in allTrademark" :key="item.id">
            {{ item.tmName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="SPU描述">
        <a-textarea
          v-model:value="spuParams.description"
          placeholder="请输入SPU描述"
        />
      </a-form-item>
      <a-form-item label="SPU图片">
        <a-upload
          v-model:file-list="spuImg"
          name="file"
          action="/api/admin/product/fileUpload"
          list-type="picture-card"
          :before-upload="beforeUpload"
          @change="handleChange"
          @preview="handlePreview"
        >
          <div>
            <plus-outlined />
            <div style="margin-top: 8px">Upload</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item label="SPU的销售属性">
        <a-space>
          <a-select placeholder="请选择产品" style="width: 300px">
            <a-select-option value="1">Apple</a-select-option>
          </a-select>
          <a-button type="primary">
            <template #icon>
              <plus-outlined />
            </template>
            添加属性值
          </a-button>
        </a-space>
        <a-table style="margin-top: 6px" :columns="columns"></a-table>
      </a-form-item>
    </a-form>
    <a-space>
      <a-button type="primary">保存</a-button>
      <a-button @click="cancel">取消</a-button>
    </a-space>

    <a-modal
      :open="previewVisible"
      :title="previewTitle"
      :footer="null"
      @cancel="handleCancel"
    >
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  reqAllTradeMark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
} from '@/api/product/spu'
import type {
  SpuData,
  AllTrademark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  Trademark,
  SpuImg,
  SaleAttr,
  HasSaleAttr,
} from '@/api/product/spu/type'
import { Upload, message } from 'ant-design-vue'
import type { UploadChangeParam, UploadProps } from 'ant-design-vue'

defineOptions({ name: 'SpuForm' })
const emit = defineEmits(['changeScene'])

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
  },
  {
    title: '属性名',
    dataIndex: 'index',
    align: 'center',
  },
  {
    title: '属性值',
    dataIndex: 'index',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'index',
    align: 'center',
  },
]

const cancel = () => {
  emit('changeScene', 0)
}

// 存储已有的spu这些数据
const allTrademark = ref<Trademark[]>([])
// 存储已有的spu图片
const spuImg = ref<SpuImg[]>([])
// spu销售属性
const saleAttr = ref<SaleAttr[]>([])
// 全部销售属性
const allSaleAttr = ref<HasSaleAttr[]>([])
// 存储已有的SPU对象
const spuParams = ref<SpuData>({
  spuName: '',
  tmId: -1,
  description: '',
  spuImageList: null,
  category3Id: -1,
  spuSaleAttrList: null,
})

const previewVisible = ref(false)
const previewImage = ref('')
const previewTitle = ref('')

const initHasSpuData = async (record: SpuData) => {
  spuParams.value = record

  const [res, res1, res2, res3]: [
    AllTrademark,
    SpuHasImg,
    SaleAttrResponseData,
    HasSaleAttrResponseData,
  ] = await Promise.all([
    reqAllTradeMark(),
    reqSpuImageList(record.id as number),
    reqSpuHasSaleAttr(record.id as number),
    reqAllSaleAttr(),
  ])

  // 存储全部品牌的数据
  allTrademark.value = res.data
  // 存储已有的spu图片
  spuImg.value = res1.data.map((item) => {
    return { name: item.imgName, url: item.imgUrl }
  })
  // 存储已有的spu销售属性
  saleAttr.value = res2.data
  // 存储全部销售属性
  allSaleAttr.value = res3.data
}

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
      return Upload.LIST_IGNORE
    }
  } else {
    message.error('上传格式为PNG|JPG|GIF')
    return Upload.LIST_IGNORE
  }
}

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status === 'done') {
    info.fileList[info.fileList.length - 1].url = info.file.response.data
  }
  if (info.file.status === 'error') {
    message.error('upload error')
  }
}

const handlePreview: UploadProps['onPreview'] = async (file) => {
  previewImage.value = file.url as string
  previewVisible.value = true
  previewTitle.value = file.name
}

const handleCancel = () => {
  previewVisible.value = false
  previewTitle.value = ''
}

defineExpose({
  initHasSpuData,
})
</script>

<style></style>
