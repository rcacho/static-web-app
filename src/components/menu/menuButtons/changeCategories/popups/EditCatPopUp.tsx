import { Button } from '@mui/material'
import React, { useState } from 'react'
import { APIManager } from '@/utils/APIManager'
import { useAPIContext } from '@/store/APIContext'
import { icons } from '@/interfaces/Icons'
import { Category } from '@/interfaces/Category'
import Popup, { ErrorPopup, SuccessPopup } from '../../Popup'

const EditCatPopUp = (props: any) => {
  const [open, setOpen] = useState(false)
  const [clicked, setClicked] = useState(false)
  const { categories, setCategories, updateCategories, setUpdateCats } =
    useAPIContext()
  const admin_id_1 = 'user'
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
            if (categories[i].category_name === props.name) {
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
          updateCategory(props.name, admin_id_1, props.icon, props.color)
          setPopup(0)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async function updateCategory(
    category_name: string,
    admin_id: string,
    icon: keyof typeof icons,
    color: string
  ) {
    let payload: Category = {
      category_id: props.category.category_id,
      category_name: category_name,
      admin_id: admin_id,
      icon: icon,
      color: color
    }
    APIManager.getInstance()
      .then((instance) =>
        instance.updateCategory(props.category.category_id, payload)
      )
      .then(() => {
        updateCategories()
      })
      .then(() => {
        setUpdateCats((prev) => !prev)
      })
      .then(() => {
        setOpen(true)
      })
      .catch((err) => {
        console.log(err)
      })
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
      <SuccessPopup
        open={open}
        onClose={handleClose}
        body={'Category updated successfully.'}
      />
    )
  }

  const DuplicateName = () => {
    return (
      <ErrorPopup
        open={open}
        onClose={handleClose}
        body={`The name "${props.name}" is already in use by another category. Please try another name.`}
      />
    )
  }

  const DuplicateCombo = () => {
    return (
      <ErrorPopup
        open={open}
        onClose={handleClose}
        body={'Colour and symbol combination already in use. Please try a unique combination.'}
      />
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
