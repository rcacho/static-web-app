import React, { useState } from 'react'
import { Box, Grid } from '@mui/material/'
import { ToggleButton } from '@mui/material'

const colours = [
  '#794044',
  '#b26161',
  'red',
  '#FF5F1F',
  '#ffd700',
  '#468a65',
  '#05FD00',
  '#ccff00',
  '#40e0d0',
  '#2678F3',
  '#5D64A6',
  '#9104FF',
  '#FF80ED',
  '#8A8A8A',
  'black'
]

const ColourPicker = (props: any) => {
  const [selected, setSelected] = useState(propState())

  function propState() {
    if (props.selectedColour !== null) {
      for (let i = 0; i < colours.length; i++) {
        if (props.selectedColour === colours[i]) {
          return i
        }
      }
      return 15
    } else {
      return 15
    }
  }

  function renderColours(id: number) {
    const handleSelect = (index: any) => {
      setSelected(index)
      props.setColour(colours[id])
    }
    const checkSelect = () => {
      return id === selected
    }

    return (
      <Grid item xs={2} height={35} padding={1.5}>
        <ToggleButton
          value="check"
          selected={checkSelect()}
          onChange={() => {
            handleSelect(id)
          }}
          sx={{
            border: id === selected ? 'solid' : 'none',
            backgroundColor: colours[id],
            height: 20,
            minWidth: 28,
            marginTop: 0,
            padding: 0,
            borderRadius: 0
          }}
        ></ToggleButton>
      </Grid>
    )
  }

  return (
    <Box
      paddingRight={5}
      bgcolor="white"
      color="black"
      sx={{ width: 220, height: 120, border: '1px solid grey' }}
    >
      <Grid container spacing={3} paddingLeft={2.5} paddingTop={1.5}>
        {renderColours(0)}
        {renderColours(1)}
        {renderColours(2)}
        {renderColours(3)}
        {renderColours(4)}
        {renderColours(5)}
        {renderColours(6)}
        {renderColours(7)}
        {renderColours(8)}
        {renderColours(9)}
        {renderColours(10)}
        {renderColours(11)}
        {renderColours(12)}
        {renderColours(13)}
        {renderColours(14)}
      </Grid>
    </Box>
  )
}

export default ColourPicker
