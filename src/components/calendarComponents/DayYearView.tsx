import React from 'react'

import Grid from '@mui/material/Unstable_Grid2'
import DayMonthView from './DayMonthView'
import { CalendarProps } from '../Calendar'

const DayYearView = (props: CalendarProps) => {
  let day: number = props.getFirstDayOfMonth(props.currentDate) - 1

  return (
    <Grid
      container
      columns={4}
      spacing={0}
      border={0}
      alignItems="stretch"
      sx={{ height: '100%' }}
    >
      {Array.from(Array(12)).map((_, index) => (
        <Grid
          key={index - day}
          sx={{ height: 'auto' }}
          xs={1}
          borderRight={1}
          borderBottom={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <DayMonthView {...props} />
        </Grid>
      ))}
    </Grid>
  )
}

export default DayYearView
