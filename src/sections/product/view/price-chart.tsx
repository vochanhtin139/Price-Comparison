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
    historicalData?: {
        dates: string[]
        prices: number[]
        predicted_prices?: number[]
    }
}

export function PriceChart({ data, historicalData }: PriceChartProps) {
    // const parsePrice = (price: string) => parseInt(price.replace(/\./g, ''), 10) || 0

    const transformData = (productData: IProduct[]) =>
        productData.map((item) => ({
            // date: new Date(item.crawlTime).toLocaleDateString('vi-VN'), // Format date
            date: new Date(item.crawlTime).toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit'
            }),
            price: processInput(item.productPrice) // Convert price to number
        }))

    // const priceData = transformData(data)
    // const priceData = transformData(data).slice(-10)
    // const priceData =
    //     historicalData?.prices.map((price, index) => ({
    //         date: historicalData.dates[index],
    //         price: price,
    //         isPredicted: false
    //     })) || []
    const priceData =
        historicalData?.prices
            .slice(-10) // chỉ lấy 10 phần tử cuối
            .map((price, index, arr) => ({
                date: historicalData.dates[historicalData.dates.length - arr.length + index],
                price: price,
                isPredicted: false
            })) || []

    const predictedPriceData =
        historicalData?.predicted_prices?.slice(-5).map((price, index) => ({
            date: historicalData.dates[historicalData.dates.length - 5 + index],
            price: price,
            isPredicted: true
        })) || []
    console.log('predicted price data', predictedPriceData)

    const combinedData = [...priceData, ...predictedPriceData]

    const formatYAxis = (value: number) => {
        if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M` // Hiển thị dạng 1.2M
        if (value >= 1_000) return `${(value / 1_000).toFixed(0)}k` // Hiển thị dạng 100k
        return value.toString() // Giá trị nhỏ hơn 1000 thì giữ nguyên
    }

    const currentPrice = priceData[priceData.length - 1]?.price || 0
    const highestPrice = Math.max(...priceData.map((item) => item.price).filter((price) => price !== null)) || 0
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
                <LineChart data={combinedData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey='date' tick={{ fontSize: 12 }} tickLine={false} />
                    <YAxis tickFormatter={formatYAxis} tick={{ fontSize: 12 }} />
                    <Tooltip
                        formatter={(value) => `${value.toLocaleString()}₫`}
                        labelFormatter={(label) => `Date: ${label}`}
                    />
                    {/* <Line type='monotone' dataKey='price' fill='#1977F2' dot={{ r: 3 }} /> */}
                    <Line
                        type='monotone'
                        dataKey='price'
                        data={combinedData}
                        dot={({ cx, cy, payload }) => (
                            <circle
                                cx={cx}
                                cy={cy}
                                r={4}
                                fill={payload.isPredicted ? 'red' : '#1977F2'}
                                stroke='#fff'
                                strokeWidth={1}
                            />
                        )}
                        isAnimationActive={false}
                        connectNulls
                    />
                </LineChart>
            </ResponsiveContainer>
            <Box sx={{ display: 'flex', gap: 2, mt: 2, width: '100%', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 12, height: 12, bgcolor: '#1977F2', borderRadius: '50%', mr: 1 }} />
                    <Typography variant='body2'>Actual Price</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 12, height: 12, bgcolor: 'red', borderRadius: '50%', mr: 1 }} />
                    <Typography variant='body2'>Predicted Price</Typography>
                </Box>
            </Box>
            <Typography variant='body2' sx={{ marginTop: 2 }}>
                <b style={{ color: 'red' }}>Note:</b> The displayed date is the start of the week. The price shown is
                the average price for that week.
            </Typography>
        </Box>
    )
}
