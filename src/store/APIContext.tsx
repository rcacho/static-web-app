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
  updateFilters: () => void
  selectedEvent: number
  setSelectedEvent: React.Dispatch<React.SetStateAction<number>>
  updateEvents: () => Promise<void>
  eventIndex: number
  setEventIndex: React.Dispatch<React.SetStateAction<number>>
  eventId: number
  changeEventId: (id: number) => void
  updateCategories: () => Promise<void>
  updateCats: boolean
  setUpdateCats: React.Dispatch<React.SetStateAction<boolean>>
  selectedNotSaved: Category[]
  setSelectedNotSaved: React.Dispatch<React.SetStateAction<Category[]>>
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
  return account?.idTokenClaims?.oid ?? '00000000-0000-0000-0000-000000000000'
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
  const [selectedNotSaved, setSelectedNotSaved] = React.useState<Category[]>([])
  const changeEventId = (id: number) => {
    setEventId(id)
  }

  async function updateEvents() {
    const instance = await APIManager.getInstance()
    const data = await instance.getEvent()
    setEvents(data.result)
  }

  async function updateCategories() {
    const instance = await APIManager.getInstance()
    const data = await instance.getCategory()
    setCategories(data.result)
  }

  function updateFilters() {
    APIManager.getInstance()
      .then((instance) => instance.getCategory())
      .then((data) => {
        let cats = data.result
        let category = cats[cats.length - 1]
        let catID = {
          category_id: category.category_id
        }
        addFilter(catID, category)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // sorry
  function addFilter(cat: any, category: any) {
    APIManager.getInstance()
      .then((instance) => instance.getFilter())
      .then((data) => {
        let sel = data.filters

        // array of ids
        let filterIDs: any[] = []
        sel.map((item: any) => {
          filterIDs.push(item.category_id)
        })

        // make array of categories to set selected and selectedNotSaved with new category
        let selectedDB: Category[] = []
        categories.map((category: Category) => {
          if (filterIDs.includes(category.category_id)) {
            selectedDB.push(category)
          }
        })
        selectedDB.push(category)

        // array of current filter ids to send to API + current category id being added
        filterIDs.push(cat.category_id)
        let filterOBJ = {
          categories: filterIDs
        }
        setFilter(filterOBJ, selectedDB)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function setFilter(filters: any, filterArray: any) {
    APIManager.getInstance()
      .then((instance) => {
        setSelected(filterArray)
        setSelectedNotSaved(filterArray)
        instance.setFilter(filters)
      })
      .then((data) => {
        console.log(data)
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
    updateFilters: updateFilters,
    selectedEvent: selectedEvent,
    setSelectedEvent: setSelectedEvent,
    updateEvents: updateEvents,
    eventIndex: eventIndex,
    setEventIndex: setEventIndex,
    eventId: eventId,
    changeEventId: changeEventId,
    updateCategories: updateCategories,
    updateCats: updateCats,
    setUpdateCats: setUpdateCats,
    setSelectedNotSaved: setSelectedNotSaved,
    selectedNotSaved: selectedNotSaved
  }

  return (
    <APIContext.Provider value={APIStoreValues}>{children}</APIContext.Provider>
  )
}

export default APIStore
