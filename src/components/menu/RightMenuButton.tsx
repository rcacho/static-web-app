import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import RightMenu from './RightMenu'
import { Backdrop } from '@mui/material'

const RightMenuButton = () => {
  const [panelAnchor, setPanelAnchor] = useState<null | HTMLElement>(null)
  const [menuState, setMenuState] = useState(0)
  const [backDrop, setBackDrop] = useState(false)

  function updateState(state: any) {
    setMenuState(state)
  }

  const handleClick = (event: any) => {
    panelAnchor ? setPanelAnchor(null) : setPanelAnchor(event.currentTarget)
    updateState(0)
    setBackDrop(!backDrop)
  }

  return (
    <div>
      <MenuIcon onClick={handleClick} color="action" />
      <RightMenu
        panelAnchor={panelAnchor}
        onClickAway={handleClick}
        updateState={updateState}
        menuState={menuState}
      />
      <Backdrop
        sx={{
          height: 'calc(100vh - 63px)',
          color: '#fff',
          zIndex: 1200,
          top: '63px'
        }}
        open={backDrop}
        onClick={handleClick}
      >
        {''}
      </Backdrop>
    </div>
  )
}

export default RightMenuButton
