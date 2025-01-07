import { XPathForm } from './XPathForm'
import { Box, Card, Grid, Typography } from '@mui/material'
import useConfig from 'src/hooks/config-crawler'
import { DashboardContent } from 'src/layouts/dashboard'
import { CrawlFieldForm } from './CrawlFieldForm'
import { useEffect } from 'react'
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
        fetchXPaths,
        handleDeleteXPath,
        handleDeleteCrawlField
    } = useConfig()

    useEffect(() => {
        fetchXPaths()
        fetchCrawlFields('product_field')
        fetchCrawlFields('specific_product_field')
    }, [])

    return (
        <DashboardContent>
            <Box display='flex' alignItems='center' mb={5}>
                <Typography variant='h4' flexGrow={1}>
                    Crawler Configuration
                </Typography>
            </Box>
            <Grid container spacing={[3, 5]}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <Box p={4}>
                            <Typography variant='h6'>XPath Configuration</Typography>
                            <Typography variant='body2' mb={4}>
                                Config the xpath that you want to crawl here
                            </Typography>
                            <XPathForm
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
                            />
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </DashboardContent>
    )
}
