import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import RightMenu from './RightMenu'

const RightMenuButton = () => {
  const [panelAnchor, setPanelAnchor] = useState<null | HTMLElement>(null)
  const [menuState, setMenuState] = useState(0)

  function updateState(state: any) {
    setMenuState(state)
  }

  const handleClick = (event: any) => {
    panelAnchor ? setPanelAnchor(null) : setPanelAnchor(event.currentTarget)
    updateState(0)
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
    </div>
  )
}

export default RightMenuButton
