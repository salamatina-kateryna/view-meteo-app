<template>
  <div class="card">
    <section class="section">
      <div class="info">
        <div class="city-inner">
          <input v-model="city" type="text" class="search" @keyup.enter="getCityWeather" />
        </div>
        <WeatherInfo v-if="!isCurrentError && !isHourlyError" :dataChart="dataChart" />
        <div v-else class="error">
          <div class="error-title">Oooops! Something went wrong</div>
          <div class="error-message"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { API_KEY, CURRENT_WEATHER_BASE_URL, HOURLY_WEATHER_BASE_URL } from '../constants'
// import { capitalizeFirstLetter } from './utils'
import WeatherInfo from './WeatherInfo.vue'
import { dataTransformation } from '@/utils'

const city = ref('Kyiv')
const dataChart = ref<unknown>(null)
const currentWeatherInfo = ref<{ cod: number } | null>(null)
const hourlyWeatherInfo = ref<{ cod: string; list: Array<any> } | null>(null)
const isCurrentError = computed(() => currentWeatherInfo.value?.cod !== 200)
const isHourlyError = computed(() => {
  const err = hourlyWeatherInfo.value?.cod !== '200'
  return err
})

const getCurrentWeather = () => {
  return fetch(`${CURRENT_WEATHER_BASE_URL}?q=${city.value}&units=metric&appid=${API_KEY}`)
    .then((response) => response.json())
    .then((currentData) => (currentWeatherInfo.value = currentData))
}

const getHourlyWeather = () => {
  return fetch(`${HOURLY_WEATHER_BASE_URL}?q=${city.value}&units=metric&appid=${API_KEY}`)
    .then((response) => response.json())
    .then((hourlyData: any) => (hourlyWeatherInfo.value = hourlyData))
}

const getCityWeather = async () => {
  await Promise.all([getCurrentWeather(), getHourlyWeather()])
  if (hourlyWeatherInfo?.value?.list) {
    dataChart.value = dataTransformation(hourlyWeatherInfo?.value?.list)
    console.log(dataChart)
  }
}

onMounted(getCityWeather)
</script>

<style scoped>
.card {
  width: 45%;
  max-width: 50%;
  min-width: fit-content;
  padding: 20px;
  background-color: #0e100f;
  border-radius: 41px;
}

.sections {
  display: flex;
  width: 100%;
}

@media (max-width: 767px) {
  .sections {
    flex-direction: column;
  }
}
.city-inner {
  position: relative;
  display: inline-block;
  width: 100%;
  margin-bottom: 20px;
}

.city-inner::after {
  content: '';
  position: absolute;
  top: 0;
  right: 10px;
  width: 25px;
  height: 25px;
  background: url('./img/search.svg') no-repeat 50% 50%;
  background-size: contain;
  transform: translateY(50%);
  cursor: pointer;
}
.info {
  height: 100%;
  padding: 16px;
  background: url('./img/gradient-1.jpg') no-repeat 50% 50%;
  background-size: cover;
  border-radius: 25px;
}
.search {
  width: 100%;
  padding: 16px;
  font-family: 'Inter', Arial, sans-serif;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 16px;
  border: none;
  outline: none;
  cursor: pointer;
}

.error {
  padding-top: 20px;
}

.error-title {
  font-size: 18px;
  font-weight: 700;
}

.error-message {
  padding-top: 10px;
  font-size: 13px;
}
</style>
