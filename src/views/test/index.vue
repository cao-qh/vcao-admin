<template>
  <div style="width: 200px; height: 100px">
    <a-carousel :after-change="onChange">
      <div><h3>1</h3></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
    </a-carousel>
  </div>
</template>
<script lang="ts" setup>
const onChange = (current: number) => {
  console.log(current)
}
</script>
<style scoped>
/* For demo */
:deep(.slick-slide) {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

:deep(.slick-slide h3) {
  color: #fff;
}
</style>
