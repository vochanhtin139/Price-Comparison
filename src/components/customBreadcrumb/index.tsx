import { ArrowBackIosNew } from '@mui/icons-material'
import { Box, Breadcrumbs, Button, Chip, Link, Paper, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
type Props = {
    title: string
    breadcrumnb: {
        label: string
        href: string
    }[]
    isBack?: boolean
    stock?: any
}
export default function CustomBreadcrumb({ stock, breadcrumnb, title, isBack }: Props) {
    const navigate = useNavigate()
    const isHtml = (text: string) => /<\/?[a-z][\s\S]*>/i.test(text)
    return (
        <>
            <Stack gap={1}>
                {isBack && (
                    <Box mb={2}>
                        <Button startIcon={<ArrowBackIosNew />} onClick={() => navigate(-1)} variant='text'>
                            Back
                        </Button>
                    </Box>
                )}
                <Stack gap={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* <Typography variant='h5' fontWeight={'bold'}>
                            {title}
                        </Typography> */}
                        {isHtml(title) ? (
                            <Typography
                                variant='h5'
                                my={-2}
                                className='custom-list'
                                dangerouslySetInnerHTML={{ __html: title }}
                            />
                        ) : (
                            <Typography variant='h5' fontWeight='bold'>
                                {title}
                            </Typography>
                        )}
                    </Box>
                    <Breadcrumbs aria-label='breadcrumb' separator={<>&bull;</>}>
                        {breadcrumnb.map((item, index) => (
                            <Link
                                key={index}
                                underline='hover'
                                sx={{ display: 'flex', alignItems: 'center' }}
                                color='inherit'
                                href={item.href}
                            >
                                {item.label}
                            </Link>
                        ))}

                        {/* <Typography sx={{ display: 'flex', alignItems: 'center' }} color='text.primary'>
                            {title}
                        </Typography> */}
                        {isHtml(title) ? (
                            <Typography
                                sx={{ display: 'flex', alignItems: 'center' }}
                                // dangerouslySetInnerHTML={{ __html: title }}
                            >
                                Update assessment
                            </Typography>
                        ) : (
                            <Typography sx={{ display: 'flex', alignItems: 'center' }} color='text.primary'>
                                {title}
                            </Typography>
                        )}
                    </Breadcrumbs>
                </Stack>
            </Stack>
        </>
    )
}
