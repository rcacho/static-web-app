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
import EditCatPopUp from '@/components/menu/menuButtons/changeCategories/popups/EditCatPopUp'

// @ts-ignore
const EditCategory = (props: any) => {
  const [categoryName, setCategoryName] = useState(props.category.category_name)
  const [categorySymbol, setCategorySymbol] = useState(props.category.icon)
  const [categoryColour, setCategoryColour] = useState(props.category.color)
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
            secondary="Edit Category"
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
        <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            className="menu-button"
            size="medium"
            variant="contained"
            color="primary"
            onClick={() => {
              props.clickAway()
            }}
          >
            Cancel
          </Button>
        </ListItem>
      </List>
    </ThemeProvider>
  )
}

export default EditCategory
