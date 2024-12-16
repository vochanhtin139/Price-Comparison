import { Controller, useFormContext, useController } from 'react-hook-form'
import { CircularProgress, InputAdornment, OutlinedInput, TextField, TextFieldProps } from '@mui/material'
export interface InputControllerProps {
    name: string
    type?: string
    rules?: any
    required?: boolean
    label: string
    disable?: boolean
    InputProps?: any
    InputLabelProps?: any
    variant?: 'filled' | 'outlined' | 'standard'
    size?: 'small' | 'medium'
    hiddenLabel?: boolean
    placeholder?: string
    fullWidth?: boolean
    defaultChecked?: boolean
    textFieldProps?: TextFieldProps
    loading?: boolean
    endAdornment?: string
    // value?: string
}
export default function InputController(props: InputControllerProps) {
    const {
        name,
        rules,
        required,
        label,
        disable,
        type = 'text',
        InputProps,
        InputLabelProps,
        variant = 'outlined',
        size = 'medium',
        hiddenLabel = false,
        placeholder,
        fullWidth = false,
        defaultChecked = false,
        textFieldProps,
        loading,
        endAdornment
        // value
    } = props
    const { control } = useFormContext()
    return (
        <>
            <Controller
                name={name}
                control={control}
                rules={{ required: required && `${label} is required`, ...rules }}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        id={name}
                        label={(!hiddenLabel && label) || null}
                        variant={variant}
                        type={type}
                        autoComplete='on'
                        error={!!error}
                        {...field}
                        helperText={error?.message}
                        // value={value}
                        value={field.value || ''}
                        fullWidth
                        disabled={disable}
                        placeholder={placeholder}
                        size={size}
                        // InputLabelProps={{ shrink: true }}
                        InputLabelProps={InputLabelProps ? InputLabelProps : null}
                        InputProps={
                            InputProps
                                ? InputProps
                                : endAdornment
                                  ? {
                                        endAdornment: <InputAdornment position='end'>{endAdornment}</InputAdornment>
                                    }
                                  : null
                        }
                        // InputProps={{
                        //     disableUnderline: true,
                        //     style: {
                        //         padding: '10px',
                        //         borderRadius: '6px'
                        //     },
                        //     inputProps: {
                        //         style: {
                        //             padding: '0px'
                        //         }
                        //     },
                        //     endAdornment: <InputAdornment position='end'>{endAdornment}</InputAdornment>
                        // }}
                        margin='none'
                        defaultChecked={defaultChecked}
                        {...textFieldProps}
                    />
                )}
            />
        </>
    )
}
