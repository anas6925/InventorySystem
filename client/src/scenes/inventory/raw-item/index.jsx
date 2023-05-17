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

const InventoryRawItem = () => {
  const [active, setActive] = useState('addRawItem')
  const theme = useTheme()
  const isNonMediumScreens = useMediaQuery('(min-width: 1200px)')
  const { data, isLoading } = useGetDashboardQuery()
  const [status, setStatus] = useState('')
  const [group, selectGroup] = useState('')
  const [brand, selectBrand] = useState('')
  const [unitMeasure, selectUnitMeasure] = useState('')

  const handleChange = event => {
    setStatus(event.target.value)
  }

  const handleChangeGroup = event => {
    selectGroup(event.target.value)
  }

  const handleChangeBrand = event => {
    selectBrand(event.target.value)
  }

  const handleChangeUnitMeasure = event => {
    selectUnitMeasure(event.target.value)
  }

  const columns = [
    {
      field: 'add_item_id',
      headerName: 'Raw Item ID',
      flex: 1
    },
    {
      field: 'raw_item_name',
      headerName: 'Raw Item Name',
      flex: 1
    },
    {
      field: 'raw_item_group',
      headerName: 'Raw Item Group',
      flex: 1
    },
    {
      field: 'raw_item_brand',
      headerName: 'Raw Item Brand',
      flex: 1
    },
    {
      field: 'raw_item_unit_measure',
      headerName: 'Unit of Measure',
      flex: 1
    },
    {
      field: 'raw_item_status',
      headerName: 'Status',
      flex: 1
    }
  ]

  return (
    <Box m='1.5rem 2.5rem'>
      <FlexBetween>
        {active === 'addRawItem' && <Header title='ADD RAW ITEM' />}

        {active === 'editRawItem' && <Header title='EDIT RAW ITEM' />}

        {active === 'deleteRawItem' && <Header title='DELETE RAW ITEM' />}

        <Box>
          <Button
            onClick={() => setActive('addRawItem')}
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
            Add Raw Item
          </Button>

          <Button
            onClick={() => setActive('editRawItem')}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px'
            }}
          >
            <Edit sx={{ mr: '10px' }} />
            Edit Raw Item
          </Button>

          <Button
            onClick={() => setActive('deleteRawItem')}
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
            Delete Raw Item
          </Button>
        </Box>
      </FlexBetween>

      {/* Add Raw Item  */}
      {active === 'addRawItem' && (
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
                label='Name'
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
                <InputLabel id='demo-simple-select-label'>
                  Select Group
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={group}
                  label='Select Group'
                  onChange={handleChangeGroup}
                >
                  <MenuItem value={10}>Pizza</MenuItem>
                  <MenuItem value={20}>Burger</MenuItem>
                  <MenuItem value={20}>Steak</MenuItem>
                </Select>
              </FormControl>
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
              xs={6}
            >
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>
                  Select Brand
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={brand}
                  label='Select Brand'
                  onChange={handleChangeBrand}
                >
                  <MenuItem value={10}>Kisan</MenuItem>
                  <MenuItem value={20}>Dalda</MenuItem>
                  <MenuItem value={20}>Season</MenuItem>
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
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>
                  Select Unit of Measure
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={unitMeasure}
                  label='Select Brand'
                  onChange={handleChangeUnitMeasure}
                >
                  <MenuItem value={10}>Litre</MenuItem>
                  <MenuItem value={20}>Gram</MenuItem>
                  <MenuItem value={20}>Kg</MenuItem>
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

      {/* Edit Raw Item */}
      {active === 'editRawItem' && (
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

      {/* Delete Raw Item */}
      {active === 'deleteRawItem' && (
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

export default InventoryRawItem