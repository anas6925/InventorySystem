import mongoose from "mongoose";

const addCourseSchema = new mongoose.Schema({
  addcourse: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AddCourse = mongoose.model("AddCourse", addCourseSchema);

export default AddCourse;
