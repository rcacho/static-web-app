import React from 'react'
import { Typography, Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

const noValue = ''

interface DayProps {
  key: any
  day: Number
  dayOfWeek: String
  isMonthView: boolean
  handleDayClick: any
}

const Day = (props: DayProps) => {
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
    if (props.day == 0) {
      return (
        <Button size="large" style={{ fontSize: '28px', color: 'black' }}>
          {' '}
        </Button>
      )
    } else {
      return (
        <Button
          onClick={() => props.handleDayClick(props.day)}
          size={props.isMonthView ? 'large' : 'small'}
          style={{
            fontSize: props.isMonthView ? '28px' : '85%',
            color: '#4D4D4D'
          }}
        >
          {props.day.toString()}
        </Button>
      )
    }
  }

  return (
    <Grid
      key={props.key}
      sx={{ height: 'auto' }}
      xs={1}
      borderRight={props.isMonthView ? 1 : 0}
      borderBottom={props.isMonthView ? 1 : 0}
      display="flex"
      justifyContent="center"
      alignItems="top"
    >
      <Typography variant={props.isMonthView ? 'h6' : 'body1'}>
        {renderDayOfWeek()}
        {renderDate()}
      </Typography>
    </Grid>
  )
}

export default Day
