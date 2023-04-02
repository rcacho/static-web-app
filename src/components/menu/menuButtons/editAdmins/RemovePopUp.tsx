import { Button } from '@mui/material'
import React from 'react'
import { ButtonPopup } from '../changeEvents/Popup'

const RemovePopUp = (props: any) => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  function DeleteButton() {
    if (props.selected === null) {
      return (
        <Button
          className="menu-button"
          size="medium"
          variant="contained"
          color="primary"
          disabled
        >
          Remove Admin
        </Button>
      )
    } else {
      return (
        <Button
          className="menu-button"
          size="medium"
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
        >
          Remove Admin
        </Button>
      )
    }
  }

  return (
    <>
      <DeleteButton />
      <ButtonPopup
        open={open}
        onClose={handleClose}
        title={'Delete Admin'}
        body={'Are you sure you would like to delete the selected administrator? This action is permanent.'}
        buttonLabel={'Delete'}
        buttonClick={handleClose} // @TODO
      />
    </>
  )
}

export default RemovePopUp
