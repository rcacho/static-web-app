import { Typography } from '@mui/material'
import React from 'react'

const CustomSymbol = (props: any) => {
  return (
    <Typography
      fontSize="small"
      sx={{
        backgroundColor: props.id === props.selected ? 'black' : 'gray',
        color: props.id === props.selected ? 'lightgray' : 'white',
        minWidth: '15px'
      }}
    >
      {props.symbol}
    </Typography>
  )
}
