import AddCategory from "../models/AddCategory.js";
import AddCourse from "../models/AddCourse.js";
// Create AddCategory
export const createAddCategory = async (req, res) => {
  try {
    const { addCourseId, resourcecategorytitle, filetypes, maxfilesize } = req.body;

    // Check if the referenced AddCourse exists
    const existingCourse = await AddCourse.findById(addCourseId);
    if (!existingCourse) {
      return res.status(404).json({ message: "AddCourse not found" });
    }

    const newCategory = new AddCategory({
      addCourse: addCourseId,
      resourcecategorytitle,
      filetypes,
      maxfilesize,
    });

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All AddCategories
export const getAddCategories = async (req, res) => {
  try {
    const categories = await AddCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get AddCategory By Id
export const getAddCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await AddCategory.findById(id);
    if (!category) {
      return res.status(404).json({ message: "AddCategory not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update AddCategory
export const updateAddCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { addCourse, resourcecategorytitle, filetypes, maxfilesize } = req.body;

    const updatedCategory = await AddCategory.findByIdAndUpdate(
      id,
      { addCourse, resourcecategorytitle, filetypes, maxfilesize },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "AddCategory not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete AddCategory
export const deleteAddCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await AddCategory.findByIdAndRemove(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "AddCategory not found" });
    }
    res.status(200).json({ message: "AddCategory deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get AddCategories by Course
export const getAddCategoriesByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const categories = await AddCategory.find({ addCourse: courseId }).populate("addCourse");

    res.status(200).json(categories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};