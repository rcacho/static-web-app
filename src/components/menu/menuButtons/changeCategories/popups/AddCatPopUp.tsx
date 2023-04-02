import { Button } from '@mui/material'
import React, { useState } from 'react'
import { APIManager } from '@/utils/APIManager'
import { useAPIContext } from '@/store/APIContext'
import { icons } from '@/interfaces/Icons'
import { Category } from '@/interfaces/Category'
import Popup from '../../changeEvents/Popup'

enum PopupType {
  Success,
  DuplicateName,
  Duplicate
}

const AddCatPopUp = (props: any) => {
  const [open, setOpen] = useState(false)
  const [clicked, setClicked] = useState(false)
  const {
    categories,
    updateCategories,
    updateEvents
  } = useAPIContext()
  const admin_id_1 = 'user' // @TODO
  const [popupType, setPopupType] = useState(PopupType.Success)

  const hasDuplicate = async () => {
    setOpen(true)
    for (const category of categories) {
      if (category.category_name === props.name) {
        setPopupType(PopupType.DuplicateName)
        return true;
      } else if (category.icon === props.icon && category.color === props.color) {
        setPopupType(PopupType.Duplicate)
        return true;
      }
    }
    return false;
  }

  async function addCategory(
    category_name: string,
    admin_id: string,
    icon: keyof typeof icons,
    color: string
  ) {
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
    setClicked(true)
    await updateCategories()
    if (!(await hasDuplicate())) {
      addCategory(props.name, admin_id_1, props.icon, props.color)
    }
  }
  const handleClose = () => {
    setOpen(false)
    props.clickAway()
    props.updateState(0)
    setPopupType(PopupType.Success)
  }

  const AddCategoryButton = () => {
    return (
      <Button
        disabled={clicked}
        className="menu-button"
        size="medium"
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        Add Category
      </Button>
    )
  }

  const renderPopup = () => {
    switch (popupType) {
      case PopupType.Success:
        return (
          <Popup
            open={open}
            onClose={handleClose}
            title={'Category Added'}
            body = {`Category ${props.name} added successfully.`}
          />
        )
      case PopupType.DuplicateName:
        return (
          <Popup
            open={open}
            onClose={handleClose}
            title={'Category Not Added'}
            body = {`The name "${props.name}" is already in use by another category.
            Please try another name.`}
          />
        )
      case PopupType.Duplicate:
        return (
          <Popup
            open={open}
            onClose={handleClose}
            title={'Category Not Added'}
            body = {"Colour and symbol combination already in use. Please try a unique combination."}
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      <AddCategoryButton />
      {renderPopup()}
    </>
  )
}

export default AddCatPopUp
