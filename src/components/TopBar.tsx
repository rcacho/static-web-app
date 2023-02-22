import { AppBar, Button, Typography, styled } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Box, Stack, Toolbar, Badge, Menu, MenuItem } from "@mui/material/";
import Image from "next/image";
import { Container } from "@mui/system";
import DayMonthView from "@/components/calendarComponents/DayMonthView";


function TopBar(this: any, props: any) {
  const StyledTopBar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "white",
    color: "#4D4D4D",
  });

  const TopButton = styled(Button)({
    backgroundColor: "skyblue",
    color: "#888",
    margin: 5,
    "&:hover": {
      backgroundColor: "#898989",
    },
    "&:disabled": {
      backgroundColor: "gray",
      color: "white",
    },
  });

  // to display the months (Date only returns numbers 0-11)
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    // <Box bgcolor="white" sx={{ height: 70 }}>
    <AppBar position="sticky">
      <StyledTopBar>
        <Stack sx={{ display: { xs: "block", sm: "none" } }}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
          >
            <Image src="/img/logo.png" alt="logo" width="30" height="24" />
            <Typography variant="h6">Calendar</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" sx={{ display: { xs: "none", sm: "block" } }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={2}
            alignItems="center"
          >
            <Image src="/img/logo.png" alt="logo" width="60" height="48" />
            <Typography variant="h6">Calendar</Typography>
            <Button size="small" color="info" onClick={(e) => props.prevMonth()}>
              &lt;
            </Button>
            <Typography variant="h6">{months[props.currentDate.getMonth()]} {props.currentDate.getFullYear()}</Typography>
            <Button size="small" color="info" onClick={(e) => props.nextMonth()}>
              &gt;
            </Button>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={4}>
          <Badge variant="dot" badgeContent={2} color="error">
            <NotificationsIcon color="action" />
          </Badge>
          <MenuIcon />
        </Stack>
      </StyledTopBar>
    </AppBar>
    // </Box>
  );
}
export default TopBar;
