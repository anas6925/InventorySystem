import mongoose from "mongoose";

const InventoryGroupSchema = new mongoose.Schema(
  {
    userId: String,
    name: String,
    color: String,
    status: Number,
    fontSize: Number,
    fontColor: String
  },
  { timestamps: true }
);

const InventoryGroup = mongoose.model("InventoryGroup", InventoryGroupSchema);
export default InventoryGroup;