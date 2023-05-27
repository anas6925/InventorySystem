import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const RawItemManagement = () => {
  const [items, setItems] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [editItemData, setEditItemData] = useState({
    name: '',
    selectGroup: '',
    status: '',
    selectBrand: '',
    selectUnitOfMeasure: '',
    isActive: true,
  });
  const [newItemData, setNewItemData] = useState({
    name: '',
    selectGroup: '',
    status: '',
    selectBrand: '',
    selectUnitOfMeasure: '',
    isActive: true,
  });

  useEffect(() => {
    fetchItems();
  }, []);
  
  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/rawitems');
      if (response.status === 200) {
        setItems(response.data);
      } else {
        throw new Error('Error fetching rawitems');
      }
    } catch (error) {
      console.error('Error fetching rawitems:', error);
    }
  };

  const handleEditItem = (itemId) => {
    // Find the item data to edit
    const itemToEdit = items.find((item) => item._id === itemId);
    if (itemToEdit) {
      setEditItemId(itemId);
      setEditItemData(itemToEdit);
    }
  };

  const handleEditDropdownChange = (event) => {
    const { name, value } = event.target;
    setEditItemData((prevData) => ({
      ...prevData,
      [name]: value === 'true', // Convert the string value to a boolean
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditItemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditItemSave = async () => {
    try {
      const editedItemData = {
        ...editItemData,
        isActive: editItemData.isActive === 'active',
      };

      const response = await axios.put(
        `http://localhost:5001/api/rawitems/${editItemId}`,
        editedItemData
      );
      if (response.status === 200) {
        // Update the edited item in the state
        setItems((prevItems) =>
          prevItems.map((item) =>
            item._id === editItemId ? { ...item, ...editedItemData } : item
          )
        );
        closeEditDialog(); // Close the edit dialog
        console.log(`Successfully edited item with ID: ${editItemId}`);
      } else {
        throw new Error('Error editing item');
      }
    } catch (error) {
      console.error('Error editing item:', error);
    }
  };

  const closeEditDialog = () => {
    setEditItemId(null);
    setEditItemData({
      name: '',
      selectGroup: '',
      status: '',
      selectBrand: '',
      selectUnitOfMeasure: '',
      isActive: true,
    });
  };

  const handleNewItemInputChange = (e) => {
    const { name, value } = e.target;
    setNewItemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNewItemSave = async () => {
    try {
      const newItemDataWithBoolean = {
        ...newItemData,
        isActive: newItemData.isActive === 'active',
      };

      const response = await axios.post(
        'http://localhost:5001/api/rawitems',
        newItemDataWithBoolean
      );
      if (response.status === 201) {
        const createdItem = response.data;
        // Add the created item to the state
        setItems((prevItems) => [...prevItems, createdItem]);
        closeNewItemDialog(); // Close the new item dialog
        console.log(`Successfully created item with ID: ${createdItem._id}`);
      } else {
        throw new Error('Error creating item');
      }
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  const closeNewItemDialog = () => {
    setNewItemData({
      name: '',
      selectGroup: '',
      status: '',
      selectBrand: '',
      selectUnitOfMeasure: '',
      isActive: true,
    });
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await axios.delete(`http://localhost:5001/api/rawitems/${itemId}`);
      if (response.status === 200) {
        // Remove the deleted item from the state
        setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
        console.log(`Successfully deleted item with ID: ${itemId}`);
      } else {
        throw new Error('Error deleting item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  const handleEditCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setEditItemData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };
  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'selectGroup', headerName: 'Group', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'selectBrand', headerName: 'Brand', width: 200 },
    { field: 'selectUnitOfMeasure', headerName: 'Unit of Measure', width: 200 },
    {
      field: 'isActive',
      headerName: 'Active',
      width: 100,
      renderCell: (params) => (
        <span>{params.value ? 'Active' : 'Inactive'}</span>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <button onClick={() => handleEditItem(params.row._id)}>Edit</button>
          <button onClick={() => handleDeleteItem(params.row._id)}>Delete</button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Raw Item Management</h2>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={items}
          columns={columns}
          getRowId={(row) => row._id}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>

      {editItemId && (
        <div>
          <h2>Edit Item</h2>
          <input
            type="text"
            name="name"
            value={editItemData.name}
            onChange={handleEditInputChange}
            placeholder="Name"
          />
          <input
            type="text"
            name="selectGroup"
            value={editItemData.selectGroup}
            onChange={handleEditInputChange}
            placeholder="Group"
          />
          <input
            type="text"
            name="status"
            value={editItemData.status}
            onChange={handleEditInputChange}
            placeholder="Status"
          />
          <input
            type="text"
            name="selectBrand"
            value={editItemData.selectBrand}
            onChange={handleEditInputChange}
            placeholder="Brand"
          />
          <input
            type="text"
            name="selectUnitOfMeasure"
            value={editItemData.selectUnitOfMeasure}
            onChange={handleEditInputChange}
            placeholder="Unit of Measure"
          />
          <label>
          <select
      name="isActive"
      value={editItemData.isActive.toString()} // Convert the boolean value to a string
      onChange={handleEditDropdownChange}
    >
      <option value="true">Active</option>
      <option value="false">Inactive</option>
    </select>
            Active
          </label>
          <button onClick={handleEditItemSave}>Save</button>
          <button onClick={closeEditDialog}>Cancel</button>
        </div>
      )}

      <div>
        <h2>Create Item</h2>
        <input
          type="text"
          name="name"
          value={newItemData.name}
          onChange={handleNewItemInputChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="selectGroup"
          value={newItemData.selectGroup}
          onChange={handleNewItemInputChange}
          placeholder="Group"
        />
        <input
          type="text"
          name="status"
          value={newItemData.status}
          onChange={handleNewItemInputChange}
          placeholder="Status"
        />
        <input
          type="text"
          name="selectBrand"
          value={newItemData.selectBrand}
          onChange={handleNewItemInputChange}
          placeholder="Brand"
        />
        <input
          type="text"
          name="selectUnitOfMeasure"
          value={newItemData.selectUnitOfMeasure}
          onChange={handleNewItemInputChange}
          placeholder="Unit of Measure"
        />
        <label>
        <select
      name="isActive"
      value={editItemData.isActive.toString()} // Convert the boolean value to a string
      onChange={handleEditDropdownChange}
    >
      <option value="true">Active</option>
      <option value="false">Inactive</option>
    </select>
    
        </label>
        <button onClick={handleNewItemSave}>Create</button>
      </div>
    </div>
  );
};

export default RawItemManagement;
