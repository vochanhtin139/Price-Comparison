import * as yup from 'yup'

export const xPathSchema = yup.object({
    id: yup.string(),
    field: yup.string().required('Field name is required'),
    shopee: yup.string().nullable(),
    tiki: yup.string().nullable(),
    lazada: yup.string().nullable(),
    specific_shopee: yup.string().nullable(),
    specific_tiki: yup.string().nullable(),
    specific_lazada: yup.string().nullable()
})

export const crawlFieldSchema = yup.object({
    id: yup.string(),
    field: yup.string().required('Field name is required'),
    type: yup.string().required('Type is required') // product_field || specific_product_field
})

export type xPathInputs = yup.InferType<typeof xPathSchema>
export type crawlFieldInputs = yup.InferType<typeof crawlFieldSchema>
