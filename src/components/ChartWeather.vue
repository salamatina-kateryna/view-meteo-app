<template>
  <div>
    <canvas id="chart" width="auto" height="auto"></canvas>
  </div>
</template>

<script setup lang="ts">
import type { ChartConfiguration } from 'chart.js'
import type { ChartItem } from 'chart.js'

import Chart from 'chart.js/auto'
import { watch } from 'vue'

const props = defineProps(['chartData'])

function addData(chart: any, label: any, newData: any) {
  console.log(chart.data, newData)
  chart.data.labels = label
  chart.data.datasets[0].data = newData
  chart.update()
}

const data = {
  datasets: [
    {
      data: [],
      label: 'My First Dataset',
      fill: false,
      borderColor: 'rgb(243, 225, 107)'
    }
  ]
}

const config: ChartConfiguration = {
  type: 'line',
  data,
  options: {}
}

console.log('chart component', data)

let chart: Chart
watch(
  () => {
    const { chartLabels, chartData } = props.chartData || {}
    if (!chartLabels || !chartData) return

    const ctx = document.getElementById('chart') as ChartItem
    if (!chart && ctx) chart = new Chart(ctx, config)
    if (!chart) return
    addData(chart, chartLabels, chartData)
  },
  () => console.log(props.chartData, '2')
)
</script>
