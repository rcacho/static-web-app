import React, { useState } from 'react'
import { APIManager } from '@/utils/APIManager'
import { useAPIContext } from '@/store/APIContext'
import { icons } from '@/interfaces/Icons'
import { Category } from '@/interfaces/Category'
import { PopupType } from '../../Popup'
import PanelButton from '../../PanelButton'
import CategoryPopup from './popups/CategoryPopups'

interface EditCatProps {
  name: string
  color: string
  icon: keyof typeof icons
  clickAway: () => void
  updateState: any
  selectedCategory: any
}

const EditCategoryButton = (props: EditCatProps) => {
  const { name, icon, color, clickAway, updateState, selectedCategory } = props

  const [open, setOpen] = useState(false)
  const [clicked, setClicked] = useState(false)
  const { categories, setCategories, updateCategories } = useAPIContext()
  const [popupType, setPopupType] = useState(PopupType.Success)

  const hasDuplicate = async () => {
    const instance = await APIManager.getInstance()
    const data = await instance.getCategory()
    setCategories(data.result)
    for (const category of categories) {
      if (category.category_id !== selectedCategory.category_id) {
        if (category.category_name === name) {
          setPopupType(PopupType.DuplicateName)
          return true
        } else if (category.icon === icon && category.color == color) {
          setPopupType(PopupType.Duplicate)
          return true
        }
      }
    }
    return false
  }

  async function updateCategory(
    category_name: string,
    icon: keyof typeof icons,
    color: string
  ) {
    let payload: Category = {
      category_id: selectedCategory.category_id,
      category_name: category_name,
      icon: icon,
      color: color
    }
    const instance = await APIManager.getInstance()
    await instance.updateCategory(selectedCategory.category_id, payload)
    await updateCategories()
  }

  const handleClickOpen = async () => {
    setClicked(true)
    if (!(await hasDuplicate())) {
      updateCategory(name, icon, color)
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    clickAway()
    updateState(0)
    setPopupType(PopupType.Success)
  }

  return (
    <>
      <PanelButton disabled={clicked} onClick={handleClickOpen}>
        Save Changes
      </PanelButton>
      <CategoryPopup
        name={name}
        popupType={popupType}
        action={'updated'}
        open={open}
        onClose={handleClose}
      />
    </>
  )
}

export default EditCategoryButton
