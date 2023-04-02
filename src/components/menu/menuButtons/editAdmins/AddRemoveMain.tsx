import React from 'react'
import { ListItem } from '@mui/material'
import GroupRemoveIcon from '@mui/icons-material/GroupRemove'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import StateMenuButton from '../../StateMenuButton'
import RightMenuPanel from '../RightMenuPanel'

const AddRemoveMain = (props: any) => {
  const handleBackClick = () => {
    props.updateState(0)
  }

  return (
    <RightMenuPanel
      title={'Add / Remove Admin'}
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
