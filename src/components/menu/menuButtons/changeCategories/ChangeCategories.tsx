import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Button
} from '@mui/material'
import React, { useState } from 'react'
import DeleteCategoryPopUp from '@/components/menu/menuButtons/changeCategories/popups/DeleteCategoryPopUp'
import { useAPIContext } from '@/store/APIContext'
import RightMenuPanel, { RightMenuPanelBottom } from '../RightMenuPanel'

// placeholder for the list of categories

const ChangeCategories = (props: any) => {
  const [selected, setSelected] = useState(null)
  const { categories } = useAPIContext()

  function handleSelected() {
    setSelected(null)
  }

  // render list for the scroll function
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
        title={"Edit Categories"}
        handleBackClick={() => props.updateState(0)}
      >
        <ListItem>
            <ListItemText primary="Please select category:" />
          </ListItem>
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
        <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            className="menu-button"
            size="small"
            variant="contained"
            color="primary"
            onClick={() => {
              props.updateState(2.1)
            }}
          >
            Add New Category
          </Button>
        </ListItem>
        <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
          {selected === null ? (
            <Button
              disabled
              className="menu-button"
              size="small"
              variant="contained"
              color="primary"
            >
              Edit Category
            </Button>
          ) : (
            <Button
              className="menu-button"
              size="small"
              variant="contained"
              color="primary"
              onClick={() => {
                props.updateState(2.2)
              }}
            >
              Edit Category
            </Button>
          )}
        </ListItem>
        <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
          {selected === null ? (
            <Button
              disabled
              className="menu-button"
              size="small"
              variant="contained"
              color="primary"
            >
              Delete Category
            </Button>
          ) : (
            <DeleteCategoryPopUp
              clickAway={props.clickAway}
              catID={categories[selected].category_id}
              setSelected={handleSelected}
            >
              Delete Category
            </DeleteCategoryPopUp>
          )}
        </ListItem>
      </RightMenuPanelBottom>
    </>
  )
}

export default ChangeCategories
