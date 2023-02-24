import { ClickAwayListener, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popper, Stack } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PrintIcon from "@mui/icons-material/Print";
import Export from "@mui/icons-material/IosShare";
import AddIcon from "@mui/icons-material/Add";
import AdminIcon from "@mui/icons-material/SupervisorAccount";
import ModeIcon from "@mui/icons-material/Mode";
import React from "react";

const RightMenuItems = [
    <List>
    <ListItem disablePadding>
    <ListItemButton>
    <ListItemIcon>
    <AddIcon/>
    </ListItemIcon>
    <ListItemText primary="Add Event" />
    </ListItemButton>
    </ListItem>
    <ListItem disablePadding>
    <ListItemButton>
    <ListItemIcon>
    <ModeIcon/>
    </ListItemIcon>
    <ListItemText primary="Change Categories" />
    </ListItemButton>
    </ListItem>
    <ListItem disablePadding>
    <ListItemButton>
    <ListItemIcon>
    <AdminIcon />
    </ListItemIcon>
    <ListItemText primary="Add / Remove Admin" />
    </ListItemButton>
    </ListItem>
    <ListItem disablePadding>
    <ListItemButton>
    <ListItemIcon>
    <Export/>
    </ListItemIcon>
    <ListItemText primary="Export Calendar" />
    </ListItemButton>
    </ListItem>
    <ListItem disablePadding>
    <ListItemButton>
    <ListItemIcon>
    <PrintIcon/>
    </ListItemIcon>
    <ListItemText primary="Print Calendar" />
    </ListItemButton>
    </ListItem>
    <ListItem disablePadding>
    <ListItemButton>
    <ListItemIcon>
    <LogoutIcon/>
    </ListItemIcon>
    <ListItemText primary="Logout" />
    </ListItemButton>
    </ListItem>
    </List>
]

const RightMenu = (props: any) => {
    const alertPanelStyle = {
        bgcolor: "white",
        color: "black",
        marginTop: '20px',
        paddingTop: '10px',
        height: "calc(100vh - 64px)",
        width: 300,
        boxShadow: "0 0 5px #ccc",
    }

    return (
        <Popper open={Boolean(props.panelAnchor)} anchorEl={props.panelAnchor} sx={{bgcolor: 'white'}}>
            <ClickAwayListener onClickAway={props.onClickAway}>
                <Stack style={alertPanelStyle}>
                    {/*Render the menu bar items here*/}
                    {RightMenuItems}
                </Stack>
            </ClickAwayListener>
        </Popper>
    );
}

export default RightMenu;