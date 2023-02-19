import React from 'react';
import {Box, Stack, Divider, Item} from '@mui/material/';
import Grid2 from '@mui/material/Unstable_Grid2';


const Calendar = () => {
    return (
        <Box bgcolor = "white" flex={6} p={2}>
            <Grid2 container spacing={5}>
                <Grid2 xs={4} sm={3}>
                    January
                </Grid2>
                <Grid2 xs={4} sm={3}>
                    February
                </Grid2>
                <Grid2 xs={4} sm={3}>
                    March
                </Grid2>
                <Grid2 xs={4} sm={3}>
                    April
                </Grid2>
                <Grid2 xs={4} sm={3}>
                    May
                </Grid2>
                <Grid2 xs={4} sm={3}>
                    June
                </Grid2>
                <Grid2 xs={4} sm={3}>
                    July
                </Grid2>
                <Grid2 xs={4} sm={3}>
                    August
                </Grid2>
                <Grid2 xs={4} sm={3}>
                    September
                </Grid2>
                <Grid2 xs={4} sm={3}>
                    October
                </Grid2>
                <Grid2 xs={4} sm={3}>
                    November
                </Grid2>
                <Grid2 xs={4} sm={3}>
                    December
                </Grid2>
            </Grid2>

            </Box>
    )
};

export default Calendar;