import axios from 'axios';

import React, { useState,useEffect } from 'react';

import FlexBetween from 'components/FlexBetween';
import Header from 'components/Header';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Add, Edit, Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';

import DeleteIcon from '@mui/icons-material/Edit';
import { Box, Button, TextField, useTheme, useMediaQuery } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const InventoryVendorManagement = () => {
  const [active, setActive] = useState('addGroup');
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery('(min-width: 1200px)');
  
 


  
  

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState(10); // Default value for status

  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'state', headerName: 'State', width: 150 },
    { field: 'country', headerName: 'Country', width: 150 },
    { field: 'postalCode', headerName: 'Postal Code', width: 150 },
    { field: 'website', headerName: 'Website', width: 200 },
    { field: 'isActive', headerName: 'Status', width: 120 },
    { field: 'createdAt', headerName: 'Created At', width: 200 },
    { field: 'updatedAt', headerName: 'Updated At', width: 200 },
  ];
  
  if (active === 'deleteGroup') {
    columns.push({
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      renderCell: (params) => (
        <IconButton onClick={() => handleDeleteVendor(params.row._id)}>
          <DeleteIcon/>
        </IconButton>
      ),
    });
  } else if (active === 'editGroup') {
    columns.push({
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <IconButton
          color="primary"
          size="small"
          onClick={() => handleEditVendor(params.row.id)}
        >
          <EditIcon />
        </IconButton>
      ),
    });
  }
  

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  //Create Api
    const handleCreateVendor = async () => { 
      try {
 const vendorData = {
        name,
        email,
        phone,
        address,
        city,
        state,
        country,
        postalCode,
        website,
      };

      const response = await fetch('http://localhost:5001/api/vendors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vendorData),
      });

      if (!response.ok) {
        throw new Error('Error creating vendor');
      }

      const createdVendor = await response.json();
      console.log('Vendor created:', createdVendor);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const [dataGenerate, setDataGenerate] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/vendors');

        if (response.status === 200) {
          setDataGenerate(response.data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchData();
  }, []);


  // const [editableData, setEditableData] = useState({});
  // const [isEditing, setIsEditing] = useState(false);

  const handleEditVendor = (vendor) => {
    // setEditableData(vendor);
    // setIsEditing(true);
  };

  

  //Delete
  const handleDeleteVendor = async (vendorId) => {
    try {
      // Make the API call to delete the vendor
      const response = await fetch(`http://localhost:5001/api/vendors/${vendorId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Error deleting vendor');
      }
  
      // Remove the deleted vendor from the data state
      setDataGenerate(prevData => prevData.filter(vendor => vendor._id !== vendorId));
  
      console.log('Vendor deleted successfully');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  

  return (
    <Box m='1.5rem 2.5rem'>
      <FlexBetween>
        {active === 'addGroup' && <Header title='ADD GROUP' />}

        {active === 'editGroup' && <Header title='EDIT GROUP' />}

        {active === 'deleteGroup' && <Header title='DELETE GROUP' />}

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px',
              margin: '3px'
            }}
            onClick={() => setActive('addGroup')}
          >
            <Add sx={{ mr: '10px' }} />
            Add Group
          </Button>

          <Button
            onClick={() => setActive('editGroup')}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px'
            }}
          >
            <Edit sx={{ mr: '10px' }} />
            Edit Group
          </Button>

          <Button
            onClick={() => setActive('deleteGroup')}
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
            Delete Group
          </Button>
        </Box>
      </FlexBetween>

      {/* Add Group  */}
      {active === 'addGroup' && (
      <Box my='20px' sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item container direction='row' alignItems='center' justifyContent='center' xs={6}>
            <TextField type='text' label='Name' variant='outlined' fullWidth value={name} onChange={(e) => setName(e.target.value)} />
          </Grid>
          <Grid item container direction='row' alignItems='center' justifyContent='center' xs={6}>
            <TextField type='email' label='Email' variant='outlined' fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          </Grid>
          <Grid item container direction='row' alignItems='center' justifyContent='center' xs={6}>
            <TextField type='text' label='Phone' variant='outlined' fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Grid>
          <Grid item container direction='row' alignItems='center' justifyContent='center' xs={6}>
            <TextField type='text' label='Address' variant='outlined' fullWidth value={address} onChange={(e) => setAddress(e.target.value)} />
          </Grid>
          <Grid item container direction='row' alignItems='center' justifyContent='center' xs={6}>
            <TextField type='text' label='City' variant='outlined' fullWidth value={city} onChange={(e) => setCity(e.target.value)} />
          </Grid>
          <Grid item container direction='row' alignItems='center' justifyContent='center' xs={6}>
            <TextField type='text' label='State' variant='outlined' fullWidth value={state} onChange={(e) => setState(e.target.value)} />
          </Grid>
          <Grid item container direction='row' alignItems='center' justifyContent='center' xs={6}>
            <TextField type='text' label='Country' variant='outlined' fullWidth value={country} onChange={(e) => setCountry(e.target.value)} />
          </Grid>
          <Grid item container direction='row' alignItems='center' justifyContent='center' xs={6}>
            <TextField type='text' label='Postal Code' variant='outlined' fullWidth value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
          </Grid>
          <Grid item container direction='row' alignItems='center' justifyContent='center' xs={6}>
            <TextField type='text' label='Website' variant='outlined' fullWidth value={website} onChange={(e) => setWebsite(e.target.value)} />
          </Grid>
          <Grid item container direction='row' alignItems='center' justifyContent='center' xs={6}>
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
                <MenuItem value={20}>Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item container direction='row' alignItems='center' justifyContent='center' xs={12}>
            <Button variant="contained" color="primary" onClick={handleCreateVendor}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    )}
  


      {/* Edit Group */}
      {active === 'editGroup' && (
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
 <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        loading={isLoadingData}
        rows={dataGenerate.map((vendor, index) => ({ id: index + 1, ...vendor }))}
        columns={columns}
      />
    </div>
      </Box>
    </Box>
  )}


      {/* Delete Group */}
      {active === 'deleteGroup' && (
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
  loading={isLoadingData || !dataGenerate}
  getRowId={(row) => row._id}
  rows={dataGenerate || []}
  columns={columns}
/>

          </Box>
        </Box>
      )}
    </Box>
  )
}

export default InventoryVendorManagement
