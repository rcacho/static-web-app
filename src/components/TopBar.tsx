import { AppBar, Button, Typography, styled } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Box, Stack, Toolbar, Badge, Menu, MenuItem } from "@mui/material/";
import Image from "next/image";
import { Container } from "@mui/system";
import RightMenuButton from "./menu/RightMenuBotton";

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
          </Stack>
        </Stack>

        <Stack direction="row" spacing={4}>
          <Badge variant="dot" badgeContent={2} color="error">
            <NotificationsIcon color="action" />
          </Badge>
          <RightMenuButton/>
        </Stack>
      </StyledTopBar>
    </AppBar>
    // </Box>
  );
}
export default TopBar;
