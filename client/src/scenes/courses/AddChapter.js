import React, { useState, useEffect } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Add } from "@mui/icons-material";
import { Box, Button, TextField, useTheme, Select, MenuItem } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

const AddChapter = () => {
  const [newChapterData, setNewChapterData] = useState({
    addchapter: "",
    addCourseId: "",
  });
  const [courseList, setCourseList] = useState([]);

  const theme = useTheme();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/addCourse");
      setCourseList(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleNewChapterInputChange = (e) => {
    const { name, value } = e.target;
    setNewChapterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNewChapterSave = async () => {
    try {
      const response = await axios.post("http://localhost:5001/api/addChapter", newChapterData);
      if (response.status === 201) {
        const createdChapter = response.data;
        console.log(`Successfully created AddChapter with ID: ${createdChapter._id}`);
        setNewChapterData({ addchapter: "", addCourseId: "" }); // Reset the input fields
        // You can handle the created chapter as needed
      } else {
        throw new Error("Error creating AddChapter");
      }
    } catch (error) {
      console.error("Error creating AddChapter:", error);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="ADD CHAPTER" />
        <Box>
          <Button
            onClick={handleNewChapterSave}
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
            Add Chapter
          </Button>
        </Box>
      </FlexBetween>

      {/* Add Chapter */}
      <Box my="20px" sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
            xs={6}
          >
            <Select
              name="addCourseId"
              value={newChapterData.addCourseId}
              onChange={handleNewChapterInputChange}
              label="Select Course"
              variant="outlined"
              fullWidth
            >
              <MenuItem value="">Select Course</MenuItem>
              {courseList.map((course) => (
                <MenuItem key={course._id} value={course._id}>
                  {course.addcourse}
                </MenuItem>
              ))}
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
              name="addchapter"
              value={newChapterData.addchapter}
              onChange={handleNewChapterInputChange}
              label="Enter Chapter Name"
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
            xs={12}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleNewChapterSave}
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

export default AddChapter;
