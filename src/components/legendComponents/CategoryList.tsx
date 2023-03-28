import { Category } from '@/interfaces/Category'
import { useAPIContext } from '@/store/APIContext'
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
import { icons } from '@/interfaces/Icons'

const SelectButtonTheme = [
{
    width: '40%',
    color: 'black',
    bgcolor: '#eeeeee',
    m: 1,
    fontSize: '12px'
  },
  { '&:hover': { bgcolor: '#cccccc' } }
]

const CategoryList = () => {
  const {
    selected,
    categories,
    setCategories,
    setSelected,
  } = useAPIContext()

  const handleChange = (category: { target: { value: any } }) => {
    const s: string = category.target.value
    const list = [...selected]
    const index = list
      .map(function (e: Category) {
        return e.category_name
      })
      .indexOf(s)
    const indexAdd = categories
      .map(function (e: Category) {
        return e.category_name
      })
      .indexOf(s)
    index === -1 ? list.push(categories[indexAdd]) : list.splice(index, 1)
    setSelected(list)
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
        onClick={() => setSelected(categories)}
        sx={SelectButtonTheme}
      >
        Select All
      </Button>
      <Button
        onClick={() => setSelected([])}
        sx={SelectButtonTheme}
      >
        Select None
      </Button>
      <List
        dense
        style={{ overflow: 'auto' }}
        sx={{
          bgcolor: 'background.paper',
          height: 'calc(100vh - 150px)',
          overflowY: 'scroll'
        }}
      >
        {categories.map((item: Category) => {
          const labelId = `checkbox-list-secondary-label-${item.category_name}`
          let Icon = icons[item.icon]
          if (Icon == undefined) {
            Icon = icons['CircleOutlinedIcon']
          }
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
      </List>{' '}
      <Button
        className="menu-button"
        size="medium"
        variant="contained"
        color="primary"
      >
        Apply Changes
      </Button>
    </Box>
  )
}

export default CategoryList
