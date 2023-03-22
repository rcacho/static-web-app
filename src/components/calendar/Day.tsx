import React from 'react'
import { Typography, Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useCalendarContext } from '@/store/CalendarContext'
import CircleIcon from '@mui/icons-material/Circle'
import AddIcon from '@mui/icons-material/Add'

export const noValue = ''

interface DayProps {
  key: any
  day: Number
  dayOfWeek: String
  handleDayClick: any
  month: number
  year: number
}

const icons = { CircleIcon }
interface IconItems {
  icon: keyof typeof icons
  color: string
  event: string
}

//let EventList: [] = []

const Day = (props: DayProps) => {
  // const [dayEvents, setDayEvents] = useState([''])
  // const [categories, setCategories] = useState([''])

  let IconList: IconItems[] = [
    { icon: 'CircleIcon', color: '#0072ea', event: 'ev1' },
    { icon: 'CircleIcon', color: '#a8ea00', event: 'ev1' },
    { icon: 'CircleIcon', color: '#ea00e6', event: 'ev1' },
    { icon: 'CircleIcon', color: '#ea7d00', event: 'ev1' },
    { icon: 'CircleIcon', color: '#0013ea', event: 'ev1' }
    // { icon: 'CircleIcon', color: '#ea2300', event: 'ev1' },
    // { icon: 'CircleIcon', color: '#00ea5e', event: 'ev1' },
    // { icon: 'CircleIcon', color: '#5e00ea', event: 'ev1' },
    // { icon: 'CircleIcon', color: '#ea6900', event: 'ev1' },
    // { icon: 'CircleIcon', color: '#3b00ea', event: 'ev1' },
    // { icon: 'CircleIcon', color: '#ea008c', event: 'ev1' },
    // { icon: 'CircleIcon', color: '#eaa800', event: 'ev1' },
    // { icon: 'CircleIcon', color: '#eae600', event: 'ev1' },
    // { icon: 'CircleIcon', color: '#00ea42', event: 'ev1' },
    // { icon: 'CircleIcon', color: 'black', event: 'ev1' }
  ]
  const { isYearView } = useCalendarContext()

  // useEffect(() => {
  //   APIManager.getInstance()
  //       .then((instance) => instance.getCategory())
  //       .then((data) => {
  //         EventList = []
  //         for (let i = 0; i < data.result.length; i++) {
  //           EventList.push(data.result[i])
  //         }
  //         setCategories(EventList)
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })
  // }, [])
  //
  // useEffect(() => {
  //   APIManager.getInstance()
  //     .then((instance) => instance.getEvent())
  //     .then((data) => {
  //       EventList = []
  //       for (let i = 0; i < data.result.length; i++) {
  //         if (
  //           data.result[i].event_date.day === props.day &&
  //           data.result[i].event_date.month === props.month &&
  //           data.result[i].event_date.year === props.year
  //         )
  //
  //           item: IconItems = {icon: , color: ,event: data.result[i].category_id}
  //           EventList.push(data.result[i].category_id)
  //       }
  //       setDayEvents(EventList)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [])

  const CheckKey = (index: number) => {
    if (index === 7 && IconList.length > 8) {
      return <AddIcon sx={{ minHeight: '9px', maxHeight: '9px' }}></AddIcon>
    } else if (IconList.length > index) {
      let Icon = icons[IconList[index].icon]
      let color = IconList[index].color
      return <Icon sx={{ color: color, minHeight: '8px', maxHeight: '8px' }} />
    } else {
      return ' '
    }
  }

  const CheckSMKey = (index: number) => {
    if (index === 8 && IconList.length > 8) {
      return <AddIcon sx={{ minHeight: '9px', maxHeight: '9px' }}></AddIcon>
    } else if (IconList.length > index) {
      let Icon = icons[IconList[index].icon]
      let color = IconList[index].color
      return <Icon sx={{ color: color, minHeight: '8px', maxHeight: '8px' }} />
    } else {
      return ' '
    }
  }

  const CheckMDKey = (index: number) => {
    if (index === 11 && IconList.length > 11) {
      return <AddIcon sx={{ minHeight: '15px', maxHeight: '15px' }}></AddIcon>
    } else if (IconList.length > index) {
      let Icon = icons[IconList[index].icon]
      let color = IconList[index].color
      return (
        <Icon sx={{ color: color, minHeight: '15px', maxHeight: '15px' }} />
      )
    } else {
      return ' '
    }
  }

  function ReturnMonthGrid() {
    return (
      <>
        <Grid container width="auto" sx={{ display: { md: 'none' } }}>
          <Grid xs={4} sx={{ minHeight: '8px', maxHeight: '8px' }}>
            {CheckSMKey(0)}
          </Grid>

          <Grid xs={4} sx={{ minHeight: '8px', maxHeight: '8px' }}>
            {CheckSMKey(1)}
          </Grid>
          <Grid xs={4} sx={{ minHeight: '8px', maxHeight: '8px' }}>
            {CheckSMKey(2)}
          </Grid>
          <Grid xs={4} sx={{ minHeight: '8px', maxHeight: '8px' }}>
            {CheckSMKey(3)}
          </Grid>
          <Grid xs={4} sx={{ minHeight: '8px', maxHeight: '8px' }}>
            {CheckSMKey(3)}
          </Grid>
          <Grid xs={4} sx={{ minHeight: '8px', maxHeight: '8px' }}>
            {CheckSMKey(5)}
          </Grid>
          <Grid xs={4} sx={{ minHeight: '8px', maxHeight: '8px' }}>
            {CheckSMKey(6)}
          </Grid>
          <Grid xs={4} sx={{ minHeight: '8px', maxHeight: '8px' }}>
            {CheckSMKey(7)}
          </Grid>
          <Grid xs={4} sx={{ minHeight: '8px', maxHeight: '8px' }}>
            {CheckSMKey(8)}
          </Grid>
        </Grid>
        <Grid
          container
          width="auto"
          sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}
        >
          <Grid xs={2} sx={{ minHeight: '17px', maxHeight: '17px' }}>
            {CheckMDKey(0)}
          </Grid>

          <Grid xs={2} sx={{ minHeight: '17px', maxHeight: '17px' }}>
            {CheckMDKey(1)}
          </Grid>
          <Grid xs={2} sx={{ minHeight: '17px', maxHeight: '17px' }}>
            {CheckMDKey(2)}
          </Grid>
          <Grid xs={2} sx={{ minHeight: '17px', maxHeight: '17px' }}>
            {CheckMDKey(3)}
          </Grid>
          <Grid xs={2} sx={{ minHeight: '17px', maxHeight: '17px' }}>
            {CheckMDKey(3)}
          </Grid>
          <Grid xs={2} sx={{ minHeight: '17px', maxHeight: '17px' }}>
            {CheckMDKey(5)}
          </Grid>
          <Grid xs={2} sx={{ minHeight: '17px', maxHeight: '17px' }}>
            {CheckMDKey(6)}
          </Grid>
          <Grid xs={2} sx={{ minHeight: '17px', maxHeight: '17px' }}>
            {CheckMDKey(7)}
          </Grid>
          <Grid xs={2} sx={{ minHeight: '17px', maxHeight: '17px' }}>
            {CheckMDKey(8)}
          </Grid>
          <Grid xs={2} sx={{ minHeight: '17px', maxHeight: '17px' }}>
            {CheckMDKey(9)}
          </Grid>
          <Grid xs={2} sx={{ minHeight: '17px', maxHeight: '17px' }}>
            {CheckMDKey(10)}
          </Grid>
          <Grid xs={2} sx={{ minHeight: '17px', maxHeight: '17px' }}>
            {CheckMDKey(11)}
          </Grid>
        </Grid>
      </>
    )
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
                  minWidth: isYearView ? '30px' : '60px',
                  maxHeight: isYearView ? '100%' : '30px'
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
