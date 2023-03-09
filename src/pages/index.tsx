import { ThemeProvider } from '@mui/material'
import MuiTheme from '@/styles/MuiTheme'
import Head from 'next/head'
import * as React from 'react'
import TopBar from '@/components/TopBar'
import { Box, Stack, Divider } from '@mui/material/'
import Legend from '@/components/Legend'
import Calendar from '@/components/calendar/Calendar'
import CalendarStore from '@/store/CalendarContext'

const examples: string[] = [
  'AE Business Meeting',
  'Holiday',
  'Quarter End',
  'Casual Day',
  'Pool party',
  'hot dog eating contest',
  'hot dog eating contest',
  'hot dog eating contest',
  'hot dog eating contest',
  'hot dog eating contest',
  'hot dog eating contest',
  'hot dog eating contest',
  'hot dog eating contest',
  'hot dog eating contest',
  'hot dog eating contest'
]

export default function Home(this: any) {
  const [selected, setSelected] = React.useState<string[]>([])
  // const isAllSelected =
  //   examples.length > 0 && selected.length === examples.length

  // const handleChange = (event: { target: { value: any } }) => {
  //   const value = event.target.value
  //   const s: string = value
  //   const list = [...selected]
  //   const index = list.indexOf(s)
  //   index === -1 ? list.push(value) : list.splice(index, 1)
  //   setSelected(list)
  // }

  // const handleAll = () => {
  //   setSelected(examples)
  //   return
  // }

  // const handleNone = () => {
  //   setSelected([])
  //   return
  // }

  return (
    <ThemeProvider theme={MuiTheme}>
      <Head>
        <></>
      </Head>
      <main>
        <CalendarStore>
          {/* <Stack direction="column" alignItems="stretch"> */}
          <Box
            sx={{ color: '#fff', zIndex: 2 }}
            height="100vh"
            display="flex"
            flexDirection="column"
          >
            <TopBar />
            <Stack
              direction="row"
              className="mainS"
              divider={<Divider orientation="vertical" flexItem />}
              justifyContent="space-between"
              spacing={0.1}
              alignItems="stretch"
            >
              <Legend />
              <Calendar />
            </Stack>
          </Box>
        </CalendarStore>
      </main>
    </ThemeProvider>
  )
}
