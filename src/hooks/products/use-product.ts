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

    // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
    const API_BASE_URL = 'http://localhost:8080/api'
    // const API_BASE_URL = 'https://price-comparison.site/api'

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
            // url = `${API_BASE_URL}/all-${type === 'categoryLink' ? 'specific-' : ''}${ecommerceSite}-product?id=${id}`
            url = `${API_BASE_URL}/all-${ecommerceSite}-product?id=${id}`
        }
        try {
            setLoading(true)
            const response = await axios.get<IProduct[]>(url, {
                headers: {
                    'Access-Control-Allow-Origin': '*', // Allows all origins
                    Authorization: `Bearer ${accessToken}`
                }
            })
            console.log('fetchProductsById response', response.data)
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

    const fetchProductOptions = async (productLink: string): Promise<string[][] | null> => {
        try {
            const response = await axios.post<string[][]>(
                `${API_BASE_URL}/get-products-options`,
                { productLink },
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            return response.data
        } catch (err: any) {
            console.error('Failed to fetch product options:', err)
            setError(err.message || 'Failed to fetch product options')
            return null
        }
    }

    const fetchHistoricalData = async (productLink: string, choices?: string[]): Promise<string[][] | null> => {
        try {
            console.log('productLink', productLink)
            console.log('choices', choices)
            const response = await axios.post<string[][]>(
                `${API_BASE_URL}/get-historical-data`,
                // { productLink },
                choices?.length ? { productLink, choices } : { productLink },
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            return response.data
        } catch (err: any) {
            console.error('Failed to fetch historical data:', err)
            setError(err.message || 'Failed to fetch historical data')
            return null
        }
    }

    const fetchSearchProductResult = async (name: string) => {
        try {
            console.log('fetchSearchProductResult', name)
            setLoading(true)
            const response = await axios.get(`${API_BASE_URL}/typesense-search-product`, {
                params: { name },
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            })
            console.log('search product result', response.data)
            const allProducts = [
                ...(response.data.relatedProductsLazada.map((item: any) => item.hits[0].document) || []),
                ...(response.data.relatedProductsShopee.map((item: any) => item.hits[0].document) || []),
                ...(response.data.relatedProductsTiki.map((item: any) => item.hits[0].document) || [])
                // ...response.data.relatedProductsShopee,
                // ...response.data.relatedProductsTiki
            ]
            // console.log('allProducts', allProducts)
            const formattedProducts = allProducts.map((product: any) => ({
                id: product.id,
                productLinkId: product.product_link_id,
                productName: product.product_name,
                productPrice: product.product_price ?? 0,
                productLink: product.product_link,
                productImageLink: Array.isArray(product.product_image_link)
                    ? product.product_image_link[0] // lấy ảnh đầu tiên nếu là mảng
                    : product.product_image_link,
                productRating: product.product_rating,
                shopLink: product.shop_link || null,
                crawlTime: product.crawl_time || null,
                ecommerceSite: product.shop_link?.includes('lazada')
                    ? 'lazada'
                    : product.shop_link?.includes('shopee')
                        ? 'shopee'
                        : 'tiki',
            }));
            console.log('formattedProducts', formattedProducts)
            setProducts(formattedProducts)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching product detail:', error)
            setError('Failed to fetch product detail')
            setLoading(false)
        }
    }

    // const fetchPriceComparisonDetail = async (name: string) => {
    //     try {
    //         setLoading(true)
    //         const response = await axios.get(`${API_BASE_URL}/typesense-price-comparison-detail`, {
    //             params: { name },
    //             headers: {
    //                 'Access-Control-Allow-Origin': '*',
    //                 Authorization: `Bearer ${accessToken}`,
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //         console.log('search product result', response.data)
    //         const allProducts = [
    //             ...response.data.relatedProductsLazada,
    //             ...response.data.relatedProductsShopee,
    //             ...response.data.relatedProductsTiki
    //         ]
    //         setProducts(allProducts)
    //         setLoading(false)
    //     } catch (error) {
    //         console.error('Error fetching product detail:', error)
    //         setError('Failed to fetch product detail')
    //         setLoading(false)
    //     }
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
        fetchShopeeProductByName,
        fetchProductOptions,
        fetchHistoricalData,
        fetchSearchProductResult
        // handleCreateShopeeProduct
    }
}
