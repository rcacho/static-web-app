import { ClickAwayListener, Popper, Stack } from '@mui/material'
import React, { useState } from 'react'
import MainMenuItems from '@/components/menu/MainMenuItems'
import AddEventRender from '@/components/menu/menuButtons/addEvent/AddEventRender'
import ChangeCategories from '@/components/menu/menuButtons/changeCategories/ChangeCategories'

const RightMenu = (props: any) => {
  // menu state to select which menu to show
  // 0 is initial menu
  // 1 is add event
  const [menuState, setMenuState] = useState(0)

  function updateState(state: any) {
    setMenuState(state)
  }

  const alertPanelStyle = {
    bgcolor: 'white',
    color: 'black',
    marginTop: '20px',
    paddingTop: '10px',
    height: 'calc(100vh - 64px)',
    width: 300,
    boxShadow: '0 0 5px #ccc'
  }

  const handleClickAway = () => {
    props.onClickAway()
    setMenuState(0)
  }

  return (
    <Popper
      open={Boolean(props.panelAnchor)}
      anchorEl={props.panelAnchor}
      sx={{ bgcolor: 'white' }}
    >
      <ClickAwayListener onClickAway={handleClickAway}>
        <Stack style={alertPanelStyle}>
          {/*Render the menu bar items here*/}
          {menuState === 0 ? (
            <MainMenuItems updateState={updateState} />
          ) : menuState === 1 ? (
            <AddEventRender updateState={updateState} />
          ) : menuState === 2 ? (
            <ChangeCategories updateState={updateState} />
          ) : null}
        </Stack>
      </ClickAwayListener>
    </Popper>
  )
}

export default RightMenu
