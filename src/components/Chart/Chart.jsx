import React, { useState, useEffect } from 'react'
import { fetchDailyData } from '../../api'

import { Line, Bar } from 'react-chartjs-2'

import chartStyles from './Chart.module.sass'

const Chart = () => {
  const [ dailyData, setDailyData ] = useState([])

  useEffect(() => {
    const fetchAPI = async () => {
      const dailyData = await fetchDailyData()
      setDailyData(dailyData)
    }
    
    // console.log(dailyData(({ date }) => date))

    fetchAPI()
  })

  const lineChart = (
    dailyData ? 
    <Line 
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [{
          data: dailyData.map(({ confirmed }) => confirmed),
          label: 'Infected',
          borderColor: 'rgb(51, 51, 255)',
          fill: true
        }, {
          data: dailyData.map(({ deaths }) => deaths),
          label: 'Deaths',
          borderColor: 'rgb(225, 0, 0)',
          backgroundColor: 'rgb(225, 0, 0, 0.5)',
          fill: true
        }]
      }}
    /> : null
  )

  return (
    <div className={chartStyles.container} >
      {lineChart}
    </div>
  )
}

export default Chart