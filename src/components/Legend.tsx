import React from 'react'
import { Box, Button, Stack } from '@mui/material/'
import CategoryList from './legendComponents/CategoryList'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

// desired effects:
// on load have all categories showing
// once you press filter, only your filtered categories show
// if you press filter again, all categories show
const Legend = () => {
  const [show, toggleShow] = React.useState(true)

  return (
    <Box display="flex" bgcolor="white" color="black" textAlign={'center'}>
      <Stack direction="row" spacing={0}>
        {show && <CategoryList></CategoryList>}
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
          {show ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
        </Button>
      </Stack>
    </Box>
  )
}

export default Legend
