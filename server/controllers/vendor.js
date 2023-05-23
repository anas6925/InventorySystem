
import Vendor from "../models/Vendor.js";

// Rest of the code for the route handlers


//Create Vendor Route
export const createVendor = async (req, res) => {
  try {
    const vendor = req.body;
    const newVendor = new Vendor(vendor);
    await newVendor.save();
    res.status(201).json(newVendor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Get All Vendor Route
export const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Get Vendor By Id
export const getVendorById = async (req, res) => {
  try {
    const { id } = req.params;
    const vendor = await Vendor.findById(id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json(vendor);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update Vnedor Data
export const updateVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const vendor = req.body;
    const updatedVendor = await Vendor.findByIdAndUpdate(
      id,
      { ...vendor, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json(updatedVendor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Delete Vendor 
export const deleteVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVendor = await Vendor.findByIdAndRemove(id);
    if (!deletedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
