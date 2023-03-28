import { Category } from '@/interfaces/Category'
import { useCalendarContext } from '@/store/CalendarContext'
import {
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'

import React from 'react'

import { icons } from '@/store/Icons'

const CategoryList = ({
  selectedNotSaved,
  setSelectedNotSaved
}: {
  selectedNotSaved: Category[]
  setSelectedNotSaved: React.Dispatch<React.SetStateAction<Category[]>>
}) => {
  const { categories, setSelected } = useCalendarContext()

  const handleChange = (category: { target: { value: any } }) => {
    const s: string = category.target.value
    const list = [...selectedNotSaved]
    // const index = list
    //   .map(function (e: Category) {
    //     return e.category_name
    //   })
    //   .indexOf(s)
    const index = list.findIndex((e: Category) => {
      e.category_name == s
    })
    const indexAdd = categories
      .map(function (e: Category) {
        return e.category_name
      })
      .indexOf(s)
    index === -1 ? list.push(categories[indexAdd]) : list.splice(index, 1)
    setSelectedNotSaved(list)
  }

  const handleAll = () => {
    setSelectedNotSaved(categories)
    return
  }

  const handleNone = () => {
    setSelectedNotSaved([])
    return
  }

  const applyFilters = () => {
    setSelected(selectedNotSaved)
    return
  }

  return (
    <Box>
      <Button
        onClick={handleAll}
        sx={[
          {
            width: '40%',
            color: 'black',
            bgcolor: '#ffffff',
            m: 1,
            p: 0.5,
            fontSize: '11px',
            borderRadius: 0
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
            bgcolor: '#ffffff',
            m: 1,
            p: 0.5,
            fontSize: '11px',
            borderRadius: 0
          },
          { '&:hover': { bgcolor: '#cccccc' } }
        ]}
      >
        Select None
      </Button>
      <List
        dense
        style={{ overflow: 'auto' }}
        sx={{
          bgcolor: 'background.paper',
          height: 'calc(100vh - 200px)',
          overflowY: 'scroll'
        }}
      >
        {categories.map((item: Category) => {
          const labelId = `checkbox-list-secondary-label-${item.category_name}`
          let Icon = icons[item.icon]
          if (Icon == undefined) {
            Icon = icons['CircleOutlinedIcon']
          }
          // try {
          //   Icon = icons[item.icon]
          // } catch {
          //   Icon = icons['CircleOutlinedIcon']
          // }
          return (
            <ListItem
              key={Math.random()}
              secondaryAction={
                <Checkbox
                  value={item.category_name}
                  edge="end"
                  onChange={handleChange}
                  checked={selectedNotSaved.includes(item)}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>
                  <Icon sx={{ color: item.color }} />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${item.category_name}`} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
      <Button
        onClick={applyFilters}
        sx={[
          {
            width: '60%',
            color: 'black',
            bgcolor: '#dddddd',
            m: 3,
            p: 0.5,
            fontSize: '13px',
            borderRadius: 0
          },
          { '&:hover': { bgcolor: '#cccccc' } }
        ]}
      >
        Apply Filters
      </Button>
    </Box>
  )
}

export default CategoryList
