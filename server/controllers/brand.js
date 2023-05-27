import Brand from "../models/Brand.js";
import mongoose from 'mongoose';

// Create Brand Route
export const createBrand = async (req, res) => {
  try {
    const brand = req.body;
    const newBrand = new Brand(brand);
    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Brands Route
export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get Brand By Id
export const getBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Brand ID' });
    }

    const brand = await Brand.findById(id);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while retrieving brand', error: error.message });
  }
};

// Update Brand Data
export const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = req.body;
    const updatedBrand = await Brand.findByIdAndUpdate(
      id,
      { ...brand, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.status(200).json(updatedBrand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Brand
export const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBrand = await Brand.findByIdAndRemove(id);
    if (!deletedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
