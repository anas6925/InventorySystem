import AddChapter from "../models/AddChapter.js";
import AddCourse from "../models/AddCourse.js";

// Create AddChapter
export const createAddChapter = async (req, res) => {
  try {
    const { addchapter, addCourseId } = req.body;

    // Check if the referenced AddCourse exists
    const existingCourse = await AddCourse.findById(addCourseId);
    if (!existingCourse) {
      return res.status(404).json({ message: "AddCourse not found" });
    }

    const newChapter = new AddChapter({
      addchapter,
      addCourse: addCourseId,
    });

    await newChapter.save();
    res.status(201).json(newChapter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All AddChapters
export const getAddChapters = async (req, res) => {
  try {
    const chapters = await AddChapter.find().populate("addCourse");
    res.status(200).json(chapters);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get AddChapter By Id
export const getAddChapterById = async (req, res) => {
  try {
    const { id } = req.params;
    const chapter = await AddChapter.findById(id).populate("addCourse");
    console.log(chapter,id)
    if (!chapter) {
      return res.status(404).json({ message: "AddChapter not found" });
    }
    res.status(200).json(chapter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update AddChapter
export const updateAddChapter = async (req, res) => {
  try {
    const { id } = req.params;
    const { addchapter, addCourseId } = req.body;

    // Check if the referenced AddCourse exists
    const existingCourse = await AddCourse.findById(addCourseId);
    if (!existingCourse) {
      return res.status(404).json({ message: "AddCourse not found" });
    }

    const updatedChapter = await AddChapter.findByIdAndUpdate(
      id,
      { addchapter, addCourse: addCourseId },
      { new: true }
    );

    if (!updatedChapter) {
      return res.status(404).json({ message: "AddChapter not found" });
    }

    res.status(200).json(updatedChapter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete AddChapter
export const deleteAddChapter = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedChapter = await AddChapter.findByIdAndRemove(id);
    if (!deletedChapter) {
      return res.status(404).json({ message: "AddChapter not found" });
    }
    res.status(200).json({ message: "AddChapter deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get AddChapters By Course Id
export const getChaptersByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;
    const chapters = await AddChapter.find({ addCourse: courseId }).populate("addCourse");
    res.status(200).json(chapters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};