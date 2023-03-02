import { ThemeProvider } from '@mui/material'
import MuiTheme from '@/styles/MuiTheme'
import Head from 'next/head'
import * as React from 'react'
import { useState } from 'react'
import TopBar from '@/components/TopBar'
import { Box, Stack, Divider } from '@mui/material/'
import Legend from '@/components/Legend'
import Calendar from '@/components/Calendar'

const daysOfWeek = ['SUN', 'MON', 'TUES', 'WED', 'THUR', 'FRI', 'SAT']

export default function Home(this: any) {
  // const [menuOpen, setMenuOpen] = useState(false);

  // calendar stuff
  // this has to be here (i think) because two different componenets need these :sob:
  const [currentDate, setDate] = useState(new Date())
  // const [selectedDate, setSelectedDate] = useState(new Date()); // to highlight a selected date, maybe not needed
  const [yearView, setYearView] = useState(false) // to determine which view

  // to help print things

  // helper functions/the like state setter whatevers
  function changeView(date: Date) {
    setYearView(!yearView)
    if (yearView) {
      setDate(new Date(date.getFullYear(), date.getMonth(), 1))
    }
  }

  // following/previous month/year depending on view
  // yearView is true (shows the year) by default
  function getFollowing() {
    yearView
      ? setDate(
          new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1)
        )
      : setDate(
          new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
        )
  }

  function getPrevious() {
    yearView
      ? setDate(
          new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1)
        )
      : setDate(
          new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
        )
  }

  function getFirstDayOfMonth(date: Date) {
    // 0 - 6 for sun - mon
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  function getDaysInMonth(date: Date) {
    // 0 in date param will get the highest date aka days in a month
    // but for some reason the months param goes from 1-12
    // and the getMonth() returns 0-11????
    // so inconsistent >:(
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  return (
    <ThemeProvider theme={MuiTheme}>
      <Head>
        <></>
      </Head>
      <main>
        {/* <Stack direction="column" alignItems="stretch"> */}
        <Box height="100vh" display="flex" flexDirection="column">
          <TopBar
            following={getFollowing}
            previous={getPrevious}
            currentDate={currentDate}
            yearView={yearView}
            changeView={changeView}
          />

          <Stack
            direction="row"
            className="mainS"
            divider={<Divider orientation="vertical" flexItem />}
            justifyContent="space-between"
            spacing={0.1}
            alignItems="stretch"
          >
            <Legend></Legend>
            <Calendar
              getFirstDayOfMonth={getFirstDayOfMonth}
              getNumDaysInMonth={getDaysInMonth}
              daysOfWeek={daysOfWeek}
              currentDate={currentDate}
              isYearView={yearView}
              changeView={changeView}
              month={0}
            />
          </Stack>
        </Box>
        {/* </Stack> */}
      </main>
    </ThemeProvider>
  )
}
