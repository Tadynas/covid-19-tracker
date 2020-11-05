import React from 'react'

import { Cards, CountryPicker, Chart } from './components'
import appStyles from './App.module.sass'
import { fetchData } from './api'

import covid19Image from './images/covid-19.png'


class App extends React.Component {
  state = {
    data: {},
    country: ''
  }

  async componentDidMount() {
    const fetchedData = await fetchData()

    this.setState({ data: fetchedData })
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country)
    this.setState({ data: fetchedData, country: country })
  }

  render() {
    const { data, country } = this.state
    
    return (
      <div className={appStyles.container}>
        <img className={appStyles.image} src={covid19Image} alt="COVID-19"/>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <Chart data={data} country={country} />
      </div>
    )
  }
}

export default App