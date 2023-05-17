import express from "express";
import {
  createInventoryGroup,
} from "../controllers/inventory.js";

const router = express.Router();

router.get("/createInventoryGroup", createInventoryGroup);

export default router;
