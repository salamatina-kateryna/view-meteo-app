interface WeatherData {
  dt: number
  main: {
    temp: number
  }
}

interface Accumulator {
  [date: string]: number[]
}

export const dataTransformation = (weatherData: Array<WeatherData>) => {
  const generateTodayData = () => {
    const todayDay = new Date().getDate()
    const chartLabels = [] as Array<string>

    const chartData = weatherData.reduce((acc, value) => {
      const itemDate = new Date(value.dt * 1000)
      const itemDay = itemDate.getDate()

      if (itemDay === todayDay) {
        const time = itemDate.toLocaleTimeString('default', { hour: 'numeric', minute: 'numeric' })
        chartLabels.push(time)
        acc.push(Math.round(value.main.temp))
      }
      return acc
    }, [] as number[])

    return { chartLabels, chartData }
  }

  const generateDailyData = () => {
    const getDailyData: Accumulator = weatherData.reduce((acc: Accumulator, value) => {
      const date = new Date(value.dt * 1000).toLocaleString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })

      if (!acc[date]) acc[date] = []
      acc[date].push(value.main.temp)
      return acc
    }, {})

    const getAverageFromArray = (arr: Array<number>) => arr.reduce((p, c) => p + c, 0) / arr.length

    const chartLabels = Object.keys(getDailyData)
    const chartData = Object.values(getDailyData).map((item) =>
      Math.round(getAverageFromArray(item))
    )

    return { chartLabels, chartData }
  }

  return { todayData: generateTodayData(), dailyData: generateDailyData() }
}
