import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import { Button } from '@mui/material'
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
    for (const month of months) {
      renderedMonths.push(renderMonth(month))
    }
    return renderedMonths
  }

  const renderMonth = (month: string) => {
    const monthNumber = months.indexOf(month)

    return (
      <Grid
        xs={4}
        sm={2}
        lg={1}
        border={0}
        sx={{ p: 3, paddingTop: 0, paddingBottom: 0 }}
      >
        <MonthButton month={month} handleClick={handleMonthButtonClick} />
        <Month
          currentDate={new Date(currentDate.getFullYear(), monthNumber, 1)}
        />
      </Grid>
    )
  }

  return (
    <Grid
      container
      columns={4}
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
      style={{ color: 'black', fontSize: '75%' }}
      onClick={() => handleClick(monthNumber)}
    >
      {month}
    </Button>
  )
}

export default Year
