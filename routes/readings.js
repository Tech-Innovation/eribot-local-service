import express from "express";
import {
  getReadings,
  getReadingsById,
  addReadings,
  updateReadings,
} from "../controllers/readings.js";
const router = express.Router();

router.route("/").get(getReadings);
router.route("/:id").get(getReadingsById);
router.route("/").post(addReadings);
router.route("/:id").put(updateReadings);

export default router;
