import React, { useState } from 'react';
import {Typography, Button} from "@mui/material";

import {Box, Stack, Divider} from '@mui/material/';
import Grid from '@mui/material/Unstable_Grid2';
import DayMonthView from './DayMonthView';

const DayYearView = (props) => {
    let day: Number = props.firstDay(props.currentDate) - 1;
    
    return (
        <Grid container 
        columns={4} 
        spacing={0} 
        border = {0} 
        alignItems="stretch" 
        sx={{height:'100%'}}>

            {Array.from(Array(12)).map((_, index) => (
            <Grid key={index - day} 
                sx={{height: 'auto'}}
                xs={1} 
                borderRight = {1} 
                borderBottom = {1} 
                display="flex" 
                justifyContent="center" 
                alignItems="center" >

                <DayMonthView 
                firstDay = {props.firstDay} 
                daysInMonth = {props.daysInMonth} 
                days = {props.days}
                currentDate = {props.currentDate}/>

            </Grid>
            ))}

        </Grid>
    )
};

export default DayYearView;