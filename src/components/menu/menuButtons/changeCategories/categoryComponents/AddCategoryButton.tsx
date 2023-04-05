import React from 'react'
import { APIManager } from '@/utils/APIManager'
import { useAPIContext } from '@/store/APIContext'
import { icons } from '@/interfaces/Icons'
import { Category } from '@/interfaces/Category'
import { PopupType } from '../../Popup'
import ActiveButton from '../../PanelButton'
import showPopup from './popups/CategoryPopups'

interface AddCatProps {
  allSelected: boolean
  name: string
  icon: keyof typeof icons
  color: string
  clickAway: () => void
  updateState: (state: number) => void
}

const AddCategoryButton = (props: AddCatProps) => {
  const { allSelected, name, icon, color } = props
  const { categories, updateCategories, updateEvents } = useAPIContext()

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
      showPopup(PopupType.Success, name, 'added')
    }
  }

  const hasDuplicate = async () => {
    for (const category of categories) {
      if (category.category_name === name) {
        showPopup(PopupType.DuplicateName, name, 'added')
        return true
      } else if (category.icon === icon && category.color === color) {
        showPopup(PopupType.Duplicate, name, 'added')
        return true
      }
    }
    return false
  }

  return (
    <>
      <ActiveButton disabled={!allSelected} onClick={handleClickOpen}>
        Add Category
      </ActiveButton>
    </>
  )
}

export default AddCategoryButton
