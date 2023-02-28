import React from 'react'
import { Typography, Button } from '@mui/material'

import Grid from '@mui/material/Unstable_Grid2'
import { CalendarProps } from '../Calendar'

const DayMonthView = (props: CalendarProps) => {
  let day: number = props.getFirstDayOfMonth(props.currentDate) - 1
  return (
    <Grid
      container
      columns={7}
      spacing={0}
      border={1}
      alignItems="stretch"
      sx={{ height: '100%' }}
    >
      {Array.from(Array(42)).map((_, index) => (
        <Grid
          key={index - day}
          sx={{ height: 'auto' }}
          xs={1}
          borderRight={1}
          borderBottom={1}
          display="flex"
          justifyContent="center"
          alignItems="top"
        >
          {/* 
                        will probably need to change this to another inner grid 
                        so that we can add some events/icons to the dates
                    */}
          <Typography variant="h6">
            {index < 7 ? props.daysOfWeek[index] : ''}
            {index < 7 ? <br /> : ''}

            <Button size="large" style={{ fontSize: '28px', color: 'black' }}>
              {index - day > 0 &&
              index - day <= props.getNumDaysInMonth(props.currentDate)
                ? index - day
                : ' '}
            </Button>
          </Typography>
        </Grid>
      ))}
    </Grid>
  )
}

export default DayMonthView
