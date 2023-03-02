import React from 'react'
import { Box } from '@mui/material/'
import Month from './Month'
import Year from './Year'

export interface CalendarProps {
  currentDate: Date
  isYearView: boolean
  changeView: (date: Date) => void
  month: number
  handleDayClickBar: Function
}

const Calendar = (props: CalendarProps) => {
  const renderCalendar = () => {
    const daysOfWeek = ['SUN', 'MON', 'TUES', 'WED', 'THUR', 'FRI', 'SAT']
    return props.isYearView ? (
      <Year {...props} />
    ) : (
      <Month daysOfWeek={daysOfWeek} isMonthView={true} {...props} />
    )
  }

  return (
    <Box
      bgcolor="white"
      color="black"
      flex={1}
      sx={{ height: 'calc(100vh - 64px)' }}
      border={1}
    >
      {renderCalendar()}
    </Box>
  )
}

export default Calendar
