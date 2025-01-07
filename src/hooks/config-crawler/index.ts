import { cleanedLink } from '../../utils/format-url'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import IXPath, { ICrawlField } from './config.interface'
import { crawlFieldSchema, xPathSchema } from './domain'

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
            const response = await axios.get<IXPath[]>('http://localhost:8080/api/xpath', {
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
        let url = `http://localhost:8080/api/product-field`
        if (type === 'specific_product_field') url = `http://localhost:8080/api/specific-product-field`
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
            specific_shopee: '',
            specific_tiki: '',
            specific_lazada: ''
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
        try {
            setLoading(true)
            if (data.id) {
                // Update existing XPath (PUT request)
                const response = await axios.put<IXPath>(`http://localhost:8080/api/xpath/${data.id}`, data, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                setSuccess('Updated successfully')
            } else {
                // Create a new XPath (POST request)
                const response = await axios.post<IXPath>('http://localhost:8080/api/xpath', data, {
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

    const handleSubmitCrawlField: SubmitHandler<ICrawlField> = async (data) => {
        let url = `http://localhost:8080/api/product-field`
        if (data.type === 'specific_product_field') url = `http://localhost:8080/api/specific-product-field`
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
            } else {
                // Create a new CrawlField (POST request)
                const response = await axios.post<ICrawlField>(url, data, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                setSuccess2('Created successfully')
            }
            setLoading2(false)
        } catch (err: any) {
            console.error(err)
            setError2(err)
            setLoading2(false)
        }
    }

    const handleDeleteXPath = async (id: string) => {
        try {
            setLoading(true)
            await axios.delete(`http://localhost:8080/api/xpath/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setSuccess('Deleted successfully')
            setLoading(false)
        } catch (err: any) {
            console.error(err)
            setError(err)
            setLoading(false)
        }
    }

    const handleDeleteCrawlField = async (id: string, type: string) => {
        let url = `http://localhost:8080/api/product-field`
        if (type === 'specific_product_field') url = `http://localhost:8080/api/specific-product-field`
        try {
            setLoading2(true)
            await axios.delete(`${url}/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setSuccess2('Deleted successfully')
            setLoading2(false)
        } catch (err: any) {
            console.error(err)
            setError2(err)
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
