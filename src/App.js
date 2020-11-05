import React from 'react'

import { Cards, CountryPicker, Chart } from './components'
import appStyles from './App.module.sass'
import { fetchData } from './api'


class App extends React.Component {
  state = {
    data: {}
  }

  async componentDidMount() {
    const fetchedData = await fetchData()

    this.setState({ data: fetchedData })
  }

  render() {
    const { data } = this.state
    
    return (
      <div className={appStyles.container}>
        <Cards data={data} />
        <CountryPicker />
        <Chart />
      </div>
    )
  }
}

export default App