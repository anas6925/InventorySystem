import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const InventoryGroupManagement = () => {
  const [groups, setGroups] = useState([]);
  const [editGroupId, setEditGroupId] = useState(null);
  const [editGroupData, setEditGroupData] = useState({
    name: '',
    color: '',
    status: '',
    fontSize: 0,
    fontColor: '',
    isActive: '',
  });
  const [newGroupData, setNewGroupData] = useState({
    name: '',
    color: '',
    status: '',
    fontSize: 0,
    fontColor: '',
    isActive: '',
  });

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/groups');
      if (response.status === 200) {
        setGroups(response.data);
      } else {
        throw new Error('Error fetching groups');
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const handleEditGroup = (groupId) => {
    // Find the group data to edit
    const groupToEdit = groups.find((group) => group._id === groupId);
    if (groupToEdit) {
      setEditGroupId(groupId);
      setEditGroupData(groupToEdit);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditGroupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditGroupSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5001/api/groups/${editGroupId}`,
        editGroupData
      );
      if (response.status === 200) {
        // Update the edited group in the state
        setGroups((prevGroups) =>
          prevGroups.map((group) =>
            group._id === editGroupId ? { ...group, ...editGroupData } : group
          )
        );
        closeEditDialog(); // Close the edit dialog
        console.log(`Successfully edited group with ID: ${editGroupId}`);
      } else {
        throw new Error('Error editing group');
      }
    } catch (error) {
      console.error('Error editing group:', error);
    }
  };

  const closeEditDialog = () => {
    setEditGroupId(null);
    setEditGroupData({
      name: '',
      color: '',
      status: '',
      fontSize: 0,
      fontColor: '',
      isActive: '',
    });
  };

  
  const handleNewGroupSave = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/groups', newGroupData);
      if (response.status === 201) {
        const createdGroup = response.data;
        // Add the created group to the state
        setGroups((prevGroups) => [...prevGroups, createdGroup]);
        closeNewGroupDialog(); // Close the new group dialog
        console.log(`Successfully created group with ID: ${createdGroup._id}`);
      } else {
        throw new Error('Error creating group');
      }
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const closeNewGroupDialog = () => {
    setNewGroupData({
      name: '',
      color: '',
      status: '',
      fontSize: 0,
      fontColor: '',
      isActive: '',
    });
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      const response = await axios.delete(`http://localhost:5001/api/groups/${groupId}`);
      if (response.status === 200) {
        // Remove the deleted group from the state
        setGroups((prevGroups) => prevGroups.filter((group) => group._id !== groupId));
        console.log(`Successfully deleted group with ID: ${groupId}`);
      } else {
        throw new Error('Error deleting group');
      }
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'color', headerName: 'Color', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'fontSize', headerName: 'Font Size', width: 150 },
    { field: 'fontColor', headerName: 'Font Color', width: 150 },
    { field: 'isActive', headerName: 'Active', width: 120, type: 'boolean' },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <button onClick={() => handleEditGroup(params.row._id)}>Edit</button>
          <button onClick={() => handleDeleteGroup(params.row._id)}>Delete</button>
        </>
      ),
    },
  ];
  const handleNewGroupInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setNewGroupData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };
  
  return (
    <div>
      <h2>Group Management</h2>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={groups}
          columns={columns}
          getRowId={(row) => row._id}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>

      {editGroupId && (
        <div>
          <h2>Edit Group</h2>
          <input
            type="text"
            name="name"
            value={editGroupData.name}
            onChange={handleEditInputChange}
            placeholder="Name"
          />
          <input
            type="text"
            name="color"
            value={editGroupData.color}
            onChange={handleEditInputChange}
            placeholder="Color"
          />
          <input
            type="text"
            name="status"
            value={editGroupData.status}
            onChange={handleEditInputChange}
            placeholder="Status"
          />
          <input
            type="number"
            name="fontSize"
            value={editGroupData.fontSize}
            onChange={handleEditInputChange}
            placeholder="Font Size"
          />
          <input
            type="text"
            name="fontColor"
            value={editGroupData.fontColor}
            onChange={handleEditInputChange}
            placeholder="Font Color"
          />
          <label>
            Active:
            <input
  type="checkbox"
  name="isActive"
  checked={newGroupData.isActive}
  onChange={handleNewGroupInputChange}
/>

          </label>
          <button onClick={handleEditGroupSave}>Save</button>
          <button onClick={closeEditDialog}>Cancel</button>
        </div>
      )}

      <div>
        <h2>Create Group</h2>
        <input
          type="text"
          name="name"
          value={newGroupData.name}
          onChange={handleNewGroupInputChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="color"
          value={newGroupData.color}
          onChange={handleNewGroupInputChange}
          placeholder="Color"
        />
        <input
          type="text"
          name="status"
          value={newGroupData.status}
          onChange={handleNewGroupInputChange}
          placeholder="Status"
        />
        <input
          type="number"
          name="fontSize"
          value={newGroupData.fontSize}
          onChange={handleNewGroupInputChange}
          placeholder="Font Size"
        />
        <input
          type="text"
          name="fontColor"
          value={newGroupData.fontColor}
          onChange={handleNewGroupInputChange}
          placeholder="Font Color"
        />
        <label>
          Active:
          <input
  type="checkbox"
  name="isActive"
  checked={newGroupData.isActive}
  onChange={handleNewGroupInputChange}
/>

        </label>
        <button onClick={handleNewGroupSave}>Create</button>
      </div>
    </div>
  );
};

export default InventoryGroupManagement;
