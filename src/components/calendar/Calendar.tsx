import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material/'
import Month from './Month'
import Year from './Year'
import { useCalendarContext } from '@/store/CalendarContext'
import { APIManager } from '@/utils/APIManager'
import { Event } from '@/interfaces/Event'
import { useAPIContext } from '@/store/APIContext'

//let CatMap = new Map<String, Category>()
const Calendar = () => {
  const { isYearView, currentDate } = useCalendarContext()
  const { selected, categories } = useAPIContext()
  const [eventList, setEventList] = useState<Event[]>([])

  useEffect(() => {
    APIManager.getInstance()
      .then((instance) => instance.getEvent())
      .then((data) => {
        let events: Event[] = []
        let categories: (number | null)[] = []
        selected.map((category) => {
          categories.push(category.category_id)
        })
        data.result.map((event: Event) => {
          if (categories.includes(event.category_id)) {
            events.push(event)
          }
        })
        console.log(events)
        setEventList(events)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [selected])

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
