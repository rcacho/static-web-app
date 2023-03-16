import { Category } from '@/interfaces/Category'
import { useCalendarContext } from '@/store/CalendarContext'
import {
  Avatar,
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

import axios from 'axios'
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

  // useEffect(() => {
  //   APIManager.getInstance()
  //     .then((instance: any) => instance.getCategory())
  //     .then((data) => {
  //       let records = JSON.parse(data)
  //       let categories: Category[] = records.recordset
  //       console.log(categories)
  //     })
  //     .catch((err) => {
  //       // console.log(err)
  //     })
  // }, [])

  // const getCategories = () => {
  //   APIManager.getInstance()
  //     .then((instance: any) => instance.getCategory())
  //     .then((data) => {
  //       categories = data
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  // useEffect(() => {
  //   APIManager.getInstance()
  //     .then((instance: any) => instance.getCategory())
  //     .then((data) => {
  //       categories = data
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // })
  // const [categories, setCategories] = React.useState<Category[]>([])
  // useEffect(() => {
  //   const getData = async () => {
  //     const instance = await APIManager.getInstance()
  //     const data = await instance.getCategory()
  //     const cat: Category[] = data.result
  //     console.log(cat)
  //     setCategories(cat)
  //     // console.log(categories)
  //   }
  //   getData().catch((err) => {
  //     console.log(err)
  //   })
  // }, [])

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
          const Icon = icons[item.icon]
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
