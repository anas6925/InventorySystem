import RawItem from "../models/RawItem.js";
import mongoose from 'mongoose';

// Create Raw Item Route
export const createRawItem = async (req, res) => {
  try {
    const rawItem = req.body;
    const newRawItem = new RawItem(rawItem);
    await newRawItem.save();
    res.status(201).json(newRawItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Raw Items Route
export const getRawItems = async (req, res) => {
  try {
    const rawItems = await RawItem.find();
    res.status(200).json(rawItems);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get Raw Item By Id
export const getRawItemById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Raw Item ID' });
    }

    const rawItem = await RawItem.findById(id);
    if (!rawItem) {
      return res.status(404).json({ message: 'Raw Item not found' });
    }
    res.status(200).json(rawItem);
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while retrieving raw item', error: error.message });
  }
};

// Update Raw Item Data
export const updateRawItem = async (req, res) => {
  try {
    const { id } = req.params;
    const rawItem = req.body;
    const updatedRawItem = await RawItem.findByIdAndUpdate(
      id,
      { ...rawItem, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedRawItem) {
      return res.status(404).json({ message: "Raw Item not found" });
    }
    res.status(200).json(updatedRawItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Raw Item
export const deleteRawItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRawItem = await RawItem.findByIdAndRemove(id);
    if (!deletedRawItem) {
      return res.status(404).json({ message: "Raw Item not found" });
    }
    res.status(200).json({ message: "Raw Item deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
