import React, { useState } from 'react'
import { APIManager } from '@/utils/APIManager'
import { useAPIContext } from '@/store/APIContext'
import { icons } from '@/interfaces/Icons'
import { Category } from '@/interfaces/Category'
import { PopupType } from '../../Popup'
import ActiveButton from '../../PanelButton'
import CategoryPopup from './popups/CategoryPopups'

interface AddCatProps {
  allSelected: boolean
  name: string
  icon: keyof typeof icons
  color: string
  clickAway: () => void
  updateState: (state: number) => void
}

const AddCategoryButton = (props: AddCatProps) => {
  const { allSelected, name, icon, color, clickAway, updateState } = props

  const [open, setOpen] = useState(false)
  const { categories, updateCategories, updateEvents } = useAPIContext()
  const [popupType, setPopupType] = useState(PopupType.Success)

  async function addCategory(
    category_name: string,
    icon: keyof typeof icons,
    color: string
  ) {
    let payload: Category = {
      category_id: null,
      category_name: category_name,
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
      addCategory(name, icon, color)
    }
  }

  const hasDuplicate = async () => {
    setOpen(true)
    for (const category of categories) {
      if (category.category_name === name) {
        setPopupType(PopupType.DuplicateName)
        return true
      } else if (category.icon === icon && category.color === color) {
        setPopupType(PopupType.Duplicate)
        return true
      }
    }
    return false
  }

  const handleClose = () => {
    setOpen(false)
    clickAway()
    updateState(0)
    setPopupType(PopupType.Success)
  }

  return (
    <>
      <ActiveButton disabled={!allSelected} onClick={handleClickOpen}>
        Add Category
      </ActiveButton>
      <CategoryPopup
        name={name}
        popupType={popupType}
        action={'added'}
        open={open}
        onClose={handleClose}
      />
    </>
  )
}

export default AddCategoryButton
