import React from "react";
import { Box, Stack, IconButton, Paper } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SettingsIcon from "@mui/icons-material/Settings";
const Settings: React.FC = () => {
  return (
    <Paper elevation={0} sx={{ px: "10px", py: "5px", borderRadius: 2 }}>
      <Stack direction={"row"} spacing={2} alignItems={"center"}>
        <IconButton sx={{ width: "24px", height: "24px" }} color="primary">
          <DescriptionIcon color="primary" />
        </IconButton>
        <IconButton sx={{ width: "24px", height: "24px" }} color="primary">
          <FilterAltIcon color="primary" />
        </IconButton>
        <IconButton sx={{ width: "24px", height: "24px" }} color="primary">
          <SettingsIcon color="primary" />
        </IconButton>
      </Stack>
    </Paper>
  );
};

export default Settings;
