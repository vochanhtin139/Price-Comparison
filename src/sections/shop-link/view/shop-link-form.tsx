import {
    Autocomplete,
    Box,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Switch,
    TextField,
    ToggleButton,
    Typography,
    styled,
    IconButton as MTIconButton,
    Button as MuiButton,
    ToggleButtonGroup
} from '@mui/material'
import { Controller, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import InputController from 'src/components/controller/InputController'
import Button from 'src/components/button'

type Props = {
    onSubmit: SubmitHandler<any>
    methods: UseFormReturn<any, any, undefined>
    loading?: boolean
}

export default function ShopLinkForm({ methods, onSubmit, loading }: Props) {
    const { handleSubmit, control, getValues, setValue, watch, trigger, formState, clearErrors } = methods

    const navigate = useNavigate()

    const submitForm = async (data: any) => {
        await onSubmit(data)
        navigate('/shop-links')
    }

    const [selectedEcommerce, setSelectedEcommerce] = useState<string | null>(null)

    useEffect(() => {
        setSelectedEcommerce(getValues('ecommerceSite'))
    }, [getValues('ecommerceSite')])
    // console.log(getValues())

    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(submitForm)} style={{ width: '100%' }}>
                    <Stack gap={2} mb={'100px'} mt={[3, 5]}>
                        <Grid container justifyContent={'center'} spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Paper
                                    elevation={5}
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        borderRadius: 3,
                                        py: 2,
                                        px: 3
                                    }}
                                >
                                    <Stack width={'100%'}>
                                        <FormControl margin='normal' fullWidth>
                                            <InputController name='crawlerName' label='Crawler name' />
                                        </FormControl>
                                        <FormControl margin='normal' fullWidth>
                                            <InputController name='shopLink' label='Shop link' />
                                        </FormControl>
                                        <Grid container columnSpacing={2}>
                                            <Grid item xs={12} sm={12}>
                                                {/* <FormControl margin='normal' fullWidth>
                                                    <InputController name='course' label='Ecommerce' />
                                                </FormControl> */}
                                                <FormControl margin='normal' fullWidth>
                                                    <InputLabel id='course-select-label'>E-commerce site</InputLabel>
                                                    <Controller
                                                        name='ecommerceSite'
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                labelId='ecommerce-select-label'
                                                                label='E-commerce site'
                                                                id='ecommerce-select'
                                                                defaultValue={selectedEcommerce|| ''}
                                                                value={selectedEcommerce|| ''}
                                                                onChange={(event) => {
                                                                    field.onChange(event.target.value)
                                                                    setSelectedEcommerce(event.target.value)
                                                                    setValue('ecommerceSite', event.target.value)
                                                                }}
                                                            >
                                                                <MenuItem value='shopee'>Shopee</MenuItem>
                                                                <MenuItem value='lazada'>Lazada</MenuItem>
                                                                <MenuItem value='tiki'>Tiki</MenuItem>
                                                            </Select>
                                                        )}
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Stack>
                                    <Box
                                        mt={1}
                                        sx={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Button loading={loading} type='submit' variant='contained'>
                                            {getValues('id') ? 'Save changes' : 'Add link'}
                                        </Button>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Stack>
                </form>
            </FormProvider>
        </>
    )
}
