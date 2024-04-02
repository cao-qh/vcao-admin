<template>
  <div>
    <a-form :label-col="labelCol">
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
          <a-select
            v-model:value="saleAttrIdAndValueName"
            :placeholder="
              unSelectSaleAttr.length
                ? `还未选择${unSelectSaleAttr.length}个`
                : '无'
            "
            style="width: 300px"
          >
            <a-select-option
              v-for="item in unSelectSaleAttr"
              :key="item.id"
              :value="`${item.id}:${item.name}`"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
          <a-button
            type="primary"
            :disabled="!saleAttrIdAndValueName"
            @click="addSaleAttr"
          >
            <template #icon>
              <plus-outlined />
            </template>
            添加属性
          </a-button>
        </a-space>
        <a-table
          style="margin-top: 6px"
          :columns="columns"
          :data-source="saleAttr"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.dataIndex === 'spuSaleAttrValueList'">
              <a-tag
                v-for="(item, index) in record.spuSaleAttrValueList"
                :key="item.id"
                closable
                @close="record.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ item.saleAttrValueName }}
              </a-tag>
              <a-input
                v-if="record.flag"
                :ref="(el: HTMLElement) => el?.focus()"
                v-model:value="record.saleAttrValue"
                placeholder="请输入属性值"
                size="small"
                style="width: 100px"
                @blur="toLook(record)"
              />
              <a-button
                v-else
                type="primary"
                size="small"
                @click="toEdit(record)"
              >
                <template #icon>
                  <PlusOutlined />
                </template>
              </a-button>
            </template>
            <template v-if="column.dataIndex === 'action'">
              <a-button
                type="primary"
                size="small"
                @click="saleAttr.splice(index, 1)"
              >
                <template #icon>
                  <DeleteOutlined />
                </template>
              </a-button>
            </template>
          </template>
        </a-table>
      </a-form-item>
    </a-form>
    <a-space>
      <a-button type="primary" @click="save" :disabled="!saleAttr.length">
        保存
      </a-button>
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
import { ref, computed } from 'vue'
import {
  reqAllTradeMark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
  reqAddorUpdateSpu,
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
  SaleAttrValue,
} from '@/api/product/spu/type'
import { Upload, message } from 'ant-design-vue'
import type { UploadChangeParam, UploadProps } from 'ant-design-vue'

defineOptions({ name: 'SpuForm' })
const emit = defineEmits(['changeScene'])

const labelCol = {
  xs: 24,
  sm: 4,
}

const columns = [
  {
    title: '序号',
    dataIndex: 'baseSaleAttrId',
    align: 'center',
  },
  {
    title: '属性名',
    dataIndex: 'saleAttrName',
    align: 'center',
  },
  {
    title: '属性值',
    dataIndex: 'spuSaleAttrValueList',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
  },
]

const cancel = () => {
  emit('changeScene', {
    flag: 0,
    param: 'update',
  })
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

const saleAttrIdAndValueName = ref<string | null>()

const initAddSpu = async (category3: number) => {
  // 清空表单数据
  spuParams.value = {
    spuName: '',
    tmId: -1,
    description: '',
    spuImageList: null,
    category3Id: -1,
    spuSaleAttrList: null,
  }
  spuImg.value = []
  saleAttr.value = []
  saleAttrIdAndValueName.value = null

  const [res, res1]: [AllTrademark, HasSaleAttrResponseData] =
    await Promise.all([reqAllTradeMark(), reqAllSaleAttr()])

  // 存储全部品牌的数据
  allTrademark.value = res.data
  // 存储全部销售属性
  allSaleAttr.value = res1.data
  spuParams.value.category3Id = category3
}

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

// 添加一个新的SPU初始化请求方法

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

// 计算出当前SPU还未拥有的销售属性
const unSelectSaleAttr = computed(() => {
  const unSelectArr = allSaleAttr.value.filter((item) => {
    return saleAttr.value.every((item1) => {
      return item.name != item1.saleAttrName
    })
  })
  return unSelectArr
})

// 添加销售属性的方法
const addSaleAttr = () => {
  if (saleAttrIdAndValueName.value == null) return

  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')
  const newSaleAttr: SaleAttr = {
    baseSaleAttrId: +baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  saleAttr.value.push(newSaleAttr)
  saleAttrIdAndValueName.value = null
}

const toEdit = (record: SaleAttr) => {
  record.flag = true
  record.saleAttrValue = ''
}

const toLook = (record: SaleAttr) => {
  const { baseSaleAttrId, saleAttrValue } = record
  const newSaleAttr: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  }

  if (saleAttrValue?.trim() == '') {
    message.error('属性值不能为空')
    return
  }

  // 判断属性值是否在数组大众存在
  const repeat = record.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName == saleAttrValue
  })

  if (repeat) {
    message.error('属性值不能重复')
    return
  }

  record.spuSaleAttrValueList.push(newSaleAttr)
  record.flag = false
}

const save = async () => {
  // 整理参数
  // 1.照片墙的数据
  spuParams.value.spuImageList = spuImg.value.map((item) => {
    return { imgName: item.name, imgUrl: item.url }
  })
  // 2.销售属性的数据
  spuParams.value.spuSaleAttrList = saleAttr.value
  const res = await reqAddorUpdateSpu(spuParams.value)
  if (res.code === 200) {
    message.success(spuParams.value.id ? '修改成功' : '添加成功')
    emit('changeScene', {
      flag: 0,
      param: spuParams.value.id ? 'update' : 'add',
    })
  } else {
    message.error(spuParams.value.id ? '修改失败' : '添加失败')
  }
}

defineExpose({
  initHasSpuData,
  initAddSpu,
})
</script>

<style></style>
