import { AppBar, Typography, styled } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { Stack, Toolbar, Badge } from '@mui/material/'
import Image from 'next/image'
import RightMenuButton from './menu/RightMenuButton'
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
    <AppBar position="sticky">
      <StyledTopBar>
        <MiniAELogo />
        <Stack
          direction="row"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 2,
            display: { xs: 'none', sm: 'block' }
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
          <Badge variant="dot" badgeContent={2} color="error">
            <NotificationsIcon color="action" />
          </Badge>
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
        display: { xs: 'block', sm: 'none' }
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Image src="/img/logo.png" alt="logo" width="30" height="24" />
        <Typography variant="h6">Calendar</Typography>
      </Stack>
    </Stack>
  )
}

const AELogo = () => {
  return (
    <>
      <Image src="/img/logo.png" alt="logo" width="60" height="48" />
      <Typography variant="h6">Calendar</Typography>
    </>
  )
}

export default TopBar
