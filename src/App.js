import React from 'react'

import { Cards, CountryPicker, Chart } from './components'
import appStyles from './App.module.sass'
import { fetchData } from './api'


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
    const { data } = this.state
    
    return (
      <div className={appStyles.container}>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <Chart />
      </div>
    )
  }
}

export default App