import { cleanedLink } from './../../utils/format-url'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { createShop, getAllShops } from 'src/api/api'

import IProduct from './product.interface'

// ----------------------------------------------------------------------

export default function useProduct() {
    const [shopeeProducts, setShopeeProducts] = useState<IProduct[]>([])
    const [products, setProducts] = useState<IProduct[]>([])
    const [shopeeProduct, setShopeeProduct] = useState<IProduct | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const [isValid, setIsValid] = useState<boolean | null>(null)

    const accessToken = localStorage.getItem('accessToken')

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

    const fetchShopeeProducts = async () => {
        try {
            setLoading(true)
            const response = await axios.get<IProduct[]>(`${API_BASE_URL}/shopee-products`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setShopeeProducts(response.data)
            setLoading(false)
        } catch (err: any) {
            console.error(err)
            setError(err)
            setLoading(false)
        }
    }

    const fetchShopeeProductById = async (id: string) => {
        try {
            setLoading(true)
            const response = await axios.get<IProduct>(`${API_BASE_URL}/shopee-product?id=${id}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*', // Allows all origins
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setShopeeProduct(response.data)
            setLoading(false)
        } catch (err: any) {
            console.error(err)
            setError(err)
            setLoading(false)
        }
    }

    const fetchShopeeProductsById = async (id: string) => {
        try {
            setLoading(true)
            // const response = await axios.get<IProduct[]>(`${API_BASE_URL}/all-shopee-product?productName=${name}`);
            const response = await axios.get<IProduct[]>(`${API_BASE_URL}/all-shopee-product?id=${id}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*', // Allows all origins
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setShopeeProducts(response.data)
            setLoading(false)
        } catch (err: any) {
            console.error(err)
            setError(err)
            setLoading(false)
        }
    }

    const fetchProductsById = async (
        id: string,
        ecommerceSite: string,
        type: 'shopLink' | 'categoryLink',
        productLink: string | null
    ) => {
        // console.log('productLinkId', id)
        let url
        if (id === 'null' && productLink) {
            const encodedLink = encodeURIComponent(encodeURI(productLink))
            url = `${API_BASE_URL}/all-specific-${ecommerceSite}-product?productLink=${encodedLink}`
        } else {
            url = `${API_BASE_URL}/all-${type === 'categoryLink' ? 'specific-' : ''}${ecommerceSite}-product?id=${id}`
        }
        try {
            setLoading(true)
            const response = await axios.get<IProduct[]>(url, {
                headers: {
                    'Access-Control-Allow-Origin': '*', // Allows all origins
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setProducts(response.data)
            setLoading(false)
        } catch (err: any) {
            console.error(err)
            setError(err)
            setLoading(false)
        }
    }

    const fetchShopeeProductByName = async (name: string) => {
        try {
            setLoading(true)
            const response = await axios.get<IProduct>(`${API_BASE_URL}/shopee-product?productLink=${name}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*', // Allows all origins
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setShopeeProduct(response.data)
            setLoading(false)
        } catch (err: any) {
            console.error(err)
            setError(err)
            setLoading(false)
        }
    }

    const fetchShopeeProductsByName = async (name: string) => {
        try {
            setLoading(true)
            const response = await axios.get<IProduct[]>(`${API_BASE_URL}/all-shopee-product?productName=${name}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*', // Allows all origins
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setShopeeProducts(response.data)
            setLoading(false)
        } catch (err: any) {
            console.error(err)
            setError(err)
            setLoading(false)
        }
    }

    const fetchProductsByShopLink = async (shopLink: string, ecommerceSite: string) => {
        try {
            setLoading(true)
            const response = await axios.get<IProduct[]>(
                `${API_BASE_URL}/all-${ecommerceSite}-product?shopLink=${shopLink}`,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*', // Allows all origins
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )
            setProducts(response.data)
            setLoading(false)
        } catch (err: any) {
            console.error(err)
            setError(err)
            setLoading(false)
        }
    }

    const fetchProductsByKeyword = async (keyword: string) => {
        try {
            setLoading(true)
            const allProducts = []

            let response
            response = await axios.get<IProduct[]>(`${API_BASE_URL}/all-specific-tiki-product?keyword=${keyword}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*', // Allows all origins
                    Authorization: `Bearer ${accessToken}`
                }
            })
            allProducts.push(...response.data)

            response = await axios.get<IProduct[]>(`${API_BASE_URL}/all-specific-lazada-product?keyword=${keyword}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*', // Allows all origins
                    Authorization: `Bearer ${accessToken}`
                }
            })
            allProducts.push(...response.data)

            response = await axios.get<IProduct[]>(`${API_BASE_URL}/all-specific-shopee-product?keyword=${keyword}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*', // Allows all origins
                    Authorization: `Bearer ${accessToken}`
                }
            })
            allProducts.push(...response.data)

            response = await axios.get<IProduct[]>(`${API_BASE_URL}/all-tiki-product?keyword=${keyword}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*', // Allows all origins
                    Authorization: `Bearer ${accessToken}`
                }
            })
            allProducts.push(...response.data)

            response = await axios.get<IProduct[]>(`${API_BASE_URL}/all-lazada-product?keyword=${keyword}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*', // Allows all origins
                    Authorization: `Bearer ${accessToken}`
                }
            })
            allProducts.push(...response.data)

            response = await axios.get<IProduct[]>(`${API_BASE_URL}/all-shopee-product?keyword=${keyword}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*', // Allows all origins
                    Authorization: `Bearer ${accessToken}`
                }
            })
            allProducts.push(...response.data)

            setProducts(allProducts)
            // setProducts(response.data)
            setLoading(false)
        } catch (err: any) {
            console.error(err)
            setError(err)
            setLoading(false)
        }
    }

    const fetchProductsByCategoryLink = async (categoryLink: string, ecommerceSite: string) => {
        const fromCategory = encodeURIComponent(encodeURI(categoryLink))
        try {
            setLoading(true)
            const response = await axios.get<IProduct[]>(
                `${API_BASE_URL}/all-specific-${ecommerceSite}-product?fromCategory=${fromCategory}`,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*', // Allows all origins
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )
            setProducts(response.data)
            setLoading(false)
        } catch (err: any) {
            console.error(err)
            setError(err)
            setLoading(false)
        }
    }

    const findAllTables = async (
        column: string,
        value: string,
        operator: string,
        productRating: string,
        priceRange: [number, number]
    ) => {
        try {
            const headers = {
                'Access-Control-Allow-Origin': '*',
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }

            const body = JSON.stringify({ column, operator, value, productRating, priceRange })

            // let response
            const cateProducts: IProduct[] = []
            // const response = await axios.post<IProduct[]>(`${API_BASE_URL}/all-specific-tiki-product`, body, {
            //     headers
            // })
            const response = await axios.post<IProduct[]>(`${API_BASE_URL}/all-specific-tiki-product`, body, {
                headers
            })
            console.log('response.data', response.data)
            cateProducts.push(...response.data)

            // response = await axios.get<IProduct[]>(`${API_BASE_URL}/all-specific-lazada-product`, body, {
            //     headers
            // })
            // cateProducts.push(...response.data)

            // response = await axios.get<IProduct[]>(`${API_BASE_URL}/all-specific-shopee-product`, body, {
            //     headers
            // })
            // cateProducts.push(...response.data)

            // cateProducts.forEach((product) => {
            //     product.type = 'categoryLink'
            // })

            // const shopProducts = []
            // response = await axios.get<IProduct[]>(`${API_BASE_URL}/all-tiki-product`, body, {
            //     headers
            // })
            // shopProducts.push(...response.data)

            // response = await axios.get<IProduct[]>(`${API_BASE_URL}/all-lazada-product`, body, {
            //     headers
            // })
            // shopProducts.push(...response.data)

            // response = await axios.get<IProduct[]>(`${API_BASE_URL}/all-shopee-product`, body, {
            //     headers
            // })
            // shopProducts.push(...response.data)

            // shopProducts.forEach((product) => {
            //     product.type = 'shopLink'
            // })

            // const allProducts = [...cateProducts, ...shopProducts]
            const allProducts = [...cateProducts]
            return allProducts
        } catch (err: any) {
            console.error(err)
        }
    }

    const fetchProductsByFilters = async (filters: any) => {
        try {
            setLoading(true)
            // const allProducts = await findAllTables('filters', filters)
            const allProducts = []
            // if (filters.product_name) {
            //     const items = await findAllTables('keyword', filters.product_name)
            //     if (items) {
            //         allProducts.push(...items)
            //     }
            // }

            if (filters.column && filters.value && filters.operator) {
                const items = await findAllTables(
                    filters.column,
                    filters.value,
                    filters.operator,
                    filters.productRating,
                    filters.priceRange
                )
                if (items) {
                    allProducts.push(...items)
                }
            }

            setProducts(allProducts)
            setLoading(false)
        } catch (err: any) {
            console.error(err)
            setError(err)
            setLoading(false)
        }
    }

    // const handleCreateShopeeProduct = async (product: any) => {
    //   try {
    //     const data = await createShop(product);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }

    return {
        loading,
        error,
        success,
        shopeeProducts,
        products,
        fetchProductsByKeyword,
        fetchProductsByFilters,
        fetchProductsByShopLink,
        fetchProductsByCategoryLink,
        fetchProductsById,
        fetchShopeeProducts,
        fetchShopeeProductsById,
        fetchShopeeProductsByName,
        shopeeProduct,
        fetchShopeeProductById,
        fetchShopeeProductByName
        // handleCreateShopeeProduct
    }
}
