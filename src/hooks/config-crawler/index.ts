import { cleanedLink } from '../../utils/format-url'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import IXPath, { ICrawlField } from './config.interface'
import { crawlFieldSchema, xPathSchema } from './domain'
import { enqueueSnackbar } from 'notistack'

// const API_ENDPOINT_URL = 'http://localhost:8080/api'
const API_ENDPOINT_URL = 'http://localhost:8080/api'
export default function useConfig() {
    const [loading, setLoading] = useState<boolean>(false)
    const [loading2, setLoading2] = useState<boolean>(false)
    const [error, setError] = useState<any>(null)
    const [error2, setError2] = useState<any>(null)
    const [success, setSuccess] = useState<any>(null)
    const [success2, setSuccess2] = useState<any>(null)
    const [xPaths, setXPaths] = useState<IXPath[]>([])
    const [productFields, setProductFields] = useState<ICrawlField[]>([])
    const [specificProductFields, setSpecificProductFields] = useState<ICrawlField[]>([])

    const accessToken = localStorage.getItem('accessToken')

    const fetchXPaths = async () => {
        try {
            setLoading(true)
            const response = await axios.get<IXPath[]>(`${API_ENDPOINT_URL}/xpath`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setXPaths(response.data)
            setLoading(false)
        } catch (err: any) {
            console.error(err)
            setError(err)
            setLoading(false)
        }
    }

    const fetchCrawlFields = async (type: string) => {
        let url = `${API_ENDPOINT_URL}/product-field`
        if (type === 'specific_product_field') url = `${API_ENDPOINT_URL}/specific-product-field`
        try {
            setLoading2(true)
            const response = await axios.get<ICrawlField[]>(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            // setCrawlFields(response.data)
            if (type === 'product_field') setProductFields(response.data)
            else setSpecificProductFields(response.data)
            setLoading2(false)
        } catch (err: any) {
            console.error(err)
            setError2(err)
            setLoading2(false)
        }
    }

    const xPathMethods = useForm({
        resolver: yupResolver(xPathSchema),
        defaultValues: {
            field: '',
            shopee: '',
            tiki: '',
            lazada: '',
            specificShopee: '',
            specificTiki: '',
            specificLazada: '',
            value: '',
            page: ''
        }
    })

    const crawlFieldMethods = useForm({
        resolver: yupResolver(crawlFieldSchema),
        defaultValues: {
            field: '',
            type: 'product_field'
        }
    })

    const handleSubmitXPath: SubmitHandler<IXPath> = async (data) => {
        console.log(data)
        try {
            setLoading(true)
            if (data.id) {
                // Update existing XPath (PUT request)
                const response = await axios.put<IXPath>(`${API_ENDPOINT_URL}/xpath/${data.id}`, data, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                setSuccess('Updated successfully')
                enqueueSnackbar('Updated successfully', { variant: 'success' })
            } else {
                // Create a new XPath (POST request)
                const response = await axios.post<IXPath>(`${API_ENDPOINT_URL}/xpath`, data, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                setSuccess('Created successfully')
                enqueueSnackbar('Created successfully', { variant: 'success' })
                setLoading(false)
                return response.data.id
            }
            setLoading(false)
        } catch (err: any) {
            console.error(err)
            setError(err)
            enqueueSnackbar(err, { variant: 'error' })
            setLoading(false)
        }
    }

    const handleSubmitCrawlField: SubmitHandler<ICrawlField> = async (data) => {
        let url = `${API_ENDPOINT_URL}/product-field`
        if (data.type === 'specific_product_field') url = `${API_ENDPOINT_URL}/specific-product-field`
        try {
            setLoading2(true)
            if (data.id) {
                // Update existing CrawlField (PUT request)
                const response = await axios.put<ICrawlField>(`${url}/${data.id}`, data, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                setSuccess2('Updated successfully')
                enqueueSnackbar('Updated successfully', { variant: 'success' })
            } else {
                // Create a new CrawlField (POST request)
                const response = await axios.post<ICrawlField>(url, data, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                console.log(response)
                setSuccess2('Created successfully')
                enqueueSnackbar('Created successfully', { variant: 'success' })
                setLoading2(false)
                return response
            }
            setLoading2(false)
        } catch (err: any) {
            console.error(err)
            setError2(err)
            enqueueSnackbar(err, { variant: 'error' })
            setLoading2(false)
        }
    }

    const handleDeleteXPath = async (id: string) => {
        try {
            setLoading(true)
            await axios.delete(`${API_ENDPOINT_URL}/xpath/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setSuccess('Deleted successfully')
            enqueueSnackbar('Deleted successfully', { variant: 'success' })
            setLoading(false)
        } catch (err: any) {
            console.error(err)
            setError(err)
            enqueueSnackbar(err, { variant: 'error' })
            setLoading(false)
        }
    }

    const handleDeleteCrawlField = async (id: string, type: string) => {
        let url = `${API_ENDPOINT_URL}/product-field`
        if (type === 'specific_product_field') url = `${API_ENDPOINT_URL}/specific-product-field`
        try {
            setLoading2(true)
            await axios.delete(`${url}/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setSuccess2('Deleted successfully')
            enqueueSnackbar('Deleted successfully', { variant: 'success' })
            setLoading2(false)
        } catch (err: any) {
            console.error(err)
            setError2(err)
            enqueueSnackbar(err, { variant: 'error' })
            setLoading2(false)
        }
    }

    return {
        loading,
        error,
        success,
        loading2,
        error2,
        success2,
        fetchXPaths,
        fetchCrawlFields,
        xPathMethods,
        crawlFieldMethods,
        xPaths,
        productFields,
        specificProductFields,
        handleSubmitXPath,
        handleSubmitCrawlField,
        handleDeleteXPath,
        handleDeleteCrawlField
    }
}
