import { ListItem, TextField, Box } from '@mui/material'
import React, { useState } from 'react'
import ColourPicker from '@/components/menu/menuButtons/changeCategories/categoryComponents/ColourPicker'
import SymbolPicker from '@/components/menu/menuButtons/changeCategories/categoryComponents/SymbolPicker'
import EditCategoryButton from '@/components/menu/menuButtons/changeCategories/categoryComponents/EditCategoryButton'
import RightMenuPanel, { Header, RightMenuPanelBottom } from '../RightMenuPanel'

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
        title={'Edit Category'}
        handleBackClick={() => props.updateState(2)}
      >
        <Header text="Please enter category name:" />
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
        <Header text="Please select category symbol:" />
        <Box marginLeft={5}>
          <SymbolPicker
            selectedSymbol={props.category.icon}
            setSymbol={updateSymbol}
          />
        </Box>
        <Header text="Please select category symbol colour:" />
        <Box marginLeft={5}>
          <ColourPicker
            selectedColour={props.category.color}
            setColour={updateColour}
          />
        </Box>
      </RightMenuPanel>
      <RightMenuPanelBottom handleCancelClick={props.clickAway}>
        <EditCategoryButton
          name={categoryName}
          icon={categorySymbol}
          color={categoryColour}
          clickAway={props.clickAway}
          updateState={props.updateState}
          selectedCategory={props.category}
        />
      </RightMenuPanelBottom>
    </>
  )
}

export default EditCategory
