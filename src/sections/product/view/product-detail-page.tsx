import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { Box, Typography, Grid, Paper, Rating, Divider, Chip } from '@mui/material'

import useProduct from 'src/hooks/products/use-product'

import { fCurrency } from 'src/utils/format-number'

import { PriceChart } from './price-chart'
import IProduct from 'src/hooks/products/product.interface'
import { renderFallback } from 'src/routes/sections'
import { convertStringToArray } from 'src/utils/format-url'

const getLatestCrawlTime = (products: IProduct[]) => {
    if (products.length === 0) return null

    return products.reduce((acc, curr) => {
        return acc.crawlTime > curr.crawlTime ? acc : curr
    })
}

export function ProductDetailPage() {
    const { id } = useParams()
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    // const productLink = params.get('productLink')
    const productLink = location.state?.productLink
    const ecommerceSite = params.get('ecommerceSite')
    const type = (params.get('type') || 'shopLink') as 'shopLink' | 'categoryLink'

    const { loading, products, fetchProductsById } = useProduct()

    // get latest crawl time
    const product = getLatestCrawlTime(products)

    useEffect(() => {
        if (id && ecommerceSite) {
            fetchProductsById(id, ecommerceSite, type, productLink)
        }
    }, [id, ecommerceSite])

    console.log(product)
    console.log(products)

    const productImageLink = convertStringToArray(product?.productImageLink ?? '')

    return (
        <>
            {loading ? (
                renderFallback
            ) : product ? (
                <Box sx={{ p: 4, bgcolor: 'white', m: 2, borderRadius: 2 }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={5}>
                            <Paper elevation={0} sx={{ padding: 2 }}>
                                <img
                                    src={productImageLink[0]}
                                    alt='product'
                                    style={{ width: '100%', borderRadius: 8 }}
                                />
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={7}>
                            <Box>
                                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                                    {product?.productName}
                                </Typography>

                                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                                    <Rating value={5} readOnly size='small' />
                                    <Typography variant='body2' sx={{ marginLeft: 1 }}>
                                        141 Reviews | 315 Sold
                                    </Typography>
                                </Box>

                                <Box sx={{ marginTop: 2, bgcolor: '#FAFAFA', py: 1, px: 2 }}>
                                    <Typography
                                        variant='h4'
                                        sx={{ fontWeight: 'bold', color: 'red', display: 'inline-block' }}
                                    >
                                        {fCurrency(product?.productPrice)}
                                        &nbsp;
                                        <Typography
                                            component='span'
                                            variant='body1'
                                            sx={{
                                                color: 'text.disabled',
                                                textDecoration: 'line-through'
                                            }}
                                        >
                                            {fCurrency(
                                                parseInt((product?.productPrice ?? '0').replace(/\./g, ''), 10) + 599000
                                            )}
                                        </Typography>
                                    </Typography>
                                </Box>

                                <Box sx={{ marginTop: 4, border: '1px solid #1977F2', borderRadius: 2, p: 2 }}>
                                    <PriceChart data={products} />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            ) : (
                <Typography variant='h5' textAlign={'center'} mt={10}>
                    Product not found
                </Typography>
            )}
        </>
    )
}
