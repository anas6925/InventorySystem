import AddResource from "../models/AddResource.js";
import AddCourse from "../models/AddCourse.js";
import AddChapter from "../models/AddChapter.js";
import AddCategory from "../models/AddCategory.js";

// Create AddResource
export const createAddResource = async (req, res) => {
  try {
    const { addCourseId, addChapterId, resourceCategoryId, resourcetitle, supportedfiletype, videothumbnail } = req.body;

    // Check if the referenced AddCourse exists
    const existingCourse = await AddCourse.findById(addCourseId);
    if (!existingCourse) {
      return res.status(404).json({ message: "AddCourse not found" });
    }

    // Check if the referenced AddChapter exists
    const existingChapter = await AddChapter.findById(addChapterId);
    if (!existingChapter) {
      return res.status(404).json({ message: "AddChapter not found" });
    }

    // Check if the referenced AddCategory exists
    const existingCategory = await AddCategory.findById(resourceCategoryId);
    if (!existingCategory) {
      return res.status(404).json({ message: "AddCategory not found" });
    }

    const newResource = new AddResource({
      addCourse: addCourseId,
      addChapter: addChapterId,
      resourcecategorytitle: resourceCategoryId,
      resourcetitle,
      supportedfiletype,
      videothumbnail,
    });

    await newResource.save();
    res.status(201).json(newResource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All AddResources
export const getAddResources = async (req, res) => {
  try {
    const resources = await AddResource.find()
      .populate("addCourse")
      .populate("addChapter")
      .populate("resourcecategorytitle");
    res.status(200).json(resources);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get AddResource By Id
export const getAddResourceById = async (req, res) => {
  try {
    const { id } = req.params;
    const resource = await AddResource.findById(id)
      .populate("addCourse")
      .populate("addChapter")
      .populate("addCategory");
    if (!resource) {
      return res.status(404).json({ message: "AddResource not found" });
    }
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update AddResource
export const updateAddResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { addCourseId, addChapterId, resourceCategoryId, resourcetitle, supportedfiletype, videothumbnail } = req.body;

    // Check if the referenced AddCourse exists
    const existingCourse = await AddCourse.findById(addCourseId);
    if (!existingCourse) {
      return res.status(404).json({ message: "AddCourse not found" });
    }

    // Check if the referenced AddChapter exists
    const existingChapter = await AddChapter.findById(addChapterId);
    if (!existingChapter) {
      return res.status(404).json({ message: "AddChapter not found" });
    }

    // Check if the referenced AddCategory exists
    const existingCategory = await AddCategory.findById(resourceCategoryId);
    if (!existingCategory) {
      return res.status(404).json({ message: "AddCategory not found" });
    }

    const updatedResource = await AddResource.findByIdAndUpdate(
      id,
      {
        addCourse: addCourseId,
        addChapter: addChapterId,
        addCategory: resourceCategoryId,
        resourcetitle,
        supportedfiletype,
        videothumbnail,
      },
      { new: true }
    );

    if (!updatedResource) {
      return res.status(404).json({ message: "AddResource not found" });
    }

    res.status(200).json(updatedResource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete AddResource
export const deleteAddResource = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedResource = await AddResource.findByIdAndRemove(id);
    if (!deletedResource) {
      return res.status(404).json({ message: "AddResource not found" });
    }
    res.status(200).json({ message: "AddResource deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
