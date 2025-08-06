import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import IProductLink from './productlink.interface'
import { productLinkSchema } from './domain'
import axios from 'axios'

// const API_ENDPOINT_URL = 'http://localhost:8080/api'
const API_ENDPOINT_URL = 'https://price-comparison.site/api'

export default function useProductLink() {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>(null)
    const [success, setSuccess] = useState<any>(null)
    const [productLinks, setProductLinks] = useState<IProductLink[]>([])
    const [productLink, setProductLink] = useState<IProductLink | null>(null)

    const accessToken = localStorage.getItem('accessToken')

    const fetchProductLinks = async () => {
        try {
            setLoading(true)
            const response = await axios.get<IProductLink[]>(`${API_ENDPOINT_URL}/product-links`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setProductLinks(response.data)
            setLoading(false)
        } catch (err: any) {
            console.error(err)
            setError(err)
            setLoading(false)
        }
    }

    const fetchProductLink = async (id: string) => {
        try {
            setLoading(true)
            const response = await axios.get<IProductLink>(`${API_ENDPOINT_URL}/product-links/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setProductLink(response.data)
            setLoading(false)
        } catch (err: any) {
            console.error(err)
            setError(err)
            setLoading(false)
        }
    }

    const productLinkMethods = useForm({
        resolver: yupResolver(productLinkSchema),
        defaultValues: {
            crawlerName: '',
            productLink: '',
            ecommerceSite: ''
        }
    })

    const handleSubmit: SubmitHandler<IProductLink> = async (data) => {
        try {
            setLoading(true)
            if (data.id) {
                // Update existing ProductLink (PUT request)
                const response = await axios.put<IProductLink>(
                    `${API_ENDPOINT_URL}/product-links/${data.id}`,
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    }
                )
                setSuccess('Updated successfully')
            } else {
                // Create a new ProductLink (POST request)
                const response = await axios.post<IProductLink>(
                    `${API_ENDPOINT_URL}/product-links`,
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    }
                )
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
    //     await deleteProductLink(setLoading, setError, setSuccess, id)
    // }

    return {
        loading,
        error,
        success,
        productLinks,
        productLink,
        fetchProductLinks,
        fetchProductLink,
        productLinkMethods,
        handleSubmit
    }
}
