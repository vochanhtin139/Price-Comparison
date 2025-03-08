import * as yup from 'yup'

export const shopLinkSchema = yup.object({
    id: yup.string(),
    crawlerName: yup.string().required('Crawler name is required'),
    shopLink: yup.string().required('Shop link is required'),
    ecommerceSite: yup.string().required('E-commerce site is required')
})

export type shopLinkInputs = yup.InferType<typeof shopLinkSchema>
