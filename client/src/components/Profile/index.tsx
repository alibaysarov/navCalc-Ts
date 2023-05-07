import React from "react";
import { Stack, Badge, IconButton } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useTheme } from "@emotion/react";
const Profile = () => {
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      spacing={3}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <IconButton>
        <Badge badgeContent={4} color="secondary">
          <MailIcon color={"white"} />
        </Badge>
      </IconButton>
      <IconButton>
        <Badge badgeContent={4} color="secondary">
          <NotificationsIcon color={"white"} />
        </Badge>
      </IconButton>

      <AccountCircleIcon />
    </Stack>
  );
};

export default Profile;
