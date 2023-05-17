import mongoose from "mongoose";

const InventoryRawItemSchema = new mongoose.Schema(
  {
    name: String,
    status: Number
  },
  { timestamps: true }
);

const InventoryRawItem = mongoose.model("InventoryRawItem", InventoryRawItemSchema);
export default InventoryRawItem;