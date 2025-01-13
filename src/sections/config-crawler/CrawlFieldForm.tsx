import React, { useEffect, useState } from 'react'
import {
    Button as MuiButton,
    TextField,
    Box,
    FormControl,
    Typography,
    Grid,
    Paper,
    Stack,
    styled,
    FormHelperText,
    useMediaQuery,
    IconButton,
    Select,
    MenuItem
} from '@mui/material'
import { Controller, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form'
import { enqueueSnackbar } from 'notistack'
import Button from 'src/components/button'
import { Delete } from '@mui/icons-material'
import InputController from 'src/components/controller/InputController'
import { ICrawlField } from 'src/hooks/config-crawler/config.interface'

type Props = {
    onSubmit: SubmitHandler<any>
    methods: UseFormReturn<any, any, undefined>
    loading?: boolean
    error: any
    success?: string
    productFields?: ICrawlField[]
    specificProductFields?: ICrawlField[]
    onDelete: (id: string, type: string) => Promise<void>
}

export function CrawlFieldForm({
    methods,
    onSubmit,
    loading,
    error,
    success,
    productFields,
    specificProductFields,
    onDelete
}: Props) {
    const { handleSubmit, control, getValues, setValue } = methods

    // useEffect(() => {
    //     if (error) {
    //         enqueueSnackbar(error.code, { variant: 'error' })
    //     }
    // }, [error])

    // useEffect(() => {
    //     if (success) {
    //         enqueueSnackbar(success, { variant: 'success' })
    //     }
    // }, [success])

    const isMobile = useMediaQuery('(max-width:600px)')
    // const productFields = ['product_link', 'product_name', 'product_price', 'product_image_link']
    // const specificProductFields = [
    //     'product_link',
    //     'from_category',
    //     'product_name',
    //     'product_price',
    //     'product_image_link'
    // ]
    const [selectedType, setSelectedType] = useState('product_field')

    const handleAddField = async (data: any) => {
        const response = (await onSubmit(data)) as any
        if (response.status !== 400) {
            data.id = response.data.id
            if (data.type === 'product_field') {
                if (productFields) {
                    productFields.push(data)
                }
            } else {
                if (specificProductFields) {
                    specificProductFields.push(data)
                }
            }
        }
        methods.reset()
    }

    return (
        <FormProvider {...methods}>
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <form onSubmit={handleSubmit(handleAddField)}>
                <Stack gap={2}>
                    <Stack spacing={2} sx={{ display: 'flex', alignItems: 'top', flexDirection: 'column' }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>Product Field</Typography>
                        {productFields?.map((field, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mt: 2,
                                    bgcolor: '#E3E6EA',
                                    borderRadius: 1,
                                    p: '4px'
                                }}
                            >
                                <Grid container p={1} alignItems={'center'}>
                                    <Grid item>
                                        <Stack>
                                            <Typography variant='body2'>{field.field}</Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                                <IconButton
                                    color='error'
                                    onClick={async () => {
                                        // const updatedFields = productFields.filter(
                                        //     (item) => !(item.field === field.field)
                                        // )
                                        // setValue('productFields', updatedFields)
                                        await onDelete(field.id, 'product_field')
                                        productFields.splice(
                                            productFields.findIndex((item) => item.id === field.id),
                                            1
                                        )
                                    }}
                                >
                                    <Delete fontSize='small' />
                                </IconButton>
                            </Box>
                        ))}
                    </Stack>
                    <Stack spacing={2} sx={{ display: 'flex', alignItems: 'top', flexDirection: 'column' }} mt={2}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>Specific Product Field</Typography>
                        {specificProductFields?.map((field, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mt: 2,
                                    bgcolor: '#E3E6EA',
                                    borderRadius: 1,
                                    p: '4px'
                                }}
                            >
                                <Grid container p={1} alignItems={'center'}>
                                    <Grid item>
                                        <Stack>
                                            <Typography variant='body2'>{field.field}</Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                                <IconButton
                                    color='error'
                                    onClick={async () => {
                                        // const updatedFields = specificProductFields.filter(
                                        //     (item) => !(item.field === field.field)
                                        // )
                                        await onDelete(field.id, 'specific_product_field')
                                        specificProductFields.splice(
                                            specificProductFields.findIndex((item) => item.id === field.id),
                                            1
                                        )
                                        // setValue('specificProductFields', updatedFields)
                                    }}
                                >
                                    <Delete fontSize='small' />
                                </IconButton>
                            </Box>
                        ))}
                    </Stack>
                    <Box
                        mt={2}
                        sx={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                            // flexDirection: { xs: 'column-reverse', sm: 'row' }
                        }}
                    >
                        <FormControl
                            fullWidth
                            variant='outlined'
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    // borderRadius: 3,
                                    fontSize: '14px'
                                }
                            }}
                        >
                            <InputController
                                size='small'
                                name='field'
                                label=''
                                variant='outlined'
                                placeholder='Ex: product_link'
                            />
                        </FormControl>
                        <FormControl
                            sx={{
                                width: { xs: '200px', sm: '218px' },
                                ml: [1, 2],
                                '& .MuiOutlinedInput-root': {
                                    // borderRadius: 3,
                                    fontSize: ['12px', '14px']
                                }
                            }}
                        >
                            <Select
                                size='small'
                                value={selectedType}
                                onChange={(e) => {
                                    setSelectedType(e.target.value)
                                    setValue('type', e.target.value)
                                }}
                            >
                                <MenuItem value={'product_field'}>Product</MenuItem>
                                <MenuItem value={'specific_product_field'}>Specific Product</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ mt: 0, display: 'flex', justifyContent: 'end' }}>
                        <Button loading={loading} variant='contained' type='submit'>
                            Add new
                        </Button>
                    </Box>
                </Stack>
            </form>
        </FormProvider>
    )
}
