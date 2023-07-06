import express from "express";
import {
  createAddResource,
  getAddResources,
  getAddResourceById,
  updateAddResource,
  deleteAddResource,
} from "../controllers/addResource.js";

const router = express.Router();

// Create a new AddResource
router.post("/", createAddResource);

// Get all AddResources
router.get("/", getAddResources);

// Get a specific AddResource by ID
router.get("/:id", getAddResourceById);

// Update a specific AddResource
router.put("/:id", updateAddResource);

// Delete a specific AddResource
router.delete("/:id", deleteAddResource);

export default router;
