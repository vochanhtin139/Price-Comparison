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
    useMediaQuery
} from '@mui/material'
import { Controller, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form'
import { enqueueSnackbar } from 'notistack'
import Button from 'src/components/button'

type Props = {
    onSubmit: SubmitHandler<any>
    methods: UseFormReturn<any, any, undefined>
    loading?: boolean
    error: any
    success?: string
}

export function XPathForm({ methods, onSubmit, loading, error, success }: Props) {
    const { handleSubmit, control, getValues, setValue } = methods

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error.code, { variant: 'error' })
        }
    }, [error])

    useEffect(() => {
        if (success) {
            enqueueSnackbar(success, { variant: 'success' })
        }
    }, [success])

    const isMobile = useMediaQuery('(max-width:600px)')
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap={1}>
                    <Grid container spacing={0} sx={{ display: 'flex', alignItems: 'center' }}>
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
                                                required
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
                                    name='specific_shopee'
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <FormControl margin='dense' fullWidth>
                                            <TextField
                                                {...field}
                                                size='small'
                                                placeholder='Ex: //div/span[2]/span'
                                                required
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
                                                required
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
                                    name='specific_lazada'
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <FormControl margin='dense' fullWidth>
                                            <TextField
                                                {...field}
                                                size='small'
                                                placeholder='Ex: //div/span[2]/span'
                                                required
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
                                                required
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
                                    name='specific_tiki'
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <FormControl margin='dense' fullWidth>
                                            <TextField
                                                {...field}
                                                size='small'
                                                placeholder='Ex: //div/span[2]/span'
                                                required
                                            />
                                            {error && <FormHelperText>{error.message}</FormHelperText>}
                                        </FormControl>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'end' }}>
                        <Button loading={loading} variant='contained' type='submit'>
                            Save changes
                        </Button>
                    </Box>
                </Stack>
            </form>
        </FormProvider>
    )
}
