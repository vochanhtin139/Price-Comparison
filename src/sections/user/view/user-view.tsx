import { useState, useCallback, useEffect } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
// import Button from '@mui/material/Button'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

import { _users } from 'src/_mock'
import { DashboardContent } from 'src/layouts/dashboard'

import { Iconify } from 'src/components/iconify'
import { Scrollbar } from 'src/components/scrollbar'

import { TableNoData } from '../table-no-data'
import { UserTableRow } from '../user-table-row'
import { UserTableHead } from '../user-table-head'
import { TableEmptyRows } from '../table-empty-rows'
import { UserTableToolbar } from '../user-table-toolbar'
import { emptyRows, applyFilter, getComparator } from '../utils'

import type { UserProps } from '../user-table-row'
import useUser from 'src/hooks/user'
import IUser from 'src/hooks/user/user.interface'
import { enqueueSnackbar } from 'notistack'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import Button from 'src/components/button'

// ----------------------------------------------------------------------

export function UserView() {
    const { loading, error, success, users, fetchUsers, addAdmin } = useUser()
    const table = useTable()

    const [filterName, setFilterName] = useState('')

    const dataFiltered: IUser[] = applyFilter({
        inputData: users,
        comparator: getComparator(table.order, table.orderBy),
        filterName
    })

    useEffect(() => {
        fetchUsers()
    }, [])

    const notFound = !dataFiltered.length && !!filterName

    const handleAfterAction = () => {
        fetchUsers()
    }

    const [openDialog, setOpenDialog] = useState(false)
    const [formData, setFormData] = useState({
        adminUsername: '',
        adminEmail: '',
        adminFirstName: '',
        adminLastName: '',
        adminPassword: ''
    })

    const handleOpenDialog = () => setOpenDialog(true)
    const handleCloseDialog = () => setOpenDialog(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSaveAdmin = async () => {
        try {
            await addAdmin(formData) // Gọi API
            // enqueueSnackbar('Admin added successfully', { variant: 'success' })
            handleCloseDialog()
            handleAfterAction()
        } catch (err: any) {
            // enqueueSnackbar(err.message || 'Failed to add admin', { variant: 'error' })
            console.error(err)
        }
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error.message || 'An error occurred', { variant: 'error' })
        }
    }, [error])

    useEffect(() => {
        if (success) {
            enqueueSnackbar(success.message || 'Action successful', { variant: 'success' })
        }
    }, [success])

    return (
        <DashboardContent>
            <Box display='flex' alignItems='center' mb={5}>
                <Typography variant='h4' flexGrow={1}>
                    Users
                </Typography>
                <Button
                    variant='contained'
                    color='inherit'
                    startIcon={<Iconify icon='mingcute:add-line' />}
                    onClick={handleOpenDialog}
                >
                    Add admin
                </Button>
            </Box>

            <Card>
                <UserTableToolbar
                    numSelected={table.selected.length}
                    filterName={filterName}
                    onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFilterName(event.target.value)
                        table.onResetPage()
                    }}
                />

                <Scrollbar>
                    <TableContainer sx={{ overflow: 'unset' }}>
                        <Table sx={{ minWidth: 800 }}>
                            <UserTableHead
                                order={table.order}
                                orderBy={table.orderBy}
                                rowCount={_users.length}
                                numSelected={table.selected.length}
                                onSort={table.onSort}
                                onSelectAllRows={(checked) =>
                                    table.onSelectAllRows(
                                        checked,
                                        _users.map((user) => user.id)
                                    )
                                }
                                headLabel={[
                                    { id: 'name', label: 'Name' },
                                    { id: 'email', label: 'Email' },
                                    { id: 'role', label: 'Role' },
                                    { id: 'isActive', label: 'Active', align: 'center' },
                                    // { id: 'status', label: 'Status' },
                                    { id: '' }
                                ]}
                            />
                            <TableBody>
                                {dataFiltered
                                    .slice(
                                        table.page * table.rowsPerPage,
                                        table.page * table.rowsPerPage + table.rowsPerPage
                                    )
                                    .map((row) => (
                                        <UserTableRow
                                            key={row.id}
                                            row={row}
                                            selected={table.selected.includes(row.id)}
                                            onSelectRow={() => table.onSelectRow(row.id)}
                                            onDeleteRow={handleAfterAction}
                                        />
                                    ))}

                                <TableEmptyRows
                                    height={68}
                                    emptyRows={emptyRows(table.page, table.rowsPerPage, _users.length)}
                                />

                                {notFound && <TableNoData searchQuery={filterName} />}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <TablePagination
                    component='div'
                    page={table.page}
                    count={users.length}
                    rowsPerPage={table.rowsPerPage}
                    onPageChange={table.onChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={table.onChangeRowsPerPage}
                />
            </Card>
            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth='sm'>
                <DialogTitle>Add New Admin</DialogTitle>
                <DialogContent dividers>
                    <TextField
                        label='Username'
                        name='adminUsername'
                        value={formData.adminUsername}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='Email'
                        name='adminEmail'
                        value={formData.adminEmail}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='First Name'
                        name='adminFirstName'
                        value={formData.adminFirstName}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='Last Name'
                        name='adminLastName'
                        value={formData.adminLastName}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='Password'
                        name='adminPassword'
                        // type='password'
                        value={formData.adminPassword}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button variant='contained' onClick={handleSaveAdmin} loading={loading}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </DashboardContent>
    )
}

// ----------------------------------------------------------------------

export function useTable() {
    const [page, setPage] = useState(0)
    const [orderBy, setOrderBy] = useState('name')
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [selected, setSelected] = useState<string[]>([])
    const [order, setOrder] = useState<'asc' | 'desc'>('asc')

    const onSort = useCallback(
        (id: string) => {
            const isAsc = orderBy === id && order === 'asc'
            setOrder(isAsc ? 'desc' : 'asc')
            setOrderBy(id)
        },
        [order, orderBy]
    )

    const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
        if (checked) {
            setSelected(newSelecteds)
            return
        }
        setSelected([])
    }, [])

    const onSelectRow = useCallback(
        (inputValue: string) => {
            const newSelected = selected.includes(inputValue)
                ? selected.filter((value) => value !== inputValue)
                : [...selected, inputValue]

            setSelected(newSelected)
        },
        [selected]
    )

    const onResetPage = useCallback(() => {
        setPage(0)
    }, [])

    const onChangePage = useCallback((event: unknown, newPage: number) => {
        setPage(newPage)
    }, [])

    const onChangeRowsPerPage = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setRowsPerPage(parseInt(event.target.value, 10))
            onResetPage()
        },
        [onResetPage]
    )

    return {
        page,
        order,
        onSort,
        orderBy,
        selected,
        rowsPerPage,
        onSelectRow,
        onResetPage,
        onChangePage,
        onSelectAllRows,
        onChangeRowsPerPage
    }
}
