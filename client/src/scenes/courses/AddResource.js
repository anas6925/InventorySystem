import React, { useState, useEffect } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Add } from "@mui/icons-material";
import { Box, Button, TextField, useTheme, Select, MenuItem } from "@mui/material";
import { FormControl, InputLabel } from "@mui/material";

const AddResource = () => {
  const [newResourceData, setNewResourceData] = useState({
    addCourseId: "",
    addChapterId: "",
    resourceCategoryId: "",
    resourcetitle: "",
    supportedfiletype: "",
    videothumbnail: "",
  });
  const [courseList, setCourseList] = useState([]);
  const [chapterList, setChapterList] = useState([]);
  const [resourceCategoryList, setResourceCategoryList] = useState([]);

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

  const fetchChapters = async (courseId) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/addChapter/course/${courseId}`);
      setChapterList(response.data);
    } catch (error) {
      console.error("Error fetching chapters:", error);
    }
  };

  const fetchCategoriesByCourse = async (courseId) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/addCategory/course/${courseId}`);
      setResourceCategoryList(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleNewResourceInputChange = (e) => {
    const { name, value } = e.target;
    setNewResourceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    setNewResourceData((prevData) => ({
      ...prevData,
      addCourseId: courseId,
      addChapterId: "", // Reset the chapter selection when course changes
      resourceCategoryId: "", // Reset the category selection when course changes
    }));
    fetchChapters(courseId);
    fetchCategoriesByCourse(courseId);
  };

  const handleNewResourceSave = async () => {
    try {
      const response = await axios.post(`http://localhost:5001/api/addResource`, newResourceData);
      if (response.status === 201) {
        const createdResource = response.data;
        console.log(`Successfully created AddResource with ID: ${createdResource._id}`);
        setNewResourceData({
          addCourseId: "",
          addChapterId: "",
          resourceCategoryId: "",
          resourcetitle: "",
          supportedfiletype: "",
          videothumbnail: "",
        }); // Reset the input fields
        // You can handle the created resource as needed
      } else {
        throw new Error("Error creating AddResource");
      }
    } catch (error) {
      console.error("Error creating AddResource:", error);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="ADD RESOURCE" />
        <Box>
          <Button
            onClick={handleNewResourceSave}
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
            Add Resource
          </Button>
        </Box>
      </FlexBetween>

      {/* Add Resource */}
      <Box my="20px" sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item container direction="row" alignItems="center" justifyContent="center" xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="course-label">Select Course</InputLabel>
              <Select
                labelId="course-label"
                id="course"
                name="addCourseId"
                value={newResourceData.addCourseId}
                onChange={handleCourseChange}
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
            <FormControl fullWidth variant="outlined">
              <InputLabel id="chapter-label">Select Chapter</InputLabel>
              <Select
                labelId="chapter-label"
                id="chapter"
                name="addChapterId"
                value={newResourceData.addChapterId}
                onChange={handleNewResourceInputChange}
                label="Select Chapter"
              >
                <MenuItem value="">Select Chapter</MenuItem>
                {chapterList.map((chapter) => (
                  <MenuItem key={chapter._id} value={chapter._id}>
                    {chapter.addchapter}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item container direction="row" alignItems="center" justifyContent="center" xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="category-label">Select Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="resourceCategoryId"
                value={newResourceData.resourceCategoryId}
                onChange={handleNewResourceInputChange}
                label="Select Category"
              >
                <MenuItem value="">Select Category</MenuItem>
                {resourceCategoryList.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.resourcecategorytitle}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item container direction="row" alignItems="center" justifyContent="center" xs={6}>
            <TextField
              type="text"
              name="resourcetitle"
              value={newResourceData.resourcetitle}
              onChange={handleNewResourceInputChange}
              label="Enter Resource Title"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item container direction="row" alignItems="center" justifyContent="center" xs={6}>
            <TextField
              type="file"
              name="supportedfiletype"
              value={newResourceData.supportedfiletype}
              onChange={handleNewResourceInputChange}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item container direction="row" alignItems="center" justifyContent="center" xs={6}>
            <TextField
              type="file"
              name="videothumbnail"
              value={newResourceData.videothumbnail}
              onChange={handleNewResourceInputChange}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item container direction="row" alignItems="center" justifyContent="center" xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNewResourceSave}
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

export default AddResource;
