import { Badge, Box, ClickAwayListener, Popper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";

const AlertButton = () => {
    const alertPanelStyle = {
        bgcolor: "white",
        color: "black",
        height: "calc(100vh - 64px)",
        width: 300,
        boxShadow: "0 0 5px #ccc",
    }
    const apiPath = "/api/hello" // @TODO: Placeholder

    useEffect(() => {
        fetch(apiPath)
        .then(res => res.json())
        .then(json => {
            console.log(json) // @TODO: Placeholder
            // Some useful attributes:
            // json.event_name
            // json.event_date
            // json.admin_id
        })
    })

    const [hasAlerts, setHaslerts] = useState(false)
    const [panelAnchor, setPanelAnchor] = useState<null | HTMLElement>(null);

    const renderAlerts = () => {
        return <div></div>
    }

    const handleClick = (event: any) => {
        panelAnchor ? setPanelAnchor(null) : setPanelAnchor(event.currentTarget);
    }

    return (
        <Badge variant="dot" badgeContent={2} color="error" invisible={!hasAlerts}>
            <NotificationsIcon onClick={handleClick} color="action"/>
            <Popper open={Boolean(panelAnchor)} anchorEl={panelAnchor}>
                <ClickAwayListener onClickAway={handleClick}>
                    <Box style={alertPanelStyle}>
                        {renderAlerts()}
                    </Box>
                </ClickAwayListener>
            </Popper>
        </Badge>
    )
}

const AlertItem = () => {
    return (
        <div/>
    )
}

export default AlertButton;