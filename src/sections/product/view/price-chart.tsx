import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { Line, XAxis, YAxis, Tooltip, LineChart, CartesianGrid, ResponsiveContainer, Label } from 'recharts'
import { Box, Typography } from '@mui/material'
import IProduct from 'src/hooks/products/product.interface'
import { processInput } from 'src/utils/format-number'

// Dữ liệu biểu đồ
// const priceData = [
//   { date: '10-06-2024', price: 400000 },
//   { date: '24-06-2024', price: 349300 },
//   { date: '15-07-2024', price: 549300 },
//   { date: '16-09-2024', price: 371300 },
//   { date: '21-10-2024', price: 671300 },
//   { date: '04-11-2024', price: 309700 },
// ];

type PriceChartProps = {
    data: IProduct[]
}

export function PriceChart({ data }: PriceChartProps) {
    // const parsePrice = (price: string) => parseInt(price.replace(/\./g, ''), 10) || 0

    const transformData = (productData: IProduct[]) =>
        productData.map((item) => ({
            date: new Date(item.crawlTime).toLocaleDateString('vi-VN'), // Format date
            price: processInput(item.productPrice) // Convert price to number
        }))

    const priceData = transformData(data)
    console.log(transformData(data))

    const formatYAxis = (value: number) => {
        if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M` // Hiển thị dạng 1.2M
        if (value >= 1_000) return `${(value / 1_000).toFixed(0)}k` // Hiển thị dạng 100k
        return value.toString() // Giá trị nhỏ hơn 1000 thì giữ nguyên
    }

    const currentPrice = priceData[priceData.length - 1]?.price || 0
    const highestPrice = Math.max(...priceData.map((item) => item.price).filter(price => price !== null)) || 0
    return (
        <Box p={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h5' mb={4} sx={{ fontWeight: 'bold', color: '#1977F2' }}>
                    Average Price Chart 📊
                </Typography>
                <Box textAlign='end'>
                    <Typography variant='subtitle2'>
                        <Typography component='span' variant='body2'>
                            Current price:
                        </Typography>
                        &nbsp;
                        <span style={{ fontWeight: 'bold', fontSize: 20 }}>{currentPrice.toLocaleString()}₫</span>
                    </Typography>
                    <Typography variant='subtitle2'>
                        <Typography component='span' variant='body1'>
                            Highest price:
                        </Typography>
                        &nbsp;
                        <span style={{ fontWeight: 'bold', color: 'red', fontSize: 16 }}>
                            {highestPrice.toLocaleString()}₫
                        </span>
                    </Typography>
                </Box>
            </Box>
            <ResponsiveContainer width='100%' height={300}>
                <LineChart data={priceData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey='date' tick={{ fontSize: 12 }} tickLine={false} />
                    <YAxis tickFormatter={formatYAxis} tick={{ fontSize: 12 }} />
                    <Tooltip
                        formatter={(value) => `${value.toLocaleString()}₫`}
                        labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Line type='monotone' dataKey='price' stroke='#1977F2' strokeWidth={2} dot={{ r: 5 }} />
                </LineChart>
            </ResponsiveContainer>
            <Typography variant='body2' sx={{ marginTop: 2 }}>
                <b style={{ color: 'red' }}>Note:</b> The displayed date is the start of the week. The price shown is
                the average price for that week.
            </Typography>
        </Box>
    )
}
