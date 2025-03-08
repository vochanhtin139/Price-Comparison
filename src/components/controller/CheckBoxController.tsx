import { Controller, useFormContext } from 'react-hook-form'
import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material'
type Inputs = {
    name: string
    required?: boolean
    label: any
    disable?: boolean
}
export default function CheckBoxController(props: Inputs) {
    const { name, required, label, disable } = props
    const { control } = useFormContext()
    return (
        <>
            <Controller
                name={name}
                control={control}
                rules={{ required: required && `${label} is required` }}
                render={({ field, fieldState: { error } }) => (
                    <FormControl error={!!error}>
                        <FormControlLabel
                            control={<Checkbox {...field} checked={!!field.value} />}
                            label={label}
                            disabled={disable}
                        />
                        <FormHelperText>{error?.message}</FormHelperText>
                    </FormControl>
                )}
            />
        </>
    )
}
