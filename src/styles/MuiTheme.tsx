import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    dm: true
  }
}

const styles = { darkGray: '#4F4F4F', lightGrey: '#4F4F4F', black: 'black' }
const MuiTheme = createTheme({
  typography: {
    allVariants: {
      color: styles.darkGray,
      borderBottom: styles.darkGray
    }
  },

  palette: {
    primary: {
      main: '#4D4D4D'
    },
    secondary: {
      main: '#4D4D4D',
      contrastText: '#fff'
    }
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      dm: 700,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  }
})

export default MuiTheme
