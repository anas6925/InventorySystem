import React, { useState } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Add } from "@mui/icons-material";
import { Box, Button, TextField, useTheme, } from "@mui/material";


const AddCourse = () => {
  const [newCourseData, setNewCourseData] = useState({
    addcourse: "",
  });

  const theme = useTheme();

  const handleNewCourseInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNewCourseSave = async () => {
    try {
      const response = await axios.post(`http://localhost:5001/api/addCourse`, newCourseData);
      if (response.status === 201) {
        const createdCourse = response.data;
        console.log(`Successfully created AddCourse with ID: ${createdCourse._id}`);
        setNewCourseData({ addcourse: "" });
        // You can handle the created course as needed
      } else {
        throw new Error("Error creating AddCourse");
      }
    } catch (error) {
      console.error("Error creating AddCourse:", error);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="ADD COURSE" />
        <Box>
          <Button
            onClick={handleNewCourseSave}
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
            Add Course
          </Button>
        </Box>
      </FlexBetween>

      {/* Add Course */}
      <Box my="20px" sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
            xs={12}
          >
            <TextField
              type="text"
              name="addcourse"
              value={newCourseData.addcourse}
              onChange={handleNewCourseInputChange}
              label="Enter Course Name"
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
              onClick={handleNewCourseSave}
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

export default AddCourse;
