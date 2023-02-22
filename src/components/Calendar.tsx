import React from "react";
import { Box, Stack, Divider } from "@mui/material/";
import Grid2 from "@mui/material/Unstable_Grid2";
import DayMonthView from "@/components/calendarComponents/DayMonthView";

const Calendar = () => {
  return (
    <Box
      bgcolor="white"
      color="black"
      flex={1}
      sx={{ height: "calc(100vh - 64px)" }}
      border={1}
    >
      <DayMonthView />
      
    </Box>
  );
};

export default Calendar;
