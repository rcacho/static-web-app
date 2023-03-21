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
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import CloseIcon from '@mui/icons-material/Close'
import HexagonOutlinedIcon from '@mui/icons-material/HexagonOutlined'
import SquareOutlinedIcon from '@mui/icons-material/SquareOutlined'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import SquareIcon from '@mui/icons-material/Square'
import GroupsIcon from '@mui/icons-material/Groups'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import CodeIcon from '@mui/icons-material/Code'
import CropIcon from '@mui/icons-material/Crop'
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined'

import React, { useEffect } from 'react'

import { APIManager } from '@/utils/APIManager'

const CategoryList = () => {
  const {
    selected,
    categories,
    setCategories,
    handleAll,
    handleNone,
    handleChange
  } = useCalendarContext()

  const icons = {
    CircleOutlinedIcon,
    CloseIcon,
    HexagonOutlinedIcon,
    SquareOutlinedIcon,
    KeyboardArrowUpOutlinedIcon,
    StarBorderOutlinedIcon,
    SquareIcon,
    GroupsIcon,
    HorizontalRuleIcon,
    CodeIcon,
    CropIcon,
    CloudOutlinedIcon
  }

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
