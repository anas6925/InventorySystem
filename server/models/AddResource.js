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
    resourcecategory: {
      type: String,
      required: true,
      enum: ["audio", "grammar", "video"],
    },
    resourcetitle: {
      type: String,
      required: true,
    },
    supportedfiletype: {
      type: String,
      required: true,
      // validate: {
      //   validator: function (value) {
      //     const category = this.resourcecategory;
      //     const maxSize = getCategoryMaxSize(category);

      //     // Check file size based on category
      //     return value <= maxSize;
      //   },
      //   message: (props) =>
      //     `The supported file type exceeds the maximum size allowed for the category.`,
      // },
    },
    videothumbnail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Helper function to get the maximum file size based on the resource category
// Helper function to get the maximum file size based on the resource category and file type
function getCategoryMaxSize(category, fileType) {
  switch (category) {
    case "audio":
      return fileType === "audio/mp3" ? 300 * 1024 * 1024 : 0; // 300MB for audio/mp3
    case "grammar":
      return fileType === "video/mp4" ? 500 * 1024 * 1024 : 0; // 500MB for video/mp4
    case "video":
      return fileType === "video/mp4" ? 50 * 1024 * 1024 : 0; // 50MB for video/mp4
    default:
      return 0;
  }
}


const AddResource = mongoose.model("AddResource", addResourceSchema);

export default AddResource;
