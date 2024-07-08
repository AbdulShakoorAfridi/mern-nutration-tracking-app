import express from "express";
import {
  trackedFood,
  trackingFood,
} from "../controllers/tracking.controller.js";
import { protectMiddleware } from "../middlewares/protectedMiddleware.js";

const router = express.Router();

router.post("/tracking", protectMiddleware, trackingFood);
router.get("/tracking/:id/:date", protectMiddleware, trackedFood);

export default router;
