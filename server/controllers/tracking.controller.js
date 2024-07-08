import { Tracking } from "../models/tracking.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import CustomError from "../utils/customeError.js";

// creating tracking food
export const trackingFood = asyncHandler(async (req, res, next) => {
  const data = req.body;

  const trackedFood = await Tracking.create(data);
  if (!trackedFood) {
    return next(
      new CustomError(
        "food doesn't tracked successfully. Please try again latter.",
        403
      )
    );
  }
  return res.status(201).json({
    status: "success",
    message: "food tracked successfully",
    trackedFood,
  });
});

// getting all tracked food eaten by a person
export const trackedFood = asyncHandler(async (req, res, next) => {
  const { id, date } = req.params;
  const strDate = new Date(date).toLocaleDateString();

  // console.log(date);
  // console.log(strDate);

  const trackedFood = await Tracking.find({ userId: id, eatenDate: strDate })
    .populate("userId")
    .populate("foodId");
  if (!trackedFood) {
    return next(
      new CustomError(
        "food doesn't tracked successfully. Please try again latter.",
        403
      )
    );
  }
  return res.status(201).json({
    status: "success",
    message: "Tracked food eaten by a person.",
    trackedFood,
  });
});
