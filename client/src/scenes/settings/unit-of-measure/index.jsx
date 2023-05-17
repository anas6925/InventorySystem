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

const SettingsUnitOfMeasure = () => {
  const [active, setActive] = useState('addUnit')
  const theme = useTheme()
  const isNonMediumScreens = useMediaQuery('(min-width: 1200px)')
  const { data, isLoading } = useGetDashboardQuery()
  const [status, setStatus] = useState('')

  const handleChange = event => {
    setStatus(event.target.value)
  }

  const columns = [
    {
      field: 'unit_id',
      headerName: 'Unit of Measure ID',
      flex: 1
    },
    {
      field: 'unit_name',
      headerName: 'Unit Name',
      flex: 1
    },
    {
        field: 'unit_abbrevation',
        headerName: 'Unit Abbrevation',
        flex: 1
      },
    {
      field: 'unit_status',
      headerName: 'Status',
      flex: 1
    }
  ]

  return (
    <Box m='1.5rem 2.5rem'>
      <FlexBetween>
        {active === 'addUnit' && <Header title='ADD UNIT' />}

        {active === 'editUnit' && <Header title='EDIT UNIT' />}

        {active === 'deleteUnit' && (
          <Header title='DELETE UNIT' />
        )}

        <Box>
          <Button
            onClick={() => setActive('addUnit')}
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
            Add Unit
          </Button>

          <Button
            onClick={() => setActive('editUnit')}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px'
            }}
          >
            <Edit sx={{ mr: '10px' }} />
            Edit Unit
          </Button>

          <Button
            onClick={() => setActive('deleteUnit')}
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
            Delete Unit
          </Button>
        </Box>
      </FlexBetween>

      {/* Add Unit */}
      {active === 'addUnit' && (
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
                label='Unit Name'
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
              <TextField
                type='text'
                label='Unit Abbrevation'
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
              <Button variant='contained' color='primary'>
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Edit Unit */}
      {active === 'editUnit' && (
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

      {/* Delete Unit */}
      {active === 'deleteUnit' && (
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

export default SettingsUnitOfMeasure
