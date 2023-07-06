import mongoose from "mongoose";

const addChapterSchema = new mongoose.Schema({
  addchapter: {
    type: String,
    required: true,
  },
  addCourse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AddCourse",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AddChapter = mongoose.model("AddChapter", addChapterSchema);

export default AddChapter;
