import { cleanedLink } from './../../utils/format-url'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import IShopLink from './shoplink.interface'
import { shopLinkSchema } from './domain'
import axios from 'axios'

const API_ENDPOINT_URL = 'http://localhost:8080/api'
// const API_ENDPOINT_URL = 'https://price-comparison.site/api'
export default function useShopLink() {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>(null)
    const [success, setSuccess] = useState<any>(null)
    const [shopLinks, setShopLinks] = useState<IShopLink[]>([])
    const [shopLink, setShopLink] = useState<IShopLink | null>(null)

    const accessToken = localStorage.getItem('accessToken')

    const fetchShopLinks = async () => {
        try {
            setLoading(true)
            const response = await axios.get<IShopLink[]>(`${API_ENDPOINT_URL}/shop-links`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setShopLinks(response.data)
            setLoading(false)
        } catch (err: any) {
            console.error(err)
            setError(err)
            setLoading(false)
        }
    }

    const fetchShopLink = async (id: string) => {
        try {
            setLoading(true)
            const response = await axios.get<IShopLink>(`${API_ENDPOINT_URL}/shop-links/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setShopLink(response.data)
            setLoading(false)
        } catch (err: any) {
            console.error(err)
            setError(err)
            setLoading(false)
        }
    }

    const shopLinkMethods = useForm({
        resolver: yupResolver(shopLinkSchema),
        defaultValues: {
            crawlerName: '',
            shopLink: '',
            ecommerceSite: ''
        }
    })

    const handleSubmit: SubmitHandler<IShopLink> = async (data) => {
        // cleaned link before submitting
        data.shopLink = cleanedLink(data.shopLink)
        try {
            setLoading(true)
            if (data.id) {
                // Update existing ShopLink (PUT request)
                const response = await axios.put<IShopLink>(
                    `${API_ENDPOINT_URL}/shop-links/${data.id}`,
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    }
                )
                setSuccess('Updated successfully')
            } else {
                // Create a new ShopLink (POST request)
                const response = await axios.post<IShopLink>(`${API_ENDPOINT_URL}/shop-links`, data, {
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
    //     await deleteShopLink(setLoading, setError, setSuccess, id)
    // }

    return {
        loading,
        error,
        success,
        shopLinks,
        shopLink,
        fetchShopLinks,
        fetchShopLink,
        shopLinkMethods,
        handleSubmit
    }
}
