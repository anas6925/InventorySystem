import React, { useState,useEffect } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Add, Edit, Delete } from "@mui/icons-material";
import { Box, Button,useTheme,useMediaQuery } from "@mui/material";



const AllStudents = () => {
  const [active, setActive] = useState("addRawKey");
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [allStudents, setAllStudents] = useState([]);
  const theme = useTheme();
  const columns = [
    { field: "course", headerName: "Course", width: 200 },
    { field: "studentname", headerName: "Student Name", width: 200 },
    { field: "studentemail", headerName: "Student Email", width: 200 },
    { field: "studentstatus", headerName: "Student Status", width: 200 },
    {
        field: "actions",
        headerName: "Actions",
        width: 200,
        sortable: false,
        renderCell: (params) => (
          <>
           
              <button
                style={{
                  backgroundColor: "green",
                  color: "white",
                  width: "100%",
                  height: "30px",
                  borderRadius: "4px",
                  border: "none",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                }}
                onClick={() => handleEditItemSave(params.row._id, 'archieved')}
              >
                Archieved
              </button>
            
         
              <button
                style={{
                  backgroundColor: "red",
                  color: "white",
                  width: "100%",
                  height: "30px",
                  borderRadius: "4px",
                  border: "none",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                  marginLeft:"15px"
                }}
                onClick={() => handleEditItemSave(params.row._id, 'dropout')}
              >
                DropOut
              </button>
            
          </>
        ),
      },
  ];



  const handleEditItemSave = async (studentId, newStudentStatus) => {
    try {
      const editedItemData = {
        studentstatus: newStudentStatus,
      };

      const response = await axios.put(
        `http://localhost:5001/api/students/${studentId}`,
        editedItemData
      );

      if (response.status === 200) {
        const updatedItem = { _id: studentId, studentstatus: newStudentStatus };

        // Update the edited item in the state
        setAllStudents((prevItems) =>
          prevItems.map((item) =>
            item._id === studentId ? { ...item, ...updatedItem } : item
          )
        );

        console.log(`Successfully edited item with ID: ${studentId}`);
      } else {
        throw new Error("Error editing item");
      }
    } catch (error) {
      console.error("Error editing item:", error);
    }
  };

  
 
  useEffect(() => {
    fetchItems();
  }, [active]);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/students");
      if (response.status === 200) {
        setAllStudents(response.data);
      } else {
        throw new Error("Error fetching All Students");
      }
    } catch (error) {
      console.error("Error fetching All Students:", error);
    }
  };
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
  
        {active === "addRawKey" && <Header title="All Students" />}
        
        <Box>
         
          <Button
            onClick={() => setActive("addRawKey")}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <Edit sx={{ mr: "10px" }} />
            All Students
          </Button>
        
        </Box>
      </FlexBetween>

      {/* Add Discount Key */}
      

      {/* Edit Discount Key */}
      {active === "addRawKey" && (
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
              rows={allStudents}
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

export default AllStudents;
