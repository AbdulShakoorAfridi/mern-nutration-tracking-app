import { Food } from "../models/food.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import CustomError from "../utils/customeError.js";

// creating food
// @access private
// route /api/v1/food
export const createFood = asyncHandler(async (req, res, next) => {
  //   const { name, calories, protein, carbohydrates, fat, fiber } = req.body;
  const newFood = await Food.create(req.body);
  res.status(201).json({
    status: "success",
    message: "food inserted to the menu.",
    food: newFood.name,
  });
});

// getting all foods
// @access private
// route /api/v1/food
export const getFoods = asyncHandler(async (req, res, next) => {
  const { name, calories, protein, carbohydrates, fat, fiber } = req.query;
  const query = {};
  if (name) query.name = { $regex: name, $options: "i" };
  if (calories) query.calories = calories;
  if (protein) query.protein = protein;
  if (carbohydrates) query.carbohydrates = carbohydrates;
  if (fat) query.fat = fat;
  if (fiber) query.fiber = fiber;

  const foods = await Food.find(query);
  res.status(200).json({
    status: "success",
    message: "foods fetched",
    foods: foods,
  });
});

// getting food by id
// @access public
// route /api/v1/food/:id

export const getFoodById = asyncHandler(async (req, res, next) => {
  const food = await Food.findById(req.params.id);
  if (!food) {
    const error = new CustomError("food not found.", 404);
    return next(error);
  }
  res.status(200).json({
    status: "success",
    message: "food fetched",
    food: food,
  });
});

// updating food by id
// @access private

export const updateFoodById = asyncHandler(async (req, res, next) => {
  const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!food) {
    const error = new CustomError("food not found.", 404);
    return next(error);
  }
  res.status(200).json({
    status: "success",
    message: "food updated",
    food: food,
  });
});

// deleting food by id
// @access private

export const deleteFoodById = asyncHandler(async (req, res, next) => {
  const deletedFood = await Food.findByIdAndDelete(req.params.id);
  if (!deletedFood) {
    const error = new CustomError("food not found.", 404);
    return next(error);
  }
  res.status(204).json({
    status: "success",
    message: "food deleted",
    food: deletedFood.name,
  });
});
