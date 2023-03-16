import { ClickAwayListener, Popper, Stack } from '@mui/material'
import React from 'react'
import MainMenuItems from '@/components/menu/MainMenuItems'
import AddEventRender from './menuButtons/changeEvents/AddEventRender'
import ChangeCategories from '@/components/menu/menuButtons/changeCategories/ChangeCategories'
import ChangeDeleteEvent from '@/components/menu/menuButtons/changeEvents/ChangeDeleteEvent'
import EditEvent from '@/components/menu/menuButtons/changeEvents/EditEvent'
import AddRemoveMain from '@/components/menu/menuButtons/editAdmins/AddRemoveMain'
import AddAdmin from '@/components/menu/menuButtons/editAdmins/AddAdmin'
import RemoveAdmin from '@/components/menu/menuButtons/editAdmins/RemoveAdmin'
import AddNewCategory from '@/components/menu/menuButtons/changeCategories/AddNewCategory'
import EditCategory from '@/components/menu/menuButtons/changeCategories/EditCategory'

const RightMenu = (props: any) => {
  // menu state to select which menu to show
  // 0 is initial menu
  // 1 is add event
  // 1.5 is change event
  // 1.6 is edit event
  // 2 is change categories

  const alertPanelStyle = {
    bgcolor: 'white',
    color: 'black',
    marginTop: '20px',
    paddingTop: '10px',
    height: 'calc(100vh - 64px)',
    width: 300,
    boxShadow: '0 0 5px #ccc',
    overflow: 'hidden'
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
          name: 'offset',
          options: {
            offset: [-114]
          }
        }
      ]}
    >
      <ClickAwayListener onClickAway={handleClickAway}>
        <Stack style={alertPanelStyle}>
          {/*Render the menu bar items here*/}
          {props.menuState === 0 ? (
            <MainMenuItems updateState={props.updateState} />
          ) : props.menuState === 1 ? (
            <AddEventRender updateState={props.updateState} />
          ) : props.menuState === 1.5 ? (
            <ChangeDeleteEvent updateState={props.updateState} />
          ) : props.menuState === 1.6 ? (
            <EditEvent updateState={props.updateState} />
          ) : props.menuState === 2 ? (
            <ChangeCategories updateState={props.updateState} />
          ) : props.menuState === 2.1 ? (
            <AddNewCategory updateState={props.updateState} />
          ) : props.menuState === 2.2 ? (
            <EditCategory updateState={props.updateState} />
          ) : props.menuState === 3 ? (
            <AddRemoveMain updateState={props.updateState} />
          ) : props.menuState === 3.1 ? (
            <AddAdmin updateState={props.updateState} />
          ) : props.menuState === 3.2 ? (
            <RemoveAdmin updateState={props.updateState} />
          ) : null}
        </Stack>
      </ClickAwayListener>
    </Popper>
  )
}

export default RightMenu
