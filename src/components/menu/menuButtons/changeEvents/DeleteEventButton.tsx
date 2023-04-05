import React from 'react'
import { APIManager } from '@/utils/APIManager'
import { Event } from '@/interfaces/Event'
import { useAPIContext } from '@/store/APIContext'
import { ButtonPopup } from '../Popup'
import PanelButton from '../PanelButton'

const DeleteEventButton = (props: any) => {
  const [open, setOpen] = React.useState(false)
  const { eventId, updateEvents } = useAPIContext()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleCloseDelete = async () => {
    await deleteEvent(eventId)
    setOpen(false)
    props.clickAway()
    props.updateState(0)
    alert('Event successfully deleted.')
  }

  const handleClose = () => {
    setOpen(false)
  }

  async function deleteEvent(id: number) {
    let payload: Event = {
      event_id: null,
      event_date: new Date(),
      category_id: 69,
      event_description: null
    }
    const instance = await APIManager.getInstance()
    await instance.deleteEvent(id, payload)
    await updateEvents()
  }

  return (
    <>
      <PanelButton disabled={props.selected === null} onClick={handleClickOpen}>
        Delete Event
      </PanelButton>
      <ButtonPopup
        open={open}
        onClose={handleClose}
        title={'Delete Event'}
        body={
          'Are you sure you would like to delete the selected event? This action is permanent.'
        }
        buttonLabel={'Delete'}
        buttonClick={handleCloseDelete}
      />
    </>
  )
}

export default DeleteEventButton
