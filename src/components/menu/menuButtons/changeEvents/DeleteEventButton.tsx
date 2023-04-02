import React from 'react'
import { APIManager } from '@/utils/APIManager'
import { Event } from '@/interfaces/Event'
import { useAPIContext } from '@/store/APIContext'
import { ButtonPopup, SuccessPopup } from '../Popup'
import PanelButton from '../PanelButton'

const DeleteEventButton = (props: any) => {
  const [open, setOpen] = React.useState(false)
  const [openConfirm, setOpenConfirm] = React.useState(false)
  const { accountId, eventId, updateEvents } = useAPIContext()

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
    const instance = await APIManager.getInstance()
    await instance.deleteEvent(id, payload)
    await updateEvents()
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

  return (
    <>
      <PanelButton disabled={props.selected === null} onClick={handleClickOpen}>
        Delete Event
      </PanelButton>
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

export default DeleteEventButton
