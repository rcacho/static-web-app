import React from 'react'
import { Box } from '@mui/material/'
import { List, ListItem, ListItemText, Typography } from '@mui/material'
import GroupRemoveIcon from '@mui/icons-material/GroupRemove'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import StateMenuButton from '../../StateMenuButton'
import RightMenuPanel from '../RightMenuPanel'

const AddRemoveMain = (props: any) => {
  //function to handle Back button
  const handleBackClick = () => {
    props.updateState(0)
  }

  return (
    <RightMenuPanel
      title={"Add / Remove Admin"}
      handleBackClick={handleBackClick}
    >
      <ListItem disablePadding>
        <StateMenuButton
          icon={GroupAddIcon}
          parentProp={props}
          state={3.1}
          text={'Add Admin'}
        />
      </ListItem>
      <ListItem disablePadding>
        <StateMenuButton
          icon={GroupRemoveIcon}
          parentProp={props}
          text={'Remove Admin'}
          state={3.2}
        />
      </ListItem>
    </RightMenuPanel>
  )
}

export default AddRemoveMain
