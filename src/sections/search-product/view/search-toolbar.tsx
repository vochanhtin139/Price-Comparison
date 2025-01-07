import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

import { Iconify } from 'src/components/iconify'
import { Badge, IconButton, Tooltip } from '@mui/material'

// ----------------------------------------------------------------------

type SearchProductToolbarProps = {
    // filterOptionCount: number
    numSelected: number
    filterName: string
    onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void
    // onClickFilter: React.MouseEventHandler<HTMLButtonElement>
}

export function SearchProductToolbar({
    // filterOptionCount,
    numSelected,
    filterName,
    onFilterName,
    // onClickFilter
}: SearchProductToolbarProps) {
    return (
        <Toolbar
            sx={{
                height: 96,
                display: 'flex',
                justifyContent: 'space-between',
                p: (theme) => theme.spacing(0, 1, 0, 3),
                ...(numSelected > 0 && {
                    color: 'primary.main',
                    bgcolor: 'primary.lighter'
                })
            }}
        >
            {numSelected > 0 ? (
                <Typography component='div' variant='subtitle1'>
                    {numSelected} selected
                </Typography>
            ) : (
                <OutlinedInput
                    fullWidth
                    value={filterName}
                    onChange={onFilterName}
                    placeholder='Search promotion...'
                    startAdornment={
                        <InputAdornment position='start'>
                            <Iconify width={20} icon='eva:search-fill' sx={{ color: 'text.disabled' }} />
                        </InputAdornment>
                    }
                    sx={{ maxWidth: 320 }}
                />
            )}

            {/* <Tooltip title='Filter list'>
                <Badge badgeContent={filterOptionCount > 0 ? filterOptionCount : undefined} color='error'>
                    <IconButton onClick={onClickFilter} sx={{ position: 'relative' }}>
                        <Iconify icon='ic:round-filter-list' />
                    </IconButton>
                </Badge>
            </Tooltip> */}
        </Toolbar>
    )
}
