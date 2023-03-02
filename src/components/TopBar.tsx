import { AppBar, Button, Typography, styled } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { Stack, Toolbar, Badge } from '@mui/material/'
import Image from 'next/image'
import RightMenuButton from './menu/RightMenuButton'

function TopBar(this: any, props: any) {
  const StyledTopBar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    color: '#4D4D4D'
  })

  // to display the months (Date only returns numbers 0-11)
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  // following/previous month/year depending on view
  // yearView is true (shows the year) by default
  function getFollowing() {
    props.yearView
      ? props.setDate(
          new Date(props.currentDate.getFullYear() + 1, props.currentDate.getMonth(), 1)
        )
      : props.setDate(
          new Date(props.currentDate.getFullYear(), props.currentDate.getMonth() + 1, 1)
        )
  }

  function getPrevious() {
    props.yearView
      ? props.setDate(
          new Date(props.currentDate.getFullYear() - 1, props.currentDate.getMonth(), 1)
        )
      : props.setDate(
          new Date(props.currentDate.getFullYear(), props.currentDate.getMonth() - 1, 1)
        )
  }

  return (
    // <Box bgcolor="white" sx={{ height: 70 }}>
    <AppBar position="sticky">
      <StyledTopBar>
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
            <Image src="/img/logo.png" alt="logo" width="60" height="48" />
            <Typography variant="h6">Calendar</Typography>

            {/* this part controls the calendar */}
            <Typography variant="h6">
              <Button
                size="small"
                color="info"
                onClick={() => getPrevious()}
                style={{ fontSize: '32px', color: 'black' }}
              >
                &lt;
              </Button>

              {props.yearView
                ? props.currentDate.getFullYear()
                : months[props.currentDate.getMonth()] +
                  ' ' +
                  props.currentDate.getFullYear()}

              <Button
                size="small"
                color="info"
                onClick={() => getFollowing()}
                style={{ fontSize: '32px', color: 'black' }}
              >
                &gt;
              </Button>
            </Typography>

            {/* this button only shows if we are in month view */}
            {props.yearView ? (
              ''
            ) : (
              <Button
                onClick={() => {
                  props.changeView()
                  props.handleDayClickBar(0)
                }}
                style={{ fontSize: '24px', color: 'black' }}
              >
                Year View
              </Button>
            )}
          </Stack>
        </Stack>

        <Stack direction="row" spacing={4}>
          <Badge variant="dot" badgeContent={2} color="error">
            <NotificationsIcon color="action" />
          </Badge>
          <RightMenuButton
            clickedDate={props.clickedDate}
            dayClickBar={props.dayClickBar}
          />
        </Stack>
      </StyledTopBar>
    </AppBar>
  )
}
export default TopBar
