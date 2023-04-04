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
  const { updateEvents, updateCategories, accountId } = useAPIContext()
  const adminId = accountId.toString()

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
    const instance = await APIManager.getInstance()
    await instance.deleteCategory(categoryID, { admin_id: adminId })
    await updateEvents()
    await updateCategories()
  }

  return (
    <>
      <PanelButton
        disabled={selected === null || categoryID === -1}
        onClick={handleClickOpen}
      >
        Delete Category
      </PanelButton>
      <ButtonPopup
        open={open}
        onClose={handleClose}
        title={'Delete Category'}
        body={`Are you sure you would like to delete the selected category?
           All related events will also be deleted. This action is permanent.`}
        buttonLabel={'Delete'}
        buttonClick={handleDelete}
      />
    </>
  )
}

export default DeleteCategoryButton
