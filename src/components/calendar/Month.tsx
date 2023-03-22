import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2'
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
  const { toggleBarOnDateClick, isYearView, currentDate } = useCalendarContext()

  const [monthS, setMonth] = useState(currentDate.getMonth())

  useEffect(() => {
    setMonth(currentDate.getMonth() + 1)
    console.log('monthS', monthS)
  }, [toggleBarOnDateClick])

  const startingWeekIndex = []
  const numWeeksOfMonth = []
  let weekIndex = 1
  for (let i = 0; i < 12; i++) {
    startingWeekIndex.push(weekIndex)
    let theMonth = new Date(props.currentDate.getFullYear(), i, 1)
    let numWeeks = theMonth.getDay() >= 5 || theMonth.getMonth() == 11 ? 5 : 4
    numWeeksOfMonth.push(numWeeks)
    weekIndex += numWeeks
  }

  let numBoxes = 42

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
          month={props.month}
          year={props.year}
          dayOfWeek={dayOfWeek}
          handleDayClick={handleDayClick}
          categoryList={props.categoryList}
          eventList={props.eventList}
        />
      )
    }
    return days
  }

  return (
    <Grid
      container
      columns={80}
      spacing={0}
      border={isYearView ? 0 : 1}
      maxWidth={isYearView ? 350 : '100%'}
      textAlign="center"
      alignItems="stretch"
      sx={{ height: '100%', minWidth: 250 }}
    >
      <Grid xs={72} sm={76} md={77} height={'100%'}>
        <Grid container columns={7} height={'100%'}>
          {renderDays()}
        </Grid>
      </Grid>
      <Grid xs={8} sm={3} height={'100%'}>
        <HoursAndWeeks
          isYearView={isYearView}
          firstDay={firstDay}
          lastDay={lastDay}
          currentDate={props.currentDate}
          weekNum={props.weekNum}
          numWeeks={props.numWeeks}
          startingWeekIndex={startingWeekIndex}
          numWeeksOfMonth={numWeeksOfMonth}
        />
      </Grid>
    </Grid>
  )
}

const WorkWeekIndex = (props: any) => {
  return (
    <Grid
      sx={{ height: 'auto' }}
      xs={1}
      display="flex"
      justifyContent="center"
      alignItems="top"
    >
      <Typography
        fontSize={props.isYearView ? '80%' : '20px'}
        variant={props.isYearView ? 'body1' : 'h6'}
      >
        <Button
          disabled
          size={props.isYearView ? 'small' : 'large'}
          style={{
            color: 'blue',
            opacity: 1,
            fontSize: props.isYearView ? '100%' : '20px',
            maxWidth: props.isYearView ? '30px' : '60px',
            minWidth: props.isYearView ? '30px' : '60px'
          }}
        >
          {props.index}
        </Button>
      </Typography>
    </Grid>
  )
}

const WorkingHours = (props: any) => {
  return (
    <>
      <Grid
        sx={{ height: 'auto' }}
        xs={1}
        display="flex"
        justifyContent="center"
        alignItems="top"
      >
        <Typography
          fontSize={props.isYearView ? '80%' : '20px'}
          variant={props.isYearView ? 'body1' : 'h6'}
        >
          <Button
            disabled
            size={props.isYearView ? 'small' : 'large'}
            style={{
              height: 'auto',
              color: 'blue',
              opacity: 1,
              fontSize: props.isYearView ? '100%' : '20px',
              maxWidth: props.isYearView ? '30px' : '60px',
              minWidth: props.isYearView ? '30px' : '60px'
            }}
          >
            {props.currentDate.getMonth() == 11
              ? 160
              : calculateWorkingHours(props.firstDay, props.lastDay)}
          </Button>
        </Typography>
      </Grid>
    </>
  )
}

const EmptyIndex = (props: any) => {
  return (
    <Grid
      sx={{ height: 'auto' }}
      xs={1}
      display="flex"
      justifyContent="center"
      alignItems="top"
    >
      <Typography
        fontSize={props.isYearView ? '80%' : '24px'}
        variant={props.isYearView ? 'body1' : 'h6'}
      >
        <Button
          disabled
          size={props.isYearView ? 'small' : 'large'}
          style={{
            opacity: 0,
            fontSize: props.isYearView ? '100%' : '24px',
            color: '#4D4D4D',
            maxWidth: props.isYearView ? '30px' : '60px',
            minWidth: props.isYearView ? '30px' : '60px'
          }}
        >
          1
        </Button>
      </Typography>
    </Grid>
  )
}

const HoursAndWeeks = (props: any) => {
  const RenderWeekNums = () => {
    const weekNums = []
    let maxWeek = props.numWeeks
    let week = props.weekNum
    for (let i = 0; i < 6; i++) {
      if (i < maxWeek) {
        weekNums.push(
          <WorkWeekIndex
            isYearView={props.isYearView}
            index={week + i}
            first={i}
          />
        )
      } else {
        weekNums.push(<EmptyIndex isYearView={props.isYearView} />)
      }
    }

    return weekNums
  }

  const RenderSpecificWeeksForMonth = () => {
    const weekNums = []
    let maxWeek = props.numWeeksOfMonth[props.currentDate.getMonth()]
    let week = props.startingWeekIndex[props.currentDate.getMonth()]
    for (let i = 0; i < 5; i++) {
      if (i < maxWeek) {
        weekNums.push(
          <WorkWeekIndex isYearView={props.isYearView} index={week + i} />
        )
      } else {
        weekNums.push(<EmptyIndex isYearView={props.isYearView} />)
      }
    }

    return weekNums
  }

  return (
    <>
      <Grid xs={10} height={'100%'}>
        <Grid
          container
          columns={1}
          sx={{ height: '100%' }}
          xs={10}
          sm={10}
          display="flex"
          justifyContent="center"
          alignItems="top"
        >
          &nbsp;
          <br />
          {props.isYearView ? RenderWeekNums() : RenderSpecificWeeksForMonth()}
          <WorkingHours
            isYearView={props.isYearView}
            firstDay={props.firstDay}
            lastDay={props.lastDay}
            currentDate={props.currentDate}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default Month
