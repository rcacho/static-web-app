import { useAccount, useMsal } from '@azure/msal-react'
import * as React from 'react'
import { Category } from '@/interfaces/Category'
import { Event } from '@/interfaces/Event'
import { useContext, useState } from 'react'
import { APIManager } from '@/utils/APIManager'

const APIContext = React.createContext<APIStoreValue | undefined>(undefined)

interface APIStoreValue {
  selected: Category[]
  categories: Category[]
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>
  setSelected: React.Dispatch<React.SetStateAction<Category[]>>
  accountId: string
  isAdmin: boolean
  events: Event[]
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>
  catMap: Map<number, string>
  updateCatMap: (category: Category[]) => void
  selectedEvent: number
  setSelectedEvent: React.Dispatch<React.SetStateAction<number>>
  updateEvents: () => void
  eventIndex: number
  setEventIndex: React.Dispatch<React.SetStateAction<number>>
  eventId: number
  changeEventId: (id: number) => void
  updateCategories: () => void
  updateCats: boolean
  setUpdateCats: React.Dispatch<React.SetStateAction<boolean>>
}

export const useAPIContext = () => {
  const apiContext = useContext(APIContext)
  if (apiContext === undefined) {
    throw new Error('useAPIContext must be called inside a GlobalStore')
  }
  return apiContext
}

function getAccountID(): string {
  const { accounts } = useMsal()
  const account = useAccount(accounts[0])
  return 'user' // account?.idTokenClaims?.oid ?? '00000000-0000-0000-0000-000000000000'
}

function getIsAdmin(): boolean {
  const { accounts } = useMsal()
  const account = useAccount(accounts[0])
  return account?.idTokenClaims?.extension_IsAdmin as boolean
}

const APIStore = ({ children }: any) => {
  const [selected, setSelected] = useState<Category[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const accountId = getAccountID()
  const isAdmin = getIsAdmin()
  const [events, setEvents] = React.useState<Event[]>([])
  const [catMap, setCatMap] = useState(new Map())
  const [selectedEvent, setSelectedEvent] = useState(0)
  const [eventId, setEventId] = useState(-1)
  const [eventIndex, setEventIndex] = useState(-1)
  const [updateCats, setUpdateCats] = useState(false)

  const changeEventId = (id: number) => {
    setEventId(id)
  }

  function updateEvents() {
    APIManager.getInstance()
      .then((instance) => instance.getEvent())
      .then((data) => {
        setEvents(data.result)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function updateCategories() {
    APIManager.getInstance()
      .then((instance) => instance.getCategory())
      .then((data) => {
        setCategories(data.result)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const updateCatMap = (categories: Category[]) => {
    let tempMap = new Map()
    for (let i = 0; i < categories.length; i++) {
      tempMap.set(categories[i].category_id, categories[i].category_name)
    }
    setCatMap(tempMap)
  }

  const APIStoreValues: APIStoreValue = {
    selected: selected,
    categories: categories,
    setSelected: setSelected,
    setCategories: setCategories,
    accountId: accountId,
    isAdmin: isAdmin,
    events: events,
    setEvents: setEvents,
    catMap: catMap,
    updateCatMap: updateCatMap,
    selectedEvent: selectedEvent,
    setSelectedEvent: setSelectedEvent,
    updateEvents: updateEvents,
    eventIndex: eventIndex,
    setEventIndex: setEventIndex,
    eventId: eventId,
    changeEventId: changeEventId,
    updateCategories: updateCategories,
    updateCats: updateCats,
    setUpdateCats: setUpdateCats
  }

  return (
    <APIContext.Provider value={APIStoreValues}>{children}</APIContext.Provider>
  )
}

export default APIStore
