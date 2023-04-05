import React, { useMemo, useState } from 'react'
import { Typography, Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useCalendarContext } from '@/store/CalendarContext'
import AddIcon from '@mui/icons-material/Add'
import { icons } from '@/interfaces/Icons'
import { Box } from '@mui/material/'
import { useAPIContext } from '@/store/APIContext'

export const noValue = ''

interface DayProps {
  //key: any
  day: Number
  dayOfWeek: String
  handleDayClick: any
  month: any
}

interface IconItems {
  icon: keyof typeof icons
  color: string
  event: string
}

let IconList: IconItems[] = []

const Day = (props: DayProps) => {
  const [iconSet, setIconSet] = useState(IconList)
  const { isYearView, currentDate } = useCalendarContext()
  const { events, selected, categories, updateCats } = useAPIContext()

  useMemo(() => {
    IconList = []
    if (events.length > 0 && selected.length > 0) {
      for (let j = 0; j < events.length; j++) {
        let date: Date = new Date(events[j].event_date)
        let day = +(events[j].event_date as unknown as string).substring(8, 10)
        let eventMonth = +(events[j].event_date as unknown as string).substring(
          5,
          7
        )
        let year = date.getFullYear()

        if (
          day === props.day &&
          eventMonth === props.month &&
          year === currentDate.getFullYear()
        ) {
          let sels = []
          for (let i = 0; i < selected.length; i++) {
            sels.push(selected[i].category_id)
          }
          for (let i = 0; i < categories.length; i++) {
            if (
              events[j].category_id === categories[i].category_id &&
              sels.includes(events[j].category_id)
            ) {
              let item: IconItems = {
                icon: categories[i].icon,
                color: categories[i].color,
                event: categories[i].category_name
              }
              IconList.push(item)
            }
          }
        }
      }
    }
    setIconSet(IconList)
  }, [currentDate, events, selected, categories, updateCats])

  const CheckKey = (index: number) => {
    if (index === 7 && iconSet.length > 8) {
      return <AddIcon sx={{ minHeight: '12px', maxHeight: '12px' }}></AddIcon>
    } else if (iconSet.length > index) {
      let Icon = icons[iconSet[index].icon]
      let color = iconSet[index].color
      return (
        <Icon sx={{ color: color, minHeight: '12px', maxHeight: '12px' }} />
      )
    } else {
      return ' '
    }
  }

  function ReturnMonthGrid() {
    if (iconSet.length < 13) {
      return (
        <>
          {iconSet.map(({ icon, color }, index) => {
            let Icon = icons[icon]
            if (Icon == undefined) {
              Icon = icons['CircleOutlinedIcon']
            }
            return (
              <Grid key={index} xs={3}>
                <Icon
                  sx={{
                    color: color,
                    minHeight: '10x',
                    maxHeight: '10px',
                    display: { xs: 'block', sm: 'none' }
                  }}
                />
                <Icon
                  sx={{
                    color: color,
                    minHeight: '17px',
                    maxHeight: '17px',
                    display: { xs: 'none', sm: 'block' }
                  }}
                />
              </Grid>
            )
          })}
        </>
      )
    } else {
      return (
        <>
          {iconSet.slice(0, 11).map(({ icon, color }, index) => {
            const Icon = icons[icon]
            return (
              <Grid key={index} xs={2}>
                <Icon
                  sx={{ color: color, minHeight: '17px', maxHeight: '17px' }}
                />
              </Grid>
            )
          })}
          <Grid xs={2}>+{iconSet.length - 11}</Grid>
        </>
      )
    }
  }

  function ReturnYearGrid() {
    return (
      <Grid
        container
        minHeight="0"
        maxHeight="0"
        maxWidth="33px"
        minWidth="33px"
      >
        <Grid xs={4} sx={{ minHeight: '10px', maxHeight: '10px' }}>
          {CheckKey(5)}
        </Grid>

        <Grid xs={4} sx={{ minHeight: '10px', maxHeight: '10px' }}>
          {CheckKey(6)}
        </Grid>
        <Grid xs={4} sx={{ minHeight: '10px', maxHeight: '10px' }}>
          {CheckKey(7)}
        </Grid>
        <Grid xs={4} sx={{ minHeight: '10px', maxHeight: '10px' }}>
          {CheckKey(3)}
        </Grid>
        <Grid xs={4} sx={{ minHeight: '9px', maxHeight: '9px' }}>
          {' '}
        </Grid>
        <Grid xs={4} sx={{ minHeight: '10px', maxHeight: '10px' }}>
          {CheckKey(4)}
        </Grid>
        <Grid xs={4} sx={{ minHeight: '10px', maxHeight: '10px' }}>
          {CheckKey(0)}
        </Grid>
        <Grid xs={4} sx={{ minHeight: '10px', maxHeight: '10px' }}>
          {CheckKey(1)}
        </Grid>
        <Grid xs={4} sx={{ minHeight: '10px', maxHeight: '10px' }}>
          {CheckKey(2)}
        </Grid>
      </Grid>
    )
  }

  const renderDayOfWeek = () => {
    if (props.dayOfWeek != noValue) {
      return (
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {props.dayOfWeek}
          <br />
        </Box>
      )
    }
  }

  const renderSmallDayOfWeek = () => {
    if (props.dayOfWeek != noValue) {
      return (
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          {props.dayOfWeek.substring(0, 1)}
          <br />
        </Box>
      )
    }
  }

  const renderDate = () => {
    if (props.day === 0) {
      // for aligning the work hours lol
      return (
        <Button
          disabled
          size={isYearView ? 'small' : 'large'}
          style={{
            opacity: 0,
            fontSize: isYearView ? '100%' : '24px',
            color: '#4D4D4D',
            maxWidth: isYearView ? '30px' : '60px',
            minWidth: isYearView ? '30px' : '60px'
          }}
        ></Button>
      )
    } else if (isYearView) {
      return (
        <div className="yearParent">
          <div className="symbols">
            <ReturnYearGrid />
          </div>
          <div className="days">
            <Button
              onClick={() => props.handleDayClick(props.day)}
              size={isYearView ? 'small' : 'large'}
              style={{
                borderRadius: '60px',
                fontSize: isYearView ? '100%' : '24px',
                color: '#4D4D4D',
                maxWidth: isYearView ? '30px' : '60px',
                minWidth: isYearView ? '30px' : '60px'
              }}
            >
              {props.day.toString()}
            </Button>
          </div>
        </div>
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
                  borderRadius: '60px',
                  fontSize: isYearView ? '100%' : '24px',
                  color: '#4D4D4D',
                  maxWidth: isYearView ? '30px' : '60px',
                  minWidth: isYearView ? '30px' : '60px'
                }}
              >
                {props.day.toString()}
              </Button>
            </Grid>
            <Box
              maxWidth={'80%'}
              minWidth={'80%'}
              sx={{ display: { xs: 'block', sm: 'none' } }}
            >
              <Grid
                container
                xs={12}
                paddingRight="5px"
                paddingLeft="5px"
                maxWidth={'80%'}
              >
                <ReturnMonthGrid />
              </Grid>
            </Box>
            <Box
              maxWidth={'100%'}
              minWidth={'100%'}
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              <Grid
                container
                xs={12}
                paddingRight="5px"
                paddingLeft="5px"
                maxWidth={'100%'}
                minWidth={'100%'}
              >
                <ReturnMonthGrid />
              </Grid>
            </Box>
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
      onClick={() => {
        if (props.day !== 0) {
          props.handleDayClick(props.day)
        }
      }}
    >
      <Typography
        fontSize={isYearView ? '80%' : '24px'}
        variant={isYearView ? 'body1' : 'h6'}
      >
        {renderDayOfWeek()}
        {renderSmallDayOfWeek()}
        {renderDate()}
      </Typography>
    </Grid>
  )
}

export default Day
