import { Button } from '@mui/material'
import React, { useState } from 'react'
import { APIManager } from '@/utils/APIManager'
import { useAPIContext } from '@/store/APIContext'
import { ButtonPopup } from '../../Popup'
import PanelButton from '../../PanelButton'

interface DelButtonProps {
  categoryID: number
  selected: any
  clickAway: any
  setSelected: () => void
}

const DeleteCategoryButton = (props: DelButtonProps) => {
  const { categoryID, selected, clickAway, setSelected } = props
  const [open, setOpen] = useState(false)
  let admin_id = 'user'
  const { updateEvents, updateCategories, setUpdateCats } = useAPIContext()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    clickAway()
  }

  const handleDelete = () => {
    setOpen(false)
    deleteCategory(categoryID).then(clickAway())
    setSelected()
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

  return (
    <>
      <PanelButton disabled={selected === null || categoryID === -1} onClick={handleClickOpen}>
        Delete Category
      </PanelButton>
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

export default DeleteCategoryButton
