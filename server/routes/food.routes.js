import express from "express";
import {
  createFood,
  deleteFoodById,
  getFoodById,
  getFoods,
  updateFoodById,
} from "../controllers/food.controller.js";
import { protectMiddleware } from "../middlewares/protectedMiddleware.js";

const router = express.Router();

router.post("/food", protectMiddleware, createFood);
router.get("/food", getFoods);
router.get("/food/:id", getFoodById);
router.patch("/food/:id", protectMiddleware, updateFoodById);
router.delete("/food/:id", protectMiddleware, deleteFoodById);

export default router;
