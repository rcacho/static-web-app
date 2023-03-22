import React, { useEffect, useState } from 'react'
import { Typography, Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useCalendarContext } from '@/store/CalendarContext'
import CircleIcon from '@mui/icons-material/Circle'
import AddIcon from '@mui/icons-material/Add'
import SquareIcon from '@mui/icons-material/Square'
import StarIcon from '@mui/icons-material/Star'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import PaidIcon from '@mui/icons-material/Paid'
import HexagonIcon from '@mui/icons-material/Hexagon'
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye'
import CropSquareIcon from '@mui/icons-material/CropSquare'
import CloseIcon from '@mui/icons-material/Close'
import SpaIcon from '@mui/icons-material/Spa'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import FilterDramaIcon from '@mui/icons-material/FilterDrama'
import InvertColorsIcon from '@mui/icons-material/InvertColors'

export const noValue = ''

interface DayProps {
  key: any
  day: Number
  dayOfWeek: String
  handleDayClick: any
  month: any
  year: number
  categoryList: any
  eventList: any
}

const icons = {
  CircleIcon,
  SquareIcon,
  StarIcon,
  ReportProblemIcon,
  PaidIcon,
  HexagonIcon,
  PanoramaFishEyeIcon,
  CropSquareIcon,
  CloseIcon,
  SpaIcon,
  FavoriteIcon,
  ArrowDownwardIcon,
  ArrowUpwardIcon,
  FilterDramaIcon,
  InvertColorsIcon
  //CircleOutLinedItem
}

const iconKeys = [
  'CircleIcon',
  'SquareIcon',
  'StarIcon',
  'ReportProblemIcon',
  'PaidIcon',
  'HexagonIcon',
  'PanoramaFishEyeIcon',
  'CropSquareIcon',
  'CloseIcon',
  'SpaIcon',
  'FavoriteIcon',
  'ArrowDownwardIcon',
  'ArrowUpwardIcon',
  'FilterDramaIcon',
  'InvertColorsIcon',
  'CircleOutlinedIcon'
]
interface IconItems {
  icon: keyof typeof icons
  color: string
  event: string
}

let IconList: IconItems[] = []

const Day = (props: DayProps) => {
  const [iconSet, setIconSet] = useState(IconList)
  const { isYearView, currentDate } = useCalendarContext()

  useEffect(() => {
    if (props.eventList.length > 0 && props.categoryList.length > 0) {
      IconList = []
      for (let j = 0; j < props.eventList.length; j++) {
        let date = props.eventList[j].event_date
        let day = Number(date.slice(8, 10))
        let eventMonth = Number(date.slice(5, 7))
        let year = Number(date.slice(0, 4))
        if (
          day === props.day &&
          eventMonth === props.month &&
          year === currentDate.getFullYear()
        ) {
          for (let i = 0; i < props.categoryList.length; i++) {
            if (
              props.eventList[j].category_id ===
              props.categoryList[i].category_id
            ) {
              let item: IconItems = {
                icon: 'CircleIcon',
                color: props.categoryList[i].color,
                event: props.categoryList[i].category_name
              }
              IconList.push(item)
            }
          }
        }
      }

      setIconSet(IconList)
    }
  }, [props.eventList, props.categoryList])

  const CheckKey = (index: number) => {
    if (index === 7 && iconSet.length > 8) {
      return <AddIcon sx={{ minHeight: '9px', maxHeight: '9px' }}></AddIcon>
    } else if (iconSet.length > index) {
      let Icon = icons[iconSet[index].icon]
      let color = iconSet[index].color
      return <Icon sx={{ color: color, minHeight: '8px', maxHeight: '8px' }} />
    } else {
      return ' '
    }
  }

  function ReturnMonthGrid() {
    if (iconSet.length < 13) {
      return (
        <>
          {iconSet.map(({ icon, color }, index) => {
            const Icon = icons[icon]
            return (
              <Grid key={index} xs={2}>
                <Icon
                  sx={{ color: color, minHeight: '17px', maxHeight: '17px' }}
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
        <Grid xs={4} sx={{ minHeight: '8px', maxHeight: '8px' }}>
          {CheckKey(5)}
        </Grid>

        <Grid xs={4} sx={{ minHeight: '8px', maxHeight: '8px' }}>
          {CheckKey(6)}
        </Grid>
        <Grid xs={4} sx={{ minHeight: '8px', maxHeight: '8px' }}>
          {CheckKey(7)}
        </Grid>
        <Grid xs={4} sx={{ minHeight: '8px', maxHeight: '8px' }}>
          {CheckKey(3)}
        </Grid>
        <Grid xs={4} sx={{ minHeight: '8px', maxHeight: '8px' }}>
          {' '}
        </Grid>
        <Grid xs={4} sx={{ minHeight: '8px', maxHeight: '8px' }}>
          {CheckKey(4)}
        </Grid>
        <Grid xs={4} sx={{ minHeight: '8px', maxHeight: '8px' }}>
          {CheckKey(0)}
        </Grid>
        <Grid xs={4} sx={{ minHeight: '8px', maxHeight: '8px' }}>
          {CheckKey(1)}
        </Grid>
        <Grid xs={4} sx={{ minHeight: '8px', maxHeight: '8px' }}>
          {CheckKey(2)}
        </Grid>
      </Grid>
    )
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
        >
          1
        </Button>
      )
    } else if (isYearView) {
      return (
        <div className="yearParent">
          <div className="symbols">
            <ReturnYearGrid></ReturnYearGrid>
          </div>
          <div className="days">
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
                  fontSize: isYearView ? '100%' : '24px',
                  color: '#4D4D4D',
                  maxWidth: isYearView ? '30px' : '60px',
                  minWidth: isYearView ? '30px' : '60px'
                }}
              >
                {props.day.toString()}
              </Button>
            </Grid>
            <Grid container xs={12} paddingRight="5px" paddingLeft="5px">
              <ReturnMonthGrid></ReturnMonthGrid>
            </Grid>
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
