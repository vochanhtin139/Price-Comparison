// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types'
import { lazy, Suspense, useState, useEffect } from 'react'
import { Outlet, Navigate, useRoutes } from 'react-router-dom'

import Box from '@mui/material/Box'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'

import { varAlpha } from 'src/theme/styles'
import { AuthLayout } from 'src/layouts/auth'
import { DashboardLayout } from 'src/layouts/dashboard'
import { ProductDetailPage } from 'src/sections/product/view/product-detail-page'
import { ShopLinkCreate } from 'src/sections/shop-link/view/shop-link-create'
import { ProductLinkCreate } from 'src/sections/product-link/view/product-link-create'
import { CategoryLinkCreate } from 'src/sections/category-link/view/category-link-create'

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'))
export const BlogPage = lazy(() => import('src/pages/blog'))
export const UserPage = lazy(() => import('src/pages/user'))
export const SignInPage = lazy(() => import('src/pages/sign-in'))
// eslint-disable-next-line import/no-cycle
export const ProductsPage = lazy(() => import('src/pages/products'))
export const ShopCrawlerPage = lazy(() => import('src/pages/shop-crawler'))
export const CategoryCrawlerPage = lazy(() => import('src/pages/category-crawler'))
export const ProductCrawlerPage = lazy(() => import('src/pages/product-crawler'))
export const SearchProductPage = lazy(() => import('src/pages/search-product'))
export const ConfigurationPage = lazy(() => import('src/pages/config-crawler'))
export const Page404 = lazy(() => import('src/pages/page-not-found'))

// ----------------------------------------------------------------------

interface ProtectedRouteProps {
    children: React.ReactNode // Proper type for children
}

export const renderFallback = (
    <Box display='flex' alignItems='center' justifyContent='center' flex='1 1 auto'>
        <LinearProgress
            sx={{
                width: 1,
                maxWidth: 320,
                bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
                [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' }
            }}
        />
    </Box>
)

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//   const accessToken = localStorage.getItem('accessToken'); // Check for token in localStorage
//   return accessToken ? <>{children}</> : <Navigate to="/sign-in" replace />;
// };

const API_ENDPOINT_URL = 'http://localhost:8080/api'
// const API_ENDPOINT_URL = 'https://price-comparison.site/api'
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const [isValid, setIsValid] = useState<boolean | null>(null)

    useEffect(() => {
        const validateToken = async () => {
            const accessToken = localStorage.getItem('accessToken')
            if (!accessToken) {
                setIsValid(false)
                return
            }

            try {
                const response = await fetch(`${API_ENDPOINT_URL}/auth/verify-token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`
                        // 'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
                    }
                })

                if (response.ok) {
                    setIsValid(true)
                } else {
                    setIsValid(false)
                }
            } catch (error) {
                setIsValid(false)
            }
        }

        validateToken()
    }, [])

    if (isValid === null) return renderFallback

    return isValid ? <>{children}</> : <Navigate to='/sign-in' replace />
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired // Explicit validation for children prop
}

export function Router() {
    return useRoutes([
        {
            element: (
                <ProtectedRoute>
                    <DashboardLayout>
                        <Suspense fallback={renderFallback}>
                            <Outlet />
                        </Suspense>
                    </DashboardLayout>
                </ProtectedRoute>
            ),
            children: [
                { element: <HomePage />, index: true },
                { path: 'user', element: <UserPage /> },
                { path: 'products', element: <ProductsPage /> },
                // { path: 'product/:id', element: <ProductDetailPage /> },
                { path: 'product-detail/:id', element: <ProductDetailPage /> },
                { path: 'blog', element: <BlogPage /> },
                { path: 'shop-links', element: <ShopCrawlerPage /> },
                { path: 'shop-link/:id', element: <ShopLinkCreate /> },
                { path: 'shop-link/new', element: <ShopLinkCreate /> },
                { path: 'category-links', element: <CategoryCrawlerPage /> },
                { path: 'category-link/:id', element: <CategoryLinkCreate /> },
                { path: 'category-link/new', element: <CategoryLinkCreate /> },
                { path: 'product-links', element: <ProductCrawlerPage /> },
                { path: 'product-link/:id', element: <ProductLinkCreate /> },
                { path: 'product-link/new', element: <ProductLinkCreate /> },
                { path: 'search-product', element: <SearchProductPage /> },
                { path: 'configurations', element: <ConfigurationPage /> }
            ]
        },
        {
            path: 'sign-in',
            element: (
                <AuthLayout>
                    <SignInPage />
                </AuthLayout>
            )
        },
        {
            path: '404',
            element: <Page404 />
        },
        {
            path: '*',
            element: <Navigate to='/404' replace />
        }
    ])
}
