import { XPathForm } from './XPathForm'
import {
    Box,
    Card,
    Grid,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material'
import useConfig from 'src/hooks/config-crawler'
import { DashboardContent } from 'src/layouts/dashboard'
import { CrawlFieldForm } from './CrawlFieldForm'
import { useEffect, useState } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Tab } from '@mui/material'
import { Paper } from '@mui/material'
import { Delete, MoreVert } from '@mui/icons-material'
import { renderFallback } from 'src/routes/sections'
export default function ConfigCrawler() {
    const {
        loading,
        loading2,
        success,
        success2,
        error,
        error2,
        xPathMethods,
        crawlFieldMethods,
        handleSubmitXPath,
        handleSubmitCrawlField,
        productFields,
        specificProductFields,
        fetchCrawlFields,
        xPaths,
        fetchXPaths,
        handleDeleteXPath,
        handleDeleteCrawlField
    } = useConfig()

    useEffect(() => {
        fetchXPaths()
        fetchCrawlFields('product_field')
        fetchCrawlFields('specific_product_field')
    }, [])

    // const fields = productFields.concat(specificProductFields)

    // const uniqueFields = [...new Set(fields.map((field) => field.field))]

    const [value, setValue] = useState('1')

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    return (
        <DashboardContent>
            <Box display='flex' alignItems='center' mb={3}>
                <Typography variant='h4' flexGrow={1}>
                    Crawler Configuration
                </Typography>
            </Box>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label='lab API tabs example'>
                            <Tab label='Field XPath' value='1' />
                            <Tab label='Field Crawl' value='2' />
                        </TabList>
                    </Box>
                    <TabPanel value='1' sx={{ px: 1 }}>
                        <Card>
                            <Box p={4}>
                                <Typography variant='h6'>XPath Configuration</Typography>
                                <Typography variant='body2' mb={4}>
                                    Config the xpath that you want to crawl here
                                </Typography>
                                <XPathForm
                                    // fields={uniqueFields}
                                    productFields={productFields}
                                    specificProductFields={specificProductFields}
                                    methods={xPathMethods}
                                    loading={loading}
                                    error={error}
                                    success={success}
                                    onSubmit={handleSubmitXPath}
                                    xPaths={xPaths}
                                />
                            </Box>
                        </Card>
                        <Card sx={{ mt: 3 }}>
                            <Box p={4}>
                                <Typography variant='h6'>Table of XPath</Typography>
                                <Typography variant='body2' mb={2}>
                                    You can see the xpath that you have configured here
                                </Typography>
                                {/* {loading && renderFallback} */}
                                <TableContainer component={Paper} sx={{ mt: 2 }}>
                                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Field Name</TableCell>
                                                <TableCell align='center'>Shopee</TableCell>
                                                <TableCell align='center'>S_Shopee</TableCell>
                                                <TableCell align='center'>Lazada</TableCell>
                                                <TableCell align='center'>S_Lazada</TableCell>
                                                <TableCell align='center'>Tiki</TableCell>
                                                <TableCell align='center'>S_Tiki</TableCell>
                                                <TableCell align='center'>
                                                    {/* <MoreVert fontSize='small' /> */}
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {xPaths.map((row) => (
                                                <TableRow
                                                    key={row.field}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component='th' scope='row'>
                                                        {row.field}
                                                    </TableCell>
                                                    <TableCell align='center'>{row.shopee}</TableCell>
                                                    <TableCell align='center'>{row.specificShopee}</TableCell>
                                                    <TableCell align='center'>{row.lazada}</TableCell>
                                                    <TableCell align='center'>{row.specificLazada}</TableCell>
                                                    <TableCell align='center'>{row.tiki}</TableCell>
                                                    <TableCell align='center'>{row.specificTiki}</TableCell>
                                                    <TableCell align='center'>
                                                        <IconButton
                                                            color='error'
                                                            onClick={async () => {
                                                                await handleDeleteXPath(row.id)
                                                                xPaths.splice(
                                                                    xPaths.findIndex((item) => item.id === row.id),
                                                                    1
                                                                )
                                                            }}
                                                        >
                                                            <Delete fontSize='small' />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Card>
                    </TabPanel>
                    <TabPanel value='2' sx={{ px: 1 }}>
                        <Card>
                            <Box p={4}>
                                <Typography variant='h6'>Field Configuration</Typography>
                                <Typography variant='body2' mb={4}>
                                    You can config the field that you want to crawl here
                                </Typography>
                                <CrawlFieldForm
                                    productFields={productFields}
                                    specificProductFields={specificProductFields}
                                    methods={crawlFieldMethods}
                                    loading={loading2}
                                    error={error2}
                                    success={success2}
                                    onSubmit={handleSubmitCrawlField}
                                    onDelete={handleDeleteCrawlField}
                                />
                            </Box>
                        </Card>
                    </TabPanel>
                </TabContext>
            </Box>
            {/* <Grid container spacing={[3, 3]}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <Box p={4}>
                            <Typography variant='h6'>XPath Configuration</Typography>
                            <Typography variant='body2' mb={4}>
                                Config the xpath that you want to crawl here
                            </Typography>
                            <XPathForm
                                fields={uniqueFields}
                                methods={xPathMethods}
                                loading={loading}
                                error={error}
                                success={success}
                                onSubmit={handleSubmitXPath}
                            />
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <Box p={4}>
                            <Typography variant='h6'>Field Configuration</Typography>
                            <Typography variant='body2' mb={4}>
                                You can config the field that you want to crawl here
                            </Typography>
                            <CrawlFieldForm
                                productFields={productFields}
                                specificProductFields={specificProductFields}
                                methods={crawlFieldMethods}
                                loading={loading2}
                                error={error2}
                                success={success2}
                                onSubmit={handleSubmitCrawlField}
                                onDelete={handleDeleteCrawlField}
                            />
                        </Box>
                    </Card>
                </Grid>
            </Grid> */}
        </DashboardContent>
    )
}
