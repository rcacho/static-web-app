import React from 'react'
import { Box, Button, Container, Stack } from '@mui/material/'
import { width } from '@mui/system'
import CategoryList from './legendComponents/CategoryList'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

let testCategories: string[] = []
testCategories[0] = 'Team Building Event'
testCategories[0] = 'Holiday'
testCategories[0] = 'Dinner'

const Legend = () => {
  const [show, toggleShow] = React.useState(true)
  return (
    <Box
      display="flex"
      bgcolor="white"
      color="black"
      textAlign={'center'}
      sx={{ height: 'calc(100vh - 64px)' }}
    >
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
