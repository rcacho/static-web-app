import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import Stack from '@mui/material/Stack'
import Day, { noValue } from './Day'
import { useCalendarContext } from '@/store/CalendarContext'
import { Typography, Button } from '@mui/material'

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

  // make this 42 later
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
        <Day
          key={i}
          day={day}
          dayOfWeek={dayOfWeek}
          handleDayClick={handleDayClick}
        />
      )
    }
    return days
  }

  return (
    <Grid
      container
      columns={10}
      sx={{ height: '100%', minWidth: 250 }}
      maxWidth={isYearView ? 'auto' : '100%'}
      border={isYearView ? 0 : 1}
      textAlign="center"
      alignItems="stretch"
    >
      <Grid xs={9}>
        <Grid container columns={7} spacing={0}>
          {renderDays()}
        </Grid>
      </Grid>

      <WorkingHours
        isYearView={isYearView}
        firstDay={firstDay}
        lastDay={lastDay}
        currentDate={props.currentDate}
      />
    </Grid>
  )
}

const WorkingHours = (props: any) => {
  return (
    <>
      <Grid xs={1} width={'10%'} height={'auto'}>
        <Typography
          fontSize={props.isYearView ? '80%' : '24px'}
          variant={props.isYearView ? 'body1' : 'h6'}
        >
          <Stack
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            &nbsp;
            <br />
            <Button
              disabled
              size={props.isYearView ? 'small' : 'large'}
              style={{
                color: 'blue',
                opacity: 1,
                fontSize: props.isYearView ? '100%' : '24px',
                maxWidth: props.isYearView ? '30px' : '60px',
                minWidth: props.isYearView ? '30px' : '60px'
              }}
            >
              0
            </Button>
            <Button
              disabled
              size={props.isYearView ? 'small' : 'large'}
              style={{
                color: 'blue',
                opacity: 1,
                fontSize: props.isYearView ? '100%' : '24px',
                maxWidth: props.isYearView ? '30px' : '60px',
                minWidth: props.isYearView ? '30px' : '60px'
              }}
            >
              0
            </Button>
            <Button
              disabled
              size={props.isYearView ? 'small' : 'large'}
              style={{
                color: 'blue',
                opacity: 1,
                fontSize: props.isYearView ? '100%' : '24px',
                maxWidth: props.isYearView ? '30px' : '60px',
                minWidth: props.isYearView ? '30px' : '60px'
              }}
            >
              0
            </Button>
            <Button
              disabled
              size={props.isYearView ? 'small' : 'large'}
              style={{
                color: 'blue',
                opacity: 1,
                fontSize: props.isYearView ? '100%' : '24px',
                maxWidth: props.isYearView ? '30px' : '60px',
                minWidth: props.isYearView ? '30px' : '60px'
              }}
            >
              0
            </Button>
            <Button
              disabled
              size={props.isYearView ? 'small' : 'large'}
              style={{
                color: 'blue',
                opacity: 1,
                fontSize: props.isYearView ? '100%' : '24px',
                maxWidth: props.isYearView ? '30px' : '60px',
                minWidth: props.isYearView ? '30px' : '60px'
              }}
            >
              0
            </Button>
            <Button
              disabled
              size={props.isYearView ? 'small' : 'large'}
              style={{
                color: 'blue',
                opacity: 1,
                fontSize: props.isYearView ? '100%' : '24px',
                maxWidth: props.isYearView ? '30px' : '60px',
                minWidth: props.isYearView ? '30px' : '60px'
              }}
            >
              0
            </Button>
            <Button
              disabled
              size={props.isYearView ? 'small' : 'large'}
              style={{
                color: 'blue',
                opacity: 1,
                fontSize: props.isYearView ? '100%' : '24px',
                maxWidth: props.isYearView ? '30px' : '60px',
                minWidth: props.isYearView ? '30px' : '60px'
              }}
            >
              {props.currentDate.getMonth() == 11
                ? 160
                : calculateWorkingHours(props.firstDay, props.lastDay)}
            </Button>
          </Stack>
        </Typography>
      </Grid>
    </>
  )
}

export default Month
