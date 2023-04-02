import React from 'react'
import PanelButton from '../PanelButton'
import { ButtonPopup } from '../Popup'

const RemoveAdminButton = (props: any) => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <PanelButton disabled={props.selected === null} onClick={handleClickOpen}>
        Remove Admin
      </PanelButton>
      <ButtonPopup
        open={open}
        onClose={handleClose}
        title={'Delete Admin'}
        body={
          'Are you sure you would like to delete the selected administrator? This action is permanent.'
        }
        buttonLabel={'Delete'}
        buttonClick={handleClose} // @TODO
      />
    </>
  )
}

export default RemoveAdminButton
