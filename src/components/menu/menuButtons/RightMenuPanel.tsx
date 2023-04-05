import MuiTheme from '@/styles/MuiTheme'
import { ThemeProvider } from '@emotion/react'
import { List, ListItem, ListItemText, Box, Typography } from '@mui/material'
import PanelButton from './PanelButton'

interface RightMenuBottomProps {
  handleCancelClick: () => void
  children: any
}

export const Header = ({ text }: { text: string }) => {
  return (
    <ListItem>
      <ListItemText primary={text} />
    </ListItem>
  )
}

export const RightMenuPanelBottom = (props: RightMenuBottomProps) => {
  const { handleCancelClick, children } = props

  return (
    <List
      className="bottom-buttons"
      disablePadding={true}
      sx={{
        position: 'absolute',
        margin: 'auto',
        bottom: '0',
        width: '100%',
        height: children.length == 3 ? '26%' : '13%'
      }}
    >
      {children}
      <PanelButton onClick={handleCancelClick}>Cancel</PanelButton>
    </List>
  )
}

interface RightMenuProps {
  title: string
  handleBackClick: () => void
  children: any
}

const RightMenuPanel = (props: RightMenuProps) => {
  const { title, handleBackClick, children } = props

  return (
    <ThemeProvider theme={MuiTheme}>
      <List>
        <ListItem>
          <ListItemText
            sx={{ color: '#898989', textDecoration: 'underline' }}
            secondary={title}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              color: '#898989',
              textDecoration: 'underline',
              fontFamily: 'Roboto'
            }}
          >
            <Typography
              onClick={handleBackClick}
              sx={{
                '&:hover': {
                  cursor: 'pointer'
                }
              }}
              variant="body2"
              color="#898989"
            >
              Back
            </Typography>
          </Box>
        </ListItem>
        {children}
      </List>
    </ThemeProvider>
  )
}

export default RightMenuPanel
