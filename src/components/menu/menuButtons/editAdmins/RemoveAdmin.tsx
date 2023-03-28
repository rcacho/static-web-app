import React, { useState } from 'react'
import { Box } from '@mui/material/'
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material'
// @ts-ignore
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import RemovePopUp from '@/components/menu/menuButtons/editAdmins/RemovePopUp'

const RemoveAdmin = (props: any) => {
  const [selected, setSelected] = useState(null)
  const FakeAdminList = [
    'aa',
    'bb',
    'cc',
    'dd',
    'ee',
    'ff',
    'gg',
    'hh',
    'ii',
    'jj'
  ]
  //function to handle Back button
  const handleBackClick = () => {
    props.updateState(3)
    setSelected(null)
  }

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
          <ListItemText primary={`Admin ${FakeAdminList[index]}`} />
        </ListItemButton>
      </ListItem>
    )
  }

  return (
    <>
      <List>
        <ListItem>
          <ListItemText
            sx={{ color: '#898989', textDecoration: 'underline' }}
            secondary="Remove Admin"
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
          <ListItemText primary="Please select admin to remove:" />
        </ListItem>

        <FixedSizeList
          height={200}
          width={360}
          itemSize={38}
          itemCount={FakeAdminList.length}
          overscanCount={5}
        >
          {renderList}
        </FixedSizeList>
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
          <RemovePopUp selected={selected} />
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

export default RemoveAdmin
