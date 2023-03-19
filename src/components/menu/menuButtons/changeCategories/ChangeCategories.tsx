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
import React, { useEffect, useState } from 'react'
import MuiTheme from '@/styles/MuiTheme'
// @ts-ignore
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import { APIManager } from '@/utils/APIManager'
import DeleteCategoryPopUp from '@/components/menu/menuButtons/changeCategories/DeleteCategoryPopUp'

// placeholder for the list of categories

let EventList: string[] = []
let CategoryList: any = []
const ChangeCategories = (props: any) => {
  const [selected, setSelected] = useState(null)
  const [events, setEvents] = useState([''])

  useEffect(() => {
    APIManager.getInstance()
      .then((instance) => instance.getCategory())
      .then((data) => {
        EventList = []
        for (let i = 0; i < data.result.length; i++) {
          EventList.push(data.result[i].category_name)
          CategoryList.push(data.result[i])
        }
        setEvents(EventList)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [selected])

  // render list for the scroll function
  function renderList(funcProps: ListChildComponentProps) {
    const { index, style } = funcProps

    const handleSelect = () => {
      setSelected(index)
      props.handleCategory(CategoryList[index])
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
          <ListItemText primary={events[index]} />
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
            onClick={() => {
              props.updateState(2.1)
            }}
          >
            Add New Category
          </Button>
        </ListItem>
        <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
          {selected === null ? (
            <Button
              disabled
              className="menu-button"
              size="small"
              variant="contained"
              color="primary"
            >
              Edit Category
            </Button>
          ) : (
            <Button
              className="menu-button"
              size="small"
              variant="contained"
              color="primary"
              onClick={() => {
                props.updateState(2.2)
              }}
            >
              Edit Category
            </Button>
          )}
        </ListItem>
        <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
          {selected === null ? (
            <Button
              disabled
              className="menu-button"
              size="small"
              variant="contained"
              color="primary"
            >
              Delete Category
            </Button>
          ) : (
            <DeleteCategoryPopUp
              clickAway={props.clickAway}
              catID={CategoryList[selected].category_id}
            >
              Delete Category
            </DeleteCategoryPopUp>
          )}
        </ListItem>
        <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            className="menu-button"
            size="small"
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

export default ChangeCategories
