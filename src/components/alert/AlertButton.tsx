import {
  Badge,
  ClickAwayListener,
  List,
  Popper,
  Stack,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications'
import CloseIcon from '@mui/icons-material/Close'
import { APIManager } from '@/utils/APIManager'
import { Alert } from '@/interfaces/Alert'

const defaultColour = 'rgb(137,137,137)'
const fontColour = 'rgb(90,90,90)'

const logNotificationsChecked = () => {
  APIManager.getInstance().then((instance) =>
    instance.setLastNotificationCheck()
  )
}

const AlertButton = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [hasAlerts, setHasAlerts] = useState<boolean>(false)
  const [panelAnchor, setPanelAnchor] = useState<null | HTMLElement>(null)

  const handleClick = (event: any) => {
    panelAnchor ? setPanelAnchor(null) : setPanelAnchor(event.currentTarget)
    setLoggedIn(true)
    if (!loggedIn) logNotificationsChecked()
  }

  return (
    <Badge variant="dot" badgeContent={2} color="error" invisible={!hasAlerts}>
      <NotificationsIcon onClick={handleClick} color="action" />
      <AlertPanel
        hasAlerts={hasAlerts}
        setHasAlerts={setHasAlerts}
        panelAnchor={panelAnchor}
        onClickAway={handleClick}
      />
    </Badge>
  )
}

const AlertPanel = (props: any) => {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const alertPanelStyle = {
    bgcolor: 'white',
    color: 'black',
    marginTop: '20px',
    paddingTop: '10px',
    height: 'calc(100vh - 64px)',
    overflow: 'auto',
    width: 400,
    boxShadow: '0 0 5px #ccc'
  }

  useEffect(() => {
    APIManager.getInstance()
      .then((instance) => instance.getNotification())
      .then((data) => data.result)
      .then((result) => {
        if (result.length > 0) {
          setAlerts(result)
          props.setHasAlerts(true)
        }
      })
  }, [])

  const renderAlerts = () => {
    const alertItems = []
    for (const alert of alerts) {
      const handleClick = () => {
        var index = alerts.indexOf(alert)
        if (index > -1) {
          alerts.splice(index, 1)
          setAlerts([...alerts])
        }
        if (alerts.length == 0) props.setHasAlerts(false)
      }
      alertItems.push(
        <AlertItem key={alert} alert={alert} handleClick={handleClick} />
      )
    }
    return alertItems
  }

  return (
    <Popper
      open={Boolean(props.panelAnchor)}
      anchorEl={props.panelAnchor}
      sx={{ bgcolor: 'white' }}
    >
      <ClickAwayListener onClickAway={props.onClickAway}>
        <List style={alertPanelStyle}>
          {props.hasAlerts ? (
            renderAlerts()
          ) : (
            <Typography color={fontColour} align="center">
              No alerts at this time.
            </Typography>
          )}
        </List>
      </ClickAwayListener>
    </Popper>
  )
}

const AlertItem = (props: any) => {
  const { category_name, event_date, update_type } = props.alert

  let action: string
  switch (update_type) {
    case 1:
      action = 'updated'
      break
    case 3:
      action = 'deleted'
      break
    default:
      action = 'added'
  }

  const date = new Date(event_date)

  const alertItemStyle = {
    minHeight: '60px',
    borderStyle: 'solid',
    borderWidth: '1px 0px',
    borderColor: defaultColour,
    color: defaultColour,
    marginTop: '-1px',
    paddingRight: '10px',
    paddingLeft: '10px'
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={'5px'}
      justifyContent="space-between"
      style={alertItemStyle}
    >
      <Typography color={fontColour} style={{ paddingLeft: 10 }}>
        {`Event on`}
        <strong>{date.toUTCString().substring(4, 16)}</strong>
        {` in `}
        <strong>{category_name}</strong>
        {` has been ${action} `}
      </Typography>
      <CloseIcon onClick={props.handleClick}></CloseIcon>
    </Stack>
  )
}

export default AlertButton
