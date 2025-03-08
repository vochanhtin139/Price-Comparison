import * as yup from 'yup'

export const productLinkSchema = yup.object({
    id: yup.string(),
    crawlerName: yup.string().required('Crawler name is required'),
    productLink: yup.string().required('Product link is required'),
    ecommerceSite: yup.string().required('E-commerce site is required')
})

export type productLinkInputs = yup.InferType<typeof productLinkSchema>
