import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "food name is required."],
    },
    calories: {
      type: Number,
      required: [true, "food calories is required."],
    },
    protein: {
      type: Number,
      required: [true, "food protein is required."],
    },
    carbohydrates: {
      type: Number,
      required: [true, "food carbohydrates is required."],
    },
    fat: {
      type: Number,
      required: [true, "food fat is required."],
    },
    fiber: {
      type: Number,
      required: [true, "food fiber is required."],
    },
  },
  { timestamps: true }
);

export const Food = mongoose.model("Foods", foodSchema);
