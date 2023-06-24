import Student from "../models/student.js";
import mongoose from 'mongoose';

// Create Student
export const createStudent = async (req, res) => {
  try {
    const { course, studentname, studentcontact, studentaddress, studentemail, studentpassword,studentstatus } = req.body;
    const newStudent = new Student({
      course,
      studentname,
      studentcontact,
      studentaddress,
      studentemail,
      studentpassword,
      studentstatus
    });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get Student By Id
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Student ID' });
    }

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while retrieving student', error: error.message });
  }
};

// Update Student
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { course, studentname, studentcontact, studentaddress, studentemail, studentpassword, studentstatus } = req.body;
    
    // Determine the new studentstatus based on button clicks
    let newStudentStatus = studentstatus;
    if (req.body.archievedButtonClicked) {
      newStudentStatus = 'archieved';
    } else if (req.body.dropoutButtonClicked) {
      newStudentStatus = 'dropout';
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        course,
        studentname,
        studentcontact,
        studentaddress,
        studentemail,
        studentpassword,
        studentstatus: newStudentStatus,
        updatedAt: Date.now()
      },
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Delete Student
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndRemove(id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
