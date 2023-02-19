import Head from 'next/head';
import * as React from 'react';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import TopBar from "@/components/TopBar";
import {Box, Stack, Divider} from '@mui/material/';
import Legend from "@/components/Legend";
import RightBar from "@/components/RightBar";
import Calendar from "@/components/Calendar";

const inter = Inter({ subsets: ['latin'] });

export default function Home(this: any) {
  const [time, setTime] = useState<Date | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    fetch('/api/time')
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setTime(new Date(json.time));
      });
  }, []);

    const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <Head>
      </Head>
      {/*<main className={styles.main}>*/}
          <Stack direction="column" alignItems="stretch">
              <TopBar></TopBar>
              <Stack direction="row" className="mainS"
                     divider={<Divider orientation="vertical" flexItem />}
                     justifyContent="space-between"
                     spacing={2}
                     alignItems="stretch">
                      <Legend></Legend>
                      <Calendar></Calendar>
                      <RightBar></RightBar>
              </Stack>
          </Stack>


      {/*</main>*/}
    </>
  );
}
