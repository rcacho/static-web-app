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

import React from 'react'
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

const CategoryList = ({
  selectedNotSaved,
  setSelectedNotSaved
}: {
  selectedNotSaved: Category[]
  setSelectedNotSaved: React.Dispatch<React.SetStateAction<Category[]>>
}) => {
  const { categories, setSelected } = useAPIContext()

  const handleChange = (category: { target: { value: any } }) => {
    const s: string = category.target.value
    const list = [...selectedNotSaved]
    const index = list
      .map(function (e: Category) {
        return e.category_name
      })
      .indexOf(s)
    // const index = list.findIndex((e: Category) => {
    //   e.category_name == s
    // })
    const indexAdd = categories
      .map(function (e: Category) {
        return e.category_name
      })
      .indexOf(s)
    index === -1 ? list.push(categories[indexAdd]) : list.splice(index, 1)
    setSelectedNotSaved(list)
  }

  const handleAll = () => setSelectedNotSaved(categories)
  const handleNone = () => setSelectedNotSaved([])
  const applyFilters = () => setSelected(selectedNotSaved)

  return (
    <Box maxWidth={'300px'}>
      <Button onClick={handleAll} sx={SelectButtonTheme}>
        Select All
      </Button>
      <Button onClick={handleNone} sx={SelectButtonTheme}>
        Select None
      </Button>
      <header id="Legend">
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
                  <ListItemText
                    id={labelId}
                    primary={`${item.category_name}`}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </header>
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
