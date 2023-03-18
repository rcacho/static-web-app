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
import { useAccount, useMsal } from '@azure/msal-react'
import axios from 'axios'
import { APIManager } from '@/utils/APIManager'
import { Category } from '@/interfaces/Category'
import { msalInstance } from '@/pages/_app'

// @ts-ignore
const AddNewCategory = (props: any) => {
  const [categoryName, setCategoryName] = useState('')
  const [categorySymbol, setCategorySymbol] = useState('')
  const [categoryColour, setCategoryColour] = useState('')

  const { instance, accounts } = useMsal()
  const account = useAccount(accounts[0])
  const user_id = account?.username
  const admin_id_1 = 'user'

  const handleBackClick = () => {
    props.updateState(2)
  }

  const updateColour = (colour: any) => {
    setCategoryColour(colour)
  }

  const updateSymbol = (symbol: any) => {
    setCategorySymbol(symbol)
  }

  const handleAddCategory = () => {
    addCategory(categoryName, admin_id_1, categorySymbol, categoryColour).then(
      props.clickAway()
    )
  }

  async function addCategory(
    category_name: string,
    admin_id: string,
    icon: string,
    color: string
  ) {
    let payload: Category = {
      category_id: null,
      category_name: category_name,
      admin_id: admin_id_1,
      icon: icon,
      color: color
    }
    APIManager.getInstance()
      .then((instance) => instance.addCategory(payload))
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })

    setCategoryName('')
    setCategoryColour('')
    setCategorySymbol('')
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
      <List className="bottom-buttons" disablePadding={true}>
        <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
          {categoryName === '' ||
          categoryColour === null ||
          categorySymbol === null ? (
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
            <Button
              className="menu-button"
              size="medium"
              variant="contained"
              color="primary"
              onClick={handleAddCategory}
            >
              Add New Category
            </Button>
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
