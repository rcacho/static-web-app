import { ThemeProvider } from '@mui/material'
import MuiTheme from '@/styles/MuiTheme'
import Head from 'next/head'
import * as React from 'react'
import TopBar from '@/components/TopBar'
import { Box, Stack, Divider } from '@mui/material/'
import Legend from '@/components/Legend'
import Calendar from '@/components/calendar/Calendar'
import GlobalStore from '@/store/GlobalStore'

export default function Home(this: any) {
  return (
    <ThemeProvider theme={MuiTheme}>
      <Head>
        <></>
      </Head>
      <main>
        <GlobalStore>
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
              <header id="Calendar" >
                <Calendar />
              </header>
            </Stack>
          </Box>
        </GlobalStore>
      </main>
    </ThemeProvider>
  )
}
