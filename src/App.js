import React from 'react'

import { IntervalPicker, Cards, CountryPicker, LineChart, BarChart } from './components'
import appStyles from './App.module.sass'
import { fetchData, fetchLatestData } from './api'

import covid19Image from './images/covid-19.png'


class App extends React.Component {
  state = {
    data: {},
    country: {
      name: '',
      code: ''
    },
    interval: 'total'
  }

  async componentDidMount() {
    const fetchedData = await fetchData()

    this.setState({ data: fetchedData })
  }

  handleCountryChange = async (country) => {
    let fetchedData

    if(this.state.interval === 'total') {
      fetchedData = await fetchData(country.code)
    } else if(this.state.interval === 'latest') {
      fetchedData = await fetchLatestData(country.code)
    }

    if(fetchedData) {
      this.setState({ data: fetchedData, country })
    }
  }

  handleIntervalChange = async (interval) => {
    const { country } = this.state

    let fetchedData

    if(interval === 'total') {
      fetchedData = await fetchData(country.code)
    } else if(interval === 'latest'){
      fetchedData = await fetchLatestData(country.code)
    }
    
    if(fetchedData) {
      this.setState({ data: fetchedData, interval })
    }
  }

  render() {
    const { data, country } = this.state
    
    return (
      <div className={appStyles.container}>
        <img className={appStyles.image} src={covid19Image} alt="COVID-19"/>
        <IntervalPicker handleIntervalChange={this.handleIntervalChange}/>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        {country.code || this.state.interval === 'latest' ? <BarChart data={data} countryName={country.name} /> : <LineChart data={data} /> }
      </div>
    )
  }
}

export default App