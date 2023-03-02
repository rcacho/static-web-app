import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import { CalendarProps } from './Calendar'
import { Button } from '@mui/material'
import Month from './Month'

interface YearProps {
  currentDate: Date
  changeView: (date: Date) => void
  handleDayClickBar: Function
}

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

const Year = (props: YearProps) => {
  const handleMonthButtonClick = (monthNumber: number) => {
    props.changeView(new Date(props.currentDate.getFullYear(), monthNumber, 1))
    props.handleDayClickBar(0)
  }

  const renderMonths = () => {
    const renderedMonths = []
    for (const month of months) {
      renderedMonths.push(renderMonth(month))
    }
    return renderedMonths
  }

  const renderMonth = (month: string) => {
    const daysOfWeek = ['Su', 'M', 'T', 'W', 'Th', 'F', 'S']
    const monthNumber = months.indexOf(month)

    return (
      <Grid xs={4} sm={2} lg={1} border={0}>
        <MonthButton month={month} handleClick={handleMonthButtonClick} />
        <Month
          daysOfWeek={daysOfWeek}
          currentDate={
            new Date(props.currentDate.getFullYear(), monthNumber, 1)
          }
          isMonthView={false}
          handleDayClickBar={props.handleDayClickBar}
        />
      </Grid>
    )
  }

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
      style={{ color: 'black', fontSize: '80%' }}
      onClick={() => handleClick(monthNumber)}
    >
      {month}
    </Button>
  )
}

export default Year
