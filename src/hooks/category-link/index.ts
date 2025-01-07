import { cleanedLink } from '../../utils/format-url';
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import ICategoryLink from './categorylink.interface'
import { categoryLinkSchema } from './domain'
import axios from 'axios'

export default function useCategoryLink() {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>(null)
    const [success, setSuccess] = useState<any>(null)
    const [categoryLinks, setCategoryLinks] = useState<ICategoryLink[]>([])
    const [categoryLink, setCategoryLink] = useState<ICategoryLink | null>(null)

    const accessToken = localStorage.getItem('accessToken')

    const fetchCategoryLinks = async () => {
        try {
            setLoading(true)
            const response = await axios.get<ICategoryLink[]>('http://localhost:8080/api/category-links', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setCategoryLinks(response.data)
            setLoading(false)
        } catch (err: any) {
            console.error(err)
            setError(err)
            setLoading(false)
        }
    }

    const fetchCategoryLink = async (id: string) => {
        try {
            setLoading(true)
            const response = await axios.get<ICategoryLink>(`http://localhost:8080/api/category-links/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setCategoryLink(response.data)
            setLoading(false)
        } catch (err: any) {
            console.error(err)
            setError(err)
            setLoading(false)
        }
    }

    const categoryLinkMethods = useForm({
        resolver: yupResolver(categoryLinkSchema),
        defaultValues: {
            crawlerName: '',
            categoryLink: '',
            ecommerceSite: ''
        }
    })

    const handleSubmit: SubmitHandler<ICategoryLink> = async (data) => {
        // cleaned link before submitting
        data.categoryLink = cleanedLink(data.categoryLink)
        try {
            setLoading(true)
            if (data.id) {
                // Update existing CategoryLink (PUT request)
                const response = await axios.put<ICategoryLink>(`http://localhost:8080/api/category-links/${data.id}`, data, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                setSuccess('Updated successfully')
            } else {
                // Create a new CategoryLink (POST request)
                const response = await axios.post<ICategoryLink>('http://localhost:8080/api/category-links', data, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                setSuccess('Created successfully')
            }
            setLoading(false)
        } catch (err: any) {
            console.error(err)
            setError(err)
            setLoading(false)
        }
    }

    // const handleDelete = async (id: string) => {
    //     await deleteCategoryLink(setLoading, setError, setSuccess, id)
    // }

    return {
        loading,
        error,
        success,
        categoryLinks,
        categoryLink,
        fetchCategoryLinks,
        fetchCategoryLink,
        categoryLinkMethods,
        handleSubmit
    }
}
