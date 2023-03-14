import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'

import PrintIcon from '@mui/icons-material/Print'
import Export from '@mui/icons-material/IosShare'
import AddIcon from '@mui/icons-material/Add'
import AdminIcon from '@mui/icons-material/SupervisorAccount'
import ModeIcon from '@mui/icons-material/Mode'
import React from 'react'
import StateMenuButton from './StateMenuButton'
import LogInOutButton from './LogInOutButton'

const MainMenuItems = (props: any) => {
  return (
    <List>
      <ListItem disablePadding>
        <StateMenuButton
          icon={AddIcon}
          parentProp={props}
          state={1}
          text={'Add Event'}
        />
      </ListItem>
      <ListItem disablePadding>
        <StateMenuButton
          icon={ModeIcon}
          parentProp={props}
          state={2}
          text={'Change Categories'}
        />
      </ListItem>
      <ListItem disablePadding>
        <StateMenuButton
          icon={AdminIcon}
          parentProp={props}
          text={'Add / Remove Admin'}
          state={3}
        />
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <Export />
          </ListItemIcon>
          <ListItemText primary="Export Calendar" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <PrintIcon />
          </ListItemIcon>
          <ListItemText primary="Print Calendar" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <LogInOutButton />
      </ListItem>
    </List>
  )
}

export default MainMenuItems
