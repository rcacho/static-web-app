import React from 'react';
import {Box, Stack, Divider,List, ListItemIcon, ListItemButton, ListItem, ListItemText} from '@mui/material/';
import LogoutIcon from '@mui/icons-material/Logout';
import PrintIcon from '@mui/icons-material/Print';
import Export from '@mui/icons-material/IosShare';
import AddIcon from '@mui/icons-material/Add';
import AdminIcon from '@mui/icons-material/SupervisorAccount';
import ModeIcon from '@mui/icons-material/Mode';

const MainMenuAdmin = () => {
    return (
        <Box bgcolor="white" flex={2} p={2}>Main Menu
            <List>
                <ListItem disablePadding>
                    <ListItemButton >
                        <ListItemIcon>
                            <AddIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Add Event"/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton >
                        <ListItemIcon>
                            <ModeIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Change Categories"/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton >
                        <ListItemIcon>
                            <AdminIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Add / Remove Admin"/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton >
                        <ListItemIcon>
                            <Export/>
                        </ListItemIcon>
                        <ListItemText primary="Export Calendar"/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton >
                        <ListItemIcon>
                            <PrintIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Print Calendar"/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton >
                        <ListItemIcon>
                            <LogoutIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Logout"/>
                    </ListItemButton>
                </ListItem>

            </List></Box>
    )
};

export default MainMenuAdmin;