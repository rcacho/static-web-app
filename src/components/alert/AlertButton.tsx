import {
  Alert,
  Avatar,
  Badge,
  ClickAwayListener,
  Popper,
  Stack,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications'
import CloseIcon from '@mui/icons-material/Close'
import { APIManager } from '@/utils/APIManager'
import { AlertItem } from '@/interfaces/AlertItem'
import { useAPIContext } from '@/store/APIContext'

const defaultColour = 'rgb(137,137,137)'
const fontColour = 'rgb(90,90,90)'

const AlertButton = () => {
  const [hasAlerts, setHasAlerts] = useState<boolean>(false)
  const [panelAnchor, setPanelAnchor] = useState<null | HTMLElement>(null)

  const handleClick = (event: any) => {
    panelAnchor ? setPanelAnchor(null) : setPanelAnchor(event.currentTarget)
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
  const { accountId } = useAPIContext()
  const [alerts, setAlerts] = useState<AlertItem[]>([])
  const alertPanelStyle = {
    bgcolor: 'white',
    color: 'black',
    marginTop: '20px',
    paddingTop: '10px',
    height: 'calc(100vh - 64px)',
    width: 400,
    boxShadow: '0 0 5px #ccc'
  }

  useEffect(() => {
    //   setAlerts([
    //     {
    //       name: 'Expense Cutoff',
    //       date: new Date('2023-10-13'),
    //       admin: 'Steve',
    //       action: 'added'
    //     },
    //     {
    //       name: 'Annual General Meeting',
    //       date: new Date('2023-05-13'),
    //       admin: 'Shawn',
    //       action: 'added'
    //     },
    //     {
    //       name: 'Office Closed',
    //       date: new Date('2023-12-23'),
    //       admin: 'Nash',
    //       action: 'added'
    //     },
    //     {
    //       name: "Jerry's Birthday Party",
    //       date: new Date('2023-07-21'),
    //       admin: 'Shawn',
    //       action: 'deleted'
    //     }
    //   ])

    // @TODO: wait until token verification is done in the backend before parsing the response
    // As of right now, the response fails here. I've set some placeholder data below for testing purposes.
    APIManager.getInstance()
      .then((instance) => instance.getNotification(accountId))
      .then((data) => data.result)
      .then((res) => {
        //const alertItems: AlertItem[] = res
        setAlerts(res)
        console.log(res)
        if (res.length > 0) props.setHasAlerts(true)
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
        <Stack style={alertPanelStyle}>
          {props.hasAlerts ? (
            renderAlerts()
          ) : (
            <Typography color={fontColour} align="center">
              No alerts at this time.
            </Typography>
          )}
        </Stack>
      </ClickAwayListener>
    </Popper>
  )
}

const AlertItem = (props: any) => {
  const { category_name, time_added, admin_id, update_type } = props.alert
  // @TODO: Parse update type into a string
  // @TODO: fix this
  let eDate = new Date(
    +(time_added as unknown as string).substring(0, 4),
    +(time_added as unknown as string).substring(5, 7),
    +(time_added as unknown as string).substring(8, 10)
  )
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
      <Avatar alt={admin_id} src={`placeholder`} />
      <Typography color={fontColour} style={{ paddingLeft: 10 }}>
        {`${admin_id} ${update_type} `}
        <strong>{category_name}</strong>
        {` on ${eDate.toDateString().substring(4)}`}
      </Typography>
      <CloseIcon onClick={props.handleClick}></CloseIcon>
    </Stack>
  )
}

export default AlertButton
