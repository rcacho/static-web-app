import React, { useState } from 'react'
import { Box, Grid } from '@mui/material/'
import { Button, ListItem, ListItemButton, ListItemText } from '@mui/material'

const ColourPicker = () => {
  const [selected, setSelected] = useState(null)

  function renderColours(colour: any) {
    const handleSelect = (index: any) => {
      setSelected(index)
    }
    return (
      <Grid item xs={2} height={35} padding={1.5}>
        <Box
          onClick={handleSelect}
          sx={{
            backgroundColor: colour,
            height: 20,
            minWidth: 28,
            marginTop: 0,
            padding: 0
          }}
        ></Box>
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
        {renderColours('#832A0E')}
        {renderColours('#B45252')}
        {renderColours('red')}
        {renderColours('#B45252')}
        {renderColours('#FAFF00')}
        {renderColours('#05FD00')}
        {renderColours('#599273')}
        {renderColours('#00FFF0')}
        {renderColours('#04D2FF')}
        {renderColours('#2678F3')}
        {renderColours('#5D64A6')}
        {renderColours('#9104FF')}
        {renderColours('#FF00B8')}
        {renderColours('#8A8A8A')}
        {renderColours('black')}
      </Grid>
    </Box>
  )
}

export default ColourPicker
