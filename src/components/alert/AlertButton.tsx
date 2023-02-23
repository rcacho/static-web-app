import { Badge, ClickAwayListener, Popper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";

type Alert = {
    name: String,
    date: Date,
    admin: String,
    action: String,
}

const AlertButton = () => {
    const apiPath = "/api/hello" // @TODO: Placeholder

    useEffect(() => {
        fetch(apiPath)
            .then(res => res.json())
            .then(json => {
                console.log(json) // @TODO: Placeholder: will initialise alerts later.
                setAlerts([
                    { name: "Expense Cutoff", date: new Date("2023-10-13"), admin: "Steve", action: "added" },
                    { name: "Annual General Meeting", date: new Date("2023-05-13"), admin: "Shawn", action: "added" },
                    { name: "Office Closed", date: new Date("2023-12-23"), admin: "Nash", action: "added" },
                    { name: "Jerry's Birthday Party", date: new Date("2023-07-21"), admin: "Shawn", action: "deleted" },
                ])
                // Attributes for Alert type:
                // json.event_name
                // json.event_date
                // json.admin_id
            })
    }, [])

    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [panelAnchor, setPanelAnchor] = useState<null | HTMLElement>(null);

    const handleClick = (event: any) => {
        panelAnchor ? setPanelAnchor(null) : setPanelAnchor(event.currentTarget);
    }

    return (
        <Badge variant="dot" badgeContent={2} color="error" invisible={alerts.length == 0}>
            <NotificationsIcon onClick={handleClick} color="action" />
            <AlertPanel alerts={alerts} panelAnchor={panelAnchor} onClickAway={handleClick}/>
        </Badge>
    )
}

const AlertPanel = (props: any) => {
    const alertPanelStyle = {
        bgcolor: "white",
        color: "black",
        marginTop: '20px',
        paddingTop: '10px',
        height: "calc(100vh - 64px)",
        width: 300,
        boxShadow: "0 0 5px #ccc",
    }

    const alertPanelOffset = {
        modifiers: {
            offset: {
                offset: '0, 30'
            }
        }
    }

    const renderAlerts = () => {
        const alertItems = [];
        for (const alert of props.alerts) {
            alertItems.push(<AlertItem alert={alert}/>)
        }
        return alertItems
    }

    return (
        <Popper open={Boolean(props.panelAnchor)} anchorEl={props.panelAnchor} PaperProps={{style: alertPanelStyle}}>
            <ClickAwayListener onClickAway={props.onClickAway}>
                <Stack style={alertPanelStyle}>
                    {renderAlerts()}
                </Stack>
            </ClickAwayListener>
        </Popper>
    );
}

const AlertItem = (props: {alert: Alert}) => {
    const alertItemStyle = {
        minHeight: '50px',
        borderStyle: 'solid',
        borderWidth: '1px 0px',
        marginTop: '-1px'
    }

    const alertString = `${props.alert.admin} ${props.alert.action} ${props.alert.name} on ${props.alert.date.toDateString().substring(4)}`

    return (
        <Stack direction="row" style={alertItemStyle}>
            <Typography>{alertString}</Typography>
        </Stack>
    )
}

export default AlertButton;