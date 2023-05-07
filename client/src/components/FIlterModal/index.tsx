import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Paper, Menu, Typography,Stack,FormGroup,FormControlLabel,Switch } from '@mui/material';
import { closeFilter } from '../../store/slices/ui';
import { IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
const FilterModal = () => {
    const dispatch=useAppDispatch()
    const {anchorElFilter}=useAppSelector(state=>state.ui)
    const open=Boolean(anchorElFilter)
    const handleClose=()=>{
      dispatch(closeFilter())
    }
    return (
        <Menu anchorEl={anchorElFilter} open={open} onClose={handleClose} sx={{backGroundColor:'#fff'}} transformOrigin={{vertical:'top', horizontal:'left'}}>
          <Paper sx={{p:2,pt:1}} elevation={0}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <Typography variant='h6' component={'h6'}>Воздушное пространство</Typography>
              <IconButton onClick={handleClose}>
                <CancelIcon color='secondary'/>
              </IconButton>
            </Stack>
            <Stack direction={'column'}>
              <Typography sx={{fontWeight:600}} variant='subtitle1'>
                  Площадки
              </Typography>
              <FormGroup>
                <FormControlLabel control={<Switch defaultChecked />} label="Аэродромы"/>
                <FormControlLabel control={<Switch defaultChecked />} label="Вертодромы"/>
              </FormGroup>
              <Typography sx={{fontWeight:600,mt:1}} variant='subtitle1'>
                  Зоны
              </Typography>
              <FormGroup>
                <FormControlLabel control={<Switch defaultChecked />} label="Зоны и районы"/>
                <FormControlLabel control={<Switch defaultChecked />} label="Сектора"/>
                <FormControlLabel control={<Switch defaultChecked />} label="Запретные зоны"/>
                <FormControlLabel control={<Switch defaultChecked />} label="МДП"/>
                <FormControlLabel control={<Switch defaultChecked />} label="РПИ"/>
              </FormGroup>
            </Stack>
          </Paper>
        </Menu>
    );
};

export default FilterModal;