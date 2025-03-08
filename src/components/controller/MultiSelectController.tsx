import { Controller, useFormContext } from 'react-hook-form'
import {
    Autocomplete,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    TextField,
    ToggleButton
} from '@mui/material'
type Inputs = {
    name: string
    required?: boolean
    label?: any
    disabled?: boolean
    item: {
        value: string
        label: string
    }[]
}

export default function MultiSelectController(props: Inputs) {
    const { name, required, label, disabled, item } = props
    const { control } = useFormContext()
    return (
        <>
            <Controller
                name={name}
                control={control}
                rules={{ required: required && `${label} is required` }}
                render={({ field, fieldState: { error } }) => (
                    <FormControl margin={'none'} fullWidth error={!!error}>
                        <Autocomplete
                            multiple
                            id='tags-outlined'
                            options={item}
                            getOptionLabel={(item) => item.label}
                            filterSelectedOptions={true}
                            ChipProps={{
                                size: 'small'
                            }}
                            sx={{
                                zIndex: 100
                            }}
                            value={field.value}
                            onChange={(e, value) => {
                                field.onChange(value)
                            }}
                            disabled={disabled}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    size='small'
                                    label={label}
                                    FormHelperTextProps={{
                                        error: !!error,
                                        hidden: !error
                                    }}
                                    error={!!error}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    helperText={error?.message}
                                />
                            )}
                        />
                    </FormControl>
                )}
            />
        </>
    )
}
