import express from "express";
import {
  createAddCategory,
  getAddCategoriesByCourse, // Update the import
  getAddCategoryById,
  updateAddCategory,
  deleteAddCategory
} from "../controllers/addCategory.js";

const router = express.Router();

router.post("/", createAddCategory);
router.get("/course/:courseId", getAddCategoriesByCourse); // Update the route
router.get("/:id", getAddCategoryById);
router.put("/:id", updateAddCategory);
router.delete("/:id", deleteAddCategory);

export default router;
