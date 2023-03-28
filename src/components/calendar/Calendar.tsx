import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material/'
import Month from './Month'
import Year from './Year'
import { useCalendarContext } from '@/store/CalendarContext'
import { APIManager } from '@/utils/APIManager'
import { useAPIContext } from '@/store/APIContext'

//let CatMap = new Map<String, Category>()
const Calendar = () => {
  const { isYearView, currentDate } = useCalendarContext()
  const { categories } = useAPIContext()
  const [eventList, setEventList] = useState([])

  useEffect(() => {
    APIManager.getInstance()
      .then((instance) => instance.getEvent())
      .then((data) => {
        setEventList(data.result)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const renderCalendar = () => {
    return isYearView ? (
      <Year eventList={eventList} categoryList={categories} />
    ) : (
      <Month
        currentDate={currentDate}
        yearView={isYearView}
        eventList={eventList}
        month={currentDate.getMonth() + 1}
        categoryList={categories}
        year={currentDate.getFullYear()}
      />
    )
  }

  return (
    <Box
      bgcolor="white"
      color="black"
      flex={1}
      sx={{ height: 'calc(100vh - 74px)', overflowY: 'scroll' }}
      border={0}
    >
      {renderCalendar()}
    </Box>
  )
}

export default Calendar
