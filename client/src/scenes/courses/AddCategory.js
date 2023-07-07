import React, { useState, useEffect } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Add } from "@mui/icons-material";
import { Box, Button, TextField, useTheme, Select, MenuItem } from "@mui/material";
import { FormControl, InputLabel} from "@mui/material";
const AddCategory = () => {
  const [newCategoryData, setNewCategoryData] = useState({
    addCourseId: "",
    resourcecategorytitle: "",
    filetypes: "",
    maxfilesize: "",
  });
  const [courseList, setCourseList] = useState([]);

  const theme = useTheme();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/addCourse`);
      setCourseList(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleNewCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNewCategorySave = async () => {
    try {
      const response = await axios.post(`http://localhost:5001/api/addCategory`, newCategoryData);
      if (response.status === 201) {
        const createdCategory = response.data;
        console.log(`Successfully created AddCategory with ID: ${createdCategory._id}`);
        setNewCategoryData({
          addCourseId: "",
          resourcecategorytitle: "",
          filetypes: "",
          maxfilesize: "",
        }); // Reset the input fields
        // You can handle the created category as needed
      } else {
        throw new Error("Error creating AddCategory");
      }
    } catch (error) {
      console.error("Error creating AddCategory:", error);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="ADD CATEGORY" />
        <Box>
          <Button
            onClick={handleNewCategorySave}
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
            Add Category
          </Button>
        </Box>
      </FlexBetween>

      {/* Add Category */}
      <Box my="20px" sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item container direction="row" alignItems="center" justifyContent="center" xs={6}>
  <FormControl fullWidth variant="outlined">
    <InputLabel id="course-label">Select Course</InputLabel>
    <Select
      labelId="course-label"
      id="course"
      name="addCourseId"
      value={newCategoryData.addCourseId}
      onChange={handleNewCategoryInputChange}
      label="Select Course"
    >
      
      {courseList.map((course) => (
        <MenuItem key={course._id} value={course._id}>
          {course.addcourse}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Grid>

          <Grid item container direction="row" alignItems="center" justifyContent="center" xs={6}>
            <TextField
              type="text"
              name="resourcecategorytitle"
              value={newCategoryData.resourcecategorytitle}
              onChange={handleNewCategoryInputChange}
              label="Enter Category Title"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item container direction="row" alignItems="center" justifyContent="center" xs={6}>
  <FormControl fullWidth variant="outlined">
    <InputLabel id="filetype-label">Select File Type</InputLabel>
    <Select
      labelId="filetype-label"
      id="filetype"
      name="filetypes"
      value={newCategoryData.filetypes}
      onChange={handleNewCategoryInputChange}
      label="Select File Type"
    >
      
      <MenuItem value="PDF Document">PDF Document</MenuItem>
      <MenuItem value="MS Word Document">MS Word Document</MenuItem>
      <MenuItem value="MS Excel Document">MS Excel Document</MenuItem>
      <MenuItem value="Image">Image</MenuItem>
      <MenuItem value="Video">Video</MenuItem>
      <MenuItem value="Audio">Audio</MenuItem>
    </Select>
  </FormControl>
</Grid>
          <Grid item container direction="row" alignItems="center" justifyContent="center" xs={6}>
            <TextField
              type="text"
              name="maxfilesize"
              value={newCategoryData.maxfilesize}
              onChange={handleNewCategoryInputChange}
              label="Enter Max File Size"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item container direction="row" alignItems="center" justifyContent="center" xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNewCategorySave}
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
                marginTop: "15px",
              }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AddCategory;
