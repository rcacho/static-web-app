import React from 'react'
import { Box } from '@mui/material/'
import Month from './Month'
import Year from './Year'
import { useCalendarContext } from '@/store/CalendarContext'

//let CatMap = new Map<String, Category>()
const Calendar = () => {
  const { isYearView, currentDate } = useCalendarContext()

  const renderCalendar = () => {
    return isYearView ? (
      <Year />
    ) : (
      <Month
        currentDate={currentDate}
        yearView={isYearView}
        month={currentDate.getMonth() + 1}
        year={currentDate.getFullYear()}
      />
    )
  }

  return (
    <Box
      bgcolor="white"
      color="black"
      flex={1}
      sx={{ height: 'calc(100vh - 74px)', overflowY: 'scroll' }}
      border={0}
    >
      {renderCalendar()}
    </Box>
  )
}

export default Calendar
