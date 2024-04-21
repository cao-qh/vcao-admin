<template>
  <div class="container">
    <div class="screen" ref="screen">
      <Top />
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist" />
          <Sex class="sex" />
          <Age class="age" />
        </div>
        <div class="center">
          <Map class="map" />
          <Line class="line" />
        </div>
        <div class="right">
          <Rank class="rank" />
          <Year class="year" />
          <Counter class="count" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Top from './components/Top/index.vue'
import Tourist from './components/Tourist/index.vue'
import Sex from './components/Sex/index.vue'
import Age from './components/Age/index.vue'
import Map from './components/Map/index.vue'
import Line from './components/Line/index.vue'

//引入右侧三个子组件
import Rank from './components/Rank/index.vue'
import Year from './components/Year/index.vue'
import Counter from './components/Couter/index.vue'

defineOptions({ name: 'Screen' })
const screen = ref()

onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
})

// 定义打拼缩放比例
function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  background-size: cover;

  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    left: 50%;
    top: 50%;
    transform-origin: left top;

    .top {
      width: 100%;
      height: 40px;
    }
    .bottom {
      display: flex;
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 40px;

        .rank {
          flex: 1.5;
        }

        .year {
          flex: 1;
        }

        .count {
          flex: 1;
        }
      }
      .left {
        flex: 1;
        height: 1025px;
        display: flex;
        flex-direction: column;
        .tourist {
          flex: 1.2;
        }
        .sex {
          flex: 1;
        }
        .age {
          flex: 1;
        }
      }
      .center {
        flex: 1.5;
        display: flex;
        flex-direction: column;

        .map {
          flex: 4;
        }

        .line {
          flex: 1;
        }
      }
    }
  }
}
</style>
