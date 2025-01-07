import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Radio from '@mui/material/Radio'
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Rating from '@mui/material/Rating'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import FormControlLabel from '@mui/material/FormControlLabel'

import { Iconify } from 'src/components/iconify'
import { Scrollbar } from 'src/components/scrollbar'
import { ColorPicker } from 'src/components/color-utils'
import { MenuItem, Select, TextField } from '@mui/material'
import { Autocomplete } from '@mui/material'

// ----------------------------------------------------------------------

export type FiltersProps = {
    crawlerName: string
    categoryLink: string
    ecommerceSite: string
}

type CategoryLinkFiltersProps = {
    canReset: boolean
    openFilter: boolean
    filters: FiltersProps
    onOpenFilter: () => void
    onCloseFilter: () => void
    onResetFilter: () => void
    onSetFilters: (updateState: Partial<FiltersProps>) => void
}

export function CategoryLinkFilters({
    filters,
    canReset,
    openFilter,
    onSetFilters,
    onOpenFilter,
    onCloseFilter,
    onResetFilter
}: CategoryLinkFiltersProps) {

    // const renderRota = (
    //     <Stack spacing={1}>
    //         <Typography variant='subtitle2'>Rota</Typography>
    //         <FormGroup>
    //             {/* <TextField
    //                 variant='outlined'
    //                 fullWidth
    //                 value={filters.rota}
    //                 onChange={(event) => onSetFilters({ rota: event.target.value })}
    //                 placeholder='Enter rota'
    //             /> */}
    //             <Select value={filters.rota} onChange={(event) => onSetFilters({ rota: event.target.value })}>
    //                 {rotas.map((group) => (
    //                     <MenuItem key={group} value={group}>
    //                         {group}
    //                     </MenuItem>
    //                 ))}
    //             </Select>
    //         </FormGroup>
    //     </Stack>
    // )

    // const renderSchool = (
    //     <Stack spacing={1}>
    //         <Typography variant='subtitle2'>School</Typography>
    //         <FormGroup>
    //             <TextField
    //                 variant='outlined'
    //                 fullWidth
    //                 value={filters.school}
    //                 onChange={(event) => onSetFilters({ school: event.target.value })}
    //                 placeholder='Enter school'
    //             />
    //         </FormGroup>
    //     </Stack>
    // )

    // const renderCourse = (
    //     <Stack spacing={1}>
    //         <Typography variant='subtitle2'>Course</Typography>
    //         <FormGroup>
    //             {/* <TextField
    //                 variant='outlined'
    //                 fullWidth
    //                 value={filters.course}
    //                 onChange={(event) => onSetFilters({ course: event.target.value })}
    //                 placeholder='Enter course'
    //             /> */}
    //             {/* <Autocomplete
    //                 options={courses}
    //                 value={courses.find((course) => course.name === filters.course) || null}
    //                 getOptionLabel={(option) => option.name}
    //                 renderOption={(props, option) => (
    //                     <Box component='li' {...props}>
    //                         {option.name}
    //                     </Box>
    //                 )}
    //                 renderInput={(params) => <TextField {...params} placeholder='Search by name' />}
    //                 onChange={(event, value) => onSetFilters({ course: value?.name || '' })}
    //             /> */}
    //             <Select
    //                 value={filters.course}
    //                 onChange={(e) => onSetFilters({ course: (e.target.value as string) || '' })}
    //             >
    //                 {courses.map((course) => (
    //                     <MenuItem key={course.id} value={course.name}>
    //                         {course.name}
    //                     </MenuItem>
    //                 ))}
    //             </Select>
    //         </FormGroup>
    //     </Stack>
    // )

    return (
        <>
            <Button
                disableRipple
                color='inherit'
                startIcon={
                    <Badge color='error' variant='dot' invisible={!canReset}>
                        <Iconify icon='ic:round-filter-list' />
                    </Badge>
                }
                onClick={onOpenFilter}
            >
                Filters
            </Button>

            <Drawer
                anchor='right'
                open={openFilter}
                onClose={onCloseFilter}
                PaperProps={{
                    sx: { width: ['100%', '400px'], overflow: 'hidden' }
                }}
            >
                <Box display='flex' alignItems='center' sx={{ pl: 2.5, pr: 1.5, py: 2 }}>
                    <Typography variant='h6' flexGrow={1}>
                        Filters
                    </Typography>

                    <IconButton onClick={onResetFilter}>
                        <Badge color='error' variant='dot' invisible={!canReset}>
                            <Iconify icon='solar:refresh-linear' />
                        </Badge>
                    </IconButton>

                    <IconButton onClick={onCloseFilter}>
                        <Iconify icon='mingcute:close-line' />
                    </IconButton>
                </Box>

                <Divider />

                <Scrollbar>
                    <Stack spacing={3} sx={{ p: 3 }}>
                        {/* {renderSchool}
                        {renderCourse}
                        {renderRota} */}
                    </Stack>
                </Scrollbar>
            </Drawer>
        </>
    )
}
