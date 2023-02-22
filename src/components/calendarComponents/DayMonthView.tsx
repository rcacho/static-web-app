import React, { useState } from 'react';
import {Box, Stack, Divider} from '@mui/material/';
import Grid from '@mui/material/Unstable_Grid2';

const DayMonthView = () => {
    const [currentDate, setDate] = useState(new Date());

    const months = [    "January",    "February",    "March",    "April",    "May",    "June",    "July",    "August",    "September",    "October",    "November",    "December"  ];
    const days = [    "Sunday",    "Monday",    "Tuesday",    "Wednesday",    "Thursday",    "Friday",    "Saturday"  ];

    function getNextMonth(){
        setDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    }

    function getPrevMonth(){
        setDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    }

    return (
        <Grid container 
        columns={7} 
        spacing={0} 
        border = {1} 
        alignItems="stretch" 
        sx={{height:'95%'}}>
            {Array.from(Array(35)).map((_, index) => (
            <Grid key={index} sx={{height:'auto'}}
                xs={1} 
                border = {1} 
                display="flex" 
                justifyContent="center" alignItems="top" >
                {index + 1}
            </Grid>
            ))}
        </Grid>
    )
};

export default DayMonthView;