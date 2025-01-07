import { useState, useCallback, useEffect } from 'react'
import data from 'src/data/index.json'

// import { _users } from 'src/_mock'
import { DashboardContent } from 'src/layouts/dashboard'

import useProductLink from 'src/hooks/product-link'
import IProductLink from 'src/hooks/product-link/productlink.interface'
import { Breadcrumbs } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useNavigate, useParams } from 'react-router-dom'
import CustomBreadcrumb from 'src/components/customBreadcrumb'
import ProductLinkForm from './product-link-form'

// ----------------------------------------------------------------------

export function ProductLinkCreate() {
    const { id } = useParams()
    console.log('id', id)
    const navigate = useNavigate()
    const { loading, error, success, productLink, fetchProductLink, productLinkMethods, handleSubmit } = useProductLink()

    // async function fetchData(id: string) {
    //     await fetchProductLink(id)
    //     console.log('productLink', productLink)
    //     if (productLink) {
    //         productLinkMethods.reset(productLink)
    //     } else {
    //         navigate('/product-link')
    //     }
    // }

    const [isFetched, setIsFetched] = useState(false)

    useEffect(() => {
        if (id) {
            // fetchData(id)
            fetchProductLink(id)
            setIsFetched(true)
        } else {
            productLinkMethods.reset()
        }
    }, [id])

    useEffect(() => {
        if (isFetched) {
            if (productLink) {
                productLinkMethods.reset(productLink)
            } else {
                navigate('/product-links')
            }
        }
    }, [productLink])

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

    const { newProductLink } = data.pages
    console.log('newProductLink', newProductLink)
    const { getValues } = productLinkMethods
    
    console.log('getValues', getValues())

    return (
        <DashboardContent>
            <CustomBreadcrumb
                title={getValues('id') ? getValues('crawlerName') : newProductLink.title}
                breadcrumnb={newProductLink.breadcrumb}
                isBack
            />
            <ProductLinkForm methods={productLinkMethods} onSubmit={handleSubmit} loading={loading} />
        </DashboardContent>
    )
}
