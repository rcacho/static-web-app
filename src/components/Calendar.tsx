import React from "react";
import { Box, Stack, Divider } from "@mui/material/";
import Grid2 from "@mui/material/Unstable_Grid2";
import DayMonthView from "@/components/calendarComponents/DayMonthView";

const Calendar = (props) => {
  return (
    <Box
      bgcolor="white"
      color="black"
      flex={1}
      sx={{ height: "calc(100vh - 64px)" }}
      border={1}
    >
      <DayMonthView 
      firstDay = {props.firstDay} 
      daysInMonth = {props.daysInMonth} 
      days = {props.days}
      currentDate = {props.currentDate}/>
      
    </Box>
  );
};

export default Calendar;
