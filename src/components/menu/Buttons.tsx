import React from 'react'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

const Buttons = (props: any) => {
  const handleClick = () => {
    props.parentProp.updateState(props.state)
  }

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <props.icon />
        </ListItemIcon>
        <ListItemText primary={props.text} />
      </ListItemButton>
    </>
  )
}

export default Buttons
