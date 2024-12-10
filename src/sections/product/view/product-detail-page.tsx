import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Typography, Grid, Paper, Rating, Divider, Chip } from '@mui/material';

import useProduct from 'src/hooks/products/use-product';

import { fCurrency } from 'src/utils/format-number';

import { PriceChart } from './price-chart';

export function ProductDetailPage() {
  const { id } = useParams();
  console.log('id', id);
  const { shopeeProduct, fetchShopeeProductByName, shopeeProducts, fetchShopeeProductsByName } =
    useProduct();

  useEffect(() => {
    if (id) {
      fetchShopeeProductByName(id);
      // fetchShopeeProductsByName(id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // console.log(shopeeProduct);
  // console.log(shopeeProducts);

  return (
    <Box sx={{ p: 4, bgcolor: 'white', m: 2, borderRadius: 2 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Paper elevation={0} sx={{ padding: 2 }}>
            <img
              // src={shopeeProduct?.productImageLink}
              src="https://cf.shopee.vn/file/1f"
              alt="product"
              style={{ width: '100%', borderRadius: 8 }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {/* {shopeeProduct?.productName} */}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
              <Rating value={5} readOnly size="small" />
              <Typography variant="body2" sx={{ marginLeft: 1 }}>
                141 Reviews | 315 Sold
              </Typography>
            </Box>

            {/* Giá sản phẩm */}
            <Box sx={{ marginTop: 2, bgcolor: '#FAFAFA', py: 1, px: 2 }}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 'bold', color: 'red', display: 'inline-block' }}
              >
                {/* {fCurrency(
                  parseInt((shopeeProduct?.productPrice ?? '0').replace(/\./g, ''), 10) + 599000
                )} */}
                &nbsp;
                <Typography
                  component="span"
                  variant="body1"
                  sx={{
                    color: 'text.disabled',
                    textDecoration: 'line-through',
                  }}
                >
                  {/* {fCurrency(shopeeProduct?.productPrice)} */}
                </Typography>
              </Typography>
            </Box>

            {/* Biểu đồ giá */}
            <Box sx={{ marginTop: 4, border: '1px solid #1977F2', borderRadius: 2, p: 2 }}>
              {/* <PriceChart /> */}
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
