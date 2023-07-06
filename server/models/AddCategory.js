import mongoose from "mongoose";

const addCategorySchema = new mongoose.Schema({
  addCourse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AddCourse",
    required: true,
  },
  resourcecategorytitle: {
    type: String,
    required: true,
  },
  filetypes: {
    type: String,
    required: true,
  },
  maxfilesize: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AddCategory = mongoose.model("AddCategory", addCategorySchema);

export default AddCategory;
