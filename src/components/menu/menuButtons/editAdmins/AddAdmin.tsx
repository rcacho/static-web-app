import React, { useState } from 'react'
import { Box } from '@mui/material/'
import {
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography
} from '@mui/material'

const AddAdmin = (props: any) => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  //function to handle Back button
  const handleBackClick = () => {
    props.updateState(3)
    setName('')
    setEmail('')
    setLastName('')
  }

  function AddButton() {
    if (name === '' || lastName === '' || email === '') {
      return (
        <Button
          className="menu-button"
          size="medium"
          variant="contained"
          color="primary"
          disabled
        >
          Add Admin
        </Button>
      )
    } else {
      return (
        <Button
          className="menu-button"
          size="medium"
          variant="contained"
          color="primary"
        >
          Add Admin
        </Button>
      )
    }
  }

  return (
    <>
      <List>
        <ListItem>
          <ListItemText
            sx={{ color: '#898989', textDecoration: 'underline' }}
            secondary="Add Admin"
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
              sx={{
                '&:hover': {
                  cursor: 'pointer'
                }
              }}
              variant="body2"
              color="#898989"
            >
              Back
            </Typography>
          </Box>
        </ListItem>
        <ListItem>
          <ListItemText primary="Please enter first name:" />
        </ListItem>
        <ListItem sx={{ pl: 5, pt: 0 }}>
          <TextField
            required
            multiline={true}
            maxRows={4}
            id="standard-basic"
            label="(Required)"
            sx={{ color: '#898989' }}
            variant="standard"
            inputProps={{ maxLength: 50, inputMode: 'text' }}
            onChange={(newVal) => setName(newVal.target.value)}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Please enter last name:" />
        </ListItem>
        <ListItem sx={{ pl: 5, pt: 0 }}>
          <TextField
            required
            multiline={true}
            maxRows={4}
            id="standard-basic"
            label="(Required)"
            sx={{ color: '#898989' }}
            variant="standard"
            inputProps={{ maxLength: 50, inputMode: 'text' }}
            onChange={(newVal) => setLastName(newVal.target.value)}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Please enter email:" />
        </ListItem>
        <ListItem sx={{ pl: 5, pt: 0 }}>
          <TextField
            required
            multiline={true}
            maxRows={4}
            id="standard-basic"
            label="(Required)"
            sx={{ color: '#898989' }}
            variant="standard"
            inputProps={{ maxLength: 100, inputMode: 'email' }}
            onChange={(newVal) => setEmail(newVal.target.value)}
          />
        </ListItem>
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
          <AddButton />
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
    </>
  )
}

export default AddAdmin
