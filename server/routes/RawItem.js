import express from "express";
import {
  createRawItem,
  getRawItems,
  getRawItemById,
  updateRawItem,
  deleteRawItem
} from "../controllers/RawItem.js";

const router = express.Router();

router.post("/", createRawItem);
router.get("/", getRawItems);
router.get("/:id", getRawItemById);
router.put("/:id", updateRawItem);
router.delete("/:id", deleteRawItem);

export default router;
