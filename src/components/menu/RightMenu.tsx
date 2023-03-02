import { ClickAwayListener, Popper, Stack } from '@mui/material'
import React from 'react'
import MainMenuItems from '@/components/menu/MainMenuItems'
import AddEventRender from './menuButtons/addEvent/AddEventRender'
import ChangeCategories from '@/components/menu/menuButtons/changeCategories/ChangeCategories'
import ChangeDeleteEvent from '@/components/menu/menuButtons/changeEvents/ChangeDeleteEvent'

const RightMenu = (props: any) => {
  // menu state to select which menu to show
  // 0 is initial menu
  // 1 is add event

  const alertPanelStyle = {
    bgcolor: 'white',
    color: 'black',
    marginTop: '20px',
    paddingTop: '10px',
    height: 'calc(100vh - 64px)',
    width: 300,
    boxShadow: '0 0 5px #ccc',
    overflow: 'hidden',
  }

  const handleClickAway = () => {
    props.onClickAway()
  }

  return (
        <Popper
          open={Boolean(props.panelAnchor)}
          anchorEl={props.panelAnchor}
          sx={{ bgcolor: 'white', zIndex: (theme) => theme.zIndex.drawer + 2 }}
          modifiers={[
            {
              name: "offset",
              options: {
                offset: [-114],
              }
            }
          ]}
        >
          <ClickAwayListener onClickAway={handleClickAway}>
            <Stack style={alertPanelStyle}>
              {/*Render the menu bar items here*/}
              {
              props.menuState === 0 ? (
                <MainMenuItems updateState={props.updateState} />
              ) : props.menuState === 1 ? (
                <AddEventRender updateState={props.updateState} />
              ) : props.menuState === 1.5 ? (
                <ChangeDeleteEvent
                  clickedDate={props.clickedDate}
                  updateState={props.updateState}
                />
              ) : props.menuState === 2 ? (
                <ChangeCategories updateState={props.updateState} />
              ) : null}
            </Stack>
          </ClickAwayListener>
        </Popper>
  )
}

export default RightMenu
