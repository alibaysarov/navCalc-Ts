import React,{FC} from 'react';

import { Typography,Box,Stack } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@emotion/react';
import { Coordinate, toStringHDMS } from 'ol/coordinate';
import { ICoord } from '../../utils/airNavigation';
import { Tooltip } from '@mui/material';
interface WaypointProps{
  name:string,
  coordinates:Coordinate|null,
  distance:number|null,
  time:string|null
}
const Waypoint:FC<WaypointProps> = ({name,coordinates,distance,time}) => {
    const theme=useTheme()
    const compCoord=coordinates!=null?toStringHDMS(coordinates):'---'
    return (
        <Box sx={{background:`${theme.palette.common.white}`,borderRadius:1,p:1}}>
              <Stack direction={'row'} justifyContent={'space-between'}  alignItems={'center'}>
                <Stack direction={'column'} spacing={1}>
                  <Typography variant={'body2'} component={'span'}>
                    Название
                  </Typography>
                    <Typography sx={{maxWidth:'70px'}} variant={'body2'} component={'p'}>
                      {name}
                    </Typography>
                </Stack>
                <Stack direction={'column'} spacing={1}>
                  <Typography variant={'body2'} component={'span'}>
                    Координаты
                  </Typography>
                  <Tooltip title={compCoord}>
                  <Typography variant={'body1'} component={'span'}>
                  {compCoord.slice(0,10)}
                  </Typography>
                  </Tooltip>
                  
                </Stack>
                <Stack direction={'column'} spacing={1}>
                  <Typography variant={'body2'} component={'span'}>
                    Расстояние
                  </Typography>
                  <Typography variant={'body1'} component={'span'}>
                  {distance?.toFixed(1)} км
                  </Typography>
                </Stack>
                <Stack direction={'column'} spacing={1}>
                  <Typography variant={'body2'} component={'span'}>
                    Время
                  </Typography>
                  <Typography variant={'body1'} component={'span'}>
                  {time}
                  </Typography>
                </Stack>
                <IconButton sx={{width:'30px',height:'30px'}}>
                  <CloseIcon color={'secondary'}/>
                </IconButton>
              </Stack>
            </Box>
    );
};

export default Waypoint;