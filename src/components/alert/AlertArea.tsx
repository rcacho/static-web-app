import { Badge, ClickAwayListener, Popper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from '@mui/icons-material/Close';

type Alert = {
    name: String,
    date: Date,
    admin: String,
    action: String,
}

const AlertContext = React.createContext({});

const AlertArea = () => {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    return (
        <AlertContext.Provider value={[alerts, setAlerts]}>
            <AlertButton/>
        </AlertContext.Provider>
    )
}

const AlertButton = () => {
    const [alerts, setAlerts] = React.useContext(AlertContext);
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

    const [panelAnchor, setPanelAnchor] = useState<null | HTMLElement>(null);

    const handleClick = (event: any) => {
        panelAnchor ? setPanelAnchor(null) : setPanelAnchor(event.currentTarget);
    }

    return (
        <Badge variant="dot" badgeContent={2} color="error" invisible={alerts.length == 0}>
            <NotificationsIcon onClick={handleClick} color="action" />
            <AlertPanel panelAnchor={panelAnchor} onClickAway={handleClick}/>
        </Badge>
    )
}

const AlertPanel = (props: any) => {
    const [alerts, setAlerts] = React.useContext(AlertContext);
    const alertPanelStyle = {
        bgcolor: "white",
        color: "black",
        marginTop: '20px',
        paddingTop: '10px',
        height: "calc(100vh - 64px)",
        width: 300,
        boxShadow: "0 0 5px #ccc",
    }

    const renderAlerts = () => {
        const alertItems = [];
        for (const alert of alerts) {
            alertItems.push(<AlertItem alert={alert}/>)
        }
        return alertItems
    }

    return (
        <Popper open={Boolean(props.panelAnchor)} anchorEl={props.panelAnchor}>
            <ClickAwayListener onClickAway={props.onClickAway}>
                <Stack style={alertPanelStyle}>
                    {renderAlerts()}
                </Stack>
            </ClickAwayListener>
        </Popper>
    );
}

const AlertItem = (props: any) => {
    const [alerts, setAlerts] = React.useContext(AlertContext);
    const defaultColour = 'rgb(137,137,137)';
    const alertItemStyle = {
        minHeight: '50px',
        borderStyle: 'solid',
        borderWidth: '1px 0px',
        borderColor: defaultColour,
        color: defaultColour,
        marginTop: '-1px',
        paddingRight: '10px',
        paddingLeft: '10px',
    }

    const handleClick = () => {
        var index = alerts.indexOf(props.alert);
        if (index > -1) {
            alerts.splice(index, 1);
            setAlerts([...alerts]);
        }
    }

    return (
        <Stack direction="row" alignItems="center" style={alertItemStyle}>
            <Typography color={defaultColour}>
                {`${props.alert.admin} ${props.alert.action} `}
                <strong>{props.alert.name}</strong>
                {` on ${props.alert.date.toDateString().substring(4)}`}
            </Typography>
            <CloseIcon onClick={handleClick}></CloseIcon>
        </Stack>
    )
}

export default AlertArea;