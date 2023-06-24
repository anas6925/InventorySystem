import React, { useState, useEffect } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Add, Edit, Delete } from "@mui/icons-material";
import { Box, Button, TextField, useTheme, useMediaQuery } from "@mui/material";

const SettingsDiscountKeys = () => {
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [active, setActive] = useState("addRawKey");
  const [items, setItems] = useState([]);

  const [newItemData, setNewItemData] = useState({
    name: "",
    selectGroup: "",
    status: "",
    selectBrand: "",
    selectUnitOfMeasure: "",
    isActive: true,
  });

  const [editItemData, setEditItemData] = useState({
    name: "",
    selectGroup: "",
    status: "",
    selectBrand: "",
    selectUnitOfMeasure: "",
    isActive: true,
  });

  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "selectGroup", headerName: "Group", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "selectBrand", headerName: "Brand", width: 200 },
    { field: "selectUnitOfMeasure", headerName: "Unit of Measure", width: 200 },
    {
      field: "isActive",
      headerName: "Active",
      width: 100,
      renderCell: (params) => (
        <span>{params.value ? "Active" : "Inactive"}</span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          {active === "editRawKey" && (
            <button
              style={{
                backgroundColor: "green",
                color: "white",
                width: "80px",
                height: "30px",
                borderRadius: "4px",
                border: "none",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              }}
              onClick={() => handleEditItem(params.row._id)}
            >
              Edit
            </button>
          )}
          {active === "deleteRawKey" && (
            <button
              style={{
                backgroundColor: "red",
                color: "white",
                width: "80px",
                height: "30px",
                borderRadius: "4px",
                border: "none",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              }}
              onClick={() => handleDeleteItem(params.row._id)}
            >
              Delete
            </button>
          )}
        </>
      ),
    },
  ];

  const handleEditItem = (itemId) => {
    const itemToEdit = items.find((item) => item._id === itemId);
    if (itemToEdit) {
      setEditItemId(itemId);
      setEditItemData(itemToEdit);
      setIsEditFormVisible(true);
    }
  };
  const handleDeleteItem = async (itemId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5001/api/rawitems/${itemId}`
      );
      if (response.status === 200) {
        // Remove the deleted item from the state
        setItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemId)
        );
        console.log(`Successfully deleted item with ID: ${itemId}`);
      } else {
        throw new Error("Error deleting item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  //////////////////////////////////////////////////

  const handleNewItemInputChange = (e) => {
    const { name, value } = e.target;
    setNewItemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditDropdownChange = (event) => {
    const { name, value } = event.target;
    setEditItemData((prevData) => ({
      ...prevData,
      [name]: value === "true", // Convert the string value to a boolean
    }));
  };

  const handleNewItemSave = async () => {
    try {
      const newItemDataWithBoolean = {
        ...newItemData,
        isActive: newItemData.isActive === "active",
      };

      const response = await axios.post(
        "http://localhost:5001/api/rawitems",
        newItemDataWithBoolean
      );
      if (response.status === 201) {
        const createdItem = response.data;
        // Add the created item to the state
        setItems((prevItems) => [...prevItems, createdItem]);
        closeNewItemDialog(); // Close the new item dialog
        console.log(`Successfully created item with ID: ${createdItem._id}`);
      } else {
        throw new Error("Error creating item");
      }
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };
  const handleEditItemSave = async () => {
    try {
      const editedItemData = {
        ...editItemData,
        isActive: editItemData.isActive === "active",
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
        setIsEditFormVisible(false);
      } else {
        throw new Error("Error editing item");
      }
    } catch (error) {
      console.error("Error editing item:", error);
    }
  };
  const closeEditDialog = () => {
    setEditItemId(null);
    setEditItemData({
      name: "",
      selectGroup: "",
      status: "",
      selectBrand: "",
      selectUnitOfMeasure: "",
      isActive: true,
    });
  };
  const closeNewItemDialog = () => {
    setNewItemData({
      name: "",
      selectGroup: "",
      status: "",
      selectBrand: "",
      selectUnitOfMeasure: "",
      isActive: true,
    });
  };
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditItemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    fetchItems();
  }, [active]);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/rawitems");
      if (response.status === 200) {
        setItems(response.data);
      } else {
        throw new Error("Error fetching rawitems");
      }
    } catch (error) {
      console.error("Error fetching rawitems:", error);
    }
  };
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        {active === "addRawKey" && <Header title="ADD RAW ITEM" />}

        {active === "editRawKey" && <Header title="EDIT RAW ITEM" />}

        {active === "deleteRawKey" && <Header title="DELETE RAW ITEM" />}

        <Box>
          <Button
            onClick={() => setActive("addRawKey")}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              margin: "3px",
            }}
          >
            <Add sx={{ mr: "10px" }} />
            Add Raw Item
          </Button>

          <Button
            onClick={() => setActive("editRawKey")}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <Edit sx={{ mr: "10px" }} />
            Edit Raw Item
          </Button>

          <Button
            onClick={() => setActive("deleteRawKey")}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              margin: "3px",
            }}
          >
            <Delete sx={{ mr: "10px" }} />
            Delete Raw Item
          </Button>
        </Box>
      </FlexBetween>

      {/* Add Discount Key  */}
      {active === "addRawKey" && (
        <Box my="20px" sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid
              item
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
              xs={6}
            >
              <TextField
                type="text"
                name="name"
                value={newItemData.name}
                onChange={handleNewItemInputChange}
                label="Enter Name"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid
              item
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
              xs={6}
            >
              <TextField
                type="text"
                name="selectGroup"
                value={newItemData.selectGroup}
                onChange={handleNewItemInputChange}
                label="Enter Group"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid
              item
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
              xs={6}
            >
              <TextField
                type="text"
                name="status"
                value={newItemData.status}
                onChange={handleNewItemInputChange}
                label="Enter Status"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid
              item
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
              xs={6}
            >
              <TextField
                type="text"
                name="selectBrand"
                value={newItemData.selectBrand}
                onChange={handleNewItemInputChange}
                label="Enter Brand"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid
              item
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
              xs={6}
            >
              <TextField
                type="text"
                name="selectUnitOfMeasure"
                value={newItemData.selectUnitOfMeasure}
                onChange={handleNewItemInputChange}
                label="Enter Unit Of Measure"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid
  item
  container
  direction="row"
  alignItems="center"
  justifyContent="center"
  xs={6}
>
  <FormControl fullWidth>
    <Select
      labelId="status-label"
      name="status"
      value={newItemData.isActive}
      onChange={handleNewItemInputChange}
      label="Select Status"
      variant="outlined"
    >
      <MenuItem value="active">Active</MenuItem>
      <MenuItem value="inactive">Inactive</MenuItem>
    </Select>
  </FormControl>
</Grid>
            <Grid
              item
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
              xs={12}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleNewItemSave}
                sx={{
                  backgroundColor: "green",
                  color: "white",
                  width: "80px",
                  height: "30px",
                  borderRadius: "4px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                  marginTop: "15px", // Adjust the margin top value as needed
                }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Edit Discount Key */}
      {active === "editRawKey" && (
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="160px"
          gap="20px"
          sx={{
            "& > div": {
              gridColumn: isNonMediumScreens ? undefined : "span 12",
            },
          }}
        >
          <Box
            gridColumn="span 12"
            gridRow="span 3"
            my="20px"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                borderRadius: "5rem",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme.palette.background.alt,
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderTop: "none",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${theme.palette.secondary[200]} !important`,
              },
            }}
          >
            <DataGrid
              rows={items}
              columns={columns}
              getRowId={(row) => row._id}
              components={{
                Toolbar: GridToolbar,
              }}
            />
            {isEditFormVisible && (
              <Box my="20px" sx={{ width: "100%" }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid
                    item
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    xs={6}
                  >
                    <TextField
                      type="text"
                      name="name"
                      value={editItemData.name}
                      onChange={handleEditInputChange}
                      label="Enter Name"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>

                  <Grid
                    item
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    xs={6}
                  >
                    <TextField
                      type="text"
                      name="selectGroup"
                      value={editItemData.selectGroup}
                      onChange={handleEditInputChange}
                      label="Enter Group"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>

                  <Grid
                    item
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    xs={6}
                  >
                    <TextField
                      type="text"
                      name="status"
                      value={editItemData.status}
                      onChange={handleEditInputChange}
                      label="Enter Status"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>

                  <Grid
                    item
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    xs={6}
                  >
                    <TextField
                      type="text"
                      name="selectBrand"
                      value={editItemData.selectBrand}
                      onChange={handleEditInputChange}
                      label="Enter Brand"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>

                  <Grid
                    item
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    xs={6}
                  >
                    <TextField
                      type="text"
                      name="selectUnitOfMeasure"
                      value={editItemData.selectUnitOfMeasure}
                      onChange={handleEditInputChange}
                      label="Enter Unit Of Measure"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>

                  <Grid
                    item
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    xs={6}
                  >
                    <FormControl fullWidth>
                      <Select
                        name="isActive"
                        value={editItemData.isActive.toString()} // Convert the boolean value to a string
                        onChange={handleEditDropdownChange}
                      >
                        <MenuItem value="true">Active</MenuItem>
                        <MenuItem value="false">In Active</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid
                    item
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    xs={12}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleEditItemSave}
                      sx={{
                        backgroundColor: "blue",
                        color: "white",
                        width: "80px",
                        height: "30px",
                        borderRadius: "4px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                        marginTop: "15px",
                        marginBottom: "2 0px",
                      }}
                    >
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        </Box>
      )}

      {/* Delete Discount Key */}
      {active === "deleteRawKey" && (
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="160px"
          gap="20px"
          sx={{
            "& > div": {
              gridColumn: isNonMediumScreens ? undefined : "span 12",
            },
          }}
        >
          <Box
            gridColumn="span 12"
            gridRow="span 3"
            my="20px"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                borderRadius: "5rem",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme.palette.background.alt,
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderTop: "none",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${theme.palette.secondary[200]} !important`,
              },
            }}
          >
            <DataGrid
              rows={items}
              columns={columns}
              getRowId={(row) => row._id}
              components={{
                Toolbar: GridToolbar,
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SettingsDiscountKeys;
