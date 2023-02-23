import { AppBar, Button, Typography, styled } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Stack, Toolbar, Badge, Menu, MenuItem } from "@mui/material/";
import Image from "next/image";
import { Container } from "@mui/system";
import AlertButton from "./alert/AlertButton";

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
          <AlertButton/>
          <MenuIcon/>  
        </Stack>
      </StyledTopBar>
    </AppBar>
    // </Box>
  );
}
export default TopBar;
