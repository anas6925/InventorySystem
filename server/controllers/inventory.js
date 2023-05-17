import InventoryGroup from "../models/InventoryGroup.js";

// Get All Inventory Groups
export const getAllInventoryGroups = async (req, res) => {
    
    try {
      const allGroups = await InventoryGroup.find();
      res.status(200).json(allGroups);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

// Create New Inventory Group
export const createInventoryGroup = async (req, res) => {
    const {name, status, color, fontSize, fontColor} = req.body;
    const newInventoryGroup = new InventoryGroup( {name, status, color, fontSize, fontColor});
  try {
    await newInventoryGroup.save();
    res.status(200).json(newInventoryGroup);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

