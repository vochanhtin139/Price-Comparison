import 'src/global.css'

import { SnackbarProvider } from 'notistack'

import Fab from '@mui/material/Fab'

import { Router } from 'src/routes/sections'

import { useScrollToTop } from 'src/hooks/use-scroll-to-top'

import { ThemeProvider } from 'src/theme/theme-provider'

import { Iconify } from 'src/components/iconify'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

// ----------------------------------------------------------------------

export default function App() {
    useScrollToTop()

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider>
                <SnackbarProvider>
                    <Router />
                </SnackbarProvider>
            </ThemeProvider>
        </LocalizationProvider>
    )
}
