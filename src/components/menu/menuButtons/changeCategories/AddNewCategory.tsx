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
import React from 'react'
import MuiTheme from '@/styles/MuiTheme'
// @ts-ignore
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import ColourPicker from '@/components/menu/menuButtons/changeCategories/ColourPicker'
import SymbolPicker from '@/components/menu/menuButtons/changeCategories/SymbolPicker'
import { useAccount, useMsal } from '@azure/msal-react'
import axios from 'axios'
import { APIManager } from '@/utils/APIManager'

// @ts-ignore
const AddNewCategory = (props: any) => {
  const { instance, accounts } = useMsal()
  const account = useAccount(accounts[0])
  const handleBackClick = () => {
    props.updateState(2)
  }

  async function addCategory(
    category_name: string,
    admin_id: string,
    icon: string,
    color: string
  ) {
    let payload = {
      category_name: category_name,
      admin_id: admin_id,
      icon: icon,
      color: color
    }
    let res = await axios.post(APIManager, payload)

    console.log(res.data)
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
            inputProps={{ maxLength: 50 }}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Please select category symbol:" />
        </ListItem>
        <Box marginLeft={5}>
          <SymbolPicker />
        </Box>
        <ListItem>
          <ListItemText primary="Please select category symbol colour:" />
        </ListItem>
        <Box marginLeft={5}>
          <ColourPicker />
        </Box>
      </List>
      <List className="bottom-buttons" disablePadding={true}>
        <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            className="menu-button"
            size="medium"
            variant="contained"
            color="primary"
          >
            Add New Category
          </Button>
        </ListItem>
        <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            className="menu-button"
            size="medium"
            variant="contained"
            color="primary"
            onClick={handleBackClick}
          >
            Cancel
          </Button>
        </ListItem>
      </List>
    </ThemeProvider>
  )
}

export default AddNewCategory
