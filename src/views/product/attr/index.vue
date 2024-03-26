<template>
  <PageWrapper>
    <Categoty :disabled="isAddOrEdit" @c3Change="handleC3Change" />

    <template v-if="!isAddOrEdit">
      <a-button
        style="margin-bottom: 8px"
        type="primary"
        :disabled="!categoryLevel.c3"
        @click="handleAddAttr"
      >
        <template #icon>
          <PlusOutlined />
        </template>
        添加属性
      </a-button>

      <a-table :columns="columns" :data-source="attrArr" bordered>
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'attrValueList'">
            <a-tag v-for="item in record.attrValueList" :key="item.id">
              {{ item.valueName }}
            </a-tag>
          </template>
          <template v-if="column.dataIndex === 'action'">
            <a-space>
              <a-button type="primary" @click="handleEdit(record)">
                <template #icon>
                  <EditOutlined />
                </template>
              </a-button>
              <a-popconfirm
                title="是否确认删除?"
                ok-text="确认"
                cancel-text="取消"
                @confirm="handleDelete(record.id)"
              >
                <a-button type="primary" danger>
                  <template #icon>
                    <DeleteOutlined />
                  </template>
                </a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </template>

    <template v-else>
      <a-space direction="vertical" style="width: 100%">
        <a-form layout="inline">
          <a-form-item label="属性名称">
            <a-input
              v-model:value="attrParams.attrName"
              placeholder="请输入属性名称"
            />
          </a-form-item>
        </a-form>
        <a-space>
          <a-button
            type="primary"
            :disabled="!attrParams.attrName"
            @click="addAttrValue"
          >
            <template #icon>
              <PlusOutlined />
            </template>
            添加属性
          </a-button>
          <a-button @click="isAddOrEdit = false">取消</a-button>
        </a-space>
        <a-table
          :columns="attrValueColumns"
          :data-source="attrParams.attrValueList"
          bordered
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.dataIndex === 'id'">
              <span>{{ record.id || index + 1 }}</span>
            </template>
            <template v-if="column.dataIndex === 'attrName'">
              <a-input
                v-if="record.flag"
                :ref="(el: any) => (inputArr[index] = el)"
                v-model:value="record.valueName"
                placeholder="请输入属性名称"
                size="small"
                @blur="toLook(record, index)"
              />
              <div v-else @click="toEdit(record, index)">
                {{ record.valueName }}
              </div>
            </template>
            <template v-if="column.dataIndex === 'action'">
              <a-button
                type="primary"
                danger
                size="small"
                @click="attrParams.attrValueList.splice(index, 1)"
              >
                <template #icon>
                  <DeleteOutlined />
                </template>
              </a-button>
            </template>
          </template>
        </a-table>
        <a-space>
          <a-button
            type="primary"
            @click="handleSave"
            :disabled="attrParams.attrValueList.length === 0"
          >
            保存
          </a-button>
          <a-button @click="isAddOrEdit = false">取消</a-button>
        </a-space>
      </a-space>
    </template>
  </PageWrapper>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick } from 'vue'
import {
  reqAttr,
  reqAddOrUpdateAttr,
  reqRemoveAttr,
} from '@/api/product/attr/index'

import type { Attr, AttrValue, AttrResponseData } from '@/api/product/attr/type'
import { message } from 'ant-design-vue'
import Categoty from '@/components/Category/index.vue'
import type { CategoryLevel } from '@/components/Category/type'

defineOptions({ name: 'Attr' })

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '属性名称',
    dataIndex: 'attrName',
    align: 'center',
  },
  {
    title: '属性值名称',
    dataIndex: 'attrValueList',
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
  },
]
const attrValueColumns = [
  {
    title: '序号',
    dataIndex: 'id',
    width: '10%',
  },
  {
    title: '属性值名称',
    dataIndex: 'attrName',
  },
  {
    title: '操作',
    dataIndex: 'action',
  },
]

const categoryLevel = reactive<CategoryLevel>({})
const attrArr = ref<Attr[]>([])
const isAddOrEdit = ref<boolean>(false)
const attrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: -1,
  categoryLevel: 3,
})
const inputArr = ref<any[]>([])

const handleC3Change = (obj: any) => {
  Object.assign(categoryLevel, obj)
  getAttr()
}

const getAttr = async () => {
  const res: AttrResponseData = await reqAttr(
    categoryLevel.c1 as number,
    categoryLevel.c2 as number,
    categoryLevel.c3 as number,
  )
  if (res.code == 200) {
    attrArr.value = res.data
  }
}

const handleEdit = (record: Attr) => {
  isAddOrEdit.value = true
  Object.assign(attrParams, JSON.parse(JSON.stringify(record)))
}

const handleAddAttr = () => {
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: -1,
    categoryLevel: 3,
  })
  isAddOrEdit.value = true
  attrParams.categoryId = categoryLevel.c3 as number
}

const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true,
  })
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}
const handleSave = async () => {
  // 发请求
  const res = await reqAddOrUpdateAttr(attrParams)
  if (res.code == 200) {
    isAddOrEdit.value = false
    message.success(res.message)
    getAttr()
  } else {
    message.error(res.message)
  }
}
const toLook = (record: AttrValue, index: number) => {
  if (record.valueName.trim() == '') {
    attrParams.attrValueList.splice(index, 1)
    message.error('属性值不能为空')
    return
  }
  const repeat = attrParams.attrValueList.find((item) => {
    if (item !== record) {
      return item.valueName == record.valueName
    }
  })
  if (repeat) {
    attrParams.attrValueList.splice(index, 1)
    message.error('属性值不能重复')
    return
  }

  record.flag = false
}
const toEdit = (record: AttrValue, index: number) => {
  record.flag = true
  nextTick(() => {
    inputArr.value[index].focus()
  })
}
const handleDelete = async (id: number) => {
  const res = await reqRemoveAttr(id)
  if (res.code == 200) {
    message.success('删除成功')
    getAttr()
  } else {
    message.error('删除失败')
  }
  return true
}
</script>

<style></style>
