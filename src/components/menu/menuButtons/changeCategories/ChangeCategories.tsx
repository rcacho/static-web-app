import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ThemeProvider,
  Button,
  Box,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import MuiTheme from '@/styles/MuiTheme'
// @ts-ignore
import { FixedSizeList, ListChildComponentProps } from 'react-window'

// placeholder for the list of categories
const EventList = ['aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg', 'hh', 'ii', 'jj']

const ChangeCategories = (props: any) => {
  const [selected, setSelected] = useState(null)

  // render list for the scroll function
  function renderList(props: ListChildComponentProps) {
    const { index, style } = props

    const handleSelect = () => {
      setSelected(index)
    }
    return (
      <ListItem
        style={style}
        key={index}
        component="div"
        disablePadding
        onClick={handleSelect}
      >
        <ListItemButton sx={{ pl: 5, pt: 0 }} selected={selected === index}>
          <ListItemText primary={`Item ${EventList[index]}`} />
        </ListItemButton>
      </ListItem>
    )
  }

  //function to handle Back button
  const handleBackClick = () => {
    props.updateState(0)
  }

  return (
    <ThemeProvider theme={MuiTheme}>
      <List disablePadding={true}>
        <ListItem>
          <ListItemText
            sx={{ color: '#898989', textDecoration: 'underline' }}
            secondary="Change Categories"
          />{' '}
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
          <ListItemText primary="Please select category:" />
        </ListItem>
        <FixedSizeList
          height={350}
          width={360}
          itemSize={38}
          itemCount={EventList.length}
          overscanCount={5}
        >
          {renderList}
        </FixedSizeList>
      </List>
      <List className="bottom-buttons-cat" disablePadding={true}>
        <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            className="menu-button"
            size="small"
            variant="contained"
            color="primary"
          >
            Add New Category
          </Button>
        </ListItem>
        <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            className="menu-button"
            size="small"
            variant="contained"
            color="primary"
          >
            Edit Category
          </Button>
        </ListItem>
        <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            className="menu-button"
            size="small"
            variant="contained"
            color="primary"
          >
            Delete Category
          </Button>
        </ListItem>
        <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            className="menu-button"
            size="small"
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

export default ChangeCategories
