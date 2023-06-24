import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
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
  fontSize: {
    type: Number,
    required: true,
  },
  fontColor: {
    type: String,
    required: true,
  },
  itemColor: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  priceWithGST: {
    type: Number,
    required: true,
  },
  priceWithoutGST: {
    type: Number,
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

const Item = mongoose.model("Item", ItemSchema);
export default Item;
