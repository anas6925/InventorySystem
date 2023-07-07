// routes/addChapter.js

import express from "express";
import {
  createAddChapter,
  getAddChapters,
  getAddChapterById,
  updateAddChapter,
  deleteAddChapter,
  getChaptersByCourseId
} from "../controllers/addChapter.js";

const router = express.Router();

router.post("/", createAddChapter);
router.get("/", getAddChapters);
router.get("/:id", getAddChapterById);
router.get("/course/:courseId", getChaptersByCourseId); // New route to get chapters by course ID
router.put("/:id", updateAddChapter);
router.delete("/:id", deleteAddChapter);

export default router;
