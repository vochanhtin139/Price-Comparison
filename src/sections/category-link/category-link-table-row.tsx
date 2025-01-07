import { useState, useCallback, useEffect } from 'react'

import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Popover from '@mui/material/Popover'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import MenuList from '@mui/material/MenuList'
import TableCell from '@mui/material/TableCell'
import IconButton from '@mui/material/IconButton'
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem'

import { Label } from 'src/components/label'
import { Iconify } from 'src/components/iconify'
import ICategoryLink from 'src/hooks/category-link/categorylink.interface'
import { useNavigate } from 'react-router-dom'
import useCategoryLink from 'src/hooks/category-link'
import { enqueueSnackbar } from 'notistack'
import { Link, Tooltip } from '@mui/material'
import { renderFallback } from 'src/routes/sections'

// ----------------------------------------------------------------------

type CategoryLinkTableRowProps = {
    row: ICategoryLink
    selected: boolean
    onSelectRow: () => void
}

export function CategoryLinkTableRow({ row, selected, onSelectRow }: CategoryLinkTableRowProps) {
    const { error, success, loading } = useCategoryLink()
    const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null)

    const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setOpenPopover(event.currentTarget)
    }, [])

    const handleClosePopover = useCallback(() => {
        setOpenPopover(null)
    }, [])

    const navigate = useNavigate()
    const handleEdit = () => {
        handleClosePopover()
        navigate(`/category-link/${row.id}`)
    }

    const handleClickRow = () => {
        navigate(`/products?categoryLink=${row.categoryLink}&ecommerceSite=${row.ecommerceSite}`)
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error || 'Fail', { variant: 'error' })
        }
    }, [error])

    useEffect(() => {
        if (success) {
            enqueueSnackbar(success || 'Successfully', { variant: 'success' })
        }
    }, [success])

    return (
        <>
            <TableRow hover tabIndex={-1} role='checkbox' selected={selected}>
                {/* <TableCell padding='checkbox'>
                    <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
                </TableCell> */}

                <TableCell
                    onClick={handleClickRow}
                    sx={{
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        '&:hover': { color: 'primary.main' }
                        // textDecoration: 'underline'
                    }}
                    component='th'
                    scope='row'
                >
                    <Tooltip title={row.crawlerName} arrow>
                        <span>
                            {row.crawlerName.length > 30 ? `${row.crawlerName.substring(0, 30)}...` : row.crawlerName}
                        </span>
                    </Tooltip>
                </TableCell>

                <TableCell>
                    <Tooltip title={row.categoryLink} arrow>
                        <span>
                            {row.categoryLink.length > 60
                                ? `${row.categoryLink.substring(0, 60)}...`
                                : row.categoryLink}
                        </span>
                    </Tooltip>
                </TableCell>

                {/* <TableCell align='center'>{row.rota || '-'}</TableCell> */}

                <TableCell align='center'>
                    <Label
                        color={
                            row.ecommerceSite === 'shopee'
                                ? 'error'
                                : row.ecommerceSite === 'tiki'
                                  ? 'info'
                                  : 'secondary'
                        }
                    >
                        {row.ecommerceSite.toUpperCase()}
                    </Label>
                </TableCell>

                <TableCell align='right'>
                    <IconButton onClick={handleOpenPopover}>
                        <Iconify icon='eva:more-vertical-fill' />
                    </IconButton>
                </TableCell>
            </TableRow>

            <Popover
                open={!!openPopover}
                anchorEl={openPopover}
                onClose={handleClosePopover}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuList
                    disablePadding
                    sx={{
                        p: 0.5,
                        gap: 0.5,
                        width: 140,
                        display: 'flex',
                        flexDirection: 'column',
                        [`& .${menuItemClasses.root}`]: {
                            px: 1,
                            gap: 2,
                            borderRadius: 0.75,
                            [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' }
                        }
                    }}
                >
                    <MenuItem onClick={handleEdit}>
                        <Iconify icon='solar:pen-bold' />
                        Edit
                    </MenuItem>
                    {/* <MenuItem onClick={() => handleDelete(row.id)} sx={{ color: 'error.main' }}>
                        <Iconify icon='solar:trash-bin-trash-bold' />
                        Delete
                    </MenuItem> */}
                </MenuList>
            </Popover>
        </>
    )
}
