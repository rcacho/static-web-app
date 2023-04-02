import {
  ListItem,
  ListItemText,
  TextField,
  Button,
  Box
} from '@mui/material'
import React, { useState } from 'react'
import ColourPicker from '@/components/menu/menuButtons/changeCategories/ColourPicker'
import SymbolPicker from '@/components/menu/menuButtons/changeCategories/SymbolPicker'
import { icons } from '@/interfaces/Icons'
import AddCatPopUp from '@/components/menu/menuButtons/changeCategories/popups/AddCatPopUp'
import RightMenuPanel, { RightMenuPanelBottom } from '../RightMenuPanel'

// @ts-ignore
const AddNewCategory = (props: any) => {
  const GenericIcon = 'PanoramaFishEyeIcon'
  const [categoryName, setCategoryName] = useState('')
  const [categorySymbol, setCategorySymbol] = useState<keyof typeof icons>(GenericIcon)
  const [categoryColour, setCategoryColour] = useState('')

  const handleBackClick = () => {
    props.updateState(2)
  }

  const updateColour = (colour: any) => {
    setCategoryColour(colour)
  }

  const updateSymbol = (symbol: any) => {
    setCategorySymbol(symbol)
  }

  const allSelected = categoryName !== '' && categoryColour !== '' && categorySymbol != GenericIcon

  const renderAddButton = () => {
    return allSelected ?
      <AddCatPopUp
        name={categoryName}
        icon={categorySymbol}
        color={categoryColour}
        clickAway={props.clickAway}
        updateState={props.updateState}
      >
        Add Category
      </AddCatPopUp>
      :
      <Button
        disabled
        className="menu-button"
        size="medium"
        variant="contained"
        color="primary"
      >
        Add New Category
      </Button>
  }

  return (
    <>
      <RightMenuPanel
        title={"Add New Category"}
        handleBackClick={handleBackClick}
      >
        <ListItem>
          <ListItemText primary="Please enter category name:" />
        </ListItem>
        <ListItem sx={{ pl: 5, pt: 0 }}>
          <TextField
            multiline={true}
            maxRows={4}
            id="standard-basic"
            label="(Max 50 chars.)"
            sx={{ color: '#898989' }}
            variant="standard"
            inputProps={{ maxLength: 50, inputMode: 'text' }}
            onChange={(newVal) => setCategoryName(newVal.target.value)}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Please select category symbol:" />
        </ListItem>
        <Box marginLeft={5}>
          <SymbolPicker setSymbol={updateSymbol} />
        </Box>
        <ListItem>
          <ListItemText primary="Please select category symbol colour:" />
        </ListItem>
        <Box marginLeft={5}>
          <ColourPicker setColour={updateColour} />
        </Box>
      </RightMenuPanel>
      <RightMenuPanelBottom handleCancelClick={() => props.clickAway(false)}>
        <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
          {renderAddButton()}
        </ListItem>
      </RightMenuPanelBottom>
    </>
  )
}

export default AddNewCategory
