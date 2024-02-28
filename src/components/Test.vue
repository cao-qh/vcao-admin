<template>
  <div>
    <a-pagination
      v-model:current="current1"
      show-quick-jumper
      :total="500"
      @change="onChange"
    />
    <br />
    <a-pagination
      v-model:current="current2"
      show-quick-jumper
      :total="500"
      disabled
      show-less-items
      @change="onChange"
    />
  </div>

  <a-space direction="vertical" :size="12">
    <a-date-picker v-model:value="value1" />
    <a-date-picker v-model:value="value2" picker="week" />
    <a-date-picker v-model:value="value3" picker="month" />
    <a-date-picker v-model:value="value4" picker="quarter" />
    <a-date-picker v-model:value="value5" picker="year" />
  </a-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const current1 = ref<number>(1)
const current2 = ref<number>(2)
const onChange = (pageNumber: number) => {
  console.log('Page: ', pageNumber)
}

import type { Dayjs } from 'dayjs'
const value1 = ref<Dayjs>()
const value2 = ref<Dayjs>()
const value3 = ref<Dayjs>()
const value4 = ref<Dayjs>()
const value5 = ref<Dayjs>()
</script>
