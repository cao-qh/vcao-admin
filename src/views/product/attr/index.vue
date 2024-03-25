<template>
  <PageWrapper>
    <a-form :model="formState" :disabled="isAddOrEdit">
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

    <template v-if="!isAddOrEdit">
      <a-button
        style="margin-bottom: 8px"
        type="primary"
        :disabled="!formState.c3"
        @click="handleAddAttr"
      >
        <template #icon>
          <PlusOutlined />
        </template>
        添加属性
      </a-button>

      <a-table :columns="columns" :data-source="attrArr">
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
                @confirm="handleDelete(record)"
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
import { reactive, ref, onMounted, nextTick } from 'vue'
import {
  reqC1,
  reqC2,
  reqC3,
  reqAttr,
  reqAddOrUpdateAttr,
} from '@/api/product/attr/index'
import type { SelectProps } from 'ant-design-vue'
import type { Attr, AttrValue, AttrResponseData } from '@/api/product/attr/type'
import { message } from 'ant-design-vue'

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

const attrArr = ref<Attr[]>([])
const isAddOrEdit = ref<boolean>(false)
const attrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: -1,
  categoryLevel: 3,
})
const inputArr = ref<any[]>([])

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

const getAttr = async () => {
  const res: AttrResponseData = await reqAttr(
    formState.c1 as number,
    formState.c2 as number,
    formState.c3 as number,
  )
  if (res.code == 200) {
    attrArr.value = res.data
  }
}

const handleC3Change = async (value: number) => {
  if (!value) return
  getAttr()
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
  attrParams.categoryId = formState.c3 as number
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
</script>

<style></style>
