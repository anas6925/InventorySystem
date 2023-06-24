import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const InventoryItemManagement = () => {
  const [items, setItems] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [editItemData, setEditItemData] = useState({
    name: '',
    selectGroup: '',
    status: '',
    fontSize: 0,
    fontColor: '',
    itemColor: '',
    price: 0,
    priceWithGST: 0,
    priceWithoutGST: 0,
    isActive: true,
  });
  const [newItemData, setNewItemData] = useState({
    name: '',
    selectGroup: '',
    status: '',
    fontSize: 0,
    fontColor: '',
    itemColor: '',
    price: 0,
    priceWithGST: 0,
    priceWithoutGST: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/items');
      if (response.status === 200) {
        setItems(response.data);
      } else {
        throw new Error('Error fetching items');
      }
    } catch (error) {
      console.error('Error fetching items:', error);
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
        isActive: editItemData.isActive === 'active', // Convert to boolean
      };
  
      await axios.put(
        `http://localhost:5001/api/items/${editItemId}`,
        editedItemData
      );
  
      fetchItems();
     
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const closeEditDialog = () => {
    setEditItemId(null);
    setEditItemData({
      name: '',
      selectGroup: '',
      status: '',
      fontSize: 0,
      fontColor: '',
      itemColor: '',
      price: 0,
      priceWithGST: 0,
      priceWithoutGST: 0,
      isActive: true,
    });
  };

  

  const handleNewItemSave = async () => {
    try {
      const newItemDataWithBoolean = {
        ...newItemData,
        isActive: newItemData.isActive === 'active', // Convert to boolean
      };
  
      await axios.post('http://localhost:5001/api/items', newItemDataWithBoolean);
  
      setNewItemData({
        name: '',
        selectGroup: '',
        status: '',
        fontSize: '',
        fontColor: '',
        itemColor: '',
        price: '',
        priceWithGST: '',
        priceWithoutGST: '',
        isActive: '',
      });
  
      fetchItems();
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  // const closeNewItemDialog = () => {
  //   setNewItemData({
  //     name: '',
  //     selectGroup: '',
  //     status: '',
  //     fontSize: 0,
  //     fontColor: '',
  //     itemColor: '',
  //     price: 0,
  //     priceWithGST: 0,
  //     priceWithoutGST: 0,
  //     isActive: true,
  //   });
  // };

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await axios.delete(`http://localhost:5001/api/items/${itemId}`);
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
  const handleNewItemInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setNewItemData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };
  
  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'selectGroup', headerName: 'Select Group', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'fontSize', headerName: 'Font Size', width: 150 },
    { field: 'fontColor', headerName: 'Font Color', width: 200 },
    { field: 'itemColor', headerName: 'Item Color', width: 200 },
    { field: 'price', headerName: 'Price', width: 150 },
    { field: 'priceWithGST', headerName: 'Price with GST', width: 200 },
    { field: 'priceWithoutGST', headerName: 'Price without GST', width: 200 },
    { field: 'isActive', headerName: 'Active', width: 150 },
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
      <h2>Item Management</h2>

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
            placeholder="Select Group"
          />
          <input
            type="text"
            name="status"
            value={editItemData.status}
            onChange={handleEditInputChange}
            placeholder="Status"
          />
          <input
            type="number"
            name="fontSize"
            value={editItemData.fontSize}
            onChange={handleEditInputChange}
            placeholder="Font Size"
          />
          <input
            type="text"
            name="fontColor"
            value={editItemData.fontColor}
            onChange={handleEditInputChange}
            placeholder="Font Color"
          />
          <input
            type="text"
            name="itemColor"
            value={editItemData.itemColor}
            onChange={handleEditInputChange}
            placeholder="Item Color"
          />
          <input
            type="number"
            name="price"
            value={editItemData.price}
            onChange={handleEditInputChange}
            placeholder="Price"
          />
          <input
            type="number"
            name="priceWithGST"
            value={editItemData.priceWithGST}
            onChange={handleEditInputChange}
            placeholder="Price with GST"
          />
          <input
            type="number"
            name="priceWithoutGST"
            value={editItemData.priceWithoutGST}
            onChange={handleEditInputChange}
            placeholder="Price without GST"
          />
         <label>
            Is Active:
            <select
              name="isActive"
              value={editItemData.isActive}
              onChange={handleEditInputChange}
            >
              <option value="">Select</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
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
          placeholder="Select Group"
        />
        <input
          type="text"
          name="status"
          value={newItemData.status}
          onChange={handleNewItemInputChange}
          placeholder="Status"
        />
        <input
          type="number"
          name="fontSize"
          value={newItemData.fontSize}
          onChange={handleNewItemInputChange}
          placeholder="Font Size"
        />
        <input
          type="text"
          name="fontColor"
          value={newItemData.fontColor}
          onChange={handleNewItemInputChange}
          placeholder="Font Color"
        />
        <input
          type="text"
          name="itemColor"
          value={newItemData.itemColor}
          onChange={handleNewItemInputChange}
          placeholder="Item Color"
        />
        <input
          type="number"
          name="price"
          value={newItemData.price}
          onChange={handleNewItemInputChange}
          placeholder="Price"
        />
        <input
          type="number"
          name="priceWithGST"
          value={newItemData.priceWithGST}
          onChange={handleNewItemInputChange}
          placeholder="Price with GST"
        />
        <input
          type="number"
          name="priceWithoutGST"
          value={newItemData.priceWithoutGST}
          onChange={handleNewItemInputChange}
          placeholder="Price without GST"
        />
      <label>
            Is Active:
            <select
              name="isActive"
              value={editItemData.isActive}
              onChange={handleEditInputChange}
            >
              <option value="">Select</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </label>
        <button onClick={handleNewItemSave}>Create</button>
      </div>
    </div>
  );
};

export default InventoryItemManagement;
