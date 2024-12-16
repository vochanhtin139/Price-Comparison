import { ButtonProps as MuiButtonProps, Button as MuiButton } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

interface ButtonProps extends MuiButtonProps {
    loading?: boolean
}
export default function Button(props: ButtonProps) {
    const { children, loading = false, ...rest } = props
    return (
        <MuiButton
            startIcon={loading && <CircularProgress style={{ color: '#b1b1b1' }} size={18} />}
            disabled={loading}
            {...rest}
        >
            {children}
        </MuiButton>
    )
}
