import React, { useState, useEffect } from 'react'
import { fetchDailyData } from '../../api'

import { Line, Bar } from 'react-chartjs-2'

import chartStyles from './Chart.module.sass'

const Chart = ({ data: { confirmed, deaths, recovered}, country }) => {
  const [ dailyData, setDailyData ] = useState([])

  useEffect(() => {
    const fetchAPI = async () => {
      const dailyData = await fetchDailyData()
      setDailyData(dailyData)
    }
    
    // console.log(dailyData(({ date }) => date))

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

  const barChart = (
    confirmed ?
    (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [{
            label: 'People',
            backgroundColor: ['rgba(0, 0, 225, 0.5)',
                             'rgba(0, 225, 0, 0.5)',
                             'rgba(225, 0, 0, 0.5)'],
            data: [confirmed.value, recovered.value, deaths.value]
          }]
        }}
        options={{
          legend: {display: false},
          title: {display: true, text:`Current state in ${country}`}
        }}
      />
    ) : null
  )

  return (
    <div className={chartStyles.container} >
      { country ? barChart : lineChart }
    </div>
  )
}

export default Chart