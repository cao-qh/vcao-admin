<template>
  <div class="top">
    <div class="left">
      <a class="lbtn" @click="goHome">首页</a>
    </div>
    <div class="center">
      <div class="title">智慧旅游可视化大数据平台</div>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time">当前时间 {{ time }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

const $router = useRouter()
const time = ref(dayjs(new Date()).format('YYYY年MM月DD日 HH:mm:ss'))
const timer = ref()

onMounted(() => {
  timer.value = setInterval(() => {
    time.value = dayjs(new Date()).format('YYYY年MM月DD日 HH:mm:ss')
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(timer.value)
})

const goHome = () => {
  $router.push('/')
}
</script>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 42px;
  display: flex;
  user-select: none;
  .left {
    flex: 1;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;
    .lbtn {
      width: 135px;
      height: 42px;
      float: right;
      background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 42px;
      color: #29fcff;
      font-size: 20px;
    }
  }
  .center {
    flex: 2;
    .title {
      width: 100%;
      height: 74px;
      background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 74px;
      color: #29fcff;
      font-size: 24px;
    }
  }
  .right {
    flex: 1;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    .rbtn {
      width: 135px;
      height: 42px;
      float: left;
      background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 42px;
      color: #29fcff;
      font-size: 20px;
    }
    .time {
      color: #29fcff;
      margin-left: 30px;
      font-size: 18px;
    }
  }
}
</style>
