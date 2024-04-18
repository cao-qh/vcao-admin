<template>
  <a-form>
    <a-row>
      <a-col :span="6" v-for="item in formItems" :key="item.filed">
        <a-form-item :label="item.label">
          <a-input
            v-if="item.type === 'input'"
            v-model:value="item.value"
            :placeholder="item.placeholder"
          />
        </a-form-item>
      </a-col>
      <a-col :span="btnSpan">
        <a-space style="float: right">
          <a-button
            type="primary"
            @click="$emit('search')"
            :loading="searchLoading"
          >
            查询
          </a-button>
          <a-button @click="layoutSettingStore.refresh = true">重置</a-button>
        </a-space>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useLayoutSettingStore from '@/store/modules/setting'
import type { SearchFormProps } from './type'

const props = withDefaults(defineProps<SearchFormProps>(), {
  searchLoading: false,
})
defineEmits(['search'])
const layoutSettingStore = useLayoutSettingStore()

const btnSpan = computed(() => {
  const result = props.formItems.length % 4
  return 24 - result * 6
})
</script>

<style></style>
