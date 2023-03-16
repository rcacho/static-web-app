import React from 'react'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

const Buttons = (props: any) => {
  const handleClick = () => {
    if (props.state >= 0) {
      props.parentProp.updateState(props.state)
    }
  }

  const renderIcon = () => {
    return !props.mini ? <props.icon /> : <></>
  }

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{renderIcon()}</ListItemIcon>
        <ListItemText primary={props.text} />
      </ListItemButton>
    </>
  )
}

export default Buttons
