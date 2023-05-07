import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography/Typography";
import { useTheme } from "@emotion/react";
import { Stack, Box } from "@mui/material";
import Settings from "../Settings";
import Profile from "./../Profile";
import FlightPlanModal from "../FlighPlanModal";
const Header = () => {
  const theme = useTheme();
  
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar>
          <Toolbar>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={{ flexGrow: 1 }}
            >
              <Stack spacing={3} direction={"row"} alignItems={"center"}>
                <Typography
                  color={`${theme.palette.common.white}`}
                  variant={"h6"}
                  component={"span"}
                >
                  Hello
                </Typography>
                <Settings />
              </Stack>
              <Profile />
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>
      <FlightPlanModal/>
    </>
  );
};

export default Header;
