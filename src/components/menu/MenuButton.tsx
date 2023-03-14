import React from 'react'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

const MenuButton = (props: any) => {
  const renderIcon = () => {
    return !props.mini ? <props.icon /> : <></>
  }

  return (
    <>
      <ListItemButton onClick={props.handleClick}>
        <ListItemIcon>{renderIcon()}</ListItemIcon>
        <ListItemText primary={props.text} />
      </ListItemButton>
    </>
  )
}

export default MenuButton
