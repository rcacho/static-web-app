import React from "react";
import { Box, Stack, Divider } from "@mui/material/";
import Grid2 from "@mui/material/Unstable_Grid2";
import DayMonthView from "@/components/calendarComponents/DayMonthView";
import DayYearView from "@/components/calendarComponents/DayYearView";

const Calendar = (props) => {
  return (
    <Box
      bgcolor="white"
      color="black"
      flex={1}
      sx={{ height: "calc(100vh - 64px)" }}
      border={1}
    >
      {console.log(props.yearView)}
      {
      props.yearView ? 
      <DayYearView 
      firstDay = {props.firstDay} 
      daysInMonth = {props.daysInMonth} 
      days = {props.days}
      currentDate = {props.currentDate}/> 
      : 
      <DayMonthView 
      firstDay = {props.firstDay} 
      daysInMonth = {props.daysInMonth} 
      days = {props.days}
      currentDate = {props.currentDate}/>
      }
    
      
      
    </Box>
  );
};

export default Calendar;
