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

import React, { useEffect } from 'react'

import { APIManager } from '@/utils/APIManager'
import { icons } from '@/store/Icons'

const CategoryList = () => {
  const {
    selected,
    categories,
    setCategories,
    handleAll,
    handleNone,
    handleChange
  } = useCalendarContext()

  useEffect(() => {
    const getData = async () => {
      const instance = await APIManager.getInstance()
      const data = await instance.getCategory()
      const cat: Category[] = data.result
      setCategories(cat)
    }
    getData().catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <Box>
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
        style={{ overflow: 'auto' }}
        sx={{ bgcolor: 'background.paper' }}
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
                  checked={selected.includes(item)}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>
                  {/* <Avatar alt={`AE`} src={`placeholder`} /> */}
                  <Icon sx={{ color: item.color }} />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${item.category_name}`} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}

export default CategoryList
