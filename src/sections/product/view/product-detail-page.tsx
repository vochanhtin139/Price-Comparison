import React from 'react';
import { Box, Typography, Grid, Paper, Rating, Divider, Chip } from '@mui/material';
import { PriceChart } from './price-chart';

export function ProductDetailPage() {
  return (
    <Box sx={{ p: 4, bgcolor: 'white', m: 2, borderRadius: 2 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Paper elevation={0} sx={{ padding: 2 }}>
            <img
              src="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lw5p6ma0m3fd7f_tn.webp"
              alt="product"
              style={{ width: '100%', borderRadius: 8 }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Ốp lưng Silicone Cover cho Điện Thoại Samsung Galaxy A55
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
              <Rating value={5} readOnly size="small" />
              <Typography variant="body2" sx={{ marginLeft: 1 }}>
                141 Reviews | 315 Sold
              </Typography>
            </Box>

            {/* Giá sản phẩm */}
            <Box sx={{ marginTop: 2, bgcolor: '#FAFAFA', py: 1, px: 2 }}>
              <Typography variant="h4"
                sx={{ fontWeight: 'bold', color: 'red', display: 'inline-block' }}>
                309.000₫
                &nbsp;
                <Typography
                  component="span"
                  variant="body1"
                  sx={{
                    color: 'text.disabled',
                    textDecoration: 'line-through',
                  }}
                >
                  679.666₫
                </Typography>
              </Typography>
            </Box>

            {/* Biểu đồ giá */}
            <Box sx={{ marginTop: 4, border: '1px solid #1977F2', borderRadius: 2, p: 2 }}>
              <PriceChart />
            </Box>
          </Box>
        </Grid>
        {/* <Grid item xs={12} md={8}>
          <Box sx={{ marginTop: 4, border: '1px solid #1977F2', borderRadius: 2, p: 2 }}>
            <PriceChart />
          </Box>
        </Grid> */}
      </Grid>
    </Box>
  );
}
