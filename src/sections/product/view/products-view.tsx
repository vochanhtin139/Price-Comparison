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
import { ProductSort } from '../product-sort'
import { CartIcon } from '../product-cart-widget'
import { ProductFilters } from '../product-filters'

import type { FiltersProps } from '../product-filters'
import { useLocation } from 'react-router-dom'

// ----------------------------------------------------------------------

const GENDER_OPTIONS = [
    { value: 'men', label: 'Men' },
    { value: 'women', label: 'Women' },
    { value: 'kids', label: 'Kids' }
]

const CATEGORY_OPTIONS = [
    { value: 'all', label: 'All' },
    { value: 'shose', label: 'Shose' },
    { value: 'apparel', label: 'Apparel' },
    { value: 'accessories', label: 'Accessories' }
]

const RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star']

const PRICE_OPTIONS = [
    { value: 'below', label: 'Below $25' },
    { value: 'between', label: 'Between $25 - $75' },
    { value: 'above', label: 'Above $75' }
]

const COLOR_OPTIONS = ['#00AB55', '#000000', '#FFFFFF', '#FFC0CB', '#FF4842', '#1890FF', '#94D82D', '#FFC107']

const defaultFilters = {
    price: '',
    gender: [GENDER_OPTIONS[0].value],
    colors: [COLOR_OPTIONS[4]],
    rating: RATING_OPTIONS[0],
    category: CATEGORY_OPTIONS[0].value
}

export function ProductsView() {
    const { loading, error, success, products, fetchProductsByShopLink, fetchProductsByCategoryLink } = useProduct()

    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const shopLink = params.get('shopLink')
    const categoryLink = params.get('categoryLink')
    const ecommerceSite = params.get('ecommerceSite')

    // let fullShopLink = shopLink

    // const entryPoint = params.get('entryPoint')
    // const itemId = params.get('itemId')

    // if (entryPoint) fullShopLink = fullShopLink + `&entryPoint=${entryPoint}`
    // if (itemId) fullShopLink = fullShopLink + `&itemId=${itemId}`

    // console.log(fullShopLink)

    useEffect(() => {
        // fetchShopeeProducts()
        if (shopLink && ecommerceSite) {
            fetchProductsByShopLink(shopLink, ecommerceSite)
        } else if (categoryLink && ecommerceSite) {
            fetchProductsByCategoryLink(categoryLink, ecommerceSite)
        }
    }, [shopLink, ecommerceSite])
    console.log(products)

    const [sortBy, setSortBy] = useState('featured')

    const [openFilter, setOpenFilter] = useState(false)

    const [filters, setFilters] = useState<FiltersProps>(defaultFilters)

    const handleOpenFilter = useCallback(() => {
        setOpenFilter(true)
    }, [])

    const handleCloseFilter = useCallback(() => {
        setOpenFilter(false)
    }, [])

    const handleSort = useCallback((newSort: string) => {
        setSortBy(newSort)
    }, [])

    const handleSetFilters = useCallback((updateState: Partial<FiltersProps>) => {
        setFilters((prevValue) => ({ ...prevValue, ...updateState }))
    }, [])

    const canReset = Object.keys(filters).some(
        (key) => filters[key as keyof FiltersProps] !== defaultFilters[key as keyof FiltersProps]
    )

    return (
        <DashboardContent>
            {loading && <Box>{renderFallback}</Box>}
            <Typography variant='h4' sx={{ mb: 5 }}>
                Products
            </Typography>

            <CartIcon totalItems={8} />

            <Box display='flex' alignItems='center' flexWrap='wrap-reverse' justifyContent='flex-end' sx={{ mb: 5 }}>
                <Box gap={1} display='flex' flexShrink={0} sx={{ my: 1 }}>
                    <ProductFilters
                        canReset={canReset}
                        filters={filters}
                        onSetFilters={handleSetFilters}
                        openFilter={openFilter}
                        onOpenFilter={handleOpenFilter}
                        onCloseFilter={handleCloseFilter}
                        onResetFilter={() => setFilters(defaultFilters)}
                        options={{
                            genders: GENDER_OPTIONS,
                            categories: CATEGORY_OPTIONS,
                            ratings: RATING_OPTIONS,
                            price: PRICE_OPTIONS,
                            colors: COLOR_OPTIONS
                        }}
                    />

                    <ProductSort
                        sortBy={sortBy}
                        onSort={handleSort}
                        options={[
                            { value: 'featured', label: 'Featured' },
                            { value: 'newest', label: 'Newest' },
                            { value: 'priceDesc', label: 'Price: High-Low' },
                            { value: 'priceAsc', label: 'Price: Low-High' }
                        ]}
                    />
                </Box>
            </Box>

            <Grid container spacing={3}>
                {loading || products.length > 0 ? (
                    products.map((product) => (
                        <Grid key={product.productName} xs={12} sm={6} md={3}>
                            <ProductItem
                                product={product}
                                ecommerceSite={ecommerceSite}
                                type={shopLink ? 'shopLink' : 'categoryLink'}
                            />
                        </Grid>
                    ))
                ) : (
                    <Grid xs={12}>
                        <Box sx={{ textAlign: 'center', px: 5 }}>
                            <Typography variant='h6' sx={{ mb: 2 }}>
                                No products found
                            </Typography>
                            <Typography variant='body2' color='text.secondary'>
                                Please try a different category/shop.
                            </Typography>
                        </Box>
                    </Grid>
                )}
            </Grid>

            {/* <Pagination count={10} color='primary' sx={{ mt: 8, mx: 'auto' }} /> */}
        </DashboardContent>
    )
}
