import React from 'react'
import { Box } from '@mui/material/'
import Month from './Month'
import Year from './Year'
import { useCalendarContext } from '@/store/CalendarContext'

const Calendar = () => {
  const { isYearView, currentDate } = useCalendarContext()

  const renderCalendar = () => {
    return isYearView ? (
      <Year />
    ) : (
      <Month currentDate={currentDate} yearView={isYearView} />
    )
  }

  return (
    <Box
      bgcolor="white"
      color="black"
      flex={1}
      sx={{ height: 'calc(100vh - 64px)' }}
      border={0}
    >
      {renderCalendar()}
    </Box>
  )
}

export default Calendar
