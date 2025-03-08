import * as yup from 'yup'

export const categoryLinkSchema = yup.object({
    id: yup.string(),
    crawlerName: yup.string().required('Crawler name is required'),
    categoryLink: yup.string().required('Category link is required'),
    ecommerceSite: yup.string().required('E-commerce site is required')
})

export type categoryLinkInputs = yup.InferType<typeof categoryLinkSchema>
