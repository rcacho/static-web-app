import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material/'
import Month from './Month'
import Year from './Year'
import { useCalendarContext } from '@/store/CalendarContext'
import { APIManager } from '@/utils/APIManager'
import { Event } from '@/interfaces/Event'
import { Category } from '@/interfaces/Category'

let EventList: Event[] = []
let CategoryList: Category[] = []
const Calendar = () => {
  const { isYearView, currentDate, toggleBarOnDateClick } = useCalendarContext()
  const [eventList, setEventList] = useState(EventList)
  const [categories, setCategories] = useState(CategoryList)

  const [month, setMonth] = useState(currentDate.getMonth())

  useEffect(() => {
    setMonth(currentDate.getMonth() + 1)
  }, [toggleBarOnDateClick])

  useEffect(() => {
    APIManager.getInstance()
      .then((instance) => instance.getCategory())
      .then((data) => {
        CategoryList = []
        for (let i = 0; i < data.result.length; i++) {
          CategoryList.push(data.result[i])
        }
        console.log(data)
        setCategories(CategoryList)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    APIManager.getInstance()
      .then((instance) => instance.getEvent())
      .then((data) => {
        console.log(data)
        EventList = []
        for (let i = 0; i < data.result.length; i++) {
          EventList.push(data.result[i])
        }
        setEventList(EventList)
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
        month={month}
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
      sx={{ height: 'calc(100vh - 64px)' }}
      border={0}
    >
      {renderCalendar()}
    </Box>
  )
}

export default Calendar
