import React from 'react'
import { NativeSelect, FormControl } from '@material-ui/core'

import pickerStyles from './Picker.module.sass'

const IntervalPicker = ({ handleIntervalChange }) => {
  return (
    <FormControl className={pickerStyles.formControl}>
      <NativeSelect defaultValue="" onChange={(e) => { handleIntervalChange(e.target.value) }}>
        <option value="total">Total</option>
        <option value="latest">Latest</option>
      </NativeSelect>
    </FormControl>
  )
}

export default IntervalPicker