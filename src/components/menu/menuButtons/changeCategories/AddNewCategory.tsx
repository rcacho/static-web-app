import {
  List,
  ListItem,
  ListItemText,
  ThemeProvider,
  TextField,
  Button,
  Typography,
  Box
} from '@mui/material'
import React, { useState } from 'react'
import MuiTheme from '@/styles/MuiTheme'
// @ts-ignore
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import ColourPicker from '@/components/menu/menuButtons/changeCategories/ColourPicker'
import SymbolPicker from '@/components/menu/menuButtons/changeCategories/SymbolPicker'
import { icons } from '@/interfaces/Icons'
import AddCatPopUp from '@/components/menu/menuButtons/changeCategories/popups/AddCatPopUp'

// @ts-ignore
const AddNewCategory = (props: any) => {
  const [categoryName, setCategoryName] = useState('')
  const [categorySymbol, setCategorySymbol] = useState<keyof typeof icons>(
    'PanoramaFishEyeIcon'
  )
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

  return (
    <ThemeProvider theme={MuiTheme}>
      <List>
        <ListItem>
          <ListItemText
            sx={{ color: '#898989', textDecoration: 'underline' }}
            secondary="Add New Category"
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              color: '#898989',
              textDecoration: 'underline',
              fontFamily: 'Roboto'
            }}
          >
            <Typography
              onClick={handleBackClick}
              variant="body2"
              color="#898989"
              sx={{
                '&:hover': {
                  cursor: 'pointer'
                }
              }}
            >
              Back
            </Typography>
          </Box>
        </ListItem>
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
      </List>
      <List
        className="bottom-buttons"
        disablePadding={true}
        sx={{
          position: 'absolute',
          margin: 'auto',
          bottom: '0',
          width: '100%',
          height: '13%'
        }}
      >
        <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
          {categoryName === '' ||
          categoryColour === '' ||
          categorySymbol === 'PanoramaFishEyeIcon' ? (
            <Button
              disabled
              className="menu-button"
              size="medium"
              variant="contained"
              color="primary"
            >
              Add New Category
            </Button>
          ) : (
            <AddCatPopUp
              name={categoryName}
              icon={categorySymbol}
              color={categoryColour}
              clickAway={props.clickAway}
              updateState={props.updateState}
            >
              Add Category
            </AddCatPopUp>
          )}
        </ListItem>
        <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            className="menu-button"
            size="medium"
            variant="contained"
            color="primary"
            onClick={() => props.clickAway(false)}
          >
            Cancel
          </Button>
        </ListItem>
      </List>
    </ThemeProvider>
  )
}

export default AddNewCategory
