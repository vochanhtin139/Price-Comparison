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
import { Autocomplete, Card, InputAdornment, MenuItem, OutlinedInputProps, Select, Stack, Toolbar } from '@mui/material'
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
import useCategoryLink from 'src/hooks/category-link'
import useProductLink from 'src/hooks/product-link'
import { AutocompleteRenderInputParams } from '@mui/material'

// ----------------------------------------------------------------------

export function SearchProductView() {
    const { loading, error, success, products, fetchProductsByFilters } = useProduct()
    const { categoryLinks, fetchCategoryLinks } = useCategoryLink()
    const { productLinks, fetchProductLinks } = useProductLink()

    useEffect(() => {
        fetchCategoryLinks()
        fetchProductLinks()
    }, [])

    const location = useLocation()
    const params = new URLSearchParams(location.search)

    const [filterName, setFilterName] = useState<string | null>(null)

    const MAX = 40000000
    const MIN = 0
    const [filters, setFilters] = useState({
        column: 'productName',
        operator: 'contains',
        value: '',
        // product_link: '',
        // crawl_time: null,
        // from_category: '',
        // product_name: '',
        // product_name_operator: '',
        priceRange: [0, 40000000],
        productRating: '1'
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
                    {/* <Typography variant='subtitle2' mb={-1}>
                        Product Name
                    </Typography>
                    <Stack spacing={2} direction='row' width={'100%'}>
                        <TextField
                            fullWidth
                            // label='Product Name'
                            value={filters.product_name}
                            onChange={(e) => handleInputChange('product_name', e.target.value)}
                            placeholder='Enter product name'
                        />
                        <TextField
                            select
                            fullWidth
                            label='Operator'
                            value={filters.product_name_operator || null}
                            onChange={(e) => handleInputChange('product_name_operator', e.target.value)}
                            SelectProps={{ native: true }}
                            // sx={{ maxWidth: 300 }}
                        >
                            <option value='contains'>contains</option>
                            <option value='equal'>equal</option>
                            <option value='start'>start with</option>
                            <option value='end'>end with</option>
                        </TextField>
                    </Stack> */}
                    <Typography variant='subtitle2' mb={-1}>
                        Column
                    </Typography>
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
                        {/* <OutlinedInput
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
                        /> */}
                        {/* <Select
                            fullWidth
                            // label='Product'
                            value={filters.product_link || 'default'}
                            onChange={(e) => handleInputChange('product_link', e.target.value)}
                        >
                            <MenuItem value='default'>Product Crawler</MenuItem>
                            {productLinks.map((productLink) => (
                                <MenuItem key={productLink.crawlerName} value={productLink.crawlerName}>
                                    {productLink.crawlerName}
                                </MenuItem>
                            ))}
                        </Select>
                        <Select
                            fullWidth
                            // label='Category'
                            value={filters.from_category || 'default'}
                            onChange={(e) => handleInputChange('from_category', e.target.value)}
                        >
                            <MenuItem value='default'>Category Crawler</MenuItem>
                            {categoryLinks.map((categoryLink) => (
                                <MenuItem key={categoryLink.crawlerName} value={categoryLink.crawlerName}>
                                    {categoryLink.crawlerName}
                                </MenuItem>
                            ))}
                        </Select> */}
                        <TextField
                            select
                            fullWidth
                            // label='Column'
                            value={filters.column || null}
                            onChange={(e) => handleInputChange('column', e.target.value)}
                            SelectProps={{ native: true }}
                            // sx={{ maxWidth: 300 }}
                        >
                            <option value='productName'>Product name</option>
                            <option value='productLink'>Product link</option>
                            <option value='fromCategory'>Category link</option>
                        </TextField>
                        <TextField
                            select
                            fullWidth
                            label='Operator'
                            value={filters.operator || null}
                            onChange={(e) => handleInputChange('operator', e.target.value)}
                            SelectProps={{ native: true }}
                            // sx={{ maxWidth: 300 }}
                        >
                            <option value='contains'>contains</option>
                            <option value='equals'>equals</option>
                            <option value='starts'>starts with</option>
                            {/* <option value='ends'>ends with</option> */}
                        </TextField>
                        <TextField
                            fullWidth
                            value={filters.value}
                            label='Value'
                            onChange={(e) => handleInputChange('value', e.target.value)}
                            placeholder='Enter value'
                        />
                        {/* <Autocomplete
                            fullWidth
                            options={productLinks.map((productLink) => productLink.crawlerName)} // Options array
                            value={filters.product_link || null} // Set value from filters
                            onChange={(e, newValue) => handleInputChange('product_link', newValue || '')} // Handle changes
                            renderInput={(params) => (
                                <TextField {...params} label='Product Crawler' variant='outlined' />
                            )}
                        />

                        <Autocomplete
                            fullWidth
                            options={categoryLinks.map((categoryLink) => categoryLink.crawlerName)} // Options array
                            value={filters.from_category || null} // Set value from filters
                            onChange={(e, newValue) => handleInputChange('from_category', newValue || '')} // Handle changes
                            renderInput={(params) => (
                                <TextField {...params} label='Category Crawler' variant='outlined' />
                            )}
                        /> */}
                        {/* <DatePicker
                            sx={{ width: 300 }}
                            label='Crawl Time'
                            value={filters.crawl_time}
                            onChange={(newValue) => handleInputChange('crawl_time', newValue)}
                            // disable future dates
                            maxDate={dayjs()}
                        /> */}
                        {/* <OutlinedInput
                            fullWidth
                            value={filters.productRating}
                            onChange={(e) => handleInputChange('productRating', e.target.value)}
                            placeholder='Enter Product Rating'
                            startAdornment={
                                <InputAdornment position='start'>
                                    <Iconify width={20} icon='eva:star-fill' sx={{ color: 'text.disabled' }} />
                                </InputAdornment>
                            }
                            sx={{ maxWidth: 300 }}
                        /> */}
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
                            value={filters.productRating}
                            onChange={(e) => handleInputChange('productRating', e.target.value)}
                            placeholder='Enter Product Rating'
                            startAdornment={
                                <InputAdornment position='start'>
                                    <Iconify width={20} icon='eva:star-fill' sx={{ color: 'text.disabled' }} />
                                </InputAdornment>
                            }
                            sx={{ maxWidth: 300 }}
                        />
                    </Stack> */}
                    <Stack spacing={2} direction='row' width={'100%'} mt={1}>
                        <Box width={'100%'}>
                            <Typography variant='subtitle2' mb={1}>
                                Product Rating
                            </Typography>
                            <Select
                                fullWidth
                                value={filters.productRating || ''}
                                onChange={(e) => handleInputChange('productRating', e.target.value)}
                            >
                                <MenuItem value='5'>5 stars</MenuItem>
                                <MenuItem value='4'>4 stars or more</MenuItem>
                                <MenuItem value='3'>3 stars or more</MenuItem>
                                <MenuItem value='2'>2 stars or more</MenuItem>
                                <MenuItem value='1'>1 star or more</MenuItem>
                            </Select>
                        </Box>
                        <Box width={'100%'}>
                            <Typography variant='subtitle2' gutterBottom>
                                Price Range
                            </Typography>
                            <Box sx={{ width: '100%' }} px={3}>
                                <Slider
                                    value={filters.priceRange}
                                    onChange={(e, newValue) => handleInputChange('priceRange', newValue)}
                                    valueLabelDisplay='auto'
                                    min={MIN}
                                    max={MAX}
                                    step={50000}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }} px={2}>
                                <Typography
                                    variant='body2'
                                    onClick={() => handleInputChange('priceRange', [0, 10000000])}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    {fCurrency(MIN)}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    onClick={() => handleInputChange('priceRange', [40000000, 40000000])}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    {fCurrency(MAX)}
                                </Typography>
                            </Box>
                        </Box>
                    </Stack>
                    <Stack spacing={2} direction='row' width={'100%'} justifyContent='flex-end' mt={2}>
                        <Button
                            variant='outlined'
                            // color='inherit'
                            size='large'
                            onClick={() => {
                                setFilters({
                                    column: 'product_name',
                                    operator: 'contains',
                                    value: '',
                                    // product_link: '',
                                    // crawl_time: null,
                                    // from_category: '',
                                    // product_name: '',
                                    // product_name_operator: '',
                                    priceRange: [0, 40000000],
                                    productRating: ''
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
