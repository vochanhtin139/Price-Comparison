import { useState } from 'react'
import { FormControl, FormHelperText, ToggleButton, ToggleButtonGroup, Typography, styled } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

type MultiButtonProps = {
    values: string[]
    label?: string
    disabled?: boolean
    name: string
}

export default function MultiToggleController({ values, name, label, disabled = false }: MultiButtonProps) {
    const [selectedValues, setSelectedValues] = useState<string[]>([])

    const { control, setValue } = useFormContext()
    const handleChange = (event: React.MouseEvent<HTMLElement>, newValues: string[]) => {
        setSelectedValues(newValues)
        setValue(name, newValues)
    }

    return (
        <Controller
            name={name}
            control={control}
            // rules={{ required: required && `${label} is required` }}
            render={({ field, fieldState: { error } }) => (
                <FormControl fullWidth>
                    {/* {label && <Typography variant='h6'>{label}</Typography>} */}
                    <ToggleButtonGroup
                        size='large'
                        value={selectedValues}
                        onChange={handleChange}
                        color='secondary'
                        aria-label='day'
                    >
                        {values.map((value, index) => (
                            <ToggleButton key={index} value={value} disabled={disabled} style={{ padding: '8px 16px' }}>
                                {value}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                    <FormHelperText>{/* You can add any helper text or error message here */}</FormHelperText>
                </FormControl>
            )}
        />
    )
}
