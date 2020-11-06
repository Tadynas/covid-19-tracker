import React, { useState, useEffect } from 'react'
import { NativeSelect, FormControl } from '@material-ui/core'

import { fetchCountries } from '../../api'
import pickerStyles from './Picker.module.sass'

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
    <FormControl className={pickerStyles.formControl}>
      <NativeSelect defaultValue="" onChange={(e) => handleCountryChange({ name: e.target.options[e.target.selectedIndex].text, code: e.target.value })}>
        <option value="">Global</option>
        {fetchedCountries.map((country, i) => <option key={i} value={country.iso2}>{country.name}</option>)}
      </NativeSelect>
    </FormControl>
  )
}

export default CountryPicker