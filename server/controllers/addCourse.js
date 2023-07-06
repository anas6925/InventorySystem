import AddCourse from "../models/AddCourse.js";

// Create AddCourse
export const createAddCourse = async (req, res) => {
  try {
    const { addcourse } = req.body;
    const newCourse = new AddCourse({ addcourse });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All AddCourses
export const getAddCourses = async (req, res) => {
  try {
    const courses = await AddCourse.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get AddCourse By Id
export const getAddCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await AddCourse.findById(id);
    if (!course) {
      return res.status(404).json({ message: "AddCourse not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update AddCourse
export const updateAddCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { addcourse } = req.body;

    const updatedCourse = await AddCourse.findByIdAndUpdate(
      id,
      { addcourse },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "AddCourse not found" });
    }

    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete AddCourse
export const deleteAddCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await AddCourse.findByIdAndRemove(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "AddCourse not found" });
    }
    res.status(200).json({ message: "AddCourse deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
