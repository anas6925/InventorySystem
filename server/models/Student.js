import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true,
  },
  studentname: {
    type: String,
    required: true,
  },
  studentcontact: {
    type: String,
    required: true,
  },
  studentaddress: {
    type: String,
    required: true,
  },
  studentemail: {
    type: String,
    required: true,
  },
  studentpassword: {
    type: String,
    required: true,
  },
  studentstatus: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
