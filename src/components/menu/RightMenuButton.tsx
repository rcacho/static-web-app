import React, { useEffect, useRef, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import RightMenu from './RightMenu'
import { Backdrop } from '@mui/material'
import { useCalendarContext } from '@/store/CalendarContext'
import { Button } from '@mui/material/'

const RightMenuButton = () => {
  const { dayClickCount } = useCalendarContext()

  const [panelAnchor, setPanelAnchor] = useState<null | HTMLElement | any>(null)
  const [menuState, setMenuState] = useState(0)
  const [backDrop, setBackDrop] = useState(false)
  const ref = useRef(null)

  function updateState(state: any) {
    setMenuState(state)
  }

  const handleClose = () => {
    setPanelAnchor(null)
    updateState(0)
    setBackDrop(false)
  }

  const handleOpen = () => {
    setPanelAnchor(ref.current)
    updateState(0)
    setBackDrop(true)
  }

  useEffect(() => {
    if (dayClickCount > 0) {
      setPanelAnchor(ref.current)
      updateState(1.5)
      setBackDrop(true)
    }
  }, [dayClickCount])

  return (
    <div>
      <Button sx={{ minWidth: '30px', maxWidth: '30px' }}>
        <MenuIcon onClick={handleOpen} color="action" ref={ref} />
      </Button>
      <RightMenu
        panelAnchor={panelAnchor}
        onClickAway={handleClose}
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
        onClick={handleClose}
      >
        {''}
      </Backdrop>
    </div>
  )
}

export default RightMenuButton
