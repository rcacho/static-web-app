import React, { useState } from 'react'
import { Autocomplete, TextField } from '@mui/material'

type SelectAutocompleteProps = {
  options: any[]
  value: any
  setValue: Function
  label: string
  loading: boolean
}
const SelectAutocomplete = (props: SelectAutocompleteProps) => {
  const [inputValue, setInputValue] = useState('')
  return (
    <Autocomplete
      disablePortal
      options={props.options}
      value={props.value}
      inputValue={inputValue}
      sx={{ width: 300 }}
      loading={props.loading}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue)
      }}
      getOptionLabel={(option) => {
        return option.givenName
      }}
      onChange={(_: any, newValue: string | null) => {
        props.setValue(newValue)
      }}
      renderInput={(params) => <TextField {...params} label={props.label} />}
    />
  )
}

export default SelectAutocomplete
