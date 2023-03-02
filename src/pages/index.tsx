import { ThemeProvider } from '@mui/material'
import MuiTheme from '@/styles/MuiTheme'
import Head from 'next/head'
import * as React from 'react'
import { useState } from 'react'
import TopBar from '@/components/TopBar'
import { Box, Stack, Divider } from '@mui/material/'
import Legend from '@/components/Legend'
import Calendar from '@/components/calendar/Calendar'

export default function Home(this: any) {
  // const [menuOpen, setMenuOpen] = useState(false);

  // calendar stuff
  // this has to be here (i think) because two different componenets need these :sob:
  const [currentDate, setDate] = useState(new Date())
  // const [selectedDate, setSelectedDate] = useState(new Date()); // to highlight a selected date, maybe not needed
  const [yearView, setYearView] = useState(false) // to determine which view
  const [dayClickBar, setDayClickBar] = useState(0)
  const [clickedDate, setClickedDate] = useState(null)

  // to help print things

  // helper functions/the like state setter whatevers
  function changeView(date: Date) {
    setYearView(!yearView)
    if (yearView) {
      setDate(new Date(date.getFullYear(), date.getMonth(), 1))
    }
  }

  function handleDayClickBar(num: any, date: any) {
    num === 0 ? setDayClickBar(0) : setDayClickBar((bar) => bar + 1)
    setClickedDate(date)
    console.log('cliiik', date)
  }

  return (
    <ThemeProvider theme={MuiTheme}>
      <Head>
        <></>
      </Head>
      <main>
        {/* <Stack direction="column" alignItems="stretch"> */}
        <Box
          sx={{ color: '#fff', zIndex: 2 }}
          height="100vh"
          display="flex"
          flexDirection="column"
        >
          <TopBar
            currentDate={currentDate}
            setDate={setDate}
            yearView={yearView}
            changeView={changeView}
            dayClickBar={dayClickBar}
            handleDayClickBar={handleDayClickBar}
            clickedDate={clickedDate}
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
              currentDate={currentDate}
              isYearView={yearView}
              changeView={changeView}
              month={0}
              handleDayClickBar={handleDayClickBar}
            />{' '}
          </Stack>
        </Box>
      </main>
    </ThemeProvider>
  )
}
