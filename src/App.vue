<template>
  <a-config-provider :locale="locale">
    <Test />
  </a-config-provider>
</template>

<script setup>
import { reactive } from 'vue'
import Test from './Test.vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

const locale = reactive({ locale: zhCN })

// export default {
//   components: {
//     Test,
//   },
//   data() {
//     return {
//       locale: zhCN,
//     }
//   },
// }
</script>
