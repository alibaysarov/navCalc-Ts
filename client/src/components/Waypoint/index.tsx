import React from 'react';

import { Typography,Box,Stack } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@emotion/react';

const Wapoint = () => {
    const theme=useTheme()
    return (
        <Box sx={{background:`${theme.palette.common.white}`,borderRadius:1,p:1}}>
              <Stack direction={'row'} justifyContent={'space-between'}  alignItems={'center'}>
                <Stack direction={'column'} spacing={1}>
                  <Typography variant={'body2'} component={'span'}>
                    Название
                  </Typography>
                    <Typography sx={{maxWidth:'30px'}} variant={'body2'} component={'span'}>
                      Аэропорт..
                    </Typography>
                </Stack>
                <Stack direction={'column'} spacing={1}>
                  <Typography variant={'body2'} component={'span'}>
                    Координаты
                  </Typography>
                  <Typography variant={'body1'} component={'span'}>
                  N55°...E038°...
                  </Typography>
                </Stack>
                <Stack direction={'column'} spacing={1}>
                  <Typography variant={'body2'} component={'span'}>
                    Расстояние
                  </Typography>
                  <Typography variant={'body1'} component={'span'}>
                  100км
                  </Typography>
                </Stack>
                <Stack direction={'column'} spacing={1}>
                  <Typography variant={'body2'} component={'span'}>
                    Время
                  </Typography>
                  <Typography variant={'body1'} component={'span'}>
                  1:25
                  </Typography>
                </Stack>
                <IconButton sx={{width:'30px',height:'30px'}}>
                  <CloseIcon color={'secondary'}/>
                </IconButton>
              </Stack>
            </Box>
    );
};

export default Wapoint;