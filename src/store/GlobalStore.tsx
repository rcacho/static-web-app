import * as React from 'react'
import APIStore from './APIContext'
import CalendarStore from './CalendarContext'

const GlobalStore = ({ children }: any) => {
  return (
    <CalendarStore>
      <APIStore>{children}</APIStore>
    </CalendarStore>
  )
}

export default GlobalStore
