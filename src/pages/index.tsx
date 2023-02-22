import Head from "next/head";
import * as React from "react";
import { Inter } from "@next/font/google";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import TopBar from "@/components/TopBar";
import { Box, Stack, Divider } from "@mui/material/";
import Legend from "@/components/Legend";
import RightBar from "@/components/RightBar";
import Calendar from "@/components/Calendar";

const inter = Inter({ subsets: ["latin"] });

export default function Home(this: any) {
  const [time, setTime] = useState<Date | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    fetch("/api/time")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setTime(new Date(json.time));
      });
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);


  // calendar stuff
  // this has to be here (i think) because two different componenets need these :sob:
  const [currentDate, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date()); // to highlight a selected date

  // to help print things
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
      // but for some reason the months param goes from 1-12 
      // and the getMonth() returns 0-11????
      // so inconsistent >:(
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); 
  }

  return (
    <>
      <Head></Head>
      <main>
        {/* <Stack direction="column" alignItems="stretch"> */}
        <Box height="100vh" display="flex" flexDirection="column">
          <TopBar 
          nextMonth ={getNextMonth} 
          prevMonth = {getPrevMonth} 
          currentDate = {currentDate}
          />

          <Stack
            direction="row"
            className="mainS"
            divider={<Divider orientation="vertical" flexItem />}
            justifyContent="space-between"
            spacing={0.1}
            alignItems="stretch"
          >
            <Legend></Legend>
            <Calendar 
            firstDay = {getFirstDayOfMonth} 
            daysInMonth = {getDaysInMonth} 
            days = {days}
            currentDate = {currentDate}
            />
            <RightBar></RightBar>
          </Stack>
        </Box>
        {/* </Stack> */}
      </main>
    </>
  );
}
