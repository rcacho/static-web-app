import { Button } from '@mui/material'
import React from 'react'
import { APIManager } from '@/utils/APIManager'
import { Event } from '@/interfaces/Event'
import { useAPIContext } from '@/store/APIContext'
import Popup, { ButtonPopup, SuccessPopup } from '../Popup'

const DeleteEventPopUp = (props: any) => {
  const [open, setOpen] = React.useState(false)
  const [openConfirm, setOpenConfirm] = React.useState(false)
  const { accountId, eventId, updateEvents, setUpdateCats } = useAPIContext()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleCloseDelete = () => {
    deleteEvent(eventId).then(() => {
      setOpen(false)
      setOpenConfirm(true)
    })
  }

  const handleClose = () => {
    setOpen(false)
    setOpenConfirm(false)
  }

  async function deleteEvent(id: number) {
    let payload: Event = {
      event_id: null,
      event_date: new Date(),
      category_id: 69,
      event_description: null,
      admin_id: accountId.toString()
    }
    APIManager.getInstance()
      .then((instance) => {
        instance.deleteEvent(id, payload)
      })
      .then((data) => {
        updateEvents()
        console.log(data)
      })
      .then(() => {
        setUpdateCats((prev) => !prev)
      })
      .catch((err) => {
        console.log(`DeletePopUp error: ${err}`)
      })
  }

  const EventDeletePopup = () => {
    return (
      <SuccessPopup
        open={openConfirm}
        onClose={handleClose}
        body={'Event successfully deleted!'}
      />
    )
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
          Delete Event
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
          Delete Event
        </Button>
      )
    }
  }

  return (
    <>
      <DeleteButton />
      <EventDeletePopup />
      <ButtonPopup
        open={open}
        onClose={handleClose}
        title={'Delete Event'}
        body={'Are you sure you would like to delete the selected event? This action is permanent.'}
        buttonLabel={'Delete'}
        buttonClick={handleCloseDelete}
      />
    </>
  )
}

export default DeleteEventPopUp
