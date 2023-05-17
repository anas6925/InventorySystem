import mongoose from "mongoose";

const InventoryItemSchema = new mongoose.Schema(
  {
    name: String,
    group: String,
    status: Number,
    fontSize: Number,
    fontColor: String,
    itemColor: String,
    price: Number,
    priceWithGST: Number
  },
  { timestamps: true }
);

const InventoryItem = mongoose.model("InventoryItem", InventoryItemSchema);
export default InventoryItem;