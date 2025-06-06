import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import {
    Box,
    Typography,
    Grid,
    Paper,
    Rating,
    Divider,
    Chip,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack
} from '@mui/material'

import useProduct from 'src/hooks/products/use-product'

import { fCurrency } from 'src/utils/format-number'

import { PriceChart } from './price-chart'
import IProduct from 'src/hooks/products/product.interface'
import { renderFallback } from 'src/routes/sections'
import { convertStringToArray } from 'src/utils/format-url'
import Button from 'src/components/button'

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

    const { loading, products, fetchProductsById, fetchProductOptions, fetchHistoricalData } = useProduct()

    // get latest crawl time
    const [product, setProduct] = useState<IProduct | null>(null)
    useEffect(() => {
        if (products.length > 0) {
            const latestProduct = getLatestCrawlTime(products)
            setProduct(latestProduct)
        }
    }, [products])
    // const product = getLatestCrawlTime(products)

    useEffect(() => {
        if (id && ecommerceSite) {
            fetchProductsById(id, ecommerceSite, type, productLink)
        }
    }, [id, ecommerceSite])

    // console.log(product)

    const productImageLink = convertStringToArray(product?.productImageLink ?? '')
    // console.log('Product Image Links:', productImageLink)

    const [options, setOptions] = useState<string[][] | null>(null)

    useEffect(() => {
        const getOptions = async () => {
            if (!product?.productLink) return
            const result = await fetchProductOptions(product?.productLink)
            if (result) {
                setSelectedOptions({
                    0: result[0]?.[0] || '', // Default to first option of first group
                    1: result[1]?.[0] || '' // Default to first option of second group
                })
                setOptions(result)
            }
        }

        getOptions()
    }, [product])
    // console.log('Options:', options)

    const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({})

    const handleOptionSelect = (groupIndex: number, value: string) => {
        setSelectedOptions((prev) => ({ ...prev, [groupIndex]: value }))
    }

    const [historicalData, setHistoricalData] = useState<any>()

    useEffect(() => {
        const fetchData = async () => {
            if (product?.productLink) {
                const isAllEmpty = Object.values(selectedOptions).every((value) => value === '')
                let selectedOptionsValue = Object.values(selectedOptions)
                if (isAllEmpty) {
                    selectedOptionsValue = []
                }
                const data = await fetchHistoricalData(product?.productLink, selectedOptionsValue)
                // const data = await fetchHistoricalData(product?.productLink)
                setHistoricalData(data)
            }
        }
        fetchData()
    }, [product, selectedOptions])

    console.log('Selected Options:', selectedOptions)
    console.log('Historical Data:', historicalData)

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
                                        {fCurrency(
                                            historicalData?.prices[historicalData?.prices.length - 1] ||
                                                product?.productPrice
                                        )}
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

                                {options && options.length > 0 && (
                                    <Box sx={{ mt: 4 }}>
                                        {options.map((group, groupIndex) => (
                                            <Box key={groupIndex} sx={{ mb: 2 }}>
                                                <Grid container spacing={1}>
                                                    {group.map((value, i) => {
                                                        const isSelected = selectedOptions[groupIndex] === value
                                                        const isImage =
                                                            value.startsWith('http') || value.startsWith('/')

                                                        return (
                                                            <Grid item key={i}>
                                                                <Button
                                                                    onClick={() =>
                                                                        handleOptionSelect(groupIndex, value)
                                                                    }
                                                                    variant={isSelected ? 'contained' : 'outlined'}
                                                                    sx={{
                                                                        minWidth: 100,
                                                                        height: 40,
                                                                        p: 1,
                                                                        display: 'flex',
                                                                        flexDirection: 'column',
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                        border: isSelected
                                                                            ? '2px solid #1976d2'
                                                                            : '1px solid #ccc',
                                                                        color: isSelected ? '#1976d2' : 'text.primary',
                                                                        bgcolor: isSelected ? '#e3f2fd' : 'white',
                                                                        '&:hover': {
                                                                            bgcolor: 'inherit'
                                                                        },
                                                                        borderRadius: '6px'
                                                                    }}
                                                                >
                                                                    {isImage ? (
                                                                        <img
                                                                            src={value}
                                                                            alt={`Option ${groupIndex}-${i}`}
                                                                            style={{
                                                                                width: 40,
                                                                                height: 40,
                                                                                objectFit: 'cover'
                                                                            }}
                                                                        />
                                                                    ) : (
                                                                        <Typography variant='body2'>{value}</Typography>
                                                                    )}
                                                                </Button>
                                                            </Grid>
                                                        )
                                                    })}
                                                </Grid>
                                            </Box>
                                        ))}
                                    </Box>
                                )}

                                {product?.productLink && (
                                    <Stack mt={2}>
                                        <Button
                                            component='a'
                                            href={product.productLink}
                                            variant='contained'
                                            sx={{
                                                textTransform: 'none',
                                                fontSize: '16px'
                                            }}
                                            {...{
                                                target: '_blank',
                                                rel: 'noopener noreferrer'
                                            }}
                                        >
                                            View product on {ecommerceSite?.toUpperCase() ?? 'Ecommerce Site'}
                                        </Button>
                                    </Stack>
                                )}

                                {/* <Box sx={{ marginTop: 4, border: '1px solid #1977F2', borderRadius: 2, p: 2 }}>
                                    <PriceChart data={products} historicalData={historicalData} />
                                </Box> */}
                            </Box>
                        </Grid>
                    </Grid>
                    <Box sx={{ marginTop: 4, border: '1px solid #1977F2', borderRadius: 2, p: 2 }}>
                        <PriceChart data={products} historicalData={historicalData} />
                    </Box>
                </Box>
            ) : (
                <Typography variant='h5' textAlign={'center'} mt={10}>
                    Product not found
                </Typography>
            )}
        </>
    )
}
