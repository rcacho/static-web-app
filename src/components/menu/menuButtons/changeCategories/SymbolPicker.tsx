import React, { useState } from 'react'
import { Box, Grid } from '@mui/material/'
import { ToggleButton, Typography } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import SquareIcon from '@mui/icons-material/Square'
import StarIcon from '@mui/icons-material/Star'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import PaidIcon from '@mui/icons-material/Paid'
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye'
import HexagonIcon from '@mui/icons-material/Hexagon'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import FilterDramaIcon from '@mui/icons-material/FilterDrama'
import InvertColorsIcon from '@mui/icons-material/InvertColors'

const SymbolPicker = () => {
  const [selected, setSelected] = useState(0)

  const CustomSymbol = (props: any) => {
    return (
      <Typography
        fontSize="small"
        sx={{
          backgroundColor: props.id === selected ? 'black' : 'gray',
          color: props.id === selected ? 'lightgray' : 'white',
          minWidth: '15px'
        }}
      >
        {props.symbol}
      </Typography>
    )
  }

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
        {renderSymbols(<HexagonIcon fontSize="small"></HexagonIcon>, 6)}
        {renderSymbols(<PanoramaFishEyeIcon></PanoramaFishEyeIcon>, 7)}
        {renderSymbols(<CustomSymbol symbol="AGM" id={8} />, 8)}
        {renderSymbols(<CustomSymbol symbol="U" id={9} />, 9)}
        {renderSymbols(<CustomSymbol symbol="8" id={10} />, 10)}
        {renderSymbols(<CustomSymbol symbol="!" id={11} />, 11)}
        {renderSymbols(<ArrowDownwardIcon></ArrowDownwardIcon>, 12)}
        {renderSymbols(<ArrowUpwardIcon></ArrowUpwardIcon>, 13)}
        {renderSymbols(<FilterDramaIcon></FilterDramaIcon>, 14)}
        {renderSymbols(<InvertColorsIcon></InvertColorsIcon>, 15)}
      </Grid>
    </Box>
  )
}

export default SymbolPicker
