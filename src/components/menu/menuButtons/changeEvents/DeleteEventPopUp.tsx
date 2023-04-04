import { Button } from '@mui/material'
import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { APIManager } from '@/utils/APIManager'
import { Event } from '@/interfaces/Event'
import { useAPIContext } from '@/store/APIContext'

const DeleteEventPopUp = (props: any) => {
  const [open, setOpen] = React.useState(false)
  const [openConfirm, setOpenConfirm] = React.useState(false)
  const { eventId, updateEvents, setUpdateCats } = useAPIContext()

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
      event_description: null
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

  function EventDeletePopup() {
    return (
      <>
        <Dialog
          sx={{
            '& .MuiDialog-container': {
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '90vh'
            }
          }}
          open={openConfirm}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Event Deleted'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Event successfully deleted!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>OK</Button>
          </DialogActions>
        </Dialog>
      </>
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
      <Dialog
        sx={{
          '& .MuiDialog-container': {
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '90vh'
          }
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Delete Event'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you would like to delete the selected event? This
            action is permanent.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCloseDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteEventPopUp
