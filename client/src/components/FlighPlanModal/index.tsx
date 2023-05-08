import { Box, Menu, Paper, Stack, Typography,Tooltip,TextField,Autocomplete } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeFligtPlan } from '../../store/slices/ui';
import { IconButton } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SaveIcon from '@mui/icons-material/Save';
import IosShareIcon from '@mui/icons-material/IosShare';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import Waypoint from '../Waypoint/';
import { useTheme } from '@emotion/react';
import { findAirportHandler } from '../../store/slices/flighPlanSlice';
const FlightPlanModal = () => {
  const theme=useTheme()
  const dispatch=useAppDispatch()
    const {anchorEl}=useAppSelector(state=>state.ui)
    const {airportList}=useAppSelector(state=>state.flightPlan)
    const open = Boolean(anchorEl);
    const handleClose=()=>{
      dispatch(closeFligtPlan())
    }
    const departureInputHandler:React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> =(event)=>{
      if(event.target.value.length>0){
        dispatch(findAirportHandler(event.target.value))
      }
    }

    
    return (
      <Menu sx={{backGroundColor:'#fff'}} transformOrigin={{vertical:'top', horizontal:'left'}} anchorEl={anchorEl} open={open}  onClose={handleClose}>
        <Paper sx={{p:2,pt:1}} elevation={0}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Stack direction={'row'} spacing={1}>
              <Typography variant={'h6'} component={'h6'}>План полёта</Typography>
                <Stack direction={'row'} alignItems={'center'} spacing={'5px'}>
                  <Tooltip title={'Создать план полёта'}>
                    <IconButton size='small'><InsertDriveFileIcon/></IconButton>
                  </Tooltip>
                  <Tooltip title={'Сохранить'}>
                    <IconButton size='small'><SaveIcon/></IconButton>
                  </Tooltip>
                  <Tooltip title={'Экспорт в'}>
                    <IconButton size='small'><IosShareIcon/></IconButton>
                  </Tooltip>
                </Stack>
            </Stack>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Stack sx={{marginTop:2}} direction={'row'} alignItems={'center'} spacing={1} justifyContent={'space-between'}>
            <TextField sx={{maxWidth:'192px'}} id="outlined-basic" label="Самолёт" placeholder='Ra-...' variant="outlined" />
            <Stack direction={'row'} alignItems={'center'} spacing={1} justifyContent={'space-between'}>
              <TextField id="outlined-basic" sx={{maxWidth:'116px'}} label="Скорость" placeholder='100 км/ч' variant="outlined" />
              <TextField id="outlined-basic" sx={{maxWidth:'116px'}} label="Высота" placeholder='2000 фут' variant="outlined" />
            </Stack>
          </Stack>
          <Stack sx={{marginTop:1}} direction={'row'} spacing={'10px'} alignItems={'center'}>
            <Stack spacing={'3px'} direction={'column'}>
              <FlightTakeoffIcon color={`${theme.palette.common.black}`}/>
              
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={airportList.map(el=>el.name)}
                sx={{minWidth:'133px',maxHeight:'56px'}}
                renderInput={(params)=><TextField {...params} id="outlined-basic" onChange={departureInputHandler}  label="Аэропорт вылета" placeholder='UUDD' variant="outlined" />}
                 />
            </Stack>
            <Stack spacing={'3px'} direction={'column'}>
              <FlightLandIcon color={`${theme.palette.common.black}`}/>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={airportList.map(el=>el.name)}
                sx={{minWidth:'133px',maxHeight:'56px'}}
                renderInput={(params)=><TextField {...params} id="outlined-basic" onChange={departureInputHandler}  label="Аэропорт назначения" placeholder='UUDD' variant="outlined" />}
                 />
            </Stack>
          </Stack>

          <Stack sx={{maxHeight:'204px',overflowY:'auto',mt:1,mb:2}} direction={'column'} spacing={1}>
            {
              [1,2,3,4].map(el=>(
                <Waypoint/>
              ))
            }
          </Stack>
          <Stack direction={'column'} spacing={0}>
              <Typography variant='body2' component={'p'}>Расстояние: 400км</Typography>
              <Typography variant='body2' component={'p'}>Время: 5:40</Typography>
          </Stack>
        </Paper>

      </Menu>
    );
};

export default FlightPlanModal;