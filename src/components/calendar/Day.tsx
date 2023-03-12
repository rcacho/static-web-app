import React from 'react'
import { Typography, Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useCalendarContext } from '@/store/CalendarContext'

export const noValue = ''

interface DayProps {
  key: any
  day: Number
  dayOfWeek: String
  handleDayClick: any
}

const Day = (props: DayProps) => {
  const { isYearView } = useCalendarContext()

  const renderDayOfWeek = () => {
    if (props.dayOfWeek != noValue) {
      return (
        <>
          {props.dayOfWeek}
          <br />
        </>
      )
    }
  }

  const renderDate = () => {
    return props.day == 0 ? (
      <></>
    ) : (
      <Button
        onClick={() => props.handleDayClick(props.day)}
        size={isYearView ? 'small' : 'large'}
        style={{
          fontSize: isYearView ? '100%' : '24px',
          color: '#4D4D4D',
          maxWidth: isYearView ? '30px' : '60px',
          minWidth: isYearView ? '30px' : '60px'
        }}
      >
        {props.day.toString()}
      </Button>
    )
  }

  return (
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
        fontSize={isYearView ? '80%' : '24px'}
        variant={isYearView ? 'body1' : 'h6'}
      >
        {renderDayOfWeek()}
        {renderDate()}
      </Typography>
    </Grid>
  )
}

export default Day
