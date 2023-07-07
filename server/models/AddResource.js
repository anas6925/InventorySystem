import mongoose from "mongoose";

const { Schema } = mongoose;

const addResourceSchema = new Schema(
  {
    addCourse: {
      type: Schema.Types.ObjectId,
      ref: "AddCourse",
      required: true,
    },
    addChapter: {
      type: Schema.Types.ObjectId,
      ref: "AddChapter",
      required: true,
    },
    resourcecategorytitle: {
      type: Schema.Types.ObjectId,
      ref: "AddCategory",
      required: true,
    },
    resourcetitle: {
      type: String,
      required: true,
    },
    supportedfiletype: {
      type: String,
      required: true,
    },
    videothumbnail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AddResource = mongoose.model("AddResource", addResourceSchema);

export default AddResource;
