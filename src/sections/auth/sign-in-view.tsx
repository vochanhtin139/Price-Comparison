import { useState, useCallback, useRef, useEffect } from 'react'

import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import InputAdornment from '@mui/material/InputAdornment'

import { useRouter } from 'src/routes/hooks'

import { Iconify } from 'src/components/iconify'
import { enqueueSnackbar } from 'notistack'
import { set } from 'react-hook-form'

// ----------------------------------------------------------------------
// const API_ENDPOINT_URL = 'http://localhost:8080/api'
const API_ENDPOINT_URL = 'https://price-comparison.site/api'

export function SignInView() {
    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false)
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSignIn = useCallback(async () => {
        setLoading(true)
        try {
            const username = usernameRef.current?.value
            const password = passwordRef.current?.value

            const response = await fetch(`${API_ENDPOINT_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const data = await response.json()
            console.log('Sign-in successful:', data)
            if (data.role !== 'ADMIN') {
                setError('You do not have permission to access this application.')
                setLoading(false)
                return
            }
            localStorage.setItem('accessToken', data.accessToken)
            router.push('/')
        } catch (error) {
            console.error('Error:', error)
            setError('Failed to sign in. Please check your username and password.')
        } finally {
            setLoading(false)
        }
    }, [router])

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error || 'An error occurred during sign-in', {
                variant: 'error'
            })
        }
    }, [error])

    const renderForm = (
        <Box display='flex' flexDirection='column' alignItems='flex-end'>
            <TextField
                fullWidth
                name='username'
                label='Username address'
                defaultValue=''
                inputRef={usernameRef}
                placeholder='Username or email address'
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 3 }}
            />

            <Link variant='body2' color='inherit' sx={{ mb: 1.5 }}>
                Forgot password?
            </Link>

            <TextField
                fullWidth
                name='password'
                label='Password'
                defaultValue=''
                inputRef={passwordRef}
                placeholder='Your password'
                InputLabelProps={{ shrink: true }}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                sx={{ mb: 3 }}
            />

            <LoadingButton
                fullWidth
                size='large'
                type='submit'
                color='inherit'
                variant='contained'
                onClick={handleSignIn}
                loading={loading}
            >
                Sign in
            </LoadingButton>
        </Box>
    )

    return (
        <>
            <Box gap={1.5} display='flex' flexDirection='column' alignItems='center' sx={{ mb: 5 }}>
                <Typography variant='h5'>Sign in</Typography>
                <Typography variant='body2' color='text.secondary'>
                    Don’t have an account?
                    <Link variant='subtitle2' sx={{ ml: 0.5 }}>
                        Get started
                    </Link>
                </Typography>
            </Box>

            {renderForm}

            <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
                <Typography variant='overline' sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}>
                    OR
                </Typography>
            </Divider>

            <Box gap={1} display='flex' justifyContent='center'>
                <IconButton color='inherit'>
                    <Iconify icon='logos:google-icon' />
                </IconButton>
                <IconButton color='inherit'>
                    <Iconify icon='eva:github-fill' />
                </IconButton>
                <IconButton color='inherit'>
                    <Iconify icon='ri:twitter-x-fill' />
                </IconButton>
            </Box>
        </>
    )
}
