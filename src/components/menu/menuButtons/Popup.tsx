import { Button } from '@mui/material'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export enum PopupType {
  Success,
  DuplicateName,
  Duplicate
}

interface PopupProps {
  open: boolean
  onClose: any
  title: string
  body: string
}

interface ButtonPopupProps extends PopupProps {
  buttonLabel: string
  buttonClick: any
}

interface StatusPopupProps {
  open: boolean
  onClose: any
  body: string
}

const popupStyle = {
  '& .MuiDialog-container': {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '90vh'
  }
}

const Popup = (props: PopupProps) => {
  const { open, onClose, title, body } = props
  return (
    <Dialog
      sx={popupStyle}
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>OK</Button>
      </DialogActions>
    </Dialog>
  )
}

export const ButtonlessPopup = (props: PopupProps) => {
  const { open, onClose, title, body } = props
  return (
    <Dialog
      sx={popupStyle}
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {body}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export const ButtonPopup = (props: ButtonPopupProps) => {
  const { open, onClose, title, body, buttonLabel, buttonClick } = props

  return (
    <Dialog
      sx={popupStyle}
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={buttonClick} autoFocus>
          {buttonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export const ErrorPopup = (props: StatusPopupProps) => {
  const { open, onClose, body } = props
  return <Popup open={open} onClose={onClose} title={'Error'} body={body} />
}

export const SuccessPopup = (props: StatusPopupProps) => {
  const { open, onClose, body } = props
  return <Popup open={open} onClose={onClose} title={'Success'} body={body} />
}

export default Popup
