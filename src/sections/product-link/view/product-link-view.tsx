import { useState, useCallback, useEffect } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

// import { _users } from 'src/_mock'
import { DashboardContent } from 'src/layouts/dashboard'

import { Iconify } from 'src/components/iconify'
import { Scrollbar } from 'src/components/scrollbar'

import { ProductLinkTableRow } from '../product-link-table-row'
// import { ProductLinkTableHead } from '../product-link-table-head'
import { ProductLinkTableToolbar } from '../product-link-table-toolbar'

import useProductLink from 'src/hooks/product-link'
import IProductLink from 'src/hooks/product-link/productlink.interface'
import { useRouter } from 'src/routes/hooks'
import { useNavigate } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import { FiltersProps } from './product-link-filters'
// import { applyFilter, emptyRows, getComparator } from '../utils'
import { TableEmptyRows } from 'src/sections/user/table-empty-rows'
import { TableNoData } from 'src/sections/user/table-no-data'
import { ProductLinkTableHead } from '../product-link-table-head'
import { applyFilter, emptyRows, getComparator } from '../utils'

// ----------------------------------------------------------------------

export function ProductLinkView() {
    const { loading, error, success, productLinks, fetchProductLinks } = useProductLink()
    const table = useTable()

    const [filterName, setFilterName] = useState('')
    const [filters, setFilters] = useState<FiltersProps>({
        crawlerName: '',
        productLink: '',
        ecommerceSite: ''
    })

    const dataFiltered: IProductLink[] = applyFilter({
        inputData: productLinks,
        comparator: getComparator(table.order, table.orderBy),
        filterName,
        // filters
    })

    const notFound = !dataFiltered.length && !!filterName

    useEffect(() => {
        fetchProductLinks()
    }, [])

    const navigate = useNavigate()
    const handleAddNew = () => {
        navigate('/product-link/new')
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
        <DashboardContent>
            <Box display='flex' alignItems='center' mb={5}>
                <Typography variant='h4' flexGrow={1}>
                    Product Crawlers
                </Typography>
                <Button
                    variant='contained'
                    color='inherit'
                    startIcon={<Iconify icon='mingcute:add-line' />}
                    onClick={handleAddNew}
                >
                    New link
                </Button>
            </Box>

            <Card>
                <ProductLinkTableToolbar
                    numSelected={table.selected.length}
                    filterName={filterName}
                    onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFilterName(event.target.value)
                        table.onResetPage()
                    }}
                    // filters={filters}
                    // setFilters={setFilters}
                    // dataFiltered={dataFiltered}
                />

                <Scrollbar>
                    <TableContainer sx={{ overflow: 'unset' }}>
                        <Table sx={{ minWidth: 550 }}>
                            <ProductLinkTableHead
                                order={table.order}
                                orderBy={table.orderBy}
                                // rowCount={_users.length}
                                rowCount={productLinks.length}
                                numSelected={table.selected.length}
                                onSort={table.onSort}
                                onSelectAllRows={(checked) =>
                                    table.onSelectAllRows(
                                        checked,
                                        productLinks.map((user) => user.id)
                                    )
                                }
                                headLabel={[
                                    { id: 'crawlerName', label: 'Crawler Name' },
                                    { id: 'productLink', label: 'Product Link' },
                                    { id: 'ecommerceSite', label: 'E-commerce Site', align: 'center'},
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
                                        <ProductLinkTableRow
                                            key={row.id}
                                            row={row}
                                            selected={table.selected.includes(row.id)}
                                            onSelectRow={() => table.onSelectRow(row.id)}
                                        />
                                    ))}

                                <TableEmptyRows
                                    height={68}
                                    emptyRows={emptyRows(table.page, table.rowsPerPage, productLinks.length)}
                                />

                                {notFound && <TableNoData searchQuery={filterName} />}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <TablePagination
                    component='div'
                    page={table.page}
                    count={productLinks.length}
                    rowsPerPage={table.rowsPerPage}
                    onPageChange={table.onChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={table.onChangeRowsPerPage}
                />
            </Card>
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
