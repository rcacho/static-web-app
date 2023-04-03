import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import { Button, Stack } from '@mui/material'
import Month from './Month'
import { useCalendarContext } from '@/store/CalendarContext'

export const months = [
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

const Year = () => {
  const { currentDate, changeView, toggleBarOnDateClick } = useCalendarContext()

  const handleMonthButtonClick = (monthNumber: number) => {
    changeView(new Date(currentDate.getFullYear(), monthNumber, 1))
    toggleBarOnDateClick(0)
  }

  const renderMonths = () => {
    const renderedMonths = []
    let week = 1
    for (const month of months) {
      let theMonth = new Date(
        currentDate.getFullYear(),
        months.indexOf(month),
        1
      )
      let numWeeks = theMonth.getDay() >= 5 || theMonth.getMonth() == 11 ? 5 : 4
      renderedMonths.push(renderMonth(month, week, numWeeks))
      week += numWeeks
    }
    return renderedMonths
  }

  const renderMonth = (month: string, week: number, numWeeks: number) => {
    const monthNumber = months.indexOf(month)

    return (
      //<ThemeProvider theme={MuiTheme}>
      <Grid
        sm={12}
        md={6}
        lg={3}
        border={0}
        sx={{
          p: 3,
          paddingTop: 0,
          paddingBottom: 0,
          minWidth: '280px'
        }}
      >
        <Stack>
          <Grid>
            <MonthButton month={month} handleClick={handleMonthButtonClick} />
          </Grid>
          <Month
            currentDate={new Date(currentDate.getFullYear(), monthNumber, 1)}
            month={monthNumber + 1}
            weekNum={week}
            numWeeks={numWeeks}
            year={currentDate.getFullYear()}
          />
        </Stack>
      </Grid>
      //</ThemeProvider>
    )
  }

  return (
    <Grid
      container
      columns={12}
      spacing={-5}
      border={0}
      marginTop={0.5}
      marginBottom={0}
      alignItems="stretch"
      sx={{ height: '100%' }}
    >
      {renderMonths()}
    </Grid>
  )
}

interface MBProps {
  month: string
  handleClick: any
}

const MonthButton = ({ month, handleClick }: MBProps) => {
  const monthNumber = months.indexOf(month)
  return (
    <Button
      sx={{ borderRadius: '60px' }}
      style={{ color: 'black', fontSize: '75%' }}
      onClick={() => handleClick(monthNumber)}
    >
      {month}
    </Button>
  )
}

export default Year
