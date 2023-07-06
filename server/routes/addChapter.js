import express from "express";
import {
  createAddChapter,
  getAddChapters,
  getAddChapterById,
  updateAddChapter,
  deleteAddChapter
} from "../controllers/addChapter.js";

const router = express.Router();

router.post("/", createAddChapter);
router.get("/", getAddChapters);
router.get("/:id", getAddChapterById);
router.put("/:id", updateAddChapter);
router.delete("/:id", deleteAddChapter);

export default router;
