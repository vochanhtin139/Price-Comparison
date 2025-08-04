import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { fCurrency } from 'src/utils/format-number'

import { Label } from 'src/components/label'
import { ColorPreview } from 'src/components/color-utils'
import IProduct from 'src/hooks/products/product.interface'
import { RatingView } from 'src/components/color-utils/rating-view'
import { useNavigate } from 'react-router-dom'
import { convertStringToArray } from 'src/utils/format-url'

// ----------------------------------------------------------------------

export type ProductItemProps = {
    id: string
    name: string
    price: number
    status: string
    coverUrl: string
    colors: string[]
    priceSale: number | null
}

export function ProductItem({
    product,
    ecommerceSite = 'shopee',
    type
}: {
    product: IProduct
    ecommerceSite?: string | null
    type?: 'shopLink' | 'categoryLink'
}) {
    const renderStatus = (
        <Label
            variant='inverted'
            // color={(product.status === 'sale' && 'error') || 'info'}
            color='error'
            sx={{
                zIndex: 9,
                top: 16,
                right: 16,
                position: 'absolute',
                textTransform: 'uppercase'
            }}
        >
            {/* {product.status} */}
            sale
        </Label>
    )

    const productImageLink = convertStringToArray(product.productImageLink ?? '')

    const renderImg = (
        <Box
            component='img'
            alt={product.productName}
            // src={product.productImageLink}
            src={productImageLink[0]}
            sx={{
                top: 0,
                width: 1,
                height: 1,
                objectFit: 'cover',
                position: 'absolute'
            }}
        />
    )

    const renderPrice = (
        <Typography variant='subtitle1' color='error' textAlign='end'>
            {/* <Typography
                variant='caption'
                sx={{
                    color: 'text.disabled',
                    textDecoration: 'line-through'
                }}
            >
                {fCurrency(parseInt(product.productPrice.replace(/\./g, ''), 10) + 599000)}
            </Typography> */}
            <Typography
                // component="span"
                variant='body1'
                sx={{
                    color: 'text.disabled',
                    textDecoration: 'line-through'
                }}
            >
                {/* {product.priceSale && fCurrency(product.priceSale)} */}
            </Typography>
            &nbsp;
            {/* {fCurrency(product.price)} */}
            {fCurrency(product.productPrice)}
        </Typography>
    )

    const navigate = useNavigate()

    return (
        <Card
            sx={{ cursor: 'pointer' }}
            onClick={() =>
                navigate(`/product-detail/${product.productLinkId}?ecommerceSite=${ecommerceSite}&type=${type}`)
            }
        >
            <Box sx={{ pt: '100%', position: 'relative' }}>
                {/* {product.status && renderStatus} */}
                {renderStatus}

                {renderImg}
            </Box>

            <Stack spacing={2} sx={{ p: 3 }}>
                <Link
                    color='inherit'
                    underline='hover'
                    variant='subtitle2'
                    noWrap={false}
                    sx={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        lineHeight: '1.5',
                        minHeight: '3em'
                    }}
                >
                    {product.productName}
                </Link>

                <Box display='flex' alignItems='end' justifyContent='space-between'>
                    {/* <ColorPreview colors={product.colors} /> */}
                    <RatingView rating={product.productRating} />
                    {renderPrice}
                </Box>
            </Stack>
        </Card>
    )
}
