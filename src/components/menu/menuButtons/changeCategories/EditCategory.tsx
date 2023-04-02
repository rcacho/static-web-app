import {
  ListItem,
  ListItemText,
  TextField,
  Box
} from '@mui/material'
import React, { useState } from 'react'
import ColourPicker from '@/components/menu/menuButtons/changeCategories/ColourPicker'
import SymbolPicker from '@/components/menu/menuButtons/changeCategories/SymbolPicker'
import EditCatPopUp from '@/components/menu/menuButtons/changeCategories/popups/EditCatPopUp'
import RightMenuPanel, { RightMenuPanelBottom } from '../RightMenuPanel'

// @ts-ignore
const EditCategory = (props: any) => {
  const [categoryName, setCategoryName] = useState(props.category.category_name)
  const [categorySymbol, setCategorySymbol] = useState(props.category.icon)
  const [categoryColour, setCategoryColour] = useState(props.category.color)

  const updateColour = (colour: any) => {
    setCategoryColour(colour)
  }

  const updateSymbol = (symbol: any) => {
    setCategorySymbol(symbol)
  }

  return (
    <>
      <RightMenuPanel
        title={"Edit Category"}
        handleBackClick={() => props.updateState(2)}
      >
        <ListItem>
          <ListItemText primary="Please enter category name:" />
        </ListItem>
        <ListItem sx={{ pl: 5, pt: 0 }}>
          <TextField
            multiline={true}
            maxRows={4}
            id="standard-basic"
            label={'Category name'}
            defaultValue={props.category.category_name}
            sx={{ color: '#898989' }}
            variant="standard"
            inputProps={{ maxLength: 50 }}
            onChange={(newVal) => setCategoryName(newVal.target.value)}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Please select category symbol:" />
        </ListItem>
        <Box marginLeft={5}>
          <SymbolPicker
            selectedSymbol={props.category.icon}
            setSymbol={updateSymbol}
          />
        </Box>
        <ListItem>
          <ListItemText primary="Please select category symbol colour:" />
        </ListItem>
        <Box marginLeft={5}>
          <ColourPicker
            selectedColour={props.category.color}
            setColour={updateColour}
          />
        </Box>
      </RightMenuPanel>
      <RightMenuPanelBottom handleCancelClick={props.clickAway}>
      <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
          <EditCatPopUp
            name={categoryName}
            icon={categorySymbol}
            color={categoryColour}
            clickAway={props.clickAway}
            updateState={props.updateState}
            category={props.category}
          >
            Save Changes
          </EditCatPopUp>
        </ListItem>
      </RightMenuPanelBottom>
    </>
  )
}

export default EditCategory
