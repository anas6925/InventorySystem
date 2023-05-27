import Group from "../models/Group.js";
import mongoose from 'mongoose';

// Rest of the code for the route handlers


//Create Group Route
export const createGroup = async (req, res) => {
  try {
    const group = req.body;
    const newGroup = new Group(group);
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Get All Groups Route
export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Get Group By Id
export const getGroupById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Group ID' });
    }

    const group = await Group.findById(id);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: 'Error occurred while retrieving group', error: error.message });
  }
};

// Update Group Data
export const updateGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const group = req.body;
    const updatedGroup = await Group.findByIdAndUpdate(
      id,
      { ...group, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedGroup) {
      return res.status(404).json({ message: "Group not found" });
    }
    res.status(200).json(updatedGroup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Delete Group 
export const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGroup = await Group.findByIdAndRemove(id);
    if (!deletedGroup) {
      return res.status(404).json({ message: "Group not found" });
    }
    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
