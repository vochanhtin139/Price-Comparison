import { useState, useCallback, useEffect } from 'react'
import data from 'src/data/index.json'

// import { _users } from 'src/_mock'
import { DashboardContent } from 'src/layouts/dashboard'

import useShopLink from 'src/hooks/shop-link'
import IShopLink from 'src/hooks/shop-link/shoplink.interface'
import { Breadcrumbs } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useNavigate, useParams } from 'react-router-dom'
import CustomBreadcrumb from 'src/components/customBreadcrumb'
import ShopLinkForm from './shop-link-form'

// ----------------------------------------------------------------------

export function ShopLinkCreate() {
    const { id } = useParams()
    console.log('id', id)
    const navigate = useNavigate()
    const { loading, error, success, shopLink, fetchShopLink, shopLinkMethods, handleSubmit } = useShopLink()

    // async function fetchData(id: string) {
    //     await fetchShopLink(id)
    //     console.log('shopLink', shopLink)
    //     if (shopLink) {
    //         shopLinkMethods.reset(shopLink)
    //     } else {
    //         navigate('/shop-link')
    //     }
    // }

    const [isFetched, setIsFetched] = useState(false)

    useEffect(() => {
        if (id) {
            // fetchData(id)
            fetchShopLink(id)
            setIsFetched(true)
        } else {
            shopLinkMethods.reset()
        }
    }, [id])

    useEffect(() => {
        if (isFetched) {
            if (shopLink) {
                shopLinkMethods.reset(shopLink)
            } else {
                navigate('/shop-links')
            }
        }
    }, [shopLink])

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error || 'Fail', { variant: 'error' })
        }
    }, [error])

    useEffect(() => {
        if (success) {
            enqueueSnackbar(success || 'Successfully', { variant: 'success' })
        }
    }, [success])

    const { newShopLink } = data.pages
    const { getValues } = shopLinkMethods

    return (
        <DashboardContent>
            <CustomBreadcrumb
                title={getValues('id') ? getValues('crawlerName') : newShopLink.title}
                breadcrumnb={newShopLink.breadcrumb}
                isBack
            />
            <ShopLinkForm methods={shopLinkMethods} onSubmit={handleSubmit} loading={loading} />
        </DashboardContent>
    )
}
