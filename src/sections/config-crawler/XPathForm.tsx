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
    Select,
    MenuItem
} from '@mui/material'
import { Controller, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form'
import { enqueueSnackbar } from 'notistack'
import Button from 'src/components/button'
import IXPath, { ICrawlField } from 'src/hooks/config-crawler/config.interface'

type Props = {
    productFields: ICrawlField[]
    specificProductFields: ICrawlField[]
    onSubmit: SubmitHandler<any>
    methods: UseFormReturn<any, any, undefined>
    loading?: boolean
    error: any
    success?: string
    xPaths: IXPath[]
}

export function XPathForm({
    productFields,
    specificProductFields,
    methods,
    onSubmit,
    loading,
    error,
    success,
    xPaths
}: Props) {
    const { handleSubmit, control, getValues, setValue, watch } = methods
    const [fields, setFields] = useState<ICrawlField[]>([])

    useEffect(() => {
        setFields(productFields)
        setValue('page', 'shopee')
    }, [productFields])

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

    const handleAddXPath = async (data: any) => {
        // console.log(data)
        const id = await onSubmit(data)
        data.id = id
        // xPaths.push(data)
        const isExist = xPaths.findIndex((item) => item.field === data.field)
        if (isExist === -1) {
            xPaths.push(data)
        } else {
            if (data.page === 'shopee') xPaths[isExist].shopee = data.value
            else if (data.page === 'specificShopee') xPaths[isExist].specificShopee = data.value
            else if (data.page === 'lazada') xPaths[isExist].lazada = data.value
            else if (data.page === 'specificLazada') xPaths[isExist].specificLazada = data.value
            else if (data.page === 'tiki') xPaths[isExist].tiki = data.value
            else if (data.page === 'specificTiki') xPaths[isExist].specificTiki = data.value
        }
        methods.reset()
        setValue('page', 'shopee')
    }
    return (
        <>
            <FormProvider {...methods}>
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                <form onSubmit={handleSubmit(handleAddXPath)}>
                    <Stack gap={1}>
                        <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
                                    Page
                                </Typography>
                                <FormControl margin='none' fullWidth>
                                    <Controller
                                        name='page'
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <FormControl margin='dense' fullWidth>
                                                <Select
                                                    {...field}
                                                    size='small'
                                                    required
                                                    // value={field.value || defaultField}
                                                    defaultValue={'shopee'}
                                                    onChange={(e) => {
                                                        field.onChange(e)
                                                        if (e.target.value.includes('specific')) {
                                                            setFields(specificProductFields)
                                                        } else {
                                                            setFields(productFields)
                                                        }
                                                    }}
                                                >
                                                    <MenuItem value='shopee'>Shopee</MenuItem>
                                                    <MenuItem value='specificShopee'>Specific Shopee</MenuItem>
                                                    <MenuItem value='lazada'>Lazada</MenuItem>
                                                    <MenuItem value='specificLazada'>Specific Lazada</MenuItem>
                                                    <MenuItem value='tiki'>Tiki</MenuItem>
                                                    <MenuItem value='specificTiki'>Specific Tiki</MenuItem>
                                                </Select>
                                                {error && <FormHelperText>{error.message}</FormHelperText>}
                                            </FormControl>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
                                    Field name
                                </Typography>
                                <FormControl margin='none' fullWidth>
                                    <Controller
                                        name='field'
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <FormControl margin='dense' fullWidth>
                                                <Select
                                                    {...field}
                                                    size='small'
                                                    required
                                                    // value={field.value || defaultField}
                                                >
                                                    {fields.map((item) => (
                                                        <MenuItem key={item.id} value={item.field}>
                                                            {item.field}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                {error && <FormHelperText>{error.message}</FormHelperText>}
                                            </FormControl>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
                                    XPath
                                </Typography>
                                <FormControl margin='none' fullWidth>
                                    <Controller
                                        name='value'
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <FormControl margin='dense' fullWidth>
                                                <TextField
                                                    {...field}
                                                    size='small'
                                                    placeholder='Ex: //div/span[2]/span'
                                                    onChange={(e) => {
                                                        field.onChange(e)
                                                        setValue(`${getValues('page')}`, e.target.value)
                                                    }}
                                                    required
                                                />
                                                {error && <FormHelperText>{error.message}</FormHelperText>}
                                            </FormControl>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        {/* <Grid container spacing={0} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Grid item xs={12} sm={4} md={3}>
                                <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
                                    Shopee
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={8} md={9} sx={{ display: 'flex', alignItems: 'center' }}>
                                <FormControl margin='none' fullWidth>
                                    <Controller
                                        name='shopee'
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <FormControl margin='dense' fullWidth>
                                                <TextField
                                                    {...field}
                                                    size='small'
                                                    placeholder='Ex: //div/span[2]/span'
                                                    // required
                                                />
                                                {error && <FormHelperText>{error.message}</FormHelperText>}
                                            </FormControl>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={0} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Grid item xs={12} sm={4} md={3}>
                                <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
                                    Specific Shopee
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={8} md={9} sx={{ display: 'flex', alignItems: 'center' }}>
                                <FormControl margin='none' fullWidth>
                                    <Controller
                                        name='specificShopee'
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <FormControl margin='dense' fullWidth>
                                                <TextField
                                                    {...field}
                                                    size='small'
                                                    placeholder='Ex: //div/span[2]/span'
                                                    // required
                                                />
                                                {error && <FormHelperText>{error.message}</FormHelperText>}
                                            </FormControl>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={0} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Grid item xs={12} sm={4} md={3}>
                                <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
                                    Lazada
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={8} md={9} sx={{ display: 'flex', alignItems: 'center' }}>
                                <FormControl margin='none' fullWidth>
                                    <Controller
                                        name='lazada'
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <FormControl margin='dense' fullWidth>
                                                <TextField
                                                    {...field}
                                                    size='small'
                                                    placeholder='Ex: //div/span[2]/span'
                                                    // required
                                                />
                                                {error && <FormHelperText>{error.message}</FormHelperText>}
                                            </FormControl>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={0} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Grid item xs={12} sm={4} md={3}>
                                <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
                                    Specific Lazada
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={8} md={9} sx={{ display: 'flex', alignItems: 'center' }}>
                                <FormControl margin='none' fullWidth>
                                    <Controller
                                        name='specificLazada'
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <FormControl margin='dense' fullWidth>
                                                <TextField
                                                    {...field}
                                                    size='small'
                                                    placeholder='Ex: //div/span[2]/span'
                                                    // required
                                                />
                                                {error && <FormHelperText>{error.message}</FormHelperText>}
                                            </FormControl>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={0} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Grid item xs={12} sm={4} md={3}>
                                <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
                                    Tiki
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={8} md={9} sx={{ display: 'flex', alignItems: 'center' }}>
                                <FormControl margin='none' fullWidth>
                                    <Controller
                                        name='tiki'
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <FormControl margin='dense' fullWidth>
                                                <TextField
                                                    {...field}
                                                    size='small'
                                                    placeholder='Ex: //div/span[2]/span'
                                                    // required
                                                />
                                                {error && <FormHelperText>{error.message}</FormHelperText>}
                                            </FormControl>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={0} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Grid item xs={12} sm={4} md={3}>
                                <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
                                    Specific Tiki
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={8} md={9} sx={{ display: 'flex', alignItems: 'center' }}>
                                <FormControl margin='none' fullWidth>
                                    <Controller
                                        name='specificTiki'
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <FormControl margin='dense' fullWidth>
                                                <TextField
                                                    {...field}
                                                    size='small'
                                                    placeholder='Ex: //div/span[2]/span'
                                                    // required
                                                />
                                                {error && <FormHelperText>{error.message}</FormHelperText>}
                                            </FormControl>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid> */}
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'end' }}>
                            <Button loading={loading} variant='contained' type='submit'>
                                Save changes
                            </Button>
                        </Box>
                    </Stack>
                </form>
            </FormProvider>
        </>
    )
}
