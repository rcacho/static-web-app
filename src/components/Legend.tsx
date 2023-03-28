import React, { useEffect } from 'react'
import { Box, Button, Stack } from '@mui/material/'
import CategoryList from './legendComponents/CategoryList'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { APIManager } from '@/utils/APIManager'
import { Category } from '@/interfaces/Category'
import { useCalendarContext } from '@/store/CalendarContext'
import { Event } from '@/interfaces/Event'

const Legend = () => {
  const { setCategories, setEvents, updateCatMap } = useCalendarContext()
  const [show, toggleShow] = React.useState(true)

  useEffect(() => {
    const getData = async () => {
      const instance = await APIManager.getInstance()
      const data = await instance.getCategory()

      const cat: Category[] = data.result
      console.log(cat)
      setCategories(cat)
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
          console.log(eventResult)
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
        {show && <CategoryList></CategoryList>}

        <Button
          onClick={() => toggleShow(!show)}
          style={{
            minWidth: '30px',
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
