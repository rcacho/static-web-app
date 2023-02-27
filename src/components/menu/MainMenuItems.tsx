import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PrintIcon from "@mui/icons-material/Print";
import Export from "@mui/icons-material/IosShare";
import AddIcon from "@mui/icons-material/Add";
import AdminIcon from "@mui/icons-material/SupervisorAccount";
import ModeIcon from "@mui/icons-material/Mode";
import React from "react";
import Buttons from "@/components/menu/Buttons";


const MainMenuItems = (props: any) => {
    return (
        <List>
            <ListItem disablePadding>
                <Buttons icon={AddIcon}
                         parentProp={props}
                         state = {1}
                         text={"Add Event"}/>
            </ListItem>
            <ListItem disablePadding>
                <Buttons icon={ModeIcon}
                         parentProp={props}
                         state = {2}
                         text={"Change Categories"}/>
            </ListItem>
            <ListItem disablePadding>
                <Buttons icon={AdminIcon}
                         parentProp={props}
                         text={"Add / Remove Admin"}/>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <Export/>
                    </ListItemIcon>
                    <ListItemText primary="Export Calendar"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <PrintIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Print Calendar"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <LogoutIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Logout"/>
                </ListItemButton>
            </ListItem>
        </List>
    )
}

export default MainMenuItems;