import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import { CalendarProps } from '../Calendar'
import { Typography, Button } from '@mui/material'

// slightly different from DayMonthView component
function GenerateMonth(props: CalendarProps) {
  const smallDays = ['Su', 'M', 'T', 'W', 'Th', 'F', 'S']
  // this is for the loop in the DayYearView component
  const currentYear = props.currentDate.getFullYear()
  // props.month is an index number 0-11, this
  const tempDate = new Date(currentYear, props.month, 1)
  const handleDayClick = () => {
    props.handleDayClickBar()
  }

  const day: number = props.getFirstDayOfMonth(tempDate) - 1
  return (
    <Grid
      container
      columns={7}
      spacing={0}
      border={0}
      alignItems="stretch"
      textAlign={'center'}
      sx={{ height: '80%' }}
    >
      {Array.from(Array(42)).map((_, index) =>
        (index - day > 0 && index - day <= props.getNumDaysInMonth(tempDate)) ||
        index < 7 ? (
          <Grid
            key={index - day}
            sx={{ height: 'auto' }}
            xs={1}
            display="flex"
            justifyContent="center"
            alignItems="top"
          >
            {/* 
                        will probably need to change this to another inner grid 
                        so that we can add some events/icons to the dates
                    */}
            <Typography fontSize={'100%'}>
              {index < 7 ? smallDays[index] : ''}
              {index < 7 ? <br /> : ''}

              <Button
                onClick={handleDayClick}
                size="small"
                style={{ fontSize: '100%', color: 'black' }}
              >
                {index - day > 0 &&
                index - day <= props.getNumDaysInMonth(tempDate)
                  ? index - day
                  : ' '}
              </Button>
            </Typography>
          </Grid>
        ) : (
          ''
        )
      )}
    </Grid>
  )
}

const DayYearView = (props: CalendarProps) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  return (
    <Grid
      container
      columns={4}
      spacing={0}
      border={0}
      alignItems="stretch"
      display="flex"
      sx={{ height: '100%' }}
    >
      {Array.from(Array(12)).map((_, index) => (
        <Grid xs={1} border={0}>
          <Button
            style={{ color: 'black', fontSize: '80%' }}
            onClick={(_) => {
              props.changeView(
                new Date(props.currentDate.getFullYear(), index, 1)
              )
              props.handleDayClickBar(0)
            }}
          >
            {months[index]}
          </Button>

          <GenerateMonth {...props} month={index} />
        </Grid>
      ))}
    </Grid>
  )
}

export default DayYearView
