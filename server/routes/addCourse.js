import express from "express";
import {
  createAddCourse,
  getAddCourses,
  getAddCourseById,
  updateAddCourse,
  deleteAddCourse
} from "../controllers/addCourse.js";

const router = express.Router();

router.post("/", createAddCourse);
router.get("/", getAddCourses);
router.get("/:id", getAddCourseById);
router.put("/:id", updateAddCourse);
router.delete("/:id", deleteAddCourse);

export default router;
