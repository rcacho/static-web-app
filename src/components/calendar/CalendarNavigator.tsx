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

  const getSmallDateString = () => {
    return isYearView
      ? currentDate.getFullYear()
      : months[currentDate.getMonth()].substring(0, 3) +
          ' ' +
          currentDate.getFullYear()
  }

  return (
    <>
      <Typography
        variant="h6"
        fontSize={15}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        <Stack direction="row" alignItems="center">
          <DecrementDateButton />
          <IncrementDateButton />
          <Stack direction="column" alignItems="center">
            {getSmallDateString()}
            {!isYearView ? (
              <ToggleYearViewButton />
            ) : (
              <ToggleMonthViewButton></ToggleMonthViewButton>
            )}
          </Stack>
        </Stack>
      </Typography>
      <Typography variant="h6" sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Stack direction="row" alignItems="center">
          <DecrementDateButton />
          <IncrementDateButton />
          <header id="TopBar">{getDateString()}</header>
        </Stack>
      </Typography>{' '}
      <Stack
        direction="row"
        alignItems="center"
        sx={{ display: { xs: 'none', sm: 'block' } }}
      >
        {!isYearView ? <ToggleYearViewButton /> : <ToggleMonthViewButton />}
      </Stack>
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
    <Button sx={{ borderRadius: '60px' }}>
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
    <Button sx={{ borderRadius: '60px' }}>
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
    <Button onClick={handleClick} sx={{ borderRadius: '60px' }}>
      <Box
        sx={{
          display: { xs: 'none', sm: 'block' },
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
      <Box
        sx={{
          display: { xs: 'block', sm: 'none' },
          justifyContent: 'flex-end',
          color: '#898989',
          textDecoration: 'underline',
          fontFamily: 'Roboto'
        }}
      >
        <Typography
          // textTransform="capitalize"
          variant="body2"
          fontSize={'10px'}
          width="60px"
        >
          Year View
        </Typography>
      </Box>
    </Button>
  )
}

const ToggleMonthViewButton = () => {
  const { changeView, toggleBarOnDateClick } = useCalendarContext()

  const handleClick = () => {
    changeView()
    toggleBarOnDateClick(0)
  }

  return (
    <Button onClick={handleClick} sx={{ borderRadius: '60px' }}>
      <Box
        sx={{
          display: { xs: 'none', sm: 'block' },
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
          Month View
        </Typography>
      </Box>
      <Box
        sx={{
          display: { xs: 'block', sm: 'none' },
          justifyContent: 'flex-end',
          color: '#898989',
          textDecoration: 'underline',
          fontFamily: 'Roboto'
        }}
      >
        <Typography
          // textTransform="capitalize"
          variant="body2"
          fontSize={'9px'}
          width="60px"
        >
          Month View
        </Typography>
      </Box>
    </Button>
  )
}

export default CalendarNavigator
