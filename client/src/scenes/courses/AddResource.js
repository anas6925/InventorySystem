import React, { useState, useEffect } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Add } from "@mui/icons-material";
import { Box, Button, TextField, useTheme, Select, MenuItem } from "@mui/material";

const AddResource = () => {
  const [newResourceData, setNewResourceData] = useState({
    addCourseId: "",
    addChapterId: "",
    resourcecategory: "",
    resourcetitle: "",
    supportedfiletype: "",
    videothumbnail: "",
  });
  const [courseList, setCourseList] = useState([]);
  const [chapterList, setChapterList] = useState([]);

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
      const response = await axios.get(`http://localhost:5001/api/addChapter?addCourseId=${courseId}`);
      setChapterList(response.data);
    } catch (error) {
      console.error("Error fetching chapters:", error);
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
    }));
    fetchChapters(courseId);
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
          resourcecategory: "",
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
            <Select
              name="addCourseId"
              value={newResourceData.addCourseId}
              onChange={handleCourseChange}
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

          <Grid item container direction="row" alignItems="center" justifyContent="center" xs={6}>
            <Select
              name="addChapterId"
              value={newResourceData.addChapterId}
              onChange={handleNewResourceInputChange}
              label="Select Chapter"
              variant="outlined"
              fullWidth
            >
              <MenuItem value="">Select Chapter</MenuItem>
              {chapterList.map((chapter) => (
                <MenuItem key={chapter._id} value={chapter._id}>
                  {chapter.addchapter}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item container direction="row" alignItems="center" justifyContent="center" xs={6}>
            <TextField
              type="text"
              name="resourcecategory"
              value={newResourceData.resourcecategory}
              onChange={handleNewResourceInputChange}
              label="Enter Resource Category"
              variant="outlined"
              fullWidth
            />
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
              type="text"
              name="supportedfiletype"
              value={newResourceData.supportedfiletype}
              onChange={handleNewResourceInputChange}
              label="Enter Supported File Type"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item container direction="row" alignItems="center" justifyContent="center" xs={6}>
            <TextField
              type="text"
              name="videothumbnail"
              value={newResourceData.videothumbnail}
              onChange={handleNewResourceInputChange}
              label="Enter Video Thumbnail"
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
