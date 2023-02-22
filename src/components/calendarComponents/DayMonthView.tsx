import React, { useState } from 'react';
import {Typography, Button} from "@mui/material";

import {Box, Stack, Divider} from '@mui/material/';
import Grid from '@mui/material/Unstable_Grid2';

const DayMonthView = () => {
    const [currentDate, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date()); // to highlight a selected date

    // to help print things
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["SUN", "MON", "TUES", "WED", "THUR", "FRI", "SAT"];

    // helper functions/the like state setter whatevers
    function getNextMonth(){
        setDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    }

    function getPrevMonth(){
        setDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    }

    function getFirstDayOfMonth(date: Date) {
        // 0 - 6 for sun - mon
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    }

    function getDaysInMonth(date: Date) {
        // 0 in date param will get the highest date aka days in a month
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); 
    }

    let day: Number = getFirstDayOfMonth(currentDate) - 1;
    return (
        <Grid container 
        columns={7} 
        spacing={0} 
        border = {1} 
        alignItems="stretch" 
        sx={{height:'100%'}}>

            {Array.from(Array(42)).map((_, index) => (
            <Grid key={index} sx={{height:'auto'}}
                xs={1} 
                borderRight = {1} 
                borderBottom = {1} 
                display="flex" 
                justifyContent="center" alignItems="top" >
                <Typography variant="h6">
                {(index < 7 ? days[index] : "")} 
                {(index < 7 ? <br/> : "")}
                
                <Button size = "large" style={{fontSize: '28px', color: 'black'}} >
                {(index - day > 0 && index - day <= getDaysInMonth(currentDate) ? index - day : " ")}
                </Button>
                </Typography>
            </Grid>
            ))}

        </Grid>
    )
};

export default DayMonthView;