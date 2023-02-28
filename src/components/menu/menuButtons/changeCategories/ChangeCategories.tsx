import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ThemeProvider,
  Button
} from '@mui/material'
import React, { useState } from 'react'
import MuiTheme from '@/styles/MuiTheme'
// @ts-ignore
import { FixedSizeList, ListChildComponentProps } from 'react-window'

// placeholder for the list of categories
const EventList = ['aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg', 'hh', 'ii', 'jj']

const ChangeCategories = () => {
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

  return (
    <ThemeProvider theme={MuiTheme}>
      <List disablePadding={true}>
        <ListItem>
          <ListItemText
            sx={{ color: '#898989', textDecoration: 'underline' }}
            secondary="Change Categories"
          />
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
          >
            Cancel
          </Button>
        </ListItem>
      </List>
    </ThemeProvider>
  )
}

export default ChangeCategories
