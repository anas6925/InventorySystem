import mongoose from "mongoose";

const InventoryBrandSchema = new mongoose.Schema(
  {
    name: String,
    status: Number
  },
  { timestamps: true }
);

const InventoryBrand = mongoose.model("InventoryBrand", InventoryBrandSchema);
export default InventoryBrand;