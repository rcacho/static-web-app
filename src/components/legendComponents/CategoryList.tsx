import { useCalendarContext } from '@/store/CalendarContext'
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText
} from '@mui/material'

import React from 'react'

const CategoryList = () => {
  const { events, selected, handleAll, handleNone, handleChange } =
    useCalendarContext()
  return (
    <Box height="calc(100vh - 64px)">
      <Button
        onClick={handleAll}
        sx={[
          {
            width: '40%',
            color: 'black',
            bgcolor: '#eeeeee',
            m: 1,
            fontSize: '12px'
          },
          { '&:hover': { bgcolor: '#cccccc' } }
        ]}
      >
        Select All
      </Button>
      <Button
        onClick={handleNone}
        sx={[
          {
            width: '40%',
            color: 'black',
            bgcolor: '#eeeeee',
            m: 1,
            fontSize: '12px'
          },
          { '&:hover': { bgcolor: '#cccccc' } }
        ]}
      >
        Select None
      </Button>

      <List
        dense
        style={{ overflow: 'auto', height: 'calc(100vh - 64px - 60px' }}
        sx={{ bgcolor: 'background.paper' }}
      >
        {events.map((item: any) => {
          const labelId = `checkbox-list-secondary-label-${item}`
          return (
            <ListItem
              key={Math.random()}
              secondaryAction={
                <Checkbox
                  value={item}
                  edge="end"
                  onChange={handleChange}
                  checked={selected.includes(item)}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar alt={`AE`} src={`placeholder`} />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`${item}`} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}

export default CategoryList
