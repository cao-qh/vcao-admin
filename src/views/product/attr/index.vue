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
        @click="isAddOrEdit = true"
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
            <a-input placeholder="请输入属性名称" />
          </a-form-item>
        </a-form>
        <a-space>
          <a-button type="primary" @click="isAddOrEdit = true">
            <template #icon>
              <PlusOutlined />
            </template>
            添加属性
          </a-button>
          <a-button @click="isAddOrEdit = false">取消</a-button>
        </a-space>
        <a-table :columns="attrValueColumns"></a-table>
        <a-space>
          <a-button type="primary">保存</a-button>
          <a-button @click="isAddOrEdit = false">取消</a-button>
        </a-space>
      </a-space>
    </template>
  </PageWrapper>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { reqC1, reqC2, reqC3, reqAttr } from '@/api/product/attr/index'
import type { SelectProps } from 'ant-design-vue'
import type { Attr, AttrResponseData } from '@/api/product/attr/type'

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
  },
  {
    title: '属性值名称',
    dataIndex: 'id',
  },
  {
    title: '操作',
    dataIndex: 'id',
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
  const res: AttrResponseData = await reqAttr(
    formState.c1 as number,
    formState.c2 as number,
    formState.c3 as number,
  )
  if (res.code == 200) {
    attrArr.value = res.data
  }
}
const handleEdit = (record: Attr) => {
  isAddOrEdit.value = true
}
</script>

<style></style>
