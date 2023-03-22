import { AppBar, Typography, styled } from '@mui/material'
import { Stack, Toolbar, Button } from '@mui/material/'
import Image from 'next/image'
import RightMenuButton from './menu/RightMenuButton'
import AlertButton from './alert/AlertButton'
import React from 'react'
import CalendarNavigator from './calendar/CalendarNavigator'

const TopBar = () => {
  const StyledTopBar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    color: '#4D4D4D'
  })

  return (
    <AppBar position="sticky" sx={{ minHeight: '64px' }}>
      <StyledTopBar sx={{ minHeight: '64px' }}>
        <MiniAELogo />
        <Stack
          direction="row"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 2,
            display: { xs: 'block', sm: 'block' }
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={2}
            alignItems="center"
          >
            <AELogo />
            <CalendarNavigator />
          </Stack>
        </Stack>

        <Stack direction="row" spacing={4}>
          <Button sx={{ minWidth: '35px', maxWidth: '35px' }}>
            <AlertButton />
          </Button>
          <RightMenuButton />
        </Stack>
      </StyledTopBar>
    </AppBar>
  )
}

const MiniAELogo = () => {
  return (
    <Stack
      sx={{
        display: { xs: 'none', sm: 'none' }
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Image src="/img/logo.png" alt="logo" width="30" height="24" />
        <Typography sx={{ display: { xs: 'none', sm: 'block' } }} variant="h6">
          Calendar
        </Typography>
      </Stack>
    </Stack>
  )
}

const AELogo = () => {
  return (
    <>
      <Image src="/img/logo.png" alt="logo" width="60" height="48" />
      <Typography sx={{ display: { xs: 'none', sm: 'block' } }} variant="h6">
        Calendar
      </Typography>
    </>
  )
}

export default TopBar
