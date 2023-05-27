import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const InventoryVendorManagement = () => {
  const [vendors, setVendors] = useState([]);
  const [editVendorId, setEditVendorId] = useState(null);
  const [editVendorData, setEditVendorData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    website: '',
  });
  const [newVendorData, setNewVendorData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    website: '',
  });

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/vendors');
      if (response.status === 200) {
        setVendors(response.data);
      } else {
        throw new Error('Error fetching vendors');
      }
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  const handleEditVendor = (vendorId) => {
    // Find the vendor data to edit
    const vendorToEdit = vendors.find((vendor) => vendor._id === vendorId);
    if (vendorToEdit) {
      setEditVendorId(vendorId);
      setEditVendorData(vendorToEdit);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditVendorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditVendorSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5001/api/vendors/${editVendorId}`,
        editVendorData
      );
      if (response.status === 200) {
        // Update the edited vendor in the state
        setVendors((prevVendors) =>
          prevVendors.map((vendor) =>
            vendor._id === editVendorId ? { ...vendor, ...editVendorData } : vendor
          )
        );
        closeEditDialog(); // Close the edit dialog
        console.log(`Successfully edited vendor with ID: ${editVendorId}`);
      } else {
        throw new Error('Error editing vendor');
      }
    } catch (error) {
      console.error('Error editing vendor:', error);
    }
  };

  const closeEditDialog = () => {
    setEditVendorId(null);
    setEditVendorData({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      website: '',
    });
  };

  const handleNewVendorInputChange = (e) => {
    const { name, value } = e.target;
    setNewVendorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNewVendorSave = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/vendors', newVendorData);
      if (response.status === 201) {
        const createdVendor = response.data;
        // Add the created vendor to the state
        setVendors((prevVendors) => [...prevVendors, createdVendor]);
        closeNewVendorDialog(); // Close the new vendor dialog
        console.log(`Successfully created vendor with ID: ${createdVendor._id}`);
      } else {
        throw new Error('Error creating vendor');
      }
    } catch (error) {
      console.error('Error creating vendor:', error);
    }
  };

  const closeNewVendorDialog = () => {
    setNewVendorData({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      website: '',
    });
  };

  const handleDeleteVendor = async (vendorId) => {
    try {
      const response = await axios.delete(`http://localhost:5001/api/vendors/${vendorId}`);
      if (response.status === 200) {
        // Remove the deleted vendor from the state
        setVendors((prevVendors) => prevVendors.filter((vendor) => vendor._id !== vendorId));
        console.log(`Successfully deleted vendor with ID: ${vendorId}`);
      } else {
        throw new Error('Error deleting vendor');
      }
    } catch (error) {
      console.error('Error deleting vendor:', error);
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'address', headerName: 'Address', width: 300 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'state', headerName: 'State', width: 150 },
    { field: 'country', headerName: 'Country', width: 150 },
    { field: 'postalCode', headerName: 'Postal Code', width: 150 },
    { field: 'website', headerName: 'Website', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <button onClick={() => handleEditVendor(params.row._id)}>Edit</button>
          <button onClick={() => handleDeleteVendor(params.row._id)}>Delete</button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Vendor Management</h2>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={vendors}
          columns={columns}
          getRowId={(row) => row._id}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>

      {editVendorId && (
        <div>
          <h2>Edit Vendor</h2>
          <input
            type="text"
            name="name"
            value={editVendorData.name}
            onChange={handleEditInputChange}
            placeholder="Name"
          />
          <input
            type="text"
            name="email"
            value={editVendorData.email}
            onChange={handleEditInputChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="phone"
            value={editVendorData.phone}
            onChange={handleEditInputChange}
            placeholder="Phone"
          />
          <input
            type="text"
            name="address"
            value={editVendorData.address}
            onChange={handleEditInputChange}
            placeholder="Address"
          />
          <input
            type="text"
            name="city"
            value={editVendorData.city}
            onChange={handleEditInputChange}
            placeholder="City"
          />
          <input
            type="text"
            name="state"
            value={editVendorData.state}
            onChange={handleEditInputChange}
            placeholder="State"
          />
          <input
            type="text"
            name="country"
            value={editVendorData.country}
            onChange={handleEditInputChange}
            placeholder="Country"
          />
          <input
            type="text"
            name="postalCode"
            value={editVendorData.postalCode}
            onChange={handleEditInputChange}
            placeholder="Postal Code"
          />
          <input
            type="text"
            name="website"
            value={editVendorData.website}
            onChange={handleEditInputChange}
            placeholder="Website"
          />
          <button onClick={handleEditVendorSave}>Save</button>
          <button onClick={closeEditDialog}>Cancel</button>
        </div>
      )}

      <div>
        <h2>Create Vendor</h2>
        <input
          type="text"
          name="name"
          value={newVendorData.name}
          onChange={handleNewVendorInputChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="email"
          value={newVendorData.email}
          onChange={handleNewVendorInputChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="phone"
          value={newVendorData.phone}
          onChange={handleNewVendorInputChange}
          placeholder="Phone"
        />
        <input
          type="text"
          name="address"
          value={newVendorData.address}
          onChange={handleNewVendorInputChange}
          placeholder="Address"
        />
        <input
          type="text"
          name="city"
          value={newVendorData.city}
          onChange={handleNewVendorInputChange}
          placeholder="City"
        />
        <input
          type="text"
          name="state"
          value={newVendorData.state}
          onChange={handleNewVendorInputChange}
          placeholder="State"
        />
        <input
          type="text"
          name="country"
          value={newVendorData.country}
          onChange={handleNewVendorInputChange}
          placeholder="Country"
        />
        <input
          type="text"
          name="postalCode"
          value={newVendorData.postalCode}
          onChange={handleNewVendorInputChange}
          placeholder="Postal Code"
        />
        <input
          type="text"
          name="website"
          value={newVendorData.website}
          onChange={handleNewVendorInputChange}
          placeholder="Website"
        />
        <button onClick={handleNewVendorSave}>Create</button>
      </div>
    </div>
  );
};

export default InventoryVendorManagement;
