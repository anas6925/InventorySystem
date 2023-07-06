import express from "express";
import {
  createAddCategory,
  getAddCategories,
  getAddCategoryById,
  updateAddCategory,
  deleteAddCategory
} from "../controllers/addCategory.js";

const router = express.Router();

router.post("/", createAddCategory);
router.get("/", getAddCategories);
router.get("/:id", getAddCategoryById);
router.put("/:id", updateAddCategory);
router.delete("/:id", deleteAddCategory);

export default router;
