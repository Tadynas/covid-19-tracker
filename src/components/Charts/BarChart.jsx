import { Bar } from 'react-chartjs-2'

import chartStyles from './Charts.module.sass'

const BarChart = ({ data: { confirmed, deaths, recovered}, countryName }) => {

  const barChart = (
    <Bar
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [{
          label: 'People',
          backgroundColor: ['rgba(0, 0, 225, 0.5)',
                            'rgba(0, 225, 0, 0.5)',
                            'rgba(225, 0, 0, 0.5)'],
          data: [confirmed, recovered, deaths]
        }]
      }}
      options={{
        legend: {display: false},
        title: {display: true, text:`Current state in ${countryName}`}
      }}
    />
  )

  return (
    <div className={chartStyles.container} >
      { barChart }
    </div>
  )
}

export default BarChart