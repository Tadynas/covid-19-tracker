import React, { useState, useEffect } from 'react'
import { NativeSelect, FormControl } from '@material-ui/core'

import { fetchCountries } from '../../api'
import countryPickerStyles from './CountryPicker.module.sass'

const CountryPicker = ({ handleCountryChange }) => {
  const [ fetchedCountries, setFetchedCountries ] = useState([])

  useEffect(() => {
    const fetchAPI = async () => {
      const countries = await fetchCountries()
      setFetchedCountries(countries)
    }

    fetchAPI()
  }, [setFetchedCountries])

  return (
    <FormControl className={countryPickerStyles.formControl}>
      <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
        <option value="global">Global</option>
        {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
      </NativeSelect>
    </FormControl>
  )
}

export default CountryPicker