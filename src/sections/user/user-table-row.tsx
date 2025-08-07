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
import IUser from 'src/hooks/user/user.interface'
import useUser from 'src/hooks/user'
import { enqueueSnackbar } from 'notistack'
import { CircularProgress } from '@mui/material'

// ----------------------------------------------------------------------

export type UserProps = {
    id: string
    name: string
    role: string
    status: string
    company: string
    avatarUrl: string
    isVerified: boolean
}

type UserTableRowProps = {
    row: IUser
    selected: boolean
    onSelectRow: () => void
    onDeleteRow?: (id: string) => void
}

export function UserTableRow({ row, selected, onDeleteRow }: UserTableRowProps) {
    const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null)

    const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setOpenPopover(event.currentTarget)
    }, [])

    const handleClosePopover = useCallback(() => {
        setOpenPopover(null)
    }, [])

    const { loading, success, error, deleteUser } = useUser()

    const handleDeleteUser = useCallback(async () => {
        try {
            await deleteUser(row.id)
            onDeleteRow?.(row.id)
        } catch (err) {
            console.error('Failed to delete user:', err)
        } finally {
            handleClosePopover()
        }
    }, [deleteUser, row.id, handleClosePopover])

    useEffect(() => {
        if (success) {
            enqueueSnackbar('User deleted successfully', { variant: 'success' })
        }
    }, [success])

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error.message || 'An error occurred while deleting the user', { variant: 'error' })
        }
    }, [error])

    return (
        <>
            <TableRow hover tabIndex={-1} role='checkbox' selected={selected}>
                {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell> */}

                <TableCell component='th' scope='row'>
                    <Box gap={2} display='flex' alignItems='center'>
                        <Avatar alt={row.firstName} src={''} />
                        {row.firstName} {row.lastName}
                    </Box>
                </TableCell>

                <TableCell>{row.email}</TableCell>

                <TableCell>
                    <Label color={(row.role === 'ADMIN' && 'error') || 'success'}>{row.role}</Label>
                </TableCell>

                <TableCell align='center'>
                    {row.isActive ? (
                        <Iconify width={22} icon='solar:check-circle-bold' sx={{ color: 'success.main' }} />
                    ) : (
                        '-'
                    )}
                </TableCell>

                {/* <TableCell>
          <Label color={(row.status === 'banned' && 'error') || 'success'}>{row.status}</Label>
        </TableCell> */}

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
                    {/* <MenuItem onClick={handleClosePopover}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem> */}

                    <MenuItem onClick={handleDeleteUser} sx={{ color: 'error.main' }} disabled={loading}>
                        {/* <Iconify icon='solar:trash-bin-trash-bold' /> */}
                        {loading ? (
                            <CircularProgress style={{ color: '#b1b1b1' }} size={16} />
                        ) : (
                            <Iconify icon='solar:trash-bin-trash-bold' />
                        )}
                        Delete
                    </MenuItem>
                </MenuList>
            </Popover>
        </>
    )
}
