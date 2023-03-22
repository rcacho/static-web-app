import { Button } from '@mui/material'
import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { APIManager } from '@/utils/APIManager'

const DeleteCategoryPopUp = (props: any) => {
  const [open, setOpen] = useState(false)
  let admin_id = 'user'

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    props.clickAway()
  }

  const handleDelete = () => {
    setOpen(false)
    deleteCategory(props.catID).then(props.clickAway())
    props.setSelected()
  }

  async function deleteCategory(categoryID: number) {
    APIManager.getInstance()
      .then((instance) =>
        instance.deleteCategory(categoryID, { admin_id: admin_id })
      )
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function DeleteButton() {
    return (
      <Button
        className="menu-button"
        size="medium"
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        Delete Category
      </Button>
    )
  }

  return (
    <>
      <DeleteButton />
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
        <DialogTitle id="alert-dialog-title">{'Delete Category'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you would like to delete the selected category? This
            action is permanent.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteCategoryPopUp
