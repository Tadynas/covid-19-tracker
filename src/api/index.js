import axios from 'axios'
import moment from 'moment'

const totalUrl = 'https://covid19.mathdro.id/api'
const latestUrl = 'https://api.covid19api.com'

export const fetchData = async (country) => {
  let changeableUrl = totalUrl;

  if(country) {
    changeableUrl = `${totalUrl}/countries/${country}`
  }

  try {
    const {data: { confirmed, recovered, deaths, lastUpdate } }  = await axios.get(changeableUrl)

    const modifiedData = {
      confirmed: confirmed.value,
      recovered: recovered.value,
      deaths: deaths.value,
      lastUpdate
    }

    return modifiedData
  } catch (error) {
    console.log(error)
  }
}

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${totalUrl}/daily`)

    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate
    }))

    return modifiedData
  } catch (error) {
    console.log(error)
  }
}

export const fetchLatestData = async (country) => {
  try {
    let modifiedUrl
    const endDate = moment().format('YYYY-MM-DD[T00:00:00Z]')

    if(country) {
      modifiedUrl = `${latestUrl}/total/country/${country}`
      const startDate = moment().subtract(2, 'days').format('YYYY-MM-DD[T00:00:00Z]')
      const { data } = await axios.get(`${modifiedUrl}?from=${startDate}&to=${endDate}`)

      const recentConfirmed = data[1].Confirmed > data[0].Confirmed ? 
                              data[1].Confirmed - data[0].Confirmed : 
                              data[0].Confirmed < data[1].Confirmed
      const recentRecovered = data[1].Recovered > data[0].Recovered ? 
                              data[1].Recovered - data[0].Recovered : 
                              data[0].Recovered < data[1].Recovered
      const recentDeaths = data[1].Deaths > data[0].Deaths ? 
                            data[1].Deaths - data[0].Deaths : 
                            data[0].Deaths < data[1].Deaths

      const modifiedData = {
        confirmed: recentConfirmed,
        recovered: recentRecovered,
        deaths: recentDeaths,
        lastUpdate: moment(endDate).subtract(1, 'days')
      }
      
      return modifiedData
    } else {
      modifiedUrl = `${latestUrl}/world`
      const startDate = moment().subtract(1, 'days').format('YYYY-MM-DD[T00:00:00Z]')
      const { data: [ cases ]} = await axios.get(`${modifiedUrl}?from=${startDate}&to=${endDate}`)
      
      const modifiedData = {
        confirmed: cases.NewConfirmed,
        recovered: cases.NewRecovered,
        deaths: cases.NewDeaths,
        lastUpdate: startDate
      }

      return modifiedData
    }
  } catch (error) {
    console.log(error)
  }
}

export const fetchCountries = async () => {
  try {
    const { data: { countries }} = await axios.get(`${totalUrl}/countries`)
    return countries.map((country) => { 
      return { 
        name: country.name, 
        iso2: country.iso2 
    }})
  } catch (error) {
    console.log(error)
  }
}