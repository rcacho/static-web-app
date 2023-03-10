import React, { useState } from 'react'
import { Box, Grid } from '@mui/material/'
import { ToggleButton } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import SquareIcon from '@mui/icons-material/Square'
import StarIcon from '@mui/icons-material/Star'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import PaidIcon from '@mui/icons-material/Paid'
import ReportIcon from '@mui/icons-material/Report'
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye'

const SymbolPicker = () => {
  const [selected, setSelected] = useState(0)

  function renderSymbols(symbol: any, id: Number) {
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
            backgroundColor: 'white',
            height: 20,
            minWidth: 28,
            marginTop: 0,
            padding: 0,
            borderRadius: 0
          }}
        >
          {symbol}
        </ToggleButton>
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
        {renderSymbols(<CircleIcon fontSize="small"></CircleIcon>, 1)}
        {renderSymbols(<SquareIcon fontSize="small"></SquareIcon>, 2)}
        {renderSymbols(<StarIcon fontSize="small"></StarIcon>, 3)}
        {renderSymbols(
          <ReportProblemIcon fontSize="small"></ReportProblemIcon>,
          4
        )}
        {renderSymbols(<PaidIcon fontSize="small"></PaidIcon>, 5)}
        {renderSymbols(<ReportIcon fontSize="small"></ReportIcon>, 6)}
        {renderSymbols(<PanoramaFishEyeIcon></PanoramaFishEyeIcon>, 7)}
        {renderSymbols(<CircleIcon></CircleIcon>, 8)}
        {renderSymbols(<CircleIcon></CircleIcon>, 9)}
        {renderSymbols(<CircleIcon></CircleIcon>, 10)}
        {renderSymbols(<CircleIcon></CircleIcon>, 11)}
        {renderSymbols(<CircleIcon></CircleIcon>, 12)}
        {renderSymbols(<CircleIcon></CircleIcon>, 13)}
        {renderSymbols(<CircleIcon></CircleIcon>, 14)}
        {renderSymbols(<CircleIcon></CircleIcon>, 15)}
      </Grid>
    </Box>
  )
}

export default SymbolPicker
