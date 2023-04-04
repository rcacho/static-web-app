import { Category } from '@/interfaces/Category'
import { useAPIContext } from '@/store/APIContext'
import {
  Box,
  Button,
  Checkbox,
  createTheme,
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Switch,
  ThemeProvider,
  Typography
} from '@mui/material'

import React, { useEffect } from 'react'
import { icons } from '@/interfaces/Icons'
import { APIManager } from '@/utils/APIManager'

const SelectButtonTheme = [
  {
    width: '40%',
    color: 'black',
    bgcolor: '#eeeeee',
    m: 1,
    p: 0.5,
    fontSize: '10px'
  },
  { '&:hover': { bgcolor: '#cccccc' } }
]

const toggleTheme = createTheme({
  components: {
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: '38px',
          height: '16px',
          padding: '0px',
          marginLeft: '10px'
        },
        switchBase: {
          color: 'lightgray',
          padding: '1px',
          '&$checked': {
            '& + $track': {
              backgroundColor: '#23bf58'
            }
          }
        },
        thumb: {
          color: 'white',
          width: '16px',
          height: '16px',
          marginTop: '-1px',
          marginLeft: '1px'
        },
        track: {
          borderRadius: '20px',
          backgroundColor: '#ee0979',
          opacity: '1 !important',
          '&:after, &:before': {
            color: 'white',
            fontSize: '10px',
            position: 'absolute',
            top: '2px'
          },
          '&:after': {
            content: "'on'",
            left: '3px'
          },
          '&:before': {
            content: "'off'",
            right: '4px'
          }
        },
        checked: {
          color: '#23bf58 !important',
          transform: 'translateX(26px) !important'
        }
      }
    }
  }
})

//list of categories
const CategoryList = () => {
  const {
    categories,
    setSelected,
    accountId,
    updateCats,
    updateCatMap,
    setCategories,
    selectedNotSaved,
    setSelectedNotSaved,
    updateEvents,
    updateCategories
  } = useAPIContext()
  const [showCheckBox, setShowCheckBox] = React.useState(false)
  const [firstFilter, setFirstFilter] = React.useState(false)

  useEffect(() => {
    const getData = async () => {
      const instance = await APIManager.getInstance()
      const catData = await instance.getCategory()
      const cat: Category[] = catData.result

      setCategories(cat)
      console.log(firstFilter)
      setSelected(cat)
      setSelectedNotSaved(cat)
      updateCatMap(cat)
    }
    getData().catch((err) => {
      console.log(err)
    })
  }, [])

  useEffect(() => {
    updateCategories()
    updateEvents()
    updateCatMap(categories)
    console.log(firstFilter)
    if (firstFilter) {
      console.log(selectedNotSaved)
      applyFilterFromDB()
    }
  }, [updateCats])

  const handleChange = (category: string) => {
    const s: string = category
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
  const applyFilters = async () => {
    let selectedIds: (number | null)[] = []
    selectedNotSaved.map((category: Category) => {
      selectedIds.push(category.category_id)
    })
    console.log(accountId)
    const data = {
      categories: selectedIds
    }
    const api = await APIManager.getInstance()
    await api.setFilter(data)

    setSelected(selectedNotSaved)
  }
  const applyFilterFromDB = async () => {
    const instance = await APIManager.getInstance()
    const selectedData = await instance.getFilter()
    const sel = selectedData.filters
    const ids: (number | null)[] = []
    sel.map((item: { category_id: any }) => {
      ids.push(item.category_id)
    })
    let selectedDB: Category[] = []
    categories.map((category: Category) => {
      if (ids.includes(category.category_id)) {
        selectedDB.push(category)
      }
    })
    setSelected(selectedDB)
    setSelectedNotSaved(selectedDB)
  }

  const checkMark = (sel: Category[], item: Category) => {
    for (let i = 0; i < sel.length; i++) {
      if (sel[i].category_id === item.category_id) {
        return true
      }
    }
    return false
  }

  return (
    <Box>
      {/* <Stack justifyContent="center" alignItems="center" sx={{ m: 0, p: 0 }}> */}
      <Stack justifyContent="start" alignItems="start">
        <ThemeProvider theme={toggleTheme}>
          {' '}
          <FormControlLabel
            sx={{ marginTop: '10px', color: 'darkslategrey' }}
            value="start"
            control={
              <Switch
                onChange={() => {
                  console.log(selectedNotSaved)
                  if (!firstFilter) {
                    applyFilterFromDB()
                    setFirstFilter(true)
                  }
                  setShowCheckBox(!showCheckBox)
                }}
              />
            }
            label={<Typography variant={'body2'}>Toggle Filter</Typography>}
            labelPlacement="start"
          />{' '}
        </ThemeProvider>
      </Stack>
      <Box>
        {showCheckBox ? (
          <Button onClick={handleAll} sx={SelectButtonTheme}>
            Select All
          </Button>
        ) : (
          ''
        )}
        {showCheckBox ? (
          <Button onClick={handleNone} sx={SelectButtonTheme}>
            Select None
          </Button>
        ) : (
          ''
        )}
      </Box>
      {/* </Stack> */}

      <header id="Legend">
        <List
          dense
          style={
            showCheckBox
              ? { overflow: 'auto', maxWidth: '250px' }
              : { overflow: 'auto', maxWidth: '200px' }
          }
          sx={
            showCheckBox
              ? {
                  bgcolor: 'background.paper',
                  height: 'calc(100vh - 225px)',
                  overflowY: 'scroll',
                  minWidth: '280px',
                  maxWidth: '280px'
                }
              : {
                  bgcolor: 'background.paper',
                  height: 'calc(100vh - 125px)',
                  overflowY: 'scroll',
                  minWidth: '280px',
                  maxWidth: '280px'
                }
          }
        >
          {categories.map((item: Category) => {
            const labelId = `checkbox-list-secondary-label-${item.category_name}`
            let Icon = icons[item.icon]
            if (Icon == undefined) {
              Icon = icons['CircleOutlinedIcon']
            }
            return (
              <ListItem
                key={item.category_name}
                secondaryAction={
                  showCheckBox ? (
                    <Checkbox
                      value={item.category_name}
                      edge="end"
                      onChange={() => handleChange(item.category_name)}
                      checked={checkMark(selectedNotSaved, item)}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  ) : (
                    ''
                  )
                }
                disablePadding
              >
                {showCheckBox ? (
                  <ListItemButton
                    onClick={() => handleChange(item.category_name)}
                  >
                    <ListItemIcon>
                      <Icon sx={{ color: item.color }} />
                    </ListItemIcon>
                    <ListItemText
                      sx={{}}
                      id={labelId}
                      primary={`${item.category_name}`}
                    />
                  </ListItemButton>
                ) : (
                  <ListItem onClick={() => handleChange(item.category_name)}>
                    <ListItemIcon>
                      <Icon sx={{ color: item.color }} />
                    </ListItemIcon>
                    <ListItemText
                      sx={{}}
                      id={labelId}
                      primary={`${item.category_name}`}
                    />
                  </ListItem>
                )}
              </ListItem>
            )
          })}
        </List>
      </header>
      {showCheckBox ? (
        <Button
          onClick={applyFilters}
          sx={[
            {
              width: '60%',
              color: 'black',
              bgcolor: '#dddddd',
              m: 3,
              p: 0.5,
              fontSize: '13px'
            },
            { '&:hover': { bgcolor: '#cccccc' } }
          ]}
        >
          Apply Filters
        </Button>
      ) : (
        ''
      )}
    </Box>
  )
}

export default CategoryList
