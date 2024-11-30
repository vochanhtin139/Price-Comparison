import type { BoxProps } from '@mui/material/Box';

import { forwardRef } from 'react';

import Box from '@mui/material/Box';

import { varAlpha } from 'src/theme/styles';
import { Typography } from '@mui/material';
import { RatingViewProps } from './types';
import { Iconify } from '../iconify';

// ----------------------------------------------------------------------

export const RatingView = forwardRef<HTMLDivElement, BoxProps & RatingViewProps>(
  ({ rating, sx, ...other }, ref) => {
    rating = rating === 'No rating' ? '0' : rating;

    return (
      <Box
        ref={ref}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          ...sx,
        }}
        {...other}
      >
        <Iconify icon="mingcute:star-fill" width={18} height={18} color='#FFC13A' />
        <Typography variant="subtitle2" ml='4px'>
          {rating}
        </Typography>
      </Box>
    );
  }
);
