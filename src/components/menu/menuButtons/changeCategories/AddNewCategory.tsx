import { ListItem, TextField, Box } from '@mui/material'
import React, { useState } from 'react'
import ColourPicker from '@/components/menu/menuButtons/changeCategories/categoryComponents/ColourPicker'
import SymbolPicker from '@/components/menu/menuButtons/changeCategories/categoryComponents/SymbolPicker'
import { icons } from '@/interfaces/Icons'
import AddCategoryButton from '@/components/menu/menuButtons/changeCategories/categoryComponents/AddCategoryButton'
import RightMenuPanel, { Header, RightMenuPanelBottom } from '../RightMenuPanel'

const AddNewCategory = (props: any) => {
  const GenericIcon = 'PanoramaFishEyeIcon'
  const [categoryName, setCategoryName] = useState('')
  const [categorySymbol, setCategorySymbol] =
    useState<keyof typeof icons>(GenericIcon)
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

  const allSelected =
    categoryName !== '' &&
    categoryColour !== '' &&
    categorySymbol != GenericIcon

  return (
    <>
      <RightMenuPanel
        title={'Add New Category'}
        handleBackClick={handleBackClick}
      >
        <Header text="Please enter category name:" />
        <ListItem sx={{ pl: 5, pt: 0 }}>
          <NameField setCategoryName={setCategoryName} />
        </ListItem>
        <Header text="Please select category symbol:" />
        <Box marginLeft={5}>
          <SymbolPicker setSymbol={updateSymbol} />
        </Box>
        <Header text="Please select category symbol colour:" />
        <Box marginLeft={5}>
          <ColourPicker setColour={updateColour} />
        </Box>
      </RightMenuPanel>
      <RightMenuPanelBottom handleCancelClick={() => props.clickAway(false)}>
        <AddCategoryButton
          allSelected={allSelected}
          name={categoryName}
          icon={categorySymbol}
          color={categoryColour}
          clickAway={props.clickAway}
          updateState={props.updateState}
        />
      </RightMenuPanelBottom>
    </>
  )
}

const NameField = (props: any) => {
  const { setCategoryName } = props
  return (
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
  )
}

export default AddNewCategory
