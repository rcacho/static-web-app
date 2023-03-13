import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import Day, { noValue } from './Day'
import { useCalendarContext } from '@/store/CalendarContext'
import { Typography } from '@mui/material'

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
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

// this only works if january's first working day is monday
const calculateWorkingHours = (firstDay: number, lastDay: number) => {
  let val: number
  if (firstDay < 3 && lastDay != 1) {
    val = 200
  } else {
    val = 160
  }
  return val
}

const Month = (props: any) => {
  const { toggleBarOnDateClick, isYearView } = useCalendarContext()

  // 42 -> 49 to include working hours at the bottom of calendar
  // small chance this number will increase by 7 (6 possible weeks + 1 for the last empty week) to include working week on the side???
  let numBoxes = 49

  // for working hours in a month
  const firstDay = new Date(
    props.currentDate.getFullYear(),
    props.currentDate.getMonth(),
    1
  ).getDay()

  const firstDayOffset = firstDay - 1

  const numDaysInMonth = new Date(
    props.currentDate.getFullYear(),
    props.currentDate.getMonth() + 1,
    0
  ).getDate()

  // also for working hours in a month
  const lastDay = new Date(
    props.currentDate.getFullYear(),
    props.currentDate.getMonth(),
    numDaysInMonth
  ).getDay()

  const handleDayClick = (day: any) => {
    toggleBarOnDateClick(1, formatDate(props.currentDate, day))
  }

  // i do not know why when we switch from month view to year view
  // the props.yearView is undefined
  // but i only spent like 2 minutes trying to find out why lol
  if (props.yearView != undefined && !props.yearView) {
    // if the first day of the month is friday or saturday
    // show the extra row
    if (firstDay >= 5 && numDaysInMonth > 30) {
      numBoxes = 42
    } else {
      numBoxes = 35
    }
  }

  const renderDays = () => {
    const shouldRenderfirstDaysOfWeek = (i: number) => i < 7
    const days = []

    for (let i = 0; i < numBoxes; i++) {
      let day = i - firstDayOffset
      let dayOfWeek = noValue

      if (day <= 0 || day > numDaysInMonth) {
        day = 0
      }

      if (shouldRenderfirstDaysOfWeek(i)) {
        dayOfWeek = isYearView ? daysOfWeekMini[i] : daysOfWeek[i]
      }

      days.push(
        i != 47 ? (
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
            <Typography
              variant={'body2'}
              color="blue"
              fontSize={isYearView ? '75%' : '100%'}
            >
              {props.currentDate.getMonth() == 11
                ? 160
                : calculateWorkingHours(firstDay, lastDay)}
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
      maxWidth={isYearView ? 350 : '100%'}
      textAlign="center"
      alignItems="stretch"
      sx={{ height: '100%', minWidth: 250 }}
    >
      {renderDays()}
    </Grid>
  )
}

export default Month
