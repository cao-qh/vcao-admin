<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">
        可预约总量
        <span>99999</span>
        人
      </p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <div class="charts" ref="charts">122</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'

const people = ref('216908人')
const charts = ref()

onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(charts.value)
  // 绘制图表
  myChart.setOption({
    tooltip: {},
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    },
    yAxis: {},
    series: {
      type: 'liquidFill',
      data: [0.6],
      radius: '85%',
    },
    grid: {
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
    },
  })
})
</script>

<style scoped lang="scss">
.box {
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  .top {
    margin-left: 20px;
    .title {
      color: #fff;
      font-size: 20px;
    }
    .bg {
      width: 68px;
      height: 7px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      margin-top: 15px;
    }
    .right {
      float: right;
      color: #fff;
      margin-right: 10px;
      span {
        color: orange;
      }
    }
  }
  .number {
    // background-color: red;
    margin: 40px 10px 0 10px;
    display: flex;
    span {
      margin-right: 2px;
      flex: 1;
      height: 60px;
      text-align: center;
      line-height: 60px;
      background: url(../../images/total.png) no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
      font-size: 30px;
    }
  }
  .charts {
    // background-color: red;
    height: 220px;
    margin-top: 10px;
  }
}
</style>
