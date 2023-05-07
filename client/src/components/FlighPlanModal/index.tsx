import { Box, Menu, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeFligtPlan } from '../../store/slices/ui';
import { IconButton } from '@mui/material';

const FlightPlanModal = () => {
  const dispatch=useAppDispatch()
    const {anchorEl}=useAppSelector(state=>state.ui)
    const open = Boolean(anchorEl);
    const handleClose=()=>{
      dispatch(closeFligtPlan())
    }
    return (
      <Menu sx={{p:0,flexGrow:1,maxWidth:'592px' }} anchorEl={anchorEl} open={open}  onClose={handleClose}>
        <Paper sx={{p:1}} elevation={0}>
          <Stack direction={'row'}  justifyContent={'space-between'}>
            <Stack direction={'row'}>
              <Typography variant={'h6'} component={'h6'}>План полёта</Typography>
                <Stack direction={'row'}></Stack>
            </Stack>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </Paper>

      </Menu>
    );
};

export default FlightPlanModal;