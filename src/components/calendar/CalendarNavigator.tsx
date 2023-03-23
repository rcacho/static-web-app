import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { useCalendarContext } from '@/store/CalendarContext'
import { months } from './Year'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

const CalendarNavigator = () => {
  const { isYearView, currentDate } = useCalendarContext()

  const getDateString = () => {
    return isYearView
      ? currentDate.getFullYear()
      : months[currentDate.getMonth()] + ' ' + currentDate.getFullYear()
  }

  return (
    <>
      <Typography variant="h6">
        <Stack direction="row" alignItems="center">
          <DecrementDateButton />
          <IncrementDateButton />
          {getDateString()}
        </Stack>
      </Typography>
      {!isYearView ? <ToggleYearViewButton /> : <></>}
    </>
  )
}

const DecrementDateButton = () => {
  const { isYearView, setDate, currentDate, toggleBarOnDateClick } =
    useCalendarContext()

  const decrementDate = () => {
    isYearView
      ? setDate(
          new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1)
        )
      : setDate(
          new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
        )
  }

  const handleClick = () => {
    decrementDate()
    toggleBarOnDateClick(0)
  }

  return (
    <Button>
      <ChevronLeftIcon
        onClick={handleClick}
        style={{ fontSize: '32px', color: '#4D4D4D' }}
      ></ChevronLeftIcon>
    </Button>
  )
}

const IncrementDateButton = () => {
  const { isYearView, setDate, currentDate, toggleBarOnDateClick } =
    useCalendarContext()

  function incrementDate() {
    isYearView
      ? setDate(
          new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1)
        )
      : setDate(
          new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
        )
  }

  const handleClick = () => {
    incrementDate()
    toggleBarOnDateClick(0)
  }

  return (
    <Button>
      <ChevronRightIcon
        onClick={handleClick}
        style={{ fontSize: '32px', color: '#4D4D4D' }}
      ></ChevronRightIcon>
    </Button>
  )
}

const ToggleYearViewButton = () => {
  const { changeView, toggleBarOnDateClick } = useCalendarContext()

  const handleClick = () => {
    changeView()
    toggleBarOnDateClick(0)
  }

  return (
    <Button onClick={handleClick}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          color: '#898989',
          textDecoration: 'underline',
          fontFamily: 'Roboto'
        }}
      >
        <Typography
          // textTransform="capitalize"
          variant="body2"
        >
          Year View
        </Typography>
      </Box>
    </Button>
  )
}

export default CalendarNavigator
