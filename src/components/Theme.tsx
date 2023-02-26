import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

const Theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
      light: 'skyblue',
    },
    secondary: {
      main: green[500],
    },
  },
});

export default Theme;
