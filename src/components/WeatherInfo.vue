<template>
  <div class="weather-info">
    <TabsWrapper v-slot="slotProps" :titles="buttons">
      <ChartyWeather :chartData="dynamicalData[slotProps?.selectedTitle]" />
    </TabsWrapper>
  </div>
</template>

<script setup lang="ts">
import { watch, computed } from 'vue'
import TabsWrapper from './TabsWrapper.vue'
import ChartyWeather from './ChartWeather.vue'

const props = defineProps(['dataChart'])
const buttons = ['today', '5 days']

watch(
  () => console.log(props.dataChart, '1'),
  () => console.log(props.dataChart, '2')
)

const dynamicalData = computed(() => {
  const { todayData, dailyData } = props?.dataChart || {}
  return {
    today: todayData,
    '5 days': dailyData
  } as Record<string, any>
})

console.log(dynamicalData)
</script>
