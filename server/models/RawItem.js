import mongoose from "mongoose";

const RawItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  selectGroup: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  selectBrand: {
    type: String,
    required: true,
  },
  selectUnitOfMeasure: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
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

const RawItem = mongoose.model("RawItem", RawItemSchema);
export default RawItem;
