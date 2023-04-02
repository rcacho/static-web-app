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
import ExportPopUp from './menuButtons/exportEvents/ExportPopUp'
import PrintCalPopUp from './menuButtons/printCalendar/PrintCalPopUp'
import { useAPIContext } from '@/store/APIContext'

const MainMenuItems = (props: any) => {
  const { isAdmin } = useAPIContext()
  return (
    <List>
      {isAdmin && (
        <>
          <ListItem disablePadding>
            <StateMenuButton
              icon={AddIcon}
              parentProp={props}
              state={1.1}
              text={'Add Event'}
            />
          </ListItem>
          <ListItem disablePadding>
            <StateMenuButton
              icon={ModeIcon}
              parentProp={props}
              state={2}
              text={'Edit Categories'}
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
        </>
      )}
      <ListItem disablePadding>
        <ExportPopUp />
      </ListItem>
      <ListItem disablePadding>
        <PrintCalPopUp />
      </ListItem>
      <ListItem disablePadding>
        <LogInOutButton />
      </ListItem>
    </List>
  )
}

export default MainMenuItems
