import { useAccount, useMsal } from '@azure/msal-react'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { Category } from '@/interfaces/Category'
import { Event } from '@/interfaces/Event'
import { APIManager } from '@/utils/APIManager'
import { User } from '@/interfaces/User'

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
  selected: Category[]
  setSelected: React.Dispatch<React.SetStateAction<Category[]>>
  categories: Category[]
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>
  handleChange: (category: { target: { value: any } }) => void
  handleNone: () => void
  handleAll: () => void
  weekNum: number
  incWeekNum: () => void
  accountId: number
  events: Event[]
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>
  catMap: Map<number, string>
  updateCatMap: (category: Category[]) => void
  selectedEvent: number
  setSelectedEvent: React.Dispatch<React.SetStateAction<number>>
}

export const useCalendarContext = () => {
  const calendarContext = React.useContext(CalendarContext)
  if (calendarContext === undefined) {
    throw new Error('useCalendarContext must be called inside a CalendarStore')
  }
  return calendarContext
}

function getAccountID(): number {
  const { accounts } = useMsal()
  const account = useAccount(accounts[0])
  return parseInt(account?.idTokenClaims?.oid ?? '0')
}

const CalendarStore = ({ children }: any) => {
  const [currentDate, setDate] = useState(new Date())
  const [yearView, setYearView] = useState(false)
  const [dayClickCount, setDayClickCount] = useState(0)
  const [selectedDate, setSelectedDate] = useState<undefined | string>(
    undefined
  )
  const [selected, setSelected] = React.useState<Category[]>([])
  const [categories, setCategories] = React.useState<Category[]>([])
  const [events, setEvents] = React.useState<Event[]>([])
  const [weekNum, setWeekNum] = useState(1)
  const accountId = getAccountID()
  const [catMap, setCatMap] = useState(new Map())
  const [selectedEvent, setSelectedEvent] = useState(0)

  useEffect(() => {
    APIManager.getInstance().then((instance) => {
      let data: User = {
        user_id: accountId.toString(),
        first_name: 'string',
        last_name: 'string',
        is_admin: 1,
        notification_check: new Date()
      }
      instance.setUserLastLogin(accountId, data)
    })
  }, [])

  const updateCatMap = (categories: Category[]) => {
    let tempMap = new Map()
    for (let i = 0; i < categories.length; i++) {
      tempMap.set(categories[i].category_id, categories[i].category_name)
    }
    setCatMap(tempMap)
  }

  const incWeekNum = () => {
    setWeekNum(weekNum + 1)
  }

  const handleChange = (category: { target: { value: any } }) => {
    const s: string = category.target.value
    const list = [...selected]
    const index = list
      .map(function (e: Category) {
        return e.category_name
      })
      .indexOf(s)
    const indexAdd = categories
      .map(function (e: Category) {
        return e.category_name
      })
      .indexOf(s)
    index === -1 ? list.push(categories[indexAdd]) : list.splice(index, 1)
    setSelected(list)
  }

  const handleAll = () => {
    setSelected(categories)
    return
  }

  const handleNone = () => {
    setSelected([])
    return
  }

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
    toggleBarOnDateClick: toggleBarOnDateClick,
    selected: selected,
    setSelected: setSelected,
    categories: categories,
    handleChange: handleChange,
    handleNone: handleNone,
    handleAll: handleAll,
    weekNum: weekNum,
    incWeekNum: incWeekNum,
    setCategories: setCategories,
    accountId: accountId,
    events: events,
    setEvents: setEvents,
    catMap: catMap,
    updateCatMap: updateCatMap,
    selectedEvent: selectedEvent,
    setSelectedEvent: setSelectedEvent
  }

  return (
    <CalendarContext.Provider value={calendarStoreValues}>
      {children}
    </CalendarContext.Provider>
  )
}

export default CalendarStore
