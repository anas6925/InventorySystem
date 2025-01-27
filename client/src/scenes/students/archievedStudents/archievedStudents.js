import React, { useState,useEffect } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Add, Edit, Delete } from "@mui/icons-material";
import { Box, Button,useTheme,useMediaQuery } from "@mui/material";



const ArchievedStudents = () => {
  const [active, setActive] = useState("addRawKey");
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [allStudents, setAllStudents] = useState([]);
  const theme = useTheme();
  const columns = [
    { field: "course", headerName: "Course", width: 200 },
    { field: "studentname", headerName: "Student Name", width: 200 },
    { field: "studentemail", headerName: "Student Email", width: 200 },
    { field: "studentstatus", headerName: "Student Status", width: 200 },
  
  ];





  
 
  useEffect(() => {
    fetchItems();
  }, [active]);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/students");
      if (response.status === 200) {
        // Filter the data to include only items with studentstatus as "active"
        const activeStudents = response.data.filter(
          (item) => item.studentstatus === "archieved"
        );
        setAllStudents(activeStudents);
      } else {
        throw new Error("Error fetching active students");
      }
    } catch (error) {
      console.error("Error fetching active students:", error);
    }
  };
  
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
 
        {active === "addRawKey" && <Header title="Archieved Students" />}
       
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
            Archieved Students
          </Button>
          
        </Box>
      </FlexBetween>

      

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

export default ArchievedStudents;
