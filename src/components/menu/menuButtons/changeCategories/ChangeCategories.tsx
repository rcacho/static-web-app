import { List, ListItem, ListItemText, ListItemButton } from '@mui/material'
import React, { useState } from 'react'
import DeleteCategoryButton from '@/components/menu/menuButtons/changeCategories/categoryComponents/DeleteCategoryButton'
import { useAPIContext } from '@/store/APIContext'
import PanelButton from '../PanelButton'
import RightMenuPanel, { Header, RightMenuPanelBottom } from '../RightMenuPanel'

const ChangeCategories = (props: any) => {
  const [selected, setSelected] = useState(null)
  const { categories } = useAPIContext()

  function handleSelected() {
    setSelected(null)
  }

  function renderList() {
    const handleSelect = (index: any) => {
      setSelected(index)
      props.handleCategory(categories[index])
    }

    return categories.map((value, index) => {
      return (
        <ListItem
          key={index}
          component="div"
          disablePadding
          onClick={() => handleSelect(index)}
        >
          <ListItemButton sx={{ pl: 5, pt: 0 }} selected={selected === index}>
            <ListItemText primary={value.category_name} />
          </ListItemButton>
        </ListItem>
      )
    })
  }

  return (
    <>
      <RightMenuPanel
        title={'Edit Categories'}
        handleBackClick={() => props.updateState(0)}
      >
        <Header text="Please select category:" />
        <List
          disablePadding={true}
          style={{
            overflow: 'auto',
            overflowY: 'scroll',
            height: '350px'
          }}
        >
          {renderList()}
        </List>
      </RightMenuPanel>
      <RightMenuPanelBottom handleCancelClick={() => props.clickAway(false)}>
        <PanelButton onClick={() => props.updateState(2.1)}>
          Add New Category
        </PanelButton>
        <PanelButton
          disabled={selected === null}
          onClick={() => props.updateState(2.2)}
        >
          Edit Category
        </PanelButton>
        <DeleteCategoryButton
          selected={selected}
          clickAway={props.clickAway}
          categoryID={
            selected === null ? -1 : categories[selected].category_id ?? -1
          }
          setSelected={handleSelected}
        />
      </RightMenuPanelBottom>
    </>
  )
}

export default ChangeCategories
