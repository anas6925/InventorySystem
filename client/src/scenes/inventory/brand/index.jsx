import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const InventoryBrandManagement = () => {
  const [brands, setBrands] = useState([]);
  const [editBrandId, setEditBrandId] = useState(null);
  const [editBrandData, setEditBrandData] = useState({
    name: '',
    status: '',
  });
  const [newBrandData, setNewBrandData] = useState({
    name: '',
    status: '',
  });

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/brands');
      if (response.status === 200) {
        setBrands(response.data);
      } else {
        throw new Error('Error fetching brands');
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const handleEditBrand = (brandId) => {
    // Find the brand data to edit
    const brandToEdit = brands.find((brand) => brand._id === brandId);
    if (brandToEdit) {
      setEditBrandId(brandId);
      setEditBrandData(brandToEdit);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditBrandData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditBrandSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5001/api/brands/${editBrandId}`,
        editBrandData
      );
      if (response.status === 200) {
        // Update the edited brand in the state
        setBrands((prevBrands) =>
          prevBrands.map((brand) =>
            brand._id === editBrandId ? { ...brand, ...editBrandData } : brand
          )
        );
        closeEditDialog(); // Close the edit dialog
        console.log(`Successfully edited brand with ID: ${editBrandId}`);
      } else {
        throw new Error('Error editing brand');
      }
    } catch (error) {
      console.error('Error editing brand:', error);
    }
  };

  const closeEditDialog = () => {
    setEditBrandId(null);
    setEditBrandData({
      name: '',
      status: '',
    });
  };

  const handleNewBrandInputChange = (e) => {
    const { name, value } = e.target;
    setNewBrandData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNewBrandSave = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/brands', newBrandData);
      if (response.status === 201) {
        const createdBrand = response.data;
        // Add the created brand to the state
        setBrands((prevBrands) => [...prevBrands, createdBrand]);
        closeNewBrandDialog(); // Close the new brand dialog
        console.log(`Successfully created brand with ID: ${createdBrand._id}`);
      } else {
        throw new Error('Error creating brand');
      }
    } catch (error) {
      console.error('Error creating brand:', error);
    }
  };

  const closeNewBrandDialog = () => {
    setNewBrandData({
      name: '',
      status: '',
    });
  };

  const handleDeleteBrand = async (brandId) => {
    try {
      const response = await axios.delete(`http://localhost:5001/api/brands/${brandId}`);
      if (response.status === 200) {
        // Remove the deleted brand from the state
        setBrands((prevBrands) => prevBrands.filter((brand) => brand._id !== brandId));
        console.log(`Successfully deleted brand with ID: ${brandId}`);
      } else {
        throw new Error('Error deleting brand');
      }
    } catch (error) {
      console.error('Error deleting brand:', error);
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <button onClick={() => handleEditBrand(params.row._id)}>Edit</button>
          <button onClick={() => handleDeleteBrand(params.row._id)}>Delete</button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Brand Management</h2>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={brands}
          columns={columns}
          getRowId={(row) => row._id}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>

      {editBrandId && (
        <div>
          <h2>Edit Brand</h2>
          <input
            type="text"
            name="name"
            value={editBrandData.name}
            onChange={handleEditInputChange}
            placeholder="Name"
          />
          <input
            type="text"
            name="status"
            value={editBrandData.status}
            onChange={handleEditInputChange}
            placeholder="Status"
          />
          <button onClick={handleEditBrandSave}>Save</button>
          <button onClick={closeEditDialog}>Cancel</button>
        </div>
      )}

      <div>
        <h2>Create Brand</h2>
        <input
          type="text"
          name="name"
          value={newBrandData.name}
          onChange={handleNewBrandInputChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="status"
          value={newBrandData.status}
          onChange={handleNewBrandInputChange}
          placeholder="Status"
        />
        <button onClick={handleNewBrandSave}>Create</button>
      </div>
    </div>
  );
};

export default InventoryBrandManagement;
