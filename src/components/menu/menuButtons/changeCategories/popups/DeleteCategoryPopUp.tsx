import { Button } from '@mui/material'
import React, { useState } from 'react'
import { APIManager } from '@/utils/APIManager'
import { useAPIContext } from '@/store/APIContext'
import { ButtonPopup } from '../../changeEvents/Popup'

const DeleteCategoryPopUp = (props: any) => {
  const [open, setOpen] = useState(false)
  let admin_id = 'user'
  const { updateEvents, updateCategories, setUpdateCats } = useAPIContext()

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
      .then(() => {
        updateEvents()
        updateCategories()
      })
      .then(() => {
        setUpdateCats((prev) => !prev)
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
      <DeleteButton/>
      <ButtonPopup
        open={open}
        onClose={handleClose}
        title={'Delete Category'}
        body={'Are you sure you would like to delete the selected category? This action is permanent.'}
        buttonLabel={'Delete'}
        buttonClick={handleDelete}
      />
    </>
  )
}

export default DeleteCategoryPopUp
