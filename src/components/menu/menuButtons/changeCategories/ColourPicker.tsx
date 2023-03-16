import React, { useState } from 'react'
import { Box, Grid } from '@mui/material/'
import { ToggleButton } from '@mui/material'

const ColourPicker = () => {
  const [selected, setSelected] = useState(0)

  function renderColours(colour: any, id: Number) {
    const handleSelect = (index: any) => {
      setSelected(index)
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
            backgroundColor: colour,
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
        {renderColours('#832A0E', 1)}
        {renderColours('#B45252', 2)}
        {renderColours('red', 3)}
        {renderColours('#B45252', 4)}
        {renderColours('#FAFF00', 5)}
        {renderColours('#05FD00', 6)}
        {renderColours('#599273', 7)}
        {renderColours('#00FFF0', 8)}
        {renderColours('#04D2FF', 9)}
        {renderColours('#2678F3', 10)}
        {renderColours('#5D64A6', 11)}
        {renderColours('#9104FF', 12)}
        {renderColours('#FF00B8', 13)}
        {renderColours('#8A8A8A', 14)}
        {renderColours('black', 15)}
      </Grid>
    </Box>
  )
}

export default ColourPicker
