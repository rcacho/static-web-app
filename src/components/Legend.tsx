import React from 'react'
import { Box, Button } from '@mui/material/'
import { width } from '@mui/system'
import CategoryList from './legendComponents/CategoryList'

let testCategories: string[] = []
testCategories[0] = 'Team Building Event'
testCategories[0] = 'Holiday'
testCategories[0] = 'Dinner'

const Legend = () => {
  return (
    <Box
      bgcolor="white"
      color="black"
      textAlign={'center'}
      sx={{ width: 200, height: 'calc(100vh - 64px)' }}
    >
      <CategoryList></CategoryList>
    </Box>
  )
}

export default Legend
