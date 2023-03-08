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
import { width } from '@mui/system'
import React from 'react'

const CategoryList = () => {
  const examples: string[] = [
    'AE Business Meeting',
    'Holiday',
    'Quarter End',
    'Casual Day',
    'AE Business Meeting'
  ]

  // const examples = selectedEvents

  const [selected, setSelected] = React.useState<string[]>([])
  const isAllSelected =
    examples.length > 0 && selected.length === examples.length

  const handleChange = (event: { target: { value: any } }) => {
    const value = event.target.value
    console.log(`hello ${value}`)
    if (value === 'all') {
      setSelected(examples)
      return
    }
    if (value === 'none') {
      console.log('in all')
      setSelected([])
      return
    }
    const s: string = value
    const list = [...selected]
    const index = list.indexOf(s)
    index === -1 ? list.push(value) : list.splice(index, 1)
    setSelected(list)
  }

  const handleAll = () => {
    setSelected(examples)
    return
  }

  const handleNone = () => {
    setSelected([])
    return
  }

  return (
    <Box height="calc(100vh - 64px)">
      <List
        dense
        style={{ maxHeight: '60vh', overflow: 'auto' }}
        sx={{ bgcolor: 'background.paper' }}
      >
        {examples.map((item) => {
          const labelId = `checkbox-list-secondary-label-${item}`
          return (
            <ListItem
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
      <Box height="20%">
        <Button
          // value={'all'}
          onClick={handleAll}
          sx={[
            { width: '90%', color: 'black', bgcolor: '#eeeeee', m: 1, mt: 2 },
            { '&:hover': { bgcolor: '#cccccc' } }
          ]}
        >
          Select All
        </Button>
        <Button
          // value={'none'}
          onClick={handleNone}
          sx={[
            {
              width: '90%',
              color: 'black',
              bgcolor: '#eeeeee',
              m: 1
            },
            { '&:hover': { bgcolor: '#cccccc' } }
          ]}
        >
          Select None
        </Button>
      </Box>
    </Box>
  )
}

export default CategoryList
