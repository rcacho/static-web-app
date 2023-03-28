import { useAccount, useMsal } from '@azure/msal-react'
import * as React from 'react'
import { Category } from '@/interfaces/Category'

const APIContext = React.createContext<APIStoreValue | undefined>(undefined)

interface APIStoreValue {
  selected: Category[]
  categories: Category[]
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>
  setSelected: React.Dispatch<React.SetStateAction<Category[]>>
  accountId: number
}

export const useAPIContext = () => {
  const apiContext = React.useContext(APIContext)
  if (apiContext === undefined) {
    throw new Error('useAPIContext must be called inside a APIStore')
  }
  return apiContext
}

function getAccountID(): number {
  const { accounts } = useMsal()
  const account = useAccount(accounts[0])
  return parseInt(account?.idTokenClaims?.oid ?? '0')
}

const APIStore = ({ children }: any) => {
  const [selected, setSelected] = React.useState<Category[]>([])
  const [categories, setCategories] = React.useState<Category[]>([])
  const accountId = getAccountID()

  const APIStoreValues: APIStoreValue = {
    selected: selected,
    categories: categories,
    setSelected: setSelected,
    setCategories: setCategories,
    accountId: accountId
  }

  return (
    <APIContext.Provider value={APIStoreValues}>{children}</APIContext.Provider>
  )
}

export default APIStore
