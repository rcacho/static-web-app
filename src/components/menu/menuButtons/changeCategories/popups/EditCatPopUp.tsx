import { Button } from '@mui/material'
import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { APIManager } from '@/utils/APIManager'
import { useAPIContext } from '@/store/APIContext'
import { icons } from '@/interfaces/Icons'
import { Category } from '@/interfaces/Category'

const EditCatPopUp = (props: any) => {
  const [open, setOpen] = useState(false)
  const [clicked, setClicked] = useState(false)
  const {
    categories,
    setCategories,
    updateCategories,
    setUpdateCats,
    updateEvents
  } = useAPIContext()
  const [popup, setPopup] = useState(100)

  const duplicateCheck = () => {
    APIManager.getInstance()
      .then((instance) => instance.getCategory())
      .then((data) => {
        setCategories(data.result)
      })
      .then(() => {
        let err = 0
        for (let i = 0; i < categories.length; i++) {
          if (categories[i].category_id !== props.category.category_id) {
            if (
              categories[i].category_name.toLowerCase() ===
              props.name.toLowerCase()
            ) {
              console.log('name error')
              err += 1
              setPopup(1)
              setOpen(true)
            } else if (
              categories[i].icon === props.icon &&
              props.color === categories[i].color
            ) {
              console.log('colour and symbol error')
              err += 1
              setPopup(2)
              setOpen(true)
            }
          }
        }
        if (err === 0) {
          setPopup(0)
          setOpen(true)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async function updateCategory(
    category_name: string,
    icon: keyof typeof icons,
    color: string
  ) {
    let payload: Category = {
      category_id: props.category.category_id,
      category_name: category_name,
      icon: icon,
      color: color
    }
    APIManager.getInstance()
      .then((instance) =>
        instance.updateCategory(props.category.category_id, payload)
      )
      .then(() => {
        updateCategories()
        updateEvents()
      })
      .then(() => {
        setUpdateCats((prev) => !prev)
      })
      .then(() => {
        alert('Category updated.')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleCloseError = () => {
    setOpen(false)
    setClicked(!clicked)
    // props.clickAway()
    // props.updateState(0)
    setPopup(100)
  }

  const handleClickOpen = () => {
    setClicked(true)
    duplicateCheck()
  }
  const handleClose = () => {
    setOpen(false)
    props.clickAway()
    props.updateState(0)
    setPopup(100)
  }

  const handleConfirm = () => {
    updateCategory(props.name, props.icon, props.color)
    setOpen(false)
    props.clickAway()
    props.updateState(0)
    setPopup(100)
  }

  function AddCategoryButton() {
    return (
      <Button
        disabled={clicked}
        className="menu-button"
        size="medium"
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        Save Changes
      </Button>
    )
  }

  const Success = () => {
    return (
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
        <DialogTitle id="alert-dialog-title">{'Category Update'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please confirm that you would like to update{' '}
            {<strong>{props.name}</strong>}. Any related events will be updated.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseError} autoFocus>
            Cancel
          </Button>
          <Button onClick={handleConfirm} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  const DuplicateName = () => {
    return (
      <Dialog
        sx={{
          '& .MuiDialog-container': {
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '90vh'
          }
        }}
        open={open}
        onClose={handleCloseError}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Category Not Updated'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`The name ${props.name} is already in use by another category.
            Please try another name.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseError} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  const DuplicateCombo = () => {
    return (
      <Dialog
        sx={{
          '& .MuiDialog-container': {
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '90vh'
          }
        }}
        open={open}
        onClose={handleCloseError}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Category Not Updated'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Colour and symbol combination already in use. Please try a unique
            combination.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseError} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <>
      <AddCategoryButton />
      {popup === 0 ? (
        <Success />
      ) : popup === 1 ? (
        <DuplicateName />
      ) : popup === 2 ? (
        <DuplicateCombo></DuplicateCombo>
      ) : null}
    </>
  )
}

export default EditCatPopUp
