import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import Day, { noValue } from './Day'
import { useCalendarContext } from '@/store/CalendarContext'
import { Typography } from '@mui/material'

const daysOfWeek = ['SUN', 'MON', 'TUES', 'WED', 'THUR', 'FRI', 'SAT']
const daysOfWeekMini = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const formatDate = (date: Date, day: any) => {
  let mm = date.getMonth() + 1
  let finalDate = ''
  const yyyy = date.getFullYear()

  if (mm < 10) {
    finalDate += '0' + mm
  } else {
    finalDate += mm
  }

  if (day < 10) {
    finalDate += '-' + '0' + day
  } else {
    finalDate += '-' + day
  }

  finalDate += '-' + yyyy
  return finalDate.toString()
}

const Month = ({ currentDate }: any) => {
  const { toggleBarOnDateClick, isYearView } = useCalendarContext()

  // 42 -> 49 to include working hours at the bottom of calendar
  // small chance this number will increase by 7 (6 possible weeks + 1 for the last empty week) to include working week on the side???
  const numBoxes = 49
  const firstDayOffset =
    new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() - 1
  const numDaysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate()

  const handleDayClick = (day: any) => {
    toggleBarOnDateClick(1, formatDate(currentDate, day))
  }

  const renderDays = () => {
    const shouldRenderfirstDaysOfWeek = (i: number) => i < 7
    const days = []

    for (var i = 0; i < numBoxes; i++) {
      let day = i - firstDayOffset
      let dayOfWeek = noValue

      if (day <= 0 || day > numDaysInMonth) {
        day = 0
      }

      if (shouldRenderfirstDaysOfWeek(i)) {
        dayOfWeek = isYearView ? daysOfWeekMini[i] : daysOfWeek[i]
      }

      days.push(
        i != 48 ? (
          <Day
            key={i}
            day={day}
            dayOfWeek={dayOfWeek}
            handleDayClick={handleDayClick}
          />
        ) : (
          <Grid
            sx={{ height: 'auto' }}
            xs={1}
            borderRight={isYearView ? 0 : 1}
            borderBottom={isYearView ? 0 : 1}
            display="flex"
            justifyContent="center"
            alignItems="top"
          >
            <Typography variant={'body1'} color="blue">
              200
            </Typography>
          </Grid>
        )
      )
    }
    return days
  }

  return (
    <Grid
      container
      columns={7}
      spacing={0}
      border={isYearView ? 0 : 1}
      textAlign="center"
      alignItems="stetch"
      sx={{ height: '100%' }}
    >
      {renderDays()}
    </Grid>
  )
}

export default Month
