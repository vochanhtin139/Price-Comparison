import { useState, useCallback, useEffect } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'

// eslint-disable-next-line import/no-cycle
import { renderFallback } from 'src/routes/sections'

import useProduct from 'src/hooks/products/use-product'

import { _products } from 'src/_mock'
import { DashboardContent } from 'src/layouts/dashboard'

import { ProductItem } from '../product-item'

import type { FiltersProps } from '../product-filters'
import { useLocation } from 'react-router-dom'
import { Card, InputAdornment, OutlinedInputProps, Stack, Toolbar } from '@mui/material'
import { SearchProductToolbar } from './search-toolbar'
import { useTable } from 'src/sections/user/view'
import { Iconify } from 'src/components/iconify'
import { OutlinedInput } from '@mui/material'
import Button from 'src/components/button'
import { JSX } from 'react/jsx-runtime'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TextField } from '@mui/material'
import dayjs from 'dayjs'
import { Slider } from '@mui/material'
import { fCurrency } from 'src/utils/format-number'

// ----------------------------------------------------------------------

export function SearchProductView() {
    const { loading, error, success, products, fetchProductsByFilters } = useProduct()

    const location = useLocation()
    const params = new URLSearchParams(location.search)

    const [filterName, setFilterName] = useState<string | null>(null)

    const MAX = 40000000
    const MIN = 0
    const [filters, setFilters] = useState({
        product_link: '',
        crawl_time: null,
        from_category: '',
        product_name: '',
        product_name_operator: '',
        product_price_range: [0, 40000000],
        product_rating: ''
    })

    const handleInputChange = (field: string, value: any) => {
        setFilters((prevFilters) => ({ ...prevFilters, [field]: value }))
    }

    console.log(products)

    return (
        <DashboardContent>
            {/* {loading && <Box>{renderFallback}</Box>} */}
            <Typography variant='h4' sx={{ mb: 5 }}>
                Search Product
            </Typography>

            <Card>
                <Toolbar
                    sx={{
                        // height: 96,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        // justifyContent: 'space-between',
                        // justifyContent: ['space-between', 'flex-start'],
                        alignItems: 'flex-start',
                        p: (theme) => theme.spacing(3, 3, 3, 3),
                        gap: 2
                    }}
                >
                    <Stack spacing={2} direction='row' width={'100%'}>
                        {/* <OutlinedInput
                            fullWidth
                            value={filterName}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setFilterName(event.target.value)
                                // table.onResetPage()
                            }}
                            placeholder='Enter product name'
                            startAdornment={
                                <InputAdornment position='start'>
                                    <Iconify width={20} icon='eva:search-fill' sx={{ color: 'text.disabled' }} />
                                </InputAdornment>
                            }
                            sx={{ maxWidth: 200 }}
                        /> */}
                        <OutlinedInput
                            fullWidth
                            value={filters.product_link}
                            onChange={(e) => handleInputChange('product_link', e.target.value)}
                            placeholder='Enter Product Link'
                            startAdornment={
                                <InputAdornment position='start'>
                                    <Iconify width={20} icon='eva:link-fill' sx={{ color: 'text.disabled' }} />
                                </InputAdornment>
                            }
                            sx={{ maxWidth: 300 }}
                        />
                        <OutlinedInput
                            fullWidth
                            value={filters.from_category}
                            onChange={(e) => handleInputChange('from_category', e.target.value)}
                            placeholder='Enter Category Link'
                            startAdornment={
                                <InputAdornment position='start'>
                                    <Iconify width={20} icon='eva:folder-fill' sx={{ color: 'text.disabled' }} />
                                </InputAdornment>
                            }
                            sx={{ maxWidth: 300 }}
                        />
                        <DatePicker
                            sx={{ width: 300 }}
                            label='Crawl Time'
                            value={filters.crawl_time}
                            onChange={(newValue) => handleInputChange('crawl_time', newValue)}
                            // disable future dates
                            maxDate={dayjs()}
                        />
                        <OutlinedInput
                            fullWidth
                            value={filters.product_rating}
                            onChange={(e) => handleInputChange('product_rating', e.target.value)}
                            placeholder='Enter Product Rating'
                            startAdornment={
                                <InputAdornment position='start'>
                                    <Iconify width={20} icon='eva:star-fill' sx={{ color: 'text.disabled' }} />
                                </InputAdornment>
                            }
                            sx={{ maxWidth: 300 }}
                        />
                        {/* <Button
                            variant='contained'
                            color='inherit'
                            size='large'
                            loading={loading}
                            type='submit'
                            onClick={() => {
                                console.log(filterName)
                                if (filterName) fetchProductsByKeyword(filterName)
                            }}
                        >
                            Search
                        </Button> */}
                    </Stack>
                    {/* <Stack spacing={2} direction='row' width={'100%'}>
                        <DatePicker
                            sx={{ width: 300 }}
                            label='Crawl Time'
                            value={filters.crawl_time}
                            onChange={(newValue) => handleInputChange('crawl_time', newValue)}
                            // disable future dates
                            maxDate={dayjs()}
                        />
                        <OutlinedInput
                            fullWidth
                            value={filters.product_rating}
                            onChange={(e) => handleInputChange('product_rating', e.target.value)}
                            placeholder='Enter Product Rating'
                            startAdornment={
                                <InputAdornment position='start'>
                                    <Iconify width={20} icon='eva:star-fill' sx={{ color: 'text.disabled' }} />
                                </InputAdornment>
                            }
                            sx={{ maxWidth: 300 }}
                        />
                    </Stack> */}
                    <Typography variant='subtitle2' mb={-1}>
                        Product Name
                    </Typography>
                    <Stack spacing={2} direction='row' width={'100%'}>
                        <OutlinedInput
                            fullWidth
                            value={filters.product_name}
                            onChange={(e) => handleInputChange('product_name', e.target.value)}
                            placeholder='Enter Product Name'
                            startAdornment={
                                <InputAdornment position='start'>
                                    <Iconify width={20} icon='eva:pricetags-fill' sx={{ color: 'text.disabled' }} />
                                </InputAdornment>
                            }
                            sx={{ maxWidth: 300 }}
                        />
                        <TextField
                            select
                            fullWidth
                            label='Operator'
                            value={filters.product_name_operator || null}
                            onChange={(e) => handleInputChange('product_name_operator', e.target.value)}
                            SelectProps={{ native: true }}
                            sx={{ maxWidth: 300 }}
                        >
                            <option value='contains'>contains</option>
                            <option value='equal'>equal</option>
                            <option value='start'>start with</option>
                            <option value='end'>end with</option>
                        </TextField>
                    </Stack>
                    <Stack spacing={2} direction='row' width={'450px'}>
                        <Box width={'100%'}>
                            <Typography variant='subtitle2' gutterBottom>
                                Price Range
                            </Typography>
                            <Slider
                                value={filters.product_price_range}
                                onChange={(e, newValue) => handleInputChange('product_price_range', newValue)}
                                valueLabelDisplay='auto'
                                min={MIN}
                                max={MAX}
                                step={100000}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography
                                    variant='body2'
                                    onClick={() => handleInputChange('product_price_range', [0, 10000000])}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    {fCurrency(MIN)}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    onClick={() => handleInputChange('product_price_range', [40000000, 40000000])}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    {fCurrency(MAX)}
                                </Typography>
                            </Box>
                        </Box>
                    </Stack>
                    <Stack spacing={2} direction='row' width={'100%'} justifyContent='flex-end'>
                        <Button
                            variant='outlined'
                            // color='inherit'
                            size='large'
                            onClick={() => {
                                setFilters({
                                    product_link: '',
                                    crawl_time: null,
                                    from_category: '',
                                    product_name: '',
                                    product_name_operator: '',
                                    product_price_range: [0, 40000000],
                                    product_rating: ''
                                })
                            }}
                        >
                            Clear search criteria
                        </Button>
                        <Button
                            variant='contained'
                            // color='inherit'
                            size='large'
                            loading={loading}
                            type='submit'
                            onClick={() => {
                                console.log(filters)
                                fetchProductsByFilters(filters)
                            }}
                        >
                            Search now
                        </Button>
                    </Stack>
                </Toolbar>
            </Card>

            <Grid container spacing={3} mt={4}>
                {products.map((product) => (
                    <Grid key={product.productName} xs={12} sm={6} md={3}>
                        <ProductItem product={product} ecommerceSite={product.ecommerceSite} type={product.type} />
                    </Grid>
                ))}
            </Grid>

            {/* <Pagination count={10} color='primary' sx={{ mt: 8, mx: 'auto' }} /> */}
        </DashboardContent>
    )
}
