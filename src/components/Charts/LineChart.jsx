import React, { useState, useEffect } from 'react'
import { fetchDailyData } from '../../api'

import { Line } from 'react-chartjs-2'

import chartStyles from './Charts.module.sass'

const LineChart = ({ data: { confirmed, deaths, recovered} }) => {
  const [ dailyData, setDailyData ] = useState([])

  useEffect(() => {
    const fetchAPI = async () => {
      const dailyData = await fetchDailyData()
      setDailyData(dailyData)
    }

    fetchAPI()
  }, [])

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
      { lineChart }
    </div>
  )
}

export default LineChart