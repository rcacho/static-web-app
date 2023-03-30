import React, { useEffect } from 'react'
import { Box, Button, Stack } from '@mui/material/'
import CategoryList from './legendComponents/CategoryList'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { APIManager } from '@/utils/APIManager'
import { Category } from '@/interfaces/Category'
import { useAPIContext } from '@/store/APIContext'
import { Event } from '@/interfaces/Event'

const Legend = () => {
  const { setEvents, updateCatMap, setCategories, categories, setSelected } =
    useAPIContext()
  const [show, toggleShow] = React.useState(true)
  const [selectedNotSaved, setSelectedNotSaved] =
    React.useState<Category[]>(categories)

  useEffect(() => {
    const getData = async () => {
      const instance = await APIManager.getInstance()
      const data = await instance.getCategory()

      const cat: Category[] = data.result
      console.log(cat)
      setCategories(cat)
      setSelected(cat)
      setSelectedNotSaved(cat)
      updateCatMap(cat)
    }
    getData().catch((err) => {
      console.log(err)
    })

    APIManager.getInstance().then((instance) => {
      instance
        .getEvent()
        .then((data) => {
          const eventResult: Event[] = data.result
          setEvents(eventResult)
        })
        .catch((err) => {
          console.log(`legend, getInstance err: ${err}`)
        })
    })
  }, [])

  return (
    <Box display="flex" bgcolor="white" color="black" textAlign={'center'}>
      <Stack direction="row" spacing={0}>
        {show && (
          <CategoryList
            selectedNotSaved={selectedNotSaved}
            setSelectedNotSaved={setSelectedNotSaved}
          ></CategoryList>
        )}

        <Button
          onClick={() => toggleShow(!show)}
          style={{
            minWidth: '20px',
            minHeight: 'calc(100vh - 64px)',
            borderRadius: 0
          }}
          sx={{
            color: 'black',
            m: 0,
            p: 0
          }}
        >
          {show ? (
            <KeyboardArrowLeftIcon></KeyboardArrowLeftIcon>
          ) : (
            <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
          )}
        </Button>
      </Stack>
    </Box>
  )
}

export default Legend
