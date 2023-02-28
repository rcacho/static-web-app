import React from 'react'
import { Box } from '@mui/material/'
import DayMonthView from '@/components/calendarComponents/DayMonthView'
import DayYearView from '@/components/calendarComponents/DayYearView'

export interface CalendarProps {
  getFirstDayOfMonth: (date: Date) => number
  getNumDaysInMonth: (date: Date) => number
  currentDate: Date
  isYearView: boolean
  daysOfWeek: string[]
  changeView: (date: Date) => void
  month: number
}

const Calendar = (props: CalendarProps) => {
  return (
    <Box
      bgcolor="white"
      color="black"
      flex={1}
      sx={{ height: 'calc(100vh - 64px)' }}
      border={1}
    >
      {props.isYearView ? (
        <DayYearView {...props} />
      ) : (
        <DayMonthView {...props} />
      )}
    </Box>
  )
}

export default Calendar
