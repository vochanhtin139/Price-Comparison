import { enqueueSnackbar } from 'notistack'
import { useCallback, useEffect, useState } from 'react'

import Tooltip from '@mui/material/Tooltip'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import { Box, Icon, Input, Menu, MenuItem, Stack } from '@mui/material'

// import useShopLink from 'src/hooks/student'

import IShopLink from 'src/hooks/shop-link/shoplink.interface'

import Button from 'src/components/button'
import { Iconify } from 'src/components/iconify'

import useShopLink from 'src/hooks/shop-link'

// ----------------------------------------------------------------------

type ShopLinkTableToolbarProps = {
    numSelected: number
    filterName: string
    onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void
    // filters: FiltersProps
    // setFilters: (filters: FiltersProps) => void
    // dataFiltered: IShopLink[]
}

// const defaultFilters: FiltersProps = {
//     rota: '',
//     school: '',
//     course: ''
// }

export function ShopLinkTableToolbar({
    numSelected,
    filterName,
    onFilterName,
    // filters,
    // setFilters,
    // dataFiltered
}: ShopLinkTableToolbarProps) {
    const { loading, error, success } = useShopLink()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    // const [openFilter, setOpenFilter] = useState(false)

    // const handleOpenFilter = useCallback(() => {
    //     setOpenFilter(true)
    // }, [])

    // const handleCloseFilter = useCallback(() => {
    //     setOpenFilter(false)
    // }, [])

    // const handleSetFilters = (updateState: Partial<FiltersProps>) => {
    //     setFilters({
    //         ...filters,
    //         ...updateState
    //     })
    // }

    // const canReset = Object.keys(filters).some((key) => filters[key as keyof FiltersProps] !== '')

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error || 'File has wrong format', { variant: 'error' })
        }
    }, [error])

    useEffect(() => {
        if (success) {
            enqueueSnackbar(success || 'Imported students successfully', { variant: 'success' })
        }
    }, [success])

    return (
        <Toolbar
            sx={{
                minHeight: 96,
                display: 'flex',
                justifyContent: 'space-between',
                p: (theme) => theme.spacing(0, 1, 0, 3),
                ...(numSelected > 0 && {
                    color: 'primary.main',
                    bgcolor: 'primary.lighter'
                })
            }}
        >
            <Stack direction={['column', 'row']} spacing={2} width="100%" justifyContent="space-between" my={2}>
                {numSelected > 0 ? (
                    <Typography component='div' variant='subtitle1'>
                        {numSelected} selected
                    </Typography>
                ) : (
                    <OutlinedInput
                        fullWidth
                        value={filterName}
                        onChange={onFilterName}
                        placeholder='Search crawler name...'
                        startAdornment={
                            <InputAdornment position='start'>
                                <Iconify width={20} icon='eva:search-fill' sx={{ color: 'text.disabled' }} />
                            </InputAdornment>
                        }
                        sx={{ maxWidth: ['100%', 320] }}
                    />
                )}

                {/* <Stack direction='row' spacing={1} justifyContent="flex-end" mt={['16px !important', 0]}>
                    <Box
                        display='flex'
                        alignItems='center'
                        flexWrap='wrap-reverse'
                        justifyContent='flex-end'
                        sx={{ mb: 5 }}
                    >
                        <Box gap={1} display='flex' flexShrink={0} sx={{ my: 0 }}>
                            <ShopLinkFilters
                                courses={courses}
                                canReset={canReset}
                                filters={filters}
                                onSetFilters={handleSetFilters}
                                openFilter={openFilter}
                                onOpenFilter={handleOpenFilter}
                                onCloseFilter={handleCloseFilter}
                                onResetFilter={() => setFilters(defaultFilters)}
                            />
                        </Box>
                    </Box>
                    <Button variant='text' color='inherit' onClick={handleImportClick}>
                        <Iconify icon='solar:import-bold' sx={{ mr: 1, fontSize: '18px' }} />
                        Import
                        <input
                            type='file'
                            id='fileInput'
                            style={{ display: 'none' }}
                            onChange={(e) => handleFileChange(e)}
                        />
                    </Button>
                    <Button variant='text' color='inherit' onClick={handleExportClick}>
                        <Iconify icon='solar:export-bold' sx={{ mr: 1, fontSize: '18px' }} />
                        Export
                    </Button>
                </Stack> */}
            </Stack>

            {/* {numSelected > 0 ? (
                <Tooltip title='Delete'>
                    <IconButton>
                        <Iconify icon='solar:trash-bin-trash-bold' />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title='Import/Export'>
                    <>
                        <IconButton
                            aria-label='more'
                            aria-controls='long-menu'
                            aria-haspopup='true'
                            onClick={handleClick}
                        >
                            <MoreVert />
                        </IconButton>
                        <Menu
                            id='simple-menu'
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                        >
                            <MenuItem onClick={handleImportClick}>
                                <Download sx={{ mr: 1, fontSize: '18px' }} />
                                Import
                            </MenuItem>
                            <MenuItem onClick={handleExportClick}>
                                <Upload sx={{ mr: 1, fontSize: '18px' }} /> Export
                            </MenuItem>
                        </Menu>
                        <input
                            type='file'
                            id='fileInput'
                            style={{ display: 'none' }}
                            onChange={(e) => handleFileChange(e)}
                        />
                    </>
                </Tooltip>
            )} */}
        </Toolbar>
    )
}
