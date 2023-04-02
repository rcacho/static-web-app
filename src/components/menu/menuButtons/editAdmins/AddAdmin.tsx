import React, { useState } from 'react'
import { ListItem, TextField } from '@mui/material'
import RightMenuPanel, { Header, RightMenuPanelBottom } from '../RightMenuPanel'
import PanelButton from '../PanelButton'

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

  return (
    <>
      <RightMenuPanel title={'Add Admin'} handleBackClick={handleBackClick}>
        <Header text="Please enter first name:" />
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
        <Header text="Please enter last name:" />
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
        <Header text="Please enter email:" />
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
      </RightMenuPanel>
      <RightMenuPanelBottom handleCancelClick={handleBackClick}>
        <PanelButton
          disabled={name === '' || lastName === '' || email === ''}
          onClick={() => {}}
        >
          Add Admin
        </PanelButton>
      </RightMenuPanelBottom>
    </>
  )
}

export default AddAdmin
