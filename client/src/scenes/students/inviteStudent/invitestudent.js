import React, { useState } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Add, Edit, Delete } from "@mui/icons-material";
import { Box, Button, TextField, useTheme,Select, MenuItem } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";


const InviteStudents = () => {
  const [active, setActive] = useState("addRawKey");
  const [newStudentData, setNewStudentData] = useState({
    course: "",
    studentname: "",
    studentcontact: "",
    studentaddress: "",
    studentemail: "",
    studentpassword: "",
    studentstatus:"active"
  });

  const theme = useTheme();

  const handleNewItemInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNewItemSave = async () => {
    try {
      const newStudentDataWithStatus = {
        ...newStudentData,
        studentstatus: "active", // Set the studentstatus as "active"
      };
      const response = await axios.post("http://localhost:5001/api/students", newStudentDataWithStatus);
      if (response.status === 201) {
        const createdItem = response.data;
        closeNewItemDialog()
        console.log(`Successfully created Invite Students with ID: ${createdItem._id}`);
        // You can handle the created item as needed
      } else {
        throw new Error("Error creating Students");
      }
    } catch (error) {
      console.error("Error creating Students:", error);
    }
  };
  const closeNewItemDialog = () => {
    setNewStudentData({
        course: "",
        studentname: "",
        studentcontact: "",
        studentaddress: "",
        studentemail: "",
        studentpassword: ""
    });
  };
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        {active === "addRawKey" && <Header title="INVITE STUDENTS" />}
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
            Invite Students
          </Button>
        </Box>
      </FlexBetween>

      {/* Add Discount Key */}
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
              <Select
              variant="outlined"
                name="course"
                value={newStudentData.course}
                onChange={handleNewItemInputChange}
                labelId="course-label"  
                fullWidth
                
              >
                <MenuItem value="">Select Course</MenuItem>
                <MenuItem value="Course 1">Course 1</MenuItem>
                <MenuItem value="Course 2">Course 2</MenuItem>
                <MenuItem value="Course 3">Course 4</MenuItem>
                <MenuItem value="Course 3">Course 5</MenuItem>
                <MenuItem value="Course 3">Course 6</MenuItem>
                <MenuItem value="Course 3">Course 7</MenuItem>
                <MenuItem value="Course 3">Course 8</MenuItem>
                <MenuItem value="Course 3">Course 9</MenuItem>
                <MenuItem value="Course 3">Course 10</MenuItem>
              </Select>
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
                name="studentname"
                value={newStudentData.studentname}
                onChange={handleNewItemInputChange}
                label="Enter Student Name"
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
                name="studentcontact"
                value={newStudentData.studentcontact}
                onChange={handleNewItemInputChange}
                label="Enter Student Contact"
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
                name="studentaddress"
                value={newStudentData.studentaddress}
                onChange={handleNewItemInputChange}
                label="Enter Student Address"
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
                name="studentemail"
                value={newStudentData.studentemail}
                onChange={handleNewItemInputChange}
                label="Enter Student Email"
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
    type="password" // Set input type to "password" for hiding characters
    name="studentpassword"
    value={newStudentData.studentpassword}
    onChange={handleNewItemInputChange}
    label="Enter Student Password"
    variant="outlined"
    fullWidth
    inputProps={{ maxLength: 10 }} // Set maximum length for the password
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          {newStudentData.studentpassword.length > 0 && "*".repeat(newStudentData.studentpassword.length)}
        </InputAdornment>
      ),
    }}
  />
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
    </Box>
  );
};

export default InviteStudents;
