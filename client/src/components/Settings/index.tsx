import React from "react";
import { Box, Stack, IconButton, Paper,Tooltip } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAppDispatch, useAppSelector } from '../../hooks';
import { openFilter, openFligtPlan } from '../../store/slices/ui';
const Settings: React.FC = () => {
  const {anchorEl}=useAppSelector(state=>state.ui)
  const dispatch=useAppDispatch()
  const fplnOpen=Boolean(anchorEl);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(openFligtPlan(e.currentTarget));
  };
  const handleFilterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(openFilter(e.currentTarget));
  };
  return (
    <Paper elevation={0} sx={{ px: "10px", py: "5px", borderRadius: 2 }}>
      <Stack direction={"row"} spacing={2} alignItems={"center"}>
      <Tooltip title={'План полёта'} >
        <IconButton onClick={handleClick} sx={{ width: "24px", height: "24px" }} color="primary">
            <DescriptionIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Tooltip title={'Воздушное пространство'}>
          <IconButton onClick={handleFilterClick} sx={{ width: "24px", height: "24px" }} color="primary">
            <FilterAltIcon color="primary" />
          </IconButton>
      </Tooltip>
        <IconButton sx={{ width: "24px", height: "24px" }} color="primary">
          <SettingsIcon color="primary" />
        </IconButton>
      </Stack>
    </Paper>
  );
};

export default Settings;
