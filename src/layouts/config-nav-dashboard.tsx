import { Label } from 'src/components/label'
import { SvgColor } from 'src/components/svg-color'

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor width='100%' height='100%' src={`/admin/assets/icons/navbar/${name}.svg`} />

export const navData = [
    {
        title: 'Dashboard',
        path: '/',
        icon: icon('ic-analytics')
    },
    {
        title: 'User',
        path: '/user',
        icon: icon('ic-user')
    },
    // {
    //     title: 'Product',
    //     path: '/products',
    //     icon: icon('ic-cart'),
    //     info: (
    //         <Label color='error' variant='inverted'>
    //             +3
    //         </Label>
    //     )
    // },
    {
        title: 'Shop crawler',
        path: '/shop-links',
        icon: icon('ic-cart')
    },
    {
        title: 'Category crawler',
        path: '/category-links',
        icon: icon('ic-cart')
    },
    {
        title: 'Product crawler',
        path: '/product-links',
        icon: icon('ic-cart')
    },
    {
        title: 'Search product',
        path: '/search-product',
        icon: icon('ic-search')
    },
    {
        title: 'Configurations',
        path: '/configurations',
        icon: icon('ic-lock')
    }
    // {
    //   title: 'Blog',
    //   path: '/blog',
    //   icon: icon('ic-blog'),
    // },
    // {
    //     title: 'Sign in',
    //     path: '/sign-in',
    //     icon: icon('ic-lock')
    // },
    // {
    //     title: 'Not found',
    //     path: '/404',
    //     icon: icon('ic-disabled')
    // }
]
