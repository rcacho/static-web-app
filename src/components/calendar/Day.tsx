import React from 'react'
import { Typography, Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useCalendarContext } from '@/store/CalendarContext'
import CircleIcon from '@mui/icons-material/Circle'

export const noValue = ''

interface DayProps {
  key: any
  day: Number
  dayOfWeek: String
  handleDayClick: any
}

const Day = (props: DayProps) => {
  const IconList = [
    <CircleIcon fontSize="small" style={{ fill: '#0072ea' }}></CircleIcon>,
    <CircleIcon fontSize="small" style={{ fill: 'red' }}></CircleIcon>,
    <CircleIcon fontSize="small" style={{ fill: 'purple' }}></CircleIcon>,
    <CircleIcon fontSize="small" style={{ fill: '#0072ea' }}></CircleIcon>,
    <CircleIcon fontSize="small" style={{ fill: '#81ea00' }}></CircleIcon>,
    <CircleIcon fontSize="small" style={{ fill: '#ea6900' }}></CircleIcon>,
    <CircleIcon fontSize="small" style={{ fill: '#ea00cb' }}></CircleIcon>,
    <CircleIcon fontSize="small" style={{ fill: 'black' }}></CircleIcon>,
    <CircleIcon fontSize="small" style={{ fill: '#00ea37' }}></CircleIcon>,
    <CircleIcon fontSize="small" style={{ fill: '#ea9800' }}></CircleIcon>,
    <CircleIcon fontSize="small" style={{ fill: '#81ea00' }}></CircleIcon>,
    <CircleIcon fontSize="small" style={{ fill: '#ea6900' }}></CircleIcon>,
    <CircleIcon fontSize="small" style={{ fill: '#ea00cb' }}></CircleIcon>,
    <CircleIcon fontSize="small" style={{ fill: 'black' }}></CircleIcon>,
    <CircleIcon fontSize="small" style={{ fill: '#00ea37' }}></CircleIcon>,
    <CircleIcon fontSize="small" style={{ fill: '#ea9800' }}></CircleIcon>
  ]
  const { isYearView } = useCalendarContext()

  function ReturnGrid() {
    if (IconList.length < 12) {
      return (
        <Grid container>
          {IconList.map((icon, index) => (
            <Grid key={index} xs={2}>
              {icon}
            </Grid>
          ))}
        </Grid>
      )
    } else {
      return (
        <Grid container>
          {IconList.slice(0, 11).map((icon, index) => (
            <Grid key={index} xs={2}>
              {icon}
            </Grid>
          ))}
          <Grid xs={2}>+{IconList.length - 11}</Grid>
        </Grid>
      )
    }
  }

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
    if (props.day === 0) {
      return <></>
    } else if (isYearView) {
      return (
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
    } else {
      return (
        <>
          <Grid container>
            <Grid xs={12}>
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
            </Grid>
            <ReturnGrid></ReturnGrid>
          </Grid>
        </>
      )
    }
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
