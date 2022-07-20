<template>
  <div style="height: 300px; width: 400px" id="main"></div>
</template>
<script setup>
import { onMounted } from 'vue'
//  按需引入 echarts
import * as echarts from 'echarts'
onMounted(() => {
  init()
})
function init() {
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(document.getElementById('main'))
  // 指定图表的配置项和数据
  const option = {
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  }
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option)
}
</script>
<style scoped lang="scss"></style>
