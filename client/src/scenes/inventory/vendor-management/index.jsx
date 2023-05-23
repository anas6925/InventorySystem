import React, { useState } from 'react'
import FlexBetween from 'components/FlexBetween'
import Header from 'components/Header'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { Add, Edit, Delete } from '@mui/icons-material'
import { Box, Button, TextField, useTheme, useMediaQuery } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useGetDashboardQuery } from 'state/api'

const InventoryVendorManagement = () => {
  const [active, setActive] = useState('addGroup')
  const theme = useTheme()
  const isNonMediumScreens = useMediaQuery('(min-width: 1200px)')
  const { data, isLoading } = useGetDashboardQuery()

  const [status, setStatus] = useState('')

  const handleChange = event => {
    setStatus(event.target.value)
  }

  const columns = [
    {
      field: 'group_id',
      headerName: 'Group ID',
      flex: 1
    },
    {
      field: 'group_name',
      headerName: 'Name',
      flex: 1
    },
    {
      field: 'group_color',
      headerName: 'Color',
      flex: 1
    },
    {
      field: 'group_status',
      headerName: 'Status',
      flex: 0.5,
      sortable: false,
      renderCell: params => params.value.length
    },
    {
      field: 'group_font_size',
      headerName: 'Font Size',
      flex: 1,
      renderCell: params => `$${Number(params.value).toFixed(2)}`
    },
    {
      field: 'group_font_color',
      headerName: 'Font Color',
      flex: 1,
      renderCell: params => `$${Number(params.value).toFixed(2)}`
    }
  ]

  return (
    <>
    <h1>ANAS</h1></>
    // <Box m='1.5rem 2.5rem'>
    //   <FlexBetween>
    //     {active === 'addGroup' && <Header title='ADD GROUP' />}

    //     {active === 'editGroup' && <Header title='EDIT GROUP' />}

    //     {active === 'deleteGroup' && <Header title='DELETE GROUP' />}

    //     <Box>
    //       <Button
    //         sx={{
    //           backgroundColor: theme.palette.secondary.light,
    //           color: theme.palette.background.alt,
    //           fontSize: '14px',
    //           fontWeight: 'bold',
    //           padding: '10px 20px',
    //           margin: '3px'
    //         }}
    //         onClick={() => setActive('addGroup')}
    //       >
    //         <Add sx={{ mr: '10px' }} />
    //         Add Group
    //       </Button>

    //       <Button
    //         onClick={() => setActive('editGroup')}
    //         sx={{
    //           backgroundColor: theme.palette.secondary.light,
    //           color: theme.palette.background.alt,
    //           fontSize: '14px',
    //           fontWeight: 'bold',
    //           padding: '10px 20px'
    //         }}
    //       >
    //         <Edit sx={{ mr: '10px' }} />
    //         Edit Group
    //       </Button>

    //       <Button
    //         onClick={() => setActive('deleteGroup')}
    //         sx={{
    //           backgroundColor: theme.palette.secondary.light,
    //           color: theme.palette.background.alt,
    //           fontSize: '14px',
    //           fontWeight: 'bold',
    //           padding: '10px 20px',
    //           margin: '3px'
    //         }}
    //       >
    //         <Delete sx={{ mr: '10px' }} />
    //         Delete Group
    //       </Button>
    //     </Box>
    //   </FlexBetween>

    //   {/* Add Group  */}
    //   {active === 'addGroup' && (
    //     <Box my='20px' sx={{ width: '100%' }}>
    //       <Grid
    //         container
    //         rowSpacing={1}
    //         columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    //       >
    //         <Grid
    //           item
    //           container
    //           direction='row'
    //           alignItems='center'
    //           justifyContent='center'
    //           xs={6}
    //         >
    //           <TextField
    //             type='text'
    //             label='Name'
    //             variant='outlined'
    //             fullWidth
    //           />
    //         </Grid>
    //         <Grid
    //           item
    //           container
    //           direction='row'
    //           alignItems='center'
    //           justifyContent='center'
    //           xs={6}
    //         >
    //           <TextField
    //             type='text'
    //             label='Color'
    //             variant='outlined'
    //             fullWidth
    //           />
    //         </Grid>
    //         <Grid
    //           item
    //           container
    //           direction='row'
    //           alignItems='center'
    //           justifyContent='center'
    //           xs={6}
    //         >
    //           <FormControl fullWidth>
    //             <InputLabel id='demo-simple-select-label'>Status</InputLabel>
    //             <Select
    //               labelId='demo-simple-select-label'
    //               id='demo-simple-select'
    //               value={status}
    //               label='Status'
    //               onChange={handleChange}
    //             >
    //               <MenuItem value={10}>Active</MenuItem>
    //               <MenuItem value={20}>In Active</MenuItem>
    //             </Select>
    //           </FormControl>
    //         </Grid>
    //         <Grid
    //           item
    //           container
    //           direction='row'
    //           alignItems='center'
    //           justifyContent='center'
    //           xs={6}
    //         >
    //           <TextField
    //             type='text'
    //             label='Font Size'
    //             variant='outlined'
    //             fullWidth
    //           />
    //         </Grid>
    //         <Grid
    //           item
    //           container
    //           direction='row'
    //           alignItems='center'
    //           justifyContent='center'
    //           xs={12}
    //         >
    //           <TextField
    //             type='text'
    //             label='Font Color'
    //             variant='outlined'
    //             fullWidth
    //           />
    //         </Grid>
    //         <Grid
    //           item
    //           container
    //           direction='row'
    //           alignItems='center'
    //           justifyContent='center'
    //           xs={12}
    //         >
    //           <Button variant='contained' color='primary'>
    //             Save
    //           </Button>
    //         </Grid>
    //       </Grid>
    //     </Box>
    //   )}

    //   {/* Edit Group */}
    //   {active === 'editGroup' && (
    //     <Box
    //       display='grid'
    //       gridTemplateColumns='repeat(12, 1fr)'
    //       gridAutoRows='160px'
    //       gap='20px'
    //       sx={{
    //         '& > div': {
    //           gridColumn: isNonMediumScreens ? undefined : 'span 12'
    //         }
    //       }}
    //     >
    //       <Box
    //         gridColumn='span 12'
    //         gridRow='span 3'
    //         my='20px'
    //         sx={{
    //           '& .MuiDataGrid-root': {
    //             border: 'none',
    //             borderRadius: '5rem'
    //           },
    //           '& .MuiDataGrid-cell': {
    //             borderBottom: 'none'
    //           },
    //           '& .MuiDataGrid-columnHeaders': {
    //             backgroundColor: theme.palette.background.alt,
    //             color: theme.palette.secondary[100],
    //             borderBottom: 'none'
    //           },
    //           '& .MuiDataGrid-virtualScroller': {
    //             backgroundColor: theme.palette.background.alt
    //           },
    //           '& .MuiDataGrid-footerContainer': {
    //             backgroundColor: theme.palette.background.alt,
    //             color: theme.palette.secondary[100],
    //             borderTop: 'none'
    //           },
    //           '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
    //             color: `${theme.palette.secondary[200]} !important`
    //           }
    //         }}
    //       >
    //         <DataGrid
    //           loading={isLoading || !data}
    //           getRowId={row => row._id}
    //           rows={(data && data.transactions) || []}
    //           columns={columns}
    //         />
    //       </Box>
    //     </Box>
    //   )}

    //   {/* Delete Group */}
    //   {active === 'deleteGroup' && (
    //     <Box
    //       display='grid'
    //       gridTemplateColumns='repeat(12, 1fr)'
    //       gridAutoRows='160px'
    //       gap='20px'
    //       sx={{
    //         '& > div': {
    //           gridColumn: isNonMediumScreens ? undefined : 'span 12'
    //         }
    //       }}
    //     >
    //       <Box
    //         gridColumn='span 12'
    //         gridRow='span 3'
    //         my='20px'
    //         sx={{
    //           '& .MuiDataGrid-root': {
    //             border: 'none',
    //             borderRadius: '5rem'
    //           },
    //           '& .MuiDataGrid-cell': {
    //             borderBottom: 'none'
    //           },
    //           '& .MuiDataGrid-columnHeaders': {
    //             backgroundColor: theme.palette.background.alt,
    //             color: theme.palette.secondary[100],
    //             borderBottom: 'none'
    //           },
    //           '& .MuiDataGrid-virtualScroller': {
    //             backgroundColor: theme.palette.background.alt
    //           },
    //           '& .MuiDataGrid-footerContainer': {
    //             backgroundColor: theme.palette.background.alt,
    //             color: theme.palette.secondary[100],
    //             borderTop: 'none'
    //           },
    //           '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
    //             color: `${theme.palette.secondary[200]} !important`
    //           }
    //         }}
    //       >
    //         <DataGrid
    //           loading={isLoading || !data}
    //           getRowId={row => row._id}
    //           rows={(data && data.transactions) || []}
    //           columns={columns}
    //         />
    //       </Box>
    //     </Box>
    //   )}
    // </Box>
  )
}

export default InventoryVendorManagement
