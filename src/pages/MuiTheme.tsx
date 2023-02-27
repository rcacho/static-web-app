import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';


const styles = {darkGray: "#4F4F4F", lightGrey: "#4F4F4F", black: "black"}
const MuiTheme = createTheme({
    typography: {
        allVariants: {
            color: styles.darkGray,
            borderBottom: styles.darkGray
        }
    },

    palette: {
        primary: {
            main: '#4D4D4D',
        },
        secondary: {
            main: '#4D4D4D',
            contrastText: '#fff',
        },
    },

});

export default MuiTheme;