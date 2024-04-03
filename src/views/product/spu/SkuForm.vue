<template>
  <div>
    <a-form :label-col="labelCol">
      <a-form-item label="SKU名称">
        <a-input placeholder="请输入SKU名称" />
      </a-form-item>
      <a-form-item label="价格(元)">
        <a-input-number placeholder="请输入价格" style="width: 100%" />
      </a-form-item>
      <a-form-item label="重量(g)">
        <a-input-number placeholder="请输入重量" style="width: 100%" />
      </a-form-item>
      <a-form-item label="SKU描述">
        <a-textarea placeholder="请输入SKU描述" />
      </a-form-item>
      <a-form-item label="平台属性">
        <a-form layout="inline">
          <a-form-item label="内存">
            <a-select placeholder="请选择产品">
              <a-select-option v-for="num in 10" :key="num">
                {{ num }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="内存">
            <a-select placeholder="请选择产品">
              <a-select-option v-for="num in 10" :key="num">
                {{ num }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="内存">
            <a-select placeholder="请选择产品">
              <a-select-option v-for="num in 10" :key="num">
                {{ num }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-form-item>
      <a-form-item label="销售属性">
        <a-form layout="inline">
          <a-form-item label="内存">
            <a-select placeholder="请选择产品">
              <a-select-option v-for="num in 10" :key="num">
                {{ num }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="内存">
            <a-select placeholder="请选择产品">
              <a-select-option v-for="num in 10" :key="num">
                {{ num }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="内存">
            <a-select placeholder="请选择产品">
              <a-select-option v-for="num in 10" :key="num">
                {{ num }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-form-item>
      <a-form-item label="图片名称">
        <a-table bordered :columns="columns" :row-selection="{}"></a-table>
      </a-form-item>
    </a-form>

    <a-space>
      <a-button type="primary">保存</a-button>
      <a-button @click="cancel">取消</a-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
const labelCol = {
  xs: 24,
  sm: 6,
  md: 4,
}
const columns = [
  {
    title: '图片',
    dataIndex: 'img',
    align: 'center',
  },
  {
    title: '名称',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
  },
]

const emit = defineEmits(['changeScene'])

const cancel = () => {
  emit('changeScene', { flag: 0, param: '' })
}
</script>

<style></style>
