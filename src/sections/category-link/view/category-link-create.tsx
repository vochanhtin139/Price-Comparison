import { useState, useCallback, useEffect } from 'react'
import data from 'src/data/index.json'

// import { _users } from 'src/_mock'
import { DashboardContent } from 'src/layouts/dashboard'

import useCategoryLink from 'src/hooks/category-link'
import ICategoryLink from 'src/hooks/category-link/categorylink.interface'
import { Breadcrumbs } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useNavigate, useParams } from 'react-router-dom'
import CustomBreadcrumb from 'src/components/customBreadcrumb'
import CategoryLinkForm from './category-link-form'

// ----------------------------------------------------------------------

export function CategoryLinkCreate() {
    const { id } = useParams()
    console.log('id', id)
    const navigate = useNavigate()
    const { loading, error, success, categoryLink, fetchCategoryLink, categoryLinkMethods, handleSubmit } =
        useCategoryLink()

    const [isFetched, setIsFetched] = useState(false)

    useEffect(() => {
        if (id) {
            // fetchData(id)
            fetchCategoryLink(id)
            setIsFetched(true)
        } else {
            categoryLinkMethods.reset()
        }
    }, [id])

    useEffect(() => {
        if (isFetched) {
            if (categoryLink) {
                categoryLinkMethods.reset(categoryLink)
            } else {
                navigate('/category-links')
            }
        }
    }, [categoryLink])

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

    const { newCategoryLink } = data.pages
    const { getValues } = categoryLinkMethods

    return (
        <DashboardContent>
            <CustomBreadcrumb
                title={getValues('id') ? getValues('crawlerName') : newCategoryLink.title}
                breadcrumnb={newCategoryLink.breadcrumb}
                isBack
            />
            <CategoryLinkForm methods={categoryLinkMethods} onSubmit={handleSubmit} loading={loading} />
        </DashboardContent>
    )
}
