import React from 'react'
import { Box } from '@mui/material/'
import { List, ListItem, ListItemText, Typography } from '@mui/material'
import GroupRemoveIcon from '@mui/icons-material/GroupRemove'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import StateMenuButton from '../../StateMenuButton'

const AddRemoveMain = (props: any) => {
  //function to handle Back button
  const handleBackClick = () => {
    props.updateState(0)
  }

  return (
    <List>
      <ListItem>
        <ListItemText
          sx={{ color: '#898989', textDecoration: 'underline' }}
          secondary="Add / Remove Admin"
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
      <ListItem disablePadding>
        <StateMenuButton
          icon={GroupAddIcon}
          parentProp={props}
          state={3.1}
          text={'Add Admin'}
        />
      </ListItem>
      <ListItem disablePadding>
        <StateMenuButton
          icon={GroupRemoveIcon}
          parentProp={props}
          text={'Remove Admin'}
          state={3.2}
        />
      </ListItem>
    </List>
  )
}

export default AddRemoveMain
