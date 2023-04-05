import { List, ListItem } from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import AdminIcon from '@mui/icons-material/SupervisorAccount'
import ModeIcon from '@mui/icons-material/Mode'
import React from 'react'
import StateMenuButton from './StateMenuButton'
import LogInOutButton from './LogInOutButton'
import ExportButton from './menuButtons/exportEvents/ExportButton'
import PrintButton from './menuButtons/printCalendar/PrintButton'
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
        <ExportButton />
      </ListItem>
      <ListItem disablePadding>
        <PrintButton />
      </ListItem>
      <ListItem disablePadding>
        <LogInOutButton />
      </ListItem>
    </List>
  )
}

export default MainMenuItems
