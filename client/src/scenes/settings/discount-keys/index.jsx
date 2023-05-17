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

const SettingsDiscountKeys = () => {
  const [active, setActive] = useState('addDiscountKey')
  const theme = useTheme()
  const isNonMediumScreens = useMediaQuery('(min-width: 1200px)')
  const { data, isLoading } = useGetDashboardQuery()
  const [status, setStatus] = useState('')

  const handleChange = event => {
    setStatus(event.target.value)
  }

  const columns = [
    {
      field: 'discount_key_id',
      headerName: 'Discount ID',
      flex: 1
    },
    {
      field: 'discount_name',
      headerName: 'Discount Name',
      flex: 1
    },
    {
      field: 'discount_key',
      headerName: 'Discount Key',
      flex: 1
    },
    {
      field: 'discount_key_status',
      headerName: 'Status',
      flex: 1
    }
  ]

  return (
    <Box m='1.5rem 2.5rem'>
      <FlexBetween>
        {active === 'addDiscountKey' && <Header title='ADD DISCOUNT KEY' />}

        {active === 'editDiscountKey' && <Header title='EDIT DISCOUNT KEY' />}

        {active === 'deleteDiscountKey' && (
          <Header title='DELETE DISCOUNT KEY' />
        )}

        <Box>
          <Button
            onClick={() => setActive('addDiscountKey')}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px',
              margin: '3px'
            }}
          >
            <Add sx={{ mr: '10px' }} />
            Add Discount Key
          </Button>

          <Button
            onClick={() => setActive('editDiscountKey')}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px'
            }}
          >
            <Edit sx={{ mr: '10px' }} />
            Edit Discount Key
          </Button>

          <Button
            onClick={() => setActive('deleteDiscountKey')}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px',
              margin: '3px'
            }}
          >
            <Delete sx={{ mr: '10px' }} />
            Delete Discount Key
          </Button>
        </Box>
      </FlexBetween>

      {/* Add Discount Key  */}
      {active === 'addDiscountKey' && (
        <Box my='20px' sx={{ width: '100%' }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid
              item
              container
              direction='row'
              alignItems='center'
              justifyContent='center'
              xs={6}
            >
              <TextField
                type='text'
                label='Discount Name'
                variant='outlined'
                fullWidth
              />
            </Grid>
            <Grid
              item
              container
              direction='row'
              alignItems='center'
              justifyContent='center'
              xs={6}
            >
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Status</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={status}
                  label='Status'
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Active</MenuItem>
                  <MenuItem value={20}>In Active</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              container
              direction='row'
              alignItems='center'
              justifyContent='center'
              xs={12}
            >
              <TextField
                type='text'
                label='Discount Key Value'
                variant='outlined'
                fullWidth
              />
            </Grid>
            <Grid
              item
              container
              direction='row'
              alignItems='center'
              justifyContent='center'
              xs={12}
            >
              <Button variant='contained' color='primary'>
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Edit Discount Key */}
      {active === 'editDiscountKey' && (
        <Box
          display='grid'
          gridTemplateColumns='repeat(12, 1fr)'
          gridAutoRows='160px'
          gap='20px'
          sx={{
            '& > div': {
              gridColumn: isNonMediumScreens ? undefined : 'span 12'
            }
          }}
        >
          <Box
            gridColumn='span 12'
            gridRow='span 3'
            my='20px'
            sx={{
              '& .MuiDataGrid-root': {
                border: 'none',
                borderRadius: '5rem'
              },
              '& .MuiDataGrid-cell': {
                borderBottom: 'none'
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderBottom: 'none'
              },
              '& .MuiDataGrid-virtualScroller': {
                backgroundColor: theme.palette.background.alt
              },
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderTop: 'none'
              },
              '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                color: `${theme.palette.secondary[200]} !important`
              }
            }}
          >
            <DataGrid
              loading={isLoading || !data}
              getRowId={row => row._id}
              rows={(data && data.transactions) || []}
              columns={columns}
            />
          </Box>
        </Box>
      )}

      {/* Delete Discount Key */}
      {active === 'deleteDiscountKey' && (
        <Box
          display='grid'
          gridTemplateColumns='repeat(12, 1fr)'
          gridAutoRows='160px'
          gap='20px'
          sx={{
            '& > div': {
              gridColumn: isNonMediumScreens ? undefined : 'span 12'
            }
          }}
        >
          <Box
            gridColumn='span 12'
            gridRow='span 3'
            my='20px'
            sx={{
              '& .MuiDataGrid-root': {
                border: 'none',
                borderRadius: '5rem'
              },
              '& .MuiDataGrid-cell': {
                borderBottom: 'none'
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderBottom: 'none'
              },
              '& .MuiDataGrid-virtualScroller': {
                backgroundColor: theme.palette.background.alt
              },
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderTop: 'none'
              },
              '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                color: `${theme.palette.secondary[200]} !important`
              }
            }}
          >
            <DataGrid
              loading={isLoading || !data}
              getRowId={row => row._id}
              rows={(data && data.transactions) || []}
              columns={columns}
            />
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default SettingsDiscountKeys
