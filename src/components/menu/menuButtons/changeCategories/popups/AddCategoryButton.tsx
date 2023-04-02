import React, { useState } from 'react'
import { APIManager } from '@/utils/APIManager'
import { useAPIContext } from '@/store/APIContext'
import { icons } from '@/interfaces/Icons'
import { Category } from '@/interfaces/Category'
import { ErrorPopup, SuccessPopup } from '../../Popup'
import ActiveButton from '../../PanelButton'

enum PopupType {
  Success,
  DuplicateName,
  Duplicate
}

interface AddCatProps {
  allSelected: boolean
  name: string
  icon: keyof typeof icons
  color: string
  clickAway: () => void
  updateState: () => void
}

const AddCategoryButton = (props: AddCatProps) => {
  const {
    allSelected, 
    name, 
    icon, 
    color, 
    clickAway, 
    updateState
  } = props

  const [open, setOpen] = useState(false)
  const {
    categories,
    updateCategories,
    updateEvents
  } = useAPIContext()
  const admin_id_1 = 'user' // @TODO
  const [popupType, setPopupType] = useState(PopupType.Success)

  async function addCategory(category_name: string, admin_id: string, icon: keyof typeof icons, color: string) {
    let payload: Category = {
      category_id: null,
      category_name: category_name,
      admin_id: admin_id,
      icon: icon,
      color: color
    }
    const instance = await APIManager.getInstance()
    await instance.addCategory(payload)
    await updateCategories()
    await updateEvents()
  }

  const handleClickOpen = async () => {
    await updateCategories()
    if (!(await hasDuplicate())) {
      addCategory(name, admin_id_1, icon, color)
    }
  }

  const hasDuplicate = async () => {
    setOpen(true)
    for (const category of categories) {
      if (category.category_name === name) {
        setPopupType(PopupType.DuplicateName)
        return true;
      } else if (category.icon === icon && category.color === color) {
        setPopupType(PopupType.Duplicate)
        return true;
      }
    }
    return false;
  }

  const handleClose = () => {
    setOpen(false)
    clickAway()
    updateState(0)
    setPopupType(PopupType.Success)
  }

  const renderPopup = () => {
    switch (popupType) {
      case PopupType.Success:
        return (
          <SuccessPopup
            open={open}
            onClose={handleClose}
            body = {`Category ${name} added successfully.`}
          />
        )
      case PopupType.DuplicateName:
        return (
          <ErrorPopup
            open={open}
            onClose={handleClose}
            body = {`The name "${name}" is already in use by another category.
            Please try another name.`}
          />
        )
      case PopupType.Duplicate:
        return (
          <ErrorPopup
            open={open}
            onClose={handleClose}
            body = {"Colour and symbol combination already in use. Please try a unique combination."}
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      <ActiveButton disabled={!allSelected} onClick={handleClickOpen}>
        Add Category
      </ActiveButton>
      {renderPopup()}
    </>
  )
}

export default AddCategoryButton
