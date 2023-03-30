import * as React from 'react'
import { useState } from 'react'

const CalendarContext = React.createContext<CalendarStoreValue | undefined>(
  undefined
)

interface CalendarStoreValue {
  currentDate: Date
  setDate: React.Dispatch<React.SetStateAction<Date>>
  isYearView: boolean
  changeView: (date?: Date) => void
  dayClickCount: number
  selectedDate: undefined | string
  toggleBarOnDateClick: (num: number, date?: any) => void
}

export const useCalendarContext = () => {
  const calendarContext = React.useContext(CalendarContext)
  if (calendarContext === undefined) {
    throw new Error('useCalendarContext must be called inside a GlobalStore')
  }
  return calendarContext
}

const CalendarStore = ({ children }: any) => {
  const [currentDate, setDate] = useState(new Date())
  const [yearView, setYearView] = useState(false)
  const [dayClickCount, setDayClickCount] = useState(0)
  const [selectedDate, setSelectedDate] = useState<undefined | string>(
    undefined
  )

  const changeView = (date?: Date) => {
    setYearView(!yearView)
    if (yearView && date !== undefined) {
      setDate(new Date(date.getFullYear(), date.getMonth(), 1))
    }
  }

  const toggleBarOnDateClick = (num: number, date?: any) => {
    num === 0 ? setDayClickCount(0) : setDayClickCount(dayClickCount + 1)
    setSelectedDate(date)
  }

  const calendarStoreValues: CalendarStoreValue = {
    currentDate: currentDate,
    setDate: setDate,
    isYearView: yearView,
    changeView: changeView,
    dayClickCount: dayClickCount,
    selectedDate: selectedDate,
    toggleBarOnDateClick: toggleBarOnDateClick
  }

  return (
    <CalendarContext.Provider value={calendarStoreValues}>
      {children}
    </CalendarContext.Provider>
  )
}

export default CalendarStore
